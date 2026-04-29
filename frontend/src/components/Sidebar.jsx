import React from 'react';
import { Activity, Server, Users, Settings, Database, MessageSquare } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <img src="/logo.png" alt="ThreatShield Logo" style={{ width: '100%', maxWidth: '280px', objectFit: 'contain', borderRadius: '12px' }} />
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <NavItem icon={<Activity />} label="Live Dashboard" active={activeTab === 'Live Dashboard'} onClick={() => setActiveTab('Live Dashboard')} />
        <NavItem icon={<Server />} label="Network Topology" active={activeTab === 'Network Topology'} onClick={() => setActiveTab('Network Topology')} />
        <NavItem icon={<Database />} label="Log Ingestion" active={activeTab === 'Log Ingestion'} onClick={() => setActiveTab('Log Ingestion')} />
        <NavItem icon={<Users />} label="IAM & Access" active={activeTab === 'IAM & Access'} onClick={() => setActiveTab('IAM & Access')} />
        <NavItem icon={<MessageSquare />} label="AI Assistant" active={activeTab === 'AI Assistant'} onClick={() => setActiveTab('AI Assistant')} />
        <NavItem icon={<Settings />} label="System Settings" active={activeTab === 'System Settings'} onClick={() => setActiveTab('System Settings')} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        background: active ? 'hsla(217, 91%, 60%, 0.15)' : 'transparent',
        borderLeft: active ? '4px solid var(--accent-blue)' : '4px solid transparent',
        color: active ? 'var(--text-main)' : 'var(--text-muted)',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if(!active) {
            e.currentTarget.style.color = 'var(--text-main)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if(!active) {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {icon}
      <span style={{ fontWeight: 500 }}>{label}</span>
    </div>
  );
};

export default Sidebar;
