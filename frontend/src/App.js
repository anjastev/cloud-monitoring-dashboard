import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAlerts, fetchMetrics } from "./api";
import { formatClock, pushPoint } from "./utils";

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

  const refreshOnce = useCallback(async () => {
    try {
      const m = await fetchMetrics(region); 
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
  }, [region]);

  useEffect(() => {
    refreshOnce();
  }, [refreshOnce]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(refreshOnce, intervalSec * 1000);
    return () => clearInterval(id);
  }, [refreshOnce, intervalSec, running]);

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
       
        <Filters
          region={region}
          onRegionChange={setRegion}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />

    
        <StatCards cpu={current.cpu} ram={current.ram} disk={current.disk} />
        <StatusIndicators metrics={current} />

      
        <Controls
          intervalSec={intervalSec}
          onIntervalChange={setIntervalSec}
          onRefreshOnce={refreshOnce}
          onClearHistory={() => setHistory([])}
          running={running}
          onToggleRunning={() => setRunning((r) => !r)}
        />

      
        <MetricsChart history={history} />       
       <NetworkChart
        data={{
          timestamps: history.map((h) => h.timestamp),
          inbound: history.map((h) => h.net_in),
          outbound: history.map((h) => h.net_out),
        }}
/>

        <MapView  servers={[
    { name: "Server 1", lat: 48.85, lng: 2.35, status: "up", latency: 120 },
    { name: "Server 2", lat: 40.71, lng: -74.01, status: "down", latency: 550 },
  ]}
/>       

       
        <AlertsList alerts={alerts} />
      </div>

      <Footer />
    </div>
  );
}
