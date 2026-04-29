import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Info, RefreshCw } from 'lucide-react';

const AlertStream = () => {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from backend
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/alerts/');
        if (response.ok) {
          const data = await response.json();
          // We only take the top 10 to keep the UI clean
          setAlerts(data.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };

    fetchAlerts(); // initial fetch
    const interval = setInterval(fetchAlerts, 3000); // poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', overflow: 'hidden' }}>
      {alerts.map((alert, i) => (
        <div key={alert.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          borderLeft: `4px solid ${alert.type === 'CRITICAL' ? 'var(--alert-red)' : alert.type === 'HIGH' ? 'var(--warning-orange)' : 'var(--accent-blue)'}`,
          animation: i === 0 ? 'slideIn 0.5s ease-out' : 'none'
        }}>
          <div style={{ marginTop: '2px' }}>
            {alert.type === 'CRITICAL' ? <ShieldAlert size={18} className="text-alert" /> : 
             alert.type === 'HIGH' ? <AlertTriangle size={18} className="text-warning" /> : 
             <Info size={18} className="text-accent" />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{alert.title}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{alert.technique}</span>
                <button title="Feedback Loop to Stream Processing" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={(e) => { e.currentTarget.style.color = 'var(--accent-neon)'; }}>
                    <RefreshCw size={14} />
                </button>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alert.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Confidence: {(alert.score * 100).toFixed(0)}%</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(alert.created_at).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AlertStream;
