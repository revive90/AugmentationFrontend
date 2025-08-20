# run_full_pipeline.py
import os
import shutil
import faiss
import numpy as np
import pickle
import time
from datetime import datetime
import psutil
import os
from feature_extractor import FeatureExtractor
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"


# --- 1. CONFIGURATION ---
ROOT_DATASET_DIR = "../../data/organised_data/Dataset_B/Training"
INDEX_OUTPUT_DIR = "../../data/augmented_data/Dino/Faiss_Indexes/Dataset_B"
AUGMENTED_OUTPUT_DIR = "../../data/augmented_data/Dino/Dataset_B/Training"
RESULTS_OUTPUT_DIR = "augmentation_results"

AUGMENTATION_TARGET_PERCENTAGE = 600
UPPER_THRESHOLD = 0.99
MINIMUM_QUALITY_THRESHOLD = 0.80

CLASS_TARGETS = {
    #----- CURRENTLY SET FOR DATASET B -----
    "glioma_tumor": 20441,  # exact number of augmented images for class1
    "glioma": 20441,
    "meningioma_tumor": 11814,  # exact number of augmented images for class1
    "meningioma": 11814,
    "no_tumor": 19185,  # exact number of augmented images for class1
    "notumor": 19185,
    "pituitary_tumor": 13094,  # exact number of augmented images for class1
    "pituitary": 13094
    
}


# --- 2. New Memory Tracker Class ---
class MemoryTracker:
    def __init__(self):
        self.process = psutil.Process(os.getpid())
        self.peak_memory_mb = 0
        self.track()  # Initial memory usage

    def track(self):
        # Get current memory usage in MB
        current_memory_mb = self.process.memory_info().rss / (1024 * 1024)
        if current_memory_mb > self.peak_memory_mb:
            self.peak_memory_mb = current_memory_mb

    def get_peak_memory(self):
        return self.peak_memory_mb


# --- 3. HELPER FUNCTIONS ---
def find_best_lower_threshold(embeddings: np.ndarray, target_count: int, memory_tracker: MemoryTracker) -> tuple[
    float, list]:
    """Pre-calculates similarities and finds the best lower threshold to meet the target."""
    print(f"  Planning augmentation to meet target of {target_count} images...")
    num_images = embeddings.shape[0]
    if num_images < 2: return MINIMUM_QUALITY_THRESHOLD, []

    norm_embeds = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
    similarity_matrix = norm_embeds @ norm_embeds.T
    memory_tracker.track()  # Track memory after creating large similarity matrix

    iu = np.triu_indices(num_images, k=1)
    all_pairs_similarities = np.sort(similarity_matrix[iu])[::-1]

    best_lower_threshold = MINIMUM_QUALITY_THRESHOLD
    found_pairs = []

    for th in np.arange(UPPER_THRESHOLD - 0.01, MINIMUM_QUALITY_THRESHOLD - 0.01, -0.01):
        lower_th = round(th, 2)
        count = np.sum((all_pairs_similarities >= lower_th) & (all_pairs_similarities < UPPER_THRESHOLD))
        if count >= target_count:
            best_lower_threshold = lower_th
            print(f"  Found optimal lower threshold: {best_lower_threshold:.2f} (will generate up to {count} images)")
            valid_indices = np.where(
                (similarity_matrix >= best_lower_threshold) & (similarity_matrix < UPPER_THRESHOLD))
            pairs_set = {tuple(sorted((i, j))) for i, j in zip(*valid_indices) if i != j}
            sorted_pairs = sorted(list(pairs_set), key=lambda p: similarity_matrix[p[0], p[1]], reverse=True)
            found_pairs = sorted_pairs[:target_count]
            break

    if not found_pairs: print(f"  Warning: Could not meet target. Using lowest threshold {MINIMUM_QUALITY_THRESHOLD}.")

    return best_lower_threshold, found_pairs


# --- 4. MAIN WORKFLOW ---
def main():
    """Runs the entire pipeline: indexing, augmentation, and results logging."""
    overall_start_time = time.time()
    memory_tracker = MemoryTracker()  # Initialize the memory tracker

    # --- Setup for logging ---
    log_lines = []
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    log_filename = f"augmentation_newPipeline_results_{timestamp}.txt"
    os.makedirs(RESULTS_OUTPUT_DIR, exist_ok=True)
    log_filepath = os.path.join(RESULTS_OUTPUT_DIR, log_filename)

    print("--- Starting Full Augmentation Pipeline ---")
    log_lines.append("--- OCMRI Enhancement Pipeline: Augmentation Summary ---")
    log_lines.append(f"Run Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    log_lines.append("=" * 50)

    # --- STAGE 1: OFFLINE INDEXING ---
    print("\n--- STAGE 1: Starting Offline Indexing ---")
    if os.path.exists(INDEX_OUTPUT_DIR): shutil.rmtree(INDEX_OUTPUT_DIR)

    feature_extractor = FeatureExtractor()
    memory_tracker.track()  # Track memory after loading the model

    class_dirs = sorted([d.path for d in os.scandir(ROOT_DATASET_DIR) if d.is_dir()])
    log_lines.append(f"Classes Found: {[os.path.basename(d) for d in class_dirs]}")

    for class_dir in class_dirs:
        class_name = os.path.basename(class_dir)
        print(f"\nProcessing class: {class_name}")
        image_paths = [os.path.join(class_dir, f) for f in os.listdir(class_dir) if f.endswith(('.png', '.jpg'))]
        if not image_paths: continue
        all_features = [feature_extractor.extract(p) for p in image_paths]
        memory_tracker.track()  # Track memory after extracting features for a class

        valid_features = [f for f in all_features if f is not None]
        valid_paths = [p for f, p in zip(all_features, image_paths) if f is not None]
        if not valid_features: continue
        features_np = np.array(valid_features).astype('float32')
        d = features_np.shape[1]
        index = faiss.IndexFlatL2(d)
        index.add(features_np)
        class_index_dir = os.path.join(INDEX_OUTPUT_DIR, class_name)
        os.makedirs(class_index_dir, exist_ok=True)
        faiss.write_index(index, os.path.join(class_index_dir, "class.index"))
        with open(os.path.join(class_index_dir, "index_to_path.pkl"), 'wb') as f:
            pickle.dump(valid_paths, f)

    indexing_end_time = time.time()
    indexing_duration = indexing_end_time - overall_start_time
    print(f"\n--- Offline Indexing Complete. Time taken: {indexing_duration:.2f} seconds. ---")
    log_lines.append(f"\nIndexing Stage Duration: {indexing_duration:.2f} seconds")

    # --- STAGE 2: ONLINE AUGMENTATION (AUTO-TUNED) ---
    print("\n--- STAGE 2: Starting Online Augmentation with Auto-Tuning ---")
    if os.path.exists(AUGMENTED_OUTPUT_DIR): shutil.rmtree(AUGMENTED_OUTPUT_DIR)

    augmentation_results = {}
    total_images_generated = 0

    for class_dir in class_dirs:
        class_name = os.path.basename(class_dir)
        print(f"\nAugmenting class: {class_name}")

        index_file = os.path.join(INDEX_OUTPUT_DIR, class_name, "class.index")
        map_file = os.path.join(INDEX_OUTPUT_DIR, class_name, "index_to_path.pkl")
        if not os.path.exists(index_file): continue

        index = faiss.read_index(index_file)
        with open(map_file, 'rb') as f:
            image_paths = pickle.load(f)

        # --- Determine augmentation target for this class ---
        if class_name in CLASS_TARGETS:
            target_count = CLASS_TARGETS[class_name]
            print(f"  Using custom target for {class_name}: {target_count} images")
        else:
            target_count = int(len(image_paths) * (AUGMENTATION_TARGET_PERCENTAGE / 100.0))
            print(f"  Using global target percentage for {class_name}: {target_count} images")

        if target_count == 0: 
            continue


        all_embeddings = index.reconstruct_n(0, index.ntotal)
        memory_tracker.track()  # Track memory after loading embeddings

        lower_th, pairs_to_fuse = find_best_lower_threshold(all_embeddings, target_count, memory_tracker)

        class_output_dir = os.path.join(AUGMENTED_OUTPUT_DIR, class_name)
        os.makedirs(class_output_dir, exist_ok=True)

        num_fused = len(pairs_to_fuse)
        print(f"  Fusing {num_fused} pairs...")
        for i, (idx1, idx2) in enumerate(pairs_to_fuse):
            path1, path2 = image_paths[idx1], image_paths[idx2]
            output_path = os.path.join(class_output_dir, f"fused_{class_name}_{i}.png")
            fuse_images(path1, path2, output_path)
            if i % 100 == 0: memory_tracker.track()  # Track memory during fusion

        print(f"  Generated {num_fused} new images.")
        augmentation_results[class_name] = num_fused
        total_images_generated += num_fused

    overall_end_time = time.time()
    augmentation_duration = overall_end_time - indexing_end_time
    total_duration = overall_end_time - overall_start_time

    # --- 5. Final Logging ---
    log_lines.append(f"Augmentation Stage Duration: {augmentation_duration:.2f} seconds")
    log_lines.append("=" * 50)
    log_lines.append("\n--- Augmentation Breakdown by Class ---")
    for class_name, count in augmentation_results.items():
        log_lines.append(f"  - {class_name}: {count} new images generated")

    log_lines.append("\n--- Summary ---")
    log_lines.append(f"Total New Images Generated: {total_images_generated}")
    log_lines.append(f"Peak Memory Usage: {memory_tracker.get_peak_memory():.2f} MB")  # Added memory usage
    log_lines.append(f"Total Execution Time: {total_duration:.2f} seconds")

    with open(log_filepath, 'w') as f:
        f.write('\n'.join(log_lines))

    print(f"\n\n--- Full Pipeline Complete ---")
    print(f"--- Results saved to: '{log_filepath}' ---")
    print(f"--- Total execution time: {total_duration:.2f} seconds. ---")


if __name__ == "__main__":
    try:
        from feature_extractor import FeatureExtractor
        from utils import fuse_images
    except ImportError:
        print("Warning: Could not import helper files. Using placeholder classes.")


        class FeatureExtractor:
            pass


        def fuse_images(p1, p2, p3):
            pass

    main()