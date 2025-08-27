from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

metrics_history = []
alerts_history = []

servers = [
    {"name": "Server 1", "lat": 48.85, "lng": 2.35, "status": "up", "latency": 120},
    {"name": "Server 2", "lat": 40.71, "lng": -74.01, "status": "down", "latency": 550},
    {"name": "Server 3", "lat": 35.68, "lng": 139.69, "status": "up", "latency": 80},
]

regions = ["all", "us-east", "eu-west", "asia"]


def generate_metrics(region="all"):
    cpu = random.randint(0, 100)
    ram = random.randint(0, 100)
    disk = random.randint(0, 100)
    net_in = random.randint(0, 1000)
    net_out = random.randint(0, 1000)
    timestamp = datetime.utcnow().isoformat()
    metric = {
        "cpu": cpu,
        "ram": ram,
        "disk": disk,
        "netIn": net_in,
        "netOut": net_out,
        "timestamp": timestamp,
        "region": region,
    }
    metrics_history.append(metric)
    if len(metrics_history) > 120:
        metrics_history.pop(0)
    return metric

def generate_alert():
    alert_types = ["CPU_HIGH", "RAM_HIGH", "DISK_LOW", "NET_ISSUE"]
    alert = {
        "type": random.choice(alert_types),
        "message": "Random alert generated",
        "timestamp": datetime.utcnow().isoformat(),
    }
    alerts_history.insert(0, alert)
    if len(alerts_history) > 100:
        alerts_history.pop()
    return alert

@app.route("/metrics")
def get_metrics():
    region = request.args.get("region", "all")
    latest_metric = generate_metrics(region)
    return jsonify(latest_metric)

@app.route("/alerts")
def get_alerts():
    
    if random.random() < 0.3: 
        generate_alert()
    return jsonify(alerts_history[:100])

@app.route("/servers")
def get_servers():
    return jsonify(servers)

@app.route("/regions")
def get_regions():
    return jsonify(regions)

@app.route("/history")
def get_history():
    timeframe = request.args.get("timeframe", "1h")
    now = datetime.utcnow()
    if timeframe.endswith("h"):
        hours = int(timeframe[:-1])
        cutoff = now - timedelta(hours=hours)
    elif timeframe.endswith("m"):
        minutes = int(timeframe[:-1])
        cutoff = now - timedelta(minutes=minutes)
    else:
        cutoff = now - timedelta(hours=1)

    filtered = [m for m in metrics_history if datetime.fromisoformat(m["timestamp"]) >= cutoff]
    return jsonify(filtered)

if __name__ == "__main__":
    app.run(debug=True, port=5000)