import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAlerts, fetchMetrics } from "./api";
import { formatClock, pushPoint } from "./utils";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import Controls from "./components/Controls";
import MetricsChart from "./components/MetricsChart";
import AlertsList from "./components/AlertsList";
import Footer from "./components/Footer";

export default function App() {
  const [history, setHistory] = useState([]);         // [{timestamp,cpu,ram,disk}, ...]
  const [latest, setLatest] = useState(null);          
  const [alerts, setAlerts] = useState([]);            // [{message,timestamp}]
  const [intervalSec, setIntervalSec] = useState(5);
  const [running, setRunning] = useState(true);
  const [dark, setDark] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const refreshOnce = useCallback(async () => {
    try {
      const m = await fetchMetrics();
      setLatest(m);
      setHistory((prev) => pushPoint(prev, m, 120)); 
      const a = await fetchAlerts();
      setAlerts((prev) => {
        return [...a, ...prev].slice(0, 100);
      });
      setLastUpdated(formatClock(new Date()));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    refreshOnce();
  }, [refreshOnce]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(refreshOnce, intervalSec * 1000);
    return () => clearInterval(id);
  }, [refreshOnce, intervalSec, running]);

  const current = useMemo(() => {
    if (!latest) return { cpu: 0, ram: 0, disk: 0 };
    return { cpu: latest.cpu, ram: latest.ram, disk: latest.disk };
  }, [latest]);

 
  useEffect(() => {
    document.body.classList.toggle("theme-dark", dark);
  }, [dark]);

  return (
    <div className="container py-4">
      <Header
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        lastUpdated={lastUpdated}
      />

      <div className="mt-3">
        <StatCards cpu={current.cpu} ram={current.ram} disk={current.disk} />
        <Controls
          intervalSec={intervalSec}
          onIntervalChange={setIntervalSec}
          onRefreshOnce={refreshOnce}
          onClearHistory={() => setHistory([])}
          running={running}
          onToggleRunning={() => setRunning((r) => !r)}
        />
        <MetricsChart history={history} />
        <AlertsList alerts={alerts} />
      </div>

      <Footer />
    </div>
  );
}
