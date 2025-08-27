import React from "react";

const Filters = ({ timeframe, setTimeframe }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Timeframe: </label>
      <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
        <option value="5m">Last 5m</option>
        <option value="1h">Last 1h</option>
        <option value="24h">Last 24h</option>
        <option value="7d">Last 7d</option>
      </select>
    </div>
  );
};

export default Filters;
