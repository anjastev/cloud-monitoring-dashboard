export const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export function nowIso() {
  return new Date().toISOString();
}

export function formatClock(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function clampPct(x) {
  if (x < 0) return 0;
  if (x > 100) return 100;
  return x;
}


export function pushPoint(arr, point, maxLen = 60) {
  const next = [...arr, point];
  if (next.length > maxLen) next.shift();
  return next;
}
