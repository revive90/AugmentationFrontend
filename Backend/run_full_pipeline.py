# run_full_pipeline.py (fixed)
import os, shutil, pickle, time, json, argparse
from datetime import datetime
import numpy as np
import psutil

# ---- FAISS import (robust) ----
try:
    import faiss  # conda-forge (Linux/macOS) or pip wheels (some envs)
except ImportError:
    try:
        import faiss_cpu as faiss
    except ImportError:
        import faiss_gpu as faiss

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# -------------------- Defaults (CLI can override) --------------------
ROOT_DATASET_DIR = "../../data/organised_data/Dataset_B/Training"
AUGMENTED_OUTPUT_DIR = "../../data/augmented_data/Dino/Dataset_B/Training"
INDEX_OUTPUT_DIR = "../../data/augmented_data/Dino/Faiss_Indexes/Dataset_B"
RESULTS_OUTPUT_DIR = "augmentation_results"

AUGMENTATION_TARGET_PERCENTAGE = 600
UPPER_THRESHOLD = 0.99
MINIMUM_QUALITY_THRESHOLD = 0.80

CLASS_TARGETS = {
    "glioma_tumor": 20441, "glioma": 20441,
    "meningioma_tumor": 11814, "meningioma": 11814,
    "no_tumor": 19185, "notumor": 19185,
    "pituitary_tumor": 13094, "pituitary": 13094
}

# -------------------- Project helpers --------------------
try:
    from feature_extractor import FeatureExtractor
except Exception as e:
    FeatureExtractor = None

try:
    from utils import fuse_images
except Exception:
    # fallback fuse
    import cv2
    def fuse_images(p1, p2, outp):
        i1, i2 = cv2.imread(p1), cv2.imread(p2)
        if i1 is None or i2 is None: return
        if i1.shape != i2.shape:
            i2 = cv2.resize(i2, (i1.shape[1], i1.shape[0]))
        fused = np.zeros_like(i1)
        for c in range(i1.shape[1]):
            fused[:, c] = i1[:, c] if (c % 2 == 0) else i2[:, c]
        cv2.imwrite(outp, fused)

# -------------------- Streaming helpers --------------------
def emit_event(**kwargs):
    try:
        for k, v in list(kwargs.items()):
            if isinstance(v, float):
                kwargs[k] = round(v, 4)
        print("[[EVT]] " + json.dumps(kwargs, ensure_ascii=True), flush=True)
    except Exception:
        pass

class MemoryTracker:
    def __init__(self):
        self.process = psutil.Process(os.getpid())
        self.peak_memory_mb = 0.0
        self.track()
    def track(self):
        cur = self.process.memory_info().rss / (1024 * 1024)
        if cur > self.peak_memory_mb: self.peak_memory_mb = cur
    def get_peak(self): return self.peak_memory_mb

# -------------------- Pair selection logic (fixed) --------------------
def plan_pairs(embeddings: np.ndarray,
               upper: float,
               lower_min: float,
               target_count: int) -> tuple[float, list[tuple[int,int]]]:
    """
    Try to find a lower threshold achieving >= target_count.
    If not possible, STILL return as many pairs as available
    between [lower_min, upper) so we generate something.
    """
    n = embeddings.shape[0]
    if n < 2: return lower_min, []

    # cosine similarity
    norm = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
    sim = norm @ norm.T

    iu = np.triu_indices(n, k=1)
    sims = sim[iu]
    order = np.argsort(sims)[::-1]  # high → low
    pairs_sorted = list(zip(iu[0][order], iu[1][order]))
    sims_sorted = sims[order]

    # 1) search for a lower thresh producing >= target_count
    best_lower = lower_min
    picked: list[tuple[int,int]] = []
    # scan from just below upper downwards
    for th in np.arange(upper - 0.01, lower_min - 0.01, -0.01):
        mask = (sims_sorted >= th) & (sims_sorted < upper)
        idxs = np.nonzero(mask)[0]
        if idxs.size >= target_count:
            best_lower = round(float(th), 2)
            picked = [pairs_sorted[i] for i in idxs[:target_count]]
            break

    # 2) fallback: if we didn't meet target, take all available in [lower_min, upper)
    if not picked:
        mask = (sims_sorted >= lower_min) & (sims_sorted < upper)
        idxs = np.nonzero(mask)[0]
        picked = [pairs_sorted[i] for i in idxs]
        # may be empty; that's OK — caller will log + skip

    return best_lower, picked

# -------------------- Main pipeline --------------------
def main(
    ROOT_DATASET_DIR: str,
    AUGMENTED_OUTPUT_DIR: str,
    UPPER_THRESHOLD: float,
    MINIMUM_QUALITY_THRESHOLD: float,
    AUGMENTATION_TARGET_PERCENTAGE: float,
):
    if FeatureExtractor is None:
        raise RuntimeError("feature_extractor.FeatureExtractor is required but could not be imported.")

    overall_start = time.time()
    mem = MemoryTracker()
    emit_event(type="start", dataset_dir=ROOT_DATASET_DIR, output_dir=AUGMENTED_OUTPUT_DIR)

    os.makedirs(RESULTS_OUTPUT_DIR, exist_ok=True)

    class_dirs = sorted([d.path for d in os.scandir(ROOT_DATASET_DIR) if d.is_dir()])
    classes = [os.path.basename(d) for d in class_dirs]
    print(f"Classes Found: {classes}")
    if not classes:
        emit_event(type="done", elapsed_seconds=0, peak_mb=mem.get_peak())
        return

    # clean outputs
    if os.path.exists(INDEX_OUTPUT_DIR): shutil.rmtree(INDEX_OUTPUT_DIR)
    if os.path.exists(AUGMENTED_OUTPUT_DIR): shutil.rmtree(AUGMENTED_OUTPUT_DIR)

    # -------- Stage A: Indexing (40%) --------
    print("\n--- STAGE 1: Starting Offline Indexing ---")
    fe = FeatureExtractor()
    mem.track()

    for idx, class_dir in enumerate(class_dirs):
        class_name = os.path.basename(class_dir)
        print(f"\nIndexing class: {class_name}")

        # load images
        all_paths = [os.path.join(class_dir, f)
                     for f in os.listdir(class_dir)
                     if f.lower().endswith((".png", ".jpg", ".jpeg"))]
        if not all_paths:
            emit_event(type="overall_progress",
                      percent=(idx + 1) / len(class_dirs) * 40.0,
                      phase="index", cls=class_name)
            continue

        # extract features — keep ONLY valid features + aligned paths
        feats, paths = [], []
        for i, p in enumerate(all_paths):
            vec = fe.extract(p)
            if vec is not None:
                feats.append(vec)
                paths.append(p)
            if (i + 1) % 50 == 0 or (i + 1) == len(all_paths):
                mem.track()
                emit_event(type="heartbeat",
                           rss_mb=mem.process.memory_info().rss / (1024 * 1024),
                           peak_mb=mem.get_peak())

        if feats:
            feats_np = np.asarray(feats, dtype="float32")
            d = feats_np.shape[1]
            index = faiss.IndexFlatL2(d)
            index.add(feats_np)

            class_index_dir = os.path.join(INDEX_OUTPUT_DIR, class_name)
            os.makedirs(class_index_dir, exist_ok=True)
            faiss.write_index(index, os.path.join(class_index_dir, "class.index"))
            with open(os.path.join(class_index_dir, "index_to_path.pkl"), "wb") as f:
                pickle.dump(paths, f)  # <-- aligned with feats_np
        else:
            print(f"  (no valid features for {class_name})")

        emit_event(type="overall_progress",
                   percent=(idx + 1) / len(class_dirs) * 40.0,
                   phase="index", cls=class_name)

    index_end = time.time()
    print(f"\n--- Offline Indexing Complete. Time taken: {index_end - overall_start:.2f} s ---")

    # -------- Stage B: Augmentation (60%) --------
    # -------- Stage B: Augmentation (60%) --------
    print("\n--- STAGE 2: Starting Online Augmentation with Auto-Tuning ---")
    os.makedirs(AUGMENTED_OUTPUT_DIR, exist_ok=True)

    total_generated = 0
    n_classes = len(class_dirs)
    slice_per_class = 60.0 / float(n_classes)

    for idx, class_dir in enumerate(class_dirs):
        class_name = os.path.basename(class_dir)
        print(f"\nAugmenting class: {class_name}")

        index_file = os.path.join(INDEX_OUTPUT_DIR, class_name, "class.index")
        map_file = os.path.join(INDEX_OUTPUT_DIR, class_name, "index_to_path.pkl")
        if not (os.path.exists(index_file) and os.path.exists(map_file)):
            overall_now = 40.0 + (idx + 1) * slice_per_class
            emit_event(type="overall_progress", percent=overall_now, phase="augment", cls=class_name)
            continue

        index = faiss.read_index(index_file)
        with open(map_file, "rb") as f:
            image_paths = pickle.load(f)

        if class_name in CLASS_TARGETS:
            target_count = CLASS_TARGETS[class_name]
            print(f"  Using custom target for {class_name}: {target_count} images")
        else:
            target_count = int(len(image_paths) * (AUGMENTATION_TARGET_PERCENTAGE / 100.0))
            print(f"  Using global target percentage for {class_name}: {target_count} images")

        if index.ntotal == 0 or target_count <= 0:
            overall_now = 40.0 + (idx + 1) * slice_per_class
            emit_event(type="overall_progress", percent=overall_now, phase="augment", cls=class_name)
            continue

        embeds = index.reconstruct_n(0, index.ntotal)
        mem.track()

        lower_th, pairs = plan_pairs(
            embeddings=embeds,
            upper=UPPER_THRESHOLD,
            lower_min=MINIMUM_QUALITY_THRESHOLD,
            target_count=target_count
        )
        print(f"  Planned {len(pairs)} pairs with lower={lower_th:.2f}, upper={UPPER_THRESHOLD:.2f}")

        if not pairs:
            print("  No viable pairs under thresholds — skipping.")
            overall_now = 40.0 + (idx + 1) * slice_per_class
            emit_event(type="overall_progress", percent=overall_now, phase="augment", cls=class_name)
            continue

        class_out = os.path.join(AUGMENTED_OUTPUT_DIR, class_name)
        os.makedirs(class_out, exist_ok=True)

        denom = max(1, len(pairs))
        for j, (a, b) in enumerate(pairs):
            p1, p2 = image_paths[a], image_paths[b]
            outp = os.path.join(class_out, f"fused_{class_name}_{j}.png")
            fuse_images(p1, p2, outp)

            # 🔥 update global + per-class counts
            total_generated += 1
            generated_in_class = j + 1

            # emit immediately for smoother frontend updates
            emit_event(
                type="generated",
                cls=class_name,
                generated_in_class=generated_in_class,
                total_generated=total_generated
            )

            # heartbeat & progress every 50 or at the end
            if (j + 1) % 50 == 0 or (j + 1) == denom:
                mem.track()
                emit_event(
                    type="heartbeat",
                    rss_mb=mem.process.memory_info().rss / (1024 * 1024),
                    peak_mb=mem.get_peak()
                )
                class_progress = (j + 1) / float(denom)
                overall_now = 40.0 + (idx * slice_per_class) + (class_progress * slice_per_class)
                emit_event(type="overall_progress", percent=overall_now, phase="augment", cls=class_name)

        print(f"  Generated {generated_in_class} new images for {class_name}.")

    overall_end = time.time()
    total_duration = overall_end - overall_start

    # summary file
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    log_filename = f"augmentation_newPipeline_results_{ts}.txt"
    os.makedirs(RESULTS_OUTPUT_DIR, exist_ok=True)
    log_path = os.path.join(RESULTS_OUTPUT_DIR, log_filename)
    with open(log_path, "w") as f:
        f.write(f"Total New Images Generated: {total_generated}\n")
        f.write(f"Peak Memory Usage: {mem.get_peak():.2f} MB\n")
        f.write(f"Total Execution Time: {total_duration:.2f} seconds\n")

    print("\n\n--- Full Pipeline Complete ---")
    print(f"--- Results saved to: '{log_path}' ---")
    print(f"--- Total execution time: {total_duration:.2f} seconds. ---")

    emit_event(type="overall_progress", percent=100.0)
    emit_event(type="done", elapsed_seconds=total_duration, peak_mb=mem.get_peak(), summary_path=log_path)

# -------------------- CLI --------------------
if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--root-dataset-dir", required=False, default=ROOT_DATASET_DIR)
    p.add_argument("--augmented-output-dir", required=False, default=AUGMENTED_OUTPUT_DIR)
    p.add_argument("--upper-threshold", type=float, default=UPPER_THRESHOLD)
    p.add_argument("--minimum-quality-threshold", type=float, default=MINIMUM_QUALITY_THRESHOLD)
    p.add_argument("--augmentation-target-percentage", type=float, default=AUGMENTATION_TARGET_PERCENTAGE)
    args = p.parse_args()

    main(
        ROOT_DATASET_DIR=args.root_dataset_dir,
        AUGMENTED_OUTPUT_DIR=args.augmented_output_dir,
        UPPER_THRESHOLD=args.upper_threshold,
        MINIMUM_QUALITY_THRESHOLD=args.minimum_quality_threshold,
        AUGMENTATION_TARGET_PERCENTAGE=args.augmentation_target_percentage,
    )
