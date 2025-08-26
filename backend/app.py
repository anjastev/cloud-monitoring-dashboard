from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from metrics import get_metrics
from ai_module import check_anomalies
from config import PORT

app = FastAPI(title="Cloud Monitoring Dashboard")

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint metrics
@app.get("/metrics")
def metrics_endpoint():
    metrics = get_metrics()
    return {"metrics": metrics}

# Endpoint alerts
@app.get("/alerts")
def alerts_endpoint():
    metrics = get_metrics()
    alerts = check_anomalies(metrics)
    return {"alerts": alerts}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
