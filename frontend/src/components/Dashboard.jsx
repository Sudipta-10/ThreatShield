import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ThreatMap from './ThreatMap';
import AlertStream from './AlertStream';
import ShapChart from './ShapChart';
import AnalystAssistant from './AnalystAssistant';

const Dashboard = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Topbar />
      
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Advanced CyberGuard AI Architecture</h1>
            <p className="text-muted" style={{ margin: 0 }}>
              Ingesting: <span style={{ color: 'var(--accent-blue)' }}>Syslog, NetFlow, PCAP, Filebeat, Fluentd, Cloud Logs, Threat Intel API</span>
            </p>
          </div>
          <button style={{ 
            background: 'var(--alert-red)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 20, 60, 0.4)'
          }}>
            Trigger Auto Response (Ensemble ML)
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="glass-panel" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3>Graph Neural Net</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>Lateral Movement Detection</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', textAlign: 'right' }}>Process: Feature Eng + SMOTE<br/>Detect: GNN</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <ThreatMap />
            </div>
          </div>
          
          <div className="glass-panel" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3>Stream Processing & MITRE ATT&CK</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>Apache Flink + Redis Cache</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--warning-orange)', textAlign: 'right' }}>Process: Real-time Enrichment<br/>Detect: MITRE Mapping</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <AlertStream />
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1.5fr 1fr' }}>
           <div className="glass-panel" style={{ minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
            <h3>XAI / SHAP</h3>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>Explainable Feature Importance</p>
            <div style={{ flex: 1, minHeight: '200px' }}>
              <ShapChart />
            </div>
          </div>
          <div className="glass-panel" style={{ minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
            <h3>LLM Analyst</h3>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>Incident Summarization</p>
            <div style={{ flex: 1 }}>
              <AnalystAssistant />
            </div>
          </div>
          <div className="glass-panel" style={{ minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
            <h3>Ticketing & Routing</h3>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>Jira / ServiceNow Integration</p>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', borderLeft: '4px solid var(--alert-red)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket: INC-9923 (Jira)</div>
                <div style={{ fontWeight: 'bold' }}>Isolate Host 10.0.4.12</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--warning-orange)', marginTop: '4px' }}>Status: Auto-Severity Routing</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket: INC-9924 (ServiceNow)</div>
                <div style={{ fontWeight: 'bold' }}>Block IP 45.33.22.11</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-neon)', marginTop: '4px' }}>Status: Executed</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
