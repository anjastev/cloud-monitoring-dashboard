const exportCSV = () => {
  const rows = history.map(h => [h.timestamp, h.cpu, h.ram, h.disk, h.net_in, h.net_out].join(','));
  const blob = new Blob([['Timestamp,CPU,RAM,Disk,NetIn,NetOut', ...rows].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'metrics_history.csv';
  link.click();
};
