from metrics import get_metrics

def test_get_metrics():
    metrics = get_metrics()
    assert "cpu" in metrics
    assert "ram" in metrics
    assert "disk" in metrics
    assert 0 <= metrics["cpu"] <= 100
