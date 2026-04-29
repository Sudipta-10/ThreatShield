import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="topbar">
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search IPs, domains, or TTPs..." 
          style={{
            width: '100%',
            padding: '10px 10px 10px 40px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.2)',
            color: 'var(--text-main)',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} className="text-muted" />
          <span style={{ 
            position: 'absolute', 
            top: '-5px', 
            right: '-5px', 
            background: 'var(--alert-red)', 
            color: 'white', 
            fontSize: '10px', 
            padding: '2px 6px', 
            borderRadius: '10px',
            fontWeight: 'bold'
          }} className="alert-pulse">
            3
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>SOC Admin</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-neon)' }}>Level 3 Analyst</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
