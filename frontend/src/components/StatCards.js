import React from "react";

function StatCard({ title, value, icon }) {
  const pct = Math.round(value);
  const barClass =
    pct < 60 ? "bg-success" : pct < 85 ? "bg-warning" : "bg-danger";

  return (
    <div className="card stat-card shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="text-muted m-0">{title}</h6>
          <i className={`bi ${icon} fs-5 text-primary`}></i>
        </div>
        <div className="d-flex align-items-baseline gap-2 mt-2">
          <span className="stat-number">{pct}</span>
          <span className="text-muted">%</span>
        </div>
        <div className="progress mt-2" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
          <div className={`progress-bar ${barClass}`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default function StatCards({ cpu, ram, disk }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <StatCard title="CPU Usage" value={cpu} icon="bi-cpu" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard title="Memory Usage" value={ram} icon="bi-memory" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard title="Disk Usage" value={disk} icon="bi-hdd" />
      </div>
    </div>
  );
}
