import subprocess
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# --- Allow React frontend to call the backend ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # CRA default
        "http://127.0.0.1:3000",
        "http://localhost:5173",  # Vite default
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Expected payload from React ---
class BaselineRequest(BaseModel):
    ROOT_DATASET_DIR: str
    MAIN_OUTPUT_DIR: str
    INITIAL_TH1: float
    INITIAL_TH2: float
    ACCEPTABLE_DIFFERENCE_PERCENTAGE: float

@app.post("/augment/baseline")
def run_baseline(req: BaselineRequest):
    """Run the ocmri_baseline.py script with parameters from the UI."""
    cmd = [
        sys.executable, "ocmri_baseline.py",
        "--root-dataset-dir", req.ROOT_DATASET_DIR,
        "--main-output-dir", req.MAIN_OUTPUT_DIR,
        "--initial-th1", str(req.INITIAL_TH1),
        "--initial-th2", str(req.INITIAL_TH2),
        "--acceptable-difference-percentage", str(req.ACCEPTABLE_DIFFERENCE_PERCENTAGE),
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    return {
        "exit_code": result.returncode,
        "stdout": result.stdout,
        "stderr": result.stderr,
    }
