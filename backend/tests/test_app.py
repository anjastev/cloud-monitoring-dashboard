from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_metrics_endpoint():
    response = client.get("/metrics")
    assert response.status_code == 200
    assert "cpu" in response.json()["metrics"]

def test_alerts_endpoint():
    response = client.get("/alerts")
    assert response.status_code == 200
    assert isinstance(response.json()["alerts"], list)
