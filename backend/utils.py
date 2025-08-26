import datetime

def log_alert(alert_msg: str):
   
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[ALERT] {timestamp} - {alert_msg}")
