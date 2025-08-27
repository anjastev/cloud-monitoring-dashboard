import React from "react";

export default function HistoryTable({ history }) {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>CPU (%)</th>
          <th>RAM (%)</th>
          <th>Disk (%)</th>
          <th>Net In (MB)</th>
          <th>Net Out (MB)</th>
        </tr>
      </thead>
      <tbody>
        {history.slice(-20).map((h, i) => (
          <tr key={i}>
            <td>{new Date(h.timestamp).toLocaleTimeString()}</td>
            <td>{h.cpu}</td>
            <td>{h.ram}</td>
            <td>{h.disk}</td>
            <td>{h.net_in}</td>
            <td>{h.net_out}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
