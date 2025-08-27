import React from "react";

function badgeFor(msg) {
  const m = msg.toLowerCase();
  if (m.includes("cpu")) return "text-bg-danger";
  if (m.includes("ram")) return "text-bg-warning";
  if (m.includes("disk")) return "text-bg-info";
  return "text-bg-secondary";
}

export default function AlertsList({ alerts }) {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title mb-0">Alerts</h5>
          <span className="badge text-bg-light">{alerts?.length ?? 0}</span>
        </div>

        {(!alerts || alerts.length === 0) ? (
          <p className="text-muted mt-3">
            <i className="bi bi-check2-circle me-1 text-success"></i>
            No active alerts.
          </p>
        ) : (
          <ul className="list-group list-group-flush mt-3">
            {alerts.map((a, idx) => (
              <li key={idx} className="list-group-item d-flex align-items-start justify-content-between">
                <div className="me-3">
                  <div className={`badge ${badgeFor(a.message)} me-2`}>
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Alert
                  </div>
                  <span>{a.message}</span>
                </div>
                <small className="text-muted ms-3">{new Date(a.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
