const API_URL = 'http://127.0.0.1:5000/api';

const nowIso = () => new Date().toISOString();
const clampPct = (val) => Math.max(0, Math.min(100, val || 0));

export async function fetchMetrics(region = 'all') {
  try {
    const url = `${API_URL}/metrics${region !== 'all' ? `?region=${region}` : ''}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Metrics failed: ${res.status}`);
    }
    
    const json = await res.json();
    console.log('Backend response:', json); 
    
   
    return {
      timestamp: json.timestamp || nowIso(),
      cpu: clampPct(json.cpu),
      ram: clampPct(json.ram), 
      disk: clampPct(json.disk),
      netIn: json.netIn || 0,
      netOut: json.netOut || 0,
      region: json.region || region
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
}

export async function fetchAlerts() {
  try {
    const res = await fetch(`${API_URL}/alerts`);
    
    if (!res.ok) {
      throw new Error(`Alerts failed: ${res.status}`);
    }
    
    const json = await res.json();
    console.log('Alerts response:', json); 
    return json.map((alert) => ({
      message: alert.message || String(alert),
      timestamp: alert.timestamp || nowIso(),
      type: alert.type || 'INFO',
      severity: alert.severity || 'low'
    }));
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return []; 
  }
}


export async function fetchServers() {
  try {
    const res = await fetch(`${API_URL}/servers`);
    if (!res.ok) throw new Error(`Servers failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching servers:', error);
    return [];
  }
}

export async function fetchHistory(timeframe = '1h') {
  try {
    const res = await fetch(`${API_URL}/history?timeframe=${timeframe}`);
    if (!res.ok) throw new Error(`History failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}