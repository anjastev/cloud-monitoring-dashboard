from ai_module import check_anomalies

def test_anomaly_detection():
    metrics = {"cpu": 85, "ram": 50, "disk": 90}
    alerts = check_anomalies(metrics)
    assert len(alerts) == 2
