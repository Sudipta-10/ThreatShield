import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';

const Topbar = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifs(!showNotifs)}>
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

          {showNotifs && (
            <div style={{ position: 'absolute', top: '35px', right: '-10px', width: '280px', background: 'var(--bg-card)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '15px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Recent Critical Alerts</h4>
              <div style={{ fontSize: '0.8rem', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Lateral Movement Detected <span style={{float: 'right', color: 'var(--text-muted)'}}>2m ago</span></div>
              <div style={{ fontSize: '0.8rem', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Multiple Failed Logins <span style={{float: 'right', color: 'var(--text-muted)'}}>15m ago</span></div>
              <div style={{ fontSize: '0.8rem', padding: '10px 0' }}>Unusual Data Exfiltration <span style={{float: 'right', color: 'var(--text-muted)'}}>1h ago</span></div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', position: 'relative' }} onClick={() => setShowProfile(!showProfile)}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>SOC Admin</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-neon)' }}>Level 3 Analyst</span>
          </div>

          {showProfile && (
             <div style={{ position: 'absolute', top: '45px', right: '0', width: '200px', background: 'var(--bg-card)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
               <div style={{ fontSize: '0.85rem', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '4px' }} className="profile-item"><Settings size={16}/> Preferences</div>
               <div style={{ fontSize: '0.85rem', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--alert-red)', borderRadius: '4px' }} className="profile-item"><LogOut size={16}/> Sign Out</div>
             </div>
          )}
        </div>
      </div>
      <style>{`
        .profile-item:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default Topbar;
