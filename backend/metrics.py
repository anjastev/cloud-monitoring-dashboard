import psutil

def get_metrics():
    """
    dictionary metrics  CPU, RAM, Disk
    """
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent

    return {
        "cpu": cpu,
        "ram": ram,
        "disk": disk
    }
