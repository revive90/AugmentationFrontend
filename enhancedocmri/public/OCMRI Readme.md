
# OCMRI Augmentation – README

This guide walks you through setting up and running the **backend (FastAPI + Python)** and the **frontend (React)** for both augmentation modes:

- **Baseline OCMRI (MSE-based)**
- **Enhanced OCMRI (DINOv2 + FAISS)**

It also covers common pitfalls on Windows (FAISS install, file permissions), endpoint details, and troubleshooting.

---

## 1) Prerequisites

- **Python 3.10+** (recommended)
- **Node.js 18+** and **npm** 
- **Git** ( for cloning)
- A working C/C++ runtime on Windows (for some Python wheels)
- Enough disk space (augmented images can be large)

---

## 2) Project Structure 

```
EmhancedOCMRI/
├─ AugmentedBackend/
│  ├─ server.py
│  ├─ ocmri_baseline.py
│  ├─ run_full_pipeline.py
│  ├─ feature_extractor.py
│  ├─ utils.py
│  ├─ augmentation_results/          # created at runtime
│  ├─ static_previews/               # created at runtime
│  └─ Faiss_Indexes/                 # created at runtime (Enhanced Method)
└─ AugmentationFrontend/
	└─enhancedocmri
	   ├─ package.json
	   ├─ src/
	   │  ├─ components/ (Baseline.tsx, Enhanced.tsx, etc.)
	   │  └─ ...
	   └─ ...
```



---

## 3) Backend Setup (FastAPI)

### 3.1 Create & Activate a Virtual Environment

**Windows (PowerShell):**

```powershell
cd AugmentedBackend
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**macOS/Linux (bash/zsh):**

```bash
cd AugmentedBackend
python3 -m venv .venv
source .venv/bin/activate
```

### 3.2 Install Python Dependencies

```bash
pip install --upgrade pip
pip install fastapi==0.115.0 uvicorn==0.30.0 pydantic==2.8.2 psutil==6.0.0 numpy==1.26.4 faiss-cpu==1.8.0 opencv-python==4.10.0.84 torch==2.3.1 torchvision==0.18.1

```

#### FAISS on Windows

FAISS wheels on Windows can be finicky. Try:

```bash
pip install faiss-cpu
```

If that fails, try:

```bash
pip install faiss-gpu
```

> The code tries `faiss`, then falls back to `faiss_cpu`, then `faiss_gpu`.

### 3.3 Start the Server

From `AugmentedBackend`:

```bash
uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```

You should see logs like:

```
Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### 3.4 Backend Endpoints

#### Baseline (MSE)

- **Blocking:** `POST /augment/baseline`
- **Streaming:** `POST /augment/baseline/stream`

**Payload:**

```json
{
  "ROOT_DATASET_DIR": "C:/path/to/input",
  "MAIN_OUTPUT_DIR": "C:/path/to/output",
  "INITIAL_TH1": 500.0,
  "INITIAL_TH2": 825.0,
  "ACCEPTABLE_DIFFERENCE_PERCENTAGE": 10.0
}
```

#### Enhanced (DINOv2 + FAISS)

- **Blocking:** `POST /augment/enhanced`
- **Streaming:** `POST /augment/enhanced/stream`

**Payload:**

```json
{
  "ROOT_DATASET_DIR": "C:/path/to/input",
  "AUGMENTED_OUTPUT_DIR": "C:/path/to/output",
  "UPPER_THRESHOLD": 0.99,
  "MINIMUM_QUALITY_THRESHOLD": 0.80,
  "AUGMENTATION_TARGET_PERCENTAGE": 600
}
```

**Notes:**

- The server streams logs as plain text; event lines prefixed with `[[EVT]]` contain JSON that the frontend parses for **progress, RAM, generated counts**.
- A completion sentinel is appended: `[[__DONE__]] { ... }`
- Preview images are served via `/static/...` and `/static_previews/...`.

### 3.5 Quick Curl Test (optional)

```bash
curl -X POST http://127.0.0.1:8000/augment/baseline \
  -H "Content-Type: application/json" \
  -d "{\"ROOT_DATASET_DIR\":\"C:/data/in\",\"MAIN_OUTPUT_DIR\":\"C:/data/out\",\"INITIAL_TH1\":500,\"INITIAL_TH2\":825,\"ACCEPTABLE_DIFFERENCE_PERCENTAGE\":10}"
```

---

## 4) Frontend Setup (React)

### 4.1 Install & Run

```bash
cd frontend
npm install
npm run dev   # (Vite)
# or
npm start     # (Create React App)
```

Open the printed URL (often `http://127.0.0.1:5173` or `http://localhost:3000`).

### 4.2 Using the UI

- **Baseline page**: Fill all fields (valid, existing input paths!) and click **START**.
- **Enhanced page**: Fill **all fields**; set sensible thresholds (e.g., upper 0.99, lower 0.80) and target %.
- The terminal area shows streaming logs.
- The circular progress updates from `[[EVT]] overall_progress`.
- RAM and “New Images Generated” update live.
- Preview images appear on the right as they are created.
- A summary link appears when done.

> **Reload All** button simply triggers a full page reload


---

## 5) Results & Outputs

- **Augmented images**
    
    - Baseline: `MAIN_OUTPUT_DIR/<class>/*.png`
    - Enhanced: `AUGMENTED_OUTPUT_DIR/<class>/*.png`
    
- **Summaries / Logs**:
    
    - All saved under `AugmentedBackend/augmentation_results/`
    - Baseline summary (detailed per-class): `*_augmentation_summary.txt`
    - Enhanced summary (totals + performance + per-class breakdown if implemented): `augmentation_newPipeline_results_*.txt`
    
- **Previews**:
    
    - Copied to `AugmentedBackend/static_previews/` if needed (so they can be served at `/static/...`)
        

---

## 6) Important Safety Notes (Windows)

- **Use absolute paths** in the UI to avoid accidental relative deletions.
    
- The backend avoids `shutil.rmtree` unless the path exists and is writable, but **don’t point outputs to system folders**.
    
- **Do not leave input fields blank**. The server will reject missing paths; the frontend should always send valid strings.
    
- If you see `PermissionError: [WinError 5]`, your path is likely protected (e.g., inside `C:\Windows\...`, `C:\Program Files\...`) or lacks permissions. Choose a user-writable directory (e.g., inside your Desktop or Documents).
    

---

## 7) Troubleshooting

### “Error loading ASGI app. Could not import module `server`”

- You ran uvicorn from the wrong folder.  
    Make sure you’re in `AugmentedBackend` and that `server.py` is there:
    
    ```bash
    uvicorn server:app --host 127.0.0.1 --port 8000 --reload
    ```
    

### FAISS import errors

- Try `pip install faiss-cpu`. If that fails, try `faiss-gpu`.
    
- Ensure Python version is compatible with the wheel you install.
    

### `PermissionError: [WinError 5] Access is denied`

- Change your output/index directories to a user-writable location.
    
- Avoid relative paths that resolve outside your project folder.
    
- Don’t point to root-like paths (e.g., `C:\Users\data` unless you created it).
    

### “Script not found: .../ocmri_baseline.py”

- Ensure `ocmri_baseline.py` and `run_full_pipeline.py` are in `AugmentedBackend/`.
    
- Don’t rename files without updating the server.
    

### CORS errors in the browser

- Server CORS allows `http://localhost:3000`, `127.0.0.1:3000`, `5173`.
    
- If your frontend runs on a different port, add it in `server.py` CORS `allow_origins`.
    

### No previews showing

- Ensure your output dir contains images (`.png/.jpg`).
    
- The backend only picks a few samples  over all generated classes.
    
- Check console logs for the sentinel `[[__DONE__]]` with preview URLs.
    

---

## 8) Configuration Tips

- **Enhanced pipeline internal paths**:  
    `run_full_pipeline.py` writes FAISS indexes under `Faiss_Indexes/` in the backend folder by default, and summaries under `augmentation_results/`. These can be changed near the top of that file if you want everything under a different root.
    
- **Logging verbosity**:  
    Both scripts print progress and events. The frontend parses lines that start with `[[EVT]]` and `[[__DONE__]]`. Don’t change those tags without updating the UI.
    

