import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function MetricsChart({ data }) {
  if (!data || data.length === 0) return <p>Loading metrics...</p>;

  const chartData = {
    labels: data.map((m) => m.timestamp),
    datasets: [
      {
        label: "CPU Usage (%)",
        data: data.map((m) => m.cpu_usage),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Memory Usage (%)",
        data: data.map((m) => m.memory_usage),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Disk Usage (%)",
        data: data.map((m) => m.disk_usage),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2>📊 System Metrics</h2>
      <Line data={chartData} />
    </div>
  );
}

export default MetricsChart;
