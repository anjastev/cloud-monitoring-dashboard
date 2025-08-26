from fastapi import FastAPI
import psutil, time

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Monitoring API running"}

@app.get("/metrics")
def get_metrics():
    return {
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('/').percent,
        "timestamp": time.time()
    }
