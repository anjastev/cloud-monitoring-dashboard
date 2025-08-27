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



export function exportToCSV(data, filename = "export.csv") {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map(row => headers.map(h => row[h]).join(",")) 
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
