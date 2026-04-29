import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ThreatMap from './ThreatMap';
import AlertStream from './AlertStream';
import ShapChart from './ShapChart';
import AnalystAssistant from './AnalystAssistant';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Live Dashboard');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);

  const handleTriggerResponse = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecuted(true);
      setTimeout(() => setExecuted(false), 3000);
    }, 2000);
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Topbar />
      
      <main className="main-content">
        {activeTab === 'Live Dashboard' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1>Advanced CyberGuard AI Architecture</h1>
                <p className="text-muted" style={{ margin: 0 }}>
                  Ingesting: <span style={{ color: 'var(--accent-blue)' }}>Syslog, NetFlow, PCAP, Filebeat, Fluentd, Cloud Logs, Threat Intel API</span>
                </p>
              </div>
              <button 
                onClick={handleTriggerResponse}
                disabled={isExecuting || executed}
                style={{ 
                  background: executed ? 'var(--accent-neon)' : isExecuting ? 'var(--warning-orange)' : 'var(--alert-red)', 
                  color: executed ? '#000' : 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: (isExecuting || executed) ? 'not-allowed' : 'pointer',
                  boxShadow: executed ? '0 4px 15px rgba(0, 255, 255, 0.4)' : isExecuting ? '0 4px 15px rgba(255, 165, 0, 0.4)' : '0 4px 15px rgba(220, 20, 60, 0.4)',
                  transition: 'all 0.3s'
                }}
              >
                {executed ? 'Response Activated ✓' : isExecuting ? 'Executing SOAR Playbook...' : 'Trigger Auto Response (Ensemble ML)'}
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--warning-orange)', marginTop: '4px' }}>Status: {executed ? 'Auto-Isolated (Playbook)' : 'Auto-Severity Routing'}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket: INC-9924 (ServiceNow)</div>
                    <div style={{ fontWeight: 'bold' }}>Block IP 45.33.22.11</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-neon)', marginTop: '4px' }}>Status: Executed</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'Network Topology' ? (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2>Network Topology</h2>
            <p className="text-muted">Full-screen Graph Neural Net visualization for lateral movement detection.</p>
            <div style={{ flex: 1, position: 'relative', marginTop: '20px' }}>
              <ThreatMap />
            </div>
          </div>
        ) : activeTab === 'Log Ingestion' ? (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '600px' }}>
            <h2>Log Ingestion Stream</h2>
            <p className="text-muted">Full-screen real-time Kafka & Apache Flink processed alerts.</p>
            <div style={{ flex: 1, marginTop: '20px', overflow: 'hidden' }}>
              <AlertStream />
            </div>
          </div>
        ) : activeTab === 'AI Assistant' ? (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <h2>AI Analyst Assistant</h2>
            <p className="text-muted">Dedicated conversational interface for playbook generation and log analysis.</p>
            <div style={{ flex: 1, marginTop: '20px' }}>
              <AnalystAssistant />
            </div>
          </div>
        ) : activeTab === 'IAM & Access' ? (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2>IAM & Access Control</h2>
            <p className="text-muted">Manage SOC analysts, roles, and permissions.</p>
            <div style={{ flex: 1, marginTop: '20px' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Role</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Last Login</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-neon)'}}></div> SOC Admin</td>
                    <td style={{ padding: '12px' }}>Level 3 Analyst</td>
                    <td style={{ padding: '12px' }}><span style={{ background: 'rgba(0, 255, 255, 0.1)', color: 'var(--accent-neon)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>Active</span></td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>Now</td>
                    <td style={{ padding: '12px' }}><button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)'}}></div> Sarah Jenkins</td>
                    <td style={{ padding: '12px' }}>Level 1 Triage</td>
                    <td style={{ padding: '12px' }}><span style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>Offline</span></td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>2 hours ago</td>
                    <td style={{ padding: '12px' }}><button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--warning-orange)'}}></div> API Service Account</td>
                    <td style={{ padding: '12px' }}>Automation</td>
                    <td style={{ padding: '12px' }}><span style={{ background: 'rgba(255, 165, 0, 0.1)', color: 'var(--warning-orange)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>Active</span></td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>1 min ago</td>
                    <td style={{ padding: '12px' }}><button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button></td>
                  </tr>
                </tbody>
              </table>
              <button style={{ marginTop: '20px', background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>+ Add User</button>
            </div>
          </div>
        ) : activeTab === 'System Settings' ? (
           <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <h2>System Settings</h2>
            <p className="text-muted">Configure platform integrations and automation rules.</p>
            <div style={{ flex: 1, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: 0 }}>Automated SOAR Routing</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically execute playbooks for CRITICAL alerts.</span>
                </div>
                <div style={{ width: '40px', height: '20px', background: 'var(--accent-neon)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: 0 }}>Jira Integration</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Auto-create tickets for HIGH severity alerts.</span>
                </div>
                <div style={{ width: '40px', height: '20px', background: 'var(--accent-neon)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: 0 }}>Data Retention</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cold storage archival policy for PostgreSQL.</span>
                </div>
                <select style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                </select>
              </div>
              <button style={{ marginTop: '20px', background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Changes</button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Dashboard;
