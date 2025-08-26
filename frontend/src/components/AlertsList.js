import React from "react";

function AlertsList({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <p>No alerts 🚀</p>;
  }

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2>⚠️ Active Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} style={{ color: "red", fontWeight: "bold" }}>
            [{alert.timestamp}] {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsList;
