import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function App() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:8000/metrics").then(res => {
        setMetrics(prev => [...prev, res.data]);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monitoring Dashboard</h2>
      {metrics.length > 0 && metrics[metrics.length - 1].anomaly && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ Anomaly Detected!
        </div>
      )}
      <LineChart width={600} height={300} data={metrics}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
        <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
        <Line type="monotone" dataKey="disk" stroke="#ff7300" />
      </LineChart>
    </div>
  );
}

export default App;
