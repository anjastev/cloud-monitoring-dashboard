import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAlerts, fetchMetrics } from "./api";
import { formatClock, pushPoint, exportToCSV } from "./utils";

import Header from "./components/Header";
import StatCards from "./components/StatCards";
import Controls from "./components/Controls";
import MetricsChart from "./components/MetricsChart";
import AlertsList from "./components/AlertsList";
import Footer from "./components/Footer";
import StatusIndicators from "./components/StatusIndicators";   
import NetworkChart from "./components/NetworkChart";           
import MapView from "./components/MapView";                    
import Filters from "./components/Filters";                     
import HistoryTable from "./components/HistoryTable";           
import ResourceChart from "./components/ResourceChart";         

export default function App() {
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [intervalSec, setIntervalSec] = useState(5);
  const [running, setRunning] = useState(true);
  const [dark, setDark] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [region, setRegion] = useState("all");
  const [timeframe, setTimeframe] = useState("1h");

  // Refresh metrics and alerts
  const refreshOnce = useCallback(async () => {
    try {
      const m = await fetchMetrics(region);
      setLatest(m);
      setHistory((prev) => pushPoint(prev, m, 120));

      const a = await fetchAlerts();
      setAlerts((prev) => {
        const newAlerts = [...a, ...prev].slice(0, 100);

        // Browser notification for new alerts
        a.forEach(alert => {
          if (Notification.permission === "granted") {
            new Notification(`New Alert: ${alert.message}`);
          }
        });

        return newAlerts;
      });

      setLastUpdated(formatClock(new Date()));
    } catch (e) {
      console.error(e);
    }
  }, [region]);

  // Initial load
  useEffect(() => {
    refreshOnce();
  }, [refreshOnce]);

  // Interval refresh
  useEffect(() => {
    if (!running) return;
    const id = setInterval(refreshOnce, intervalSec * 1000);
    return () => clearInterval(id);
  }, [refreshOnce, intervalSec, running]);

  // Current metrics
  const current = useMemo(() => {
    if (!latest) return { cpu: 0, ram: 0, disk: 0, netIn: 0, netOut: 0 };
    return {
      cpu: latest.cpu,
      ram: latest.ram,
      disk: latest.disk,
      netIn: latest.netIn,
      netOut: latest.netOut,
    };
  }, [latest]);

  // Dark mode persistence
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDark(saved);
  }, []);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="container py-4">
      <Header
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
        lastUpdated={lastUpdated}
        alertsCount={alerts.length} // live alerts counter
      />

      <div className="mt-3">
        <Filters
          region={region}
          onRegionChange={setRegion}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />

        <StatCards cpu={current.cpu} ram={current.ram} disk={current.disk} />
        <ResourceChart cpu={current.cpu} ram={current.ram} disk={current.disk} />
        <StatusIndicators metrics={current} />

        <Controls
          intervalSec={intervalSec}
          onIntervalChange={setIntervalSec}
          onRefreshOnce={refreshOnce}
          onClearHistory={() => setHistory([])}
          running={running}
          onToggleRunning={() => setRunning(r => !r)}
          onExportCSV={() => exportToCSV(history, "metrics_history.csv")}
        />

        <MetricsChart history={history} />
        <NetworkChart
          data={{
            timestamps: history.map(h => h.timestamp),
            inbound: history.map(h => h.net_in),
            outbound: history.map(h => h.net_out),
          }}
        />

        <MapView
          servers={[
            { name: "Server 1", lat: 48.85, lng: 2.35, status: "up", latency: 120 },
            { name: "Server 2", lat: 40.71, lng: -74.01, status: "down", latency: 550 },
          ]}
        />

        <HistoryTable history={history} />

        <AlertsList alerts={alerts} />
      </div>

      <Footer />
    </div>
  );
}
