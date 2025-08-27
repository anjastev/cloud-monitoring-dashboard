import React from "react";

export default function Controls({
  intervalSec,
  onIntervalChange,
  onRefreshOnce,
  onClearHistory,
  running,
  onToggleRunning
}) {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body d-flex flex-wrap align-items-center gap-2">
        <button className="btn btn-primary" onClick={onRefreshOnce}>
          <i className="bi bi-arrow-clockwise me-1"></i>Refresh now
        </button>

        <div className="vr mx-2 d-none d-md-block"></div>

        <label className="form-label mb-0 me-2">Auto-refresh</label>
        <div className="input-group" style={{ maxWidth: 160 }}>
          <span className="input-group-text">sec</span>
          <input
            type="number"
            min="1"
            step="1"
            value={intervalSec}
            onChange={(e) => onIntervalChange(Number(e.target.value || 1))}
            className="form-control"
          />
          <button
            className={`btn ${running ? "btn-outline-danger" : "btn-outline-success"}`}
            onClick={onToggleRunning}
          >
            {running ? <><i className="bi bi-pause-circle me-1"></i>Pause</> : <><i className="bi bi-play-circle me-1"></i>Start</>}
          </button>
        </div>

        <div className="ms-auto">
          <button className="btn btn-outline-secondary" onClick={onClearHistory}>
            <i className="bi bi-trash me-1"></i>Clear history
          </button>
        </div>
      </div>
    </div>
  );
}
