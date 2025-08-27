
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,     
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResourceChart({ cpu, ram, disk }) {
  const data = {
    labels: ["CPU", "RAM", "Disk"],
    datasets: [
      {
        data: [cpu, ram, disk],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={data} />;
}
