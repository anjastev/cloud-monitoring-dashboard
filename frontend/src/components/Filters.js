import React from 'react';

export default function Filters({ region, onRegionChange, timeframe, onTimeframeChange }) {
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'us-east', label: 'US East' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'asia', label: 'Asia' }
  ];

  const timeframes = [
    { value: '5m', label: 'Last 5 minutes' },
    { value: '15m', label: 'Last 15 minutes' },
    { value: '1h', label: 'Last 1 hour' },
    { value: '6h', label: 'Last 6 hours' },
    { value: '24h', label: 'Last 24 hours' }
  ];

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Region:</label>
        <select 
          className="form-select" 
          value={region} 
          onChange={(e) => onRegionChange && onRegionChange(e.target.value)}
        >
          {regions.map(r => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Timeframe:</label>
        <select 
          className="form-select" 
          value={timeframe} 
          onChange={(e) => {
            console.log('Timeframe changed to:', e.target.value);
            if (onTimeframeChange) {
              onTimeframeChange(e.target.value);
            } else {
              console.error('onTimeframeChange is not defined!');
            }
          }}
        >
          {timeframes.map(t => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}