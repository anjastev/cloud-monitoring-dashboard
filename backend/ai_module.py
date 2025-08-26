from config import ALERT_THRESHOLD

def check_anomalies(metrics: dict):
    """ lista alerts """
    alerts = []

    if metrics["cpu"] > ALERT_THRESHOLD:
        alerts.append(f"High CPU usage: {metrics['cpu']}%")
    if metrics["ram"] > ALERT_THRESHOLD:
        alerts.append(f"High RAM usage: {metrics['ram']}%")
    if metrics["disk"] > ALERT_THRESHOLD:
        alerts.append(f"High Disk usage: {metrics['disk']}%")
    
    return alerts
