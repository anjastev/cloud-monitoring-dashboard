import { API_URL, nowIso, clampPct } from "./utils";

export async function fetchMetrics() {
  const res = await fetch(`${API_URL}/metrics`);
  if (!res.ok) throw new Error(`Metrics failed: ${res.status}`);
  const json = await res.json();
 
  const m = json.metrics || json; 
  return {
    timestamp: nowIso(),
    cpu: clampPct(m.cpu ?? 0),
    ram: clampPct(m.ram ?? 0),
    disk: clampPct(m.disk ?? 0),
  };
}

export async function fetchAlerts() {
  const res = await fetch(`${API_URL}/alerts`);
  if (!res.ok) throw new Error(`Alerts failed: ${res.status}`);
  const json = await res.json();

  const arr = json.alerts || [];
  const ts = nowIso();
 
  return arr.map((msg) => ({ message: String(msg), timestamp: ts }));
}
