import React, { useEffect, useState } from "react";
import MetricsChart from "./components/MetricsChart";
import AlertsList from "./components/AlertsList";
import { fetchMetrics, fetchAlerts } from "./api";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const metricsData = await fetchMetrics();
        setMetrics(metricsData);

        const alertsData = await fetchAlerts();
        setAlerts(alertsData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000); // refresh na 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>☁️ Cloud Monitoring Dashboard</h1>
      <MetricsChart data={metrics} />
      <AlertsList alerts={alerts} />
    </div>
  );
}

export default App;
