import React from "react";

export default function Header({ dark, onToggleDark, lastUpdated }) {
  return (
    <header className="app-header d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2">
        <span className="logo-circle">
          <i className="bi bi-cloud-fill"></i>
        </span>
        <h1 className="m-0">Cloud Monitoring Dashboard</h1>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="small text-muted">
          <i className="bi bi-clock-history me-1"></i>
          {lastUpdated ? `Updated: ${lastUpdated}` : "Waiting..."}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
        >
          {dark ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars"></i>}
        </button>
      </div>
    </header>
  );
}
