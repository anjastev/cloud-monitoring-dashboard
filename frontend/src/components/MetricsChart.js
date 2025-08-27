import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function MetricsChart({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Metrics Over Time</h5>
          <p className="text-muted">No data yet. Waiting for first fetch…</p>
        </div>
      </div>
    );
  }

  const labels = history.map((p) => new Date(p.timestamp).toLocaleTimeString());
  const data = {
    labels,
    datasets: [
      {
        label: "CPU (%)",
        data: history.map((p) => p.cpu),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        tension: 0.25,
        pointRadius: 0,
      },
      {
        label: "Memory (%)",
        data: history.map((p) => p.ram),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        tension: 0.25,
        pointRadius: 0,
      },
      {
        label: "Disk (%)",
        data: history.map((p) => p.disk),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: { min: 0, max: 100, ticks: { callback: (v) => `${v}%` } },
    },
    plugins: {
      legend: { position: "bottom" },
      tooltip: { intersect: false, mode: "index" },
    },
  };

  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">
        <h5 className="card-title mb-3">Metrics Over Time</h5>
        <div style={{ height: 340 }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
