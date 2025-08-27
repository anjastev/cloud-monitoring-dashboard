import React from "react";

const getStatusColor = (latency) => {
  if (latency > 500) return "red";
  if (latency > 200) return "yellow";
  return "green";
};

const StatusIndicator = ({ service, latency }) => {
  const color = getStatusColor(latency);

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: 8,
        }}
      />
      <span>{service} → {latency}ms</span>
    </div>
  );
};

export default StatusIndicator;
