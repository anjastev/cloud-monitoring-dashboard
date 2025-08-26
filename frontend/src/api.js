const API_URL = "http://127.0.0.1:8000"; // backend FastAPI URL

export async function fetchMetrics() {
  const res = await fetch(`${API_URL}/metrics`);
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${API_URL}/alerts`);
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return res.json();
}
