import React, { useEffect, useState } from 'react';

const ThreatMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const assetNames = ["WEB-01", "WEB-02", "DB-MASTER", "DB-REPLICA", "API-GW", "USER-PC-44", "USER-PC-12", "JUMP-HOST", "DC-01", "BACKUP-SVR", "PROXY-01", "MAIL-01", "VPN-GW", "SOC-ANALYST", "DMZ-ROUTER"];
    
    // Generate seeded layout for consistent professional look
    const n = [];
    for(let i=0; i<15; i++) {
      n.push({
        id: i,
        label: assetNames[i],
        x: 10 + (i * 27) % 80, // Spread out x
        y: 10 + (i * 13) % 80, // Spread out y
        isCompromised: i === 3 || i === 7 || i === 5,
        isTarget: i === 8 || i === 2
      });
    }
    
    // Generate sensible edges forming a network topology
    const e = [];
    const connections = [
      [14, 0], [14, 1], [0, 4], [1, 4], [4, 7], [7, 2], [7, 3], [12, 5], [12, 6], [5, 8], [6, 8], [2, 9], [13, 7], [14, 10], [10, 11]
    ];
    
    connections.forEach(([source, target]) => {
      // Define specific attack paths (Lateral Movement)
      const isAttackPath = (source === 5 && target === 8) || (source === 7 && target === 2);
      e.push({ source, target, isAttackPath });
    });
    
    setNodes(n);
    setEdges(e);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', background: 'radial-gradient(circle at center, rgba(30, 45, 90, 0.4) 0%, rgba(10, 15, 25, 0.9) 100%)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }}>
      {/* Legend */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: 'white' }}>GNN Topology Legend</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 5px var(--accent-blue)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Healthy Asset</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--alert-red)', boxShadow: '0 0 8px var(--alert-red)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Compromised Node</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--warning-orange)', boxShadow: '0 0 8px var(--warning-orange)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High-Value Target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--alert-red)', borderBottom: '1px dashed white' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lateral Movement Path</span>
        </div>
      </div>

      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Draw edges */}
        {edges.map((edge, i) => {
          const s = nodes[edge.source];
          const t = nodes[edge.target];
          if(!s || !t) return null;
          return (
            <line 
              key={`e-${i}`}
              x1={`${s.x}%`} y1={`${s.y}%`} 
              x2={`${t.x}%`} y2={`${t.y}%`}
              stroke={edge.isAttackPath ? 'var(--alert-red)' : 'rgba(0, 255, 255, 0.15)'}
              strokeWidth={edge.isAttackPath ? 2.5 : 1}
              strokeDasharray={edge.isAttackPath ? "8,6" : "none"}
              className={edge.isAttackPath ? "attack-line" : "normal-line"}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map(node => (
          <g key={`n-${node.id}`} style={{ cursor: 'pointer', transition: 'all 0.3s' }} className="node-group">
            {/* Glow effect behind node */}
            <circle 
              cx={`${node.x}%`} cy={`${node.y}%`}
              r={node.isTarget ? 20 : node.isCompromised ? 16 : 12}
              fill="none"
              stroke={node.isTarget ? 'var(--warning-orange)' : node.isCompromised ? 'var(--alert-red)' : 'var(--accent-blue)'}
              strokeWidth="2"
              opacity="0.4"
              className={node.isCompromised || node.isTarget ? "pulse-ring" : ""}
            />
            {/* Core node */}
            <circle 
              cx={`${node.x}%`} cy={`${node.y}%`}
              r={node.isTarget ? 10 : 6} 
              fill={node.isTarget ? 'var(--warning-orange)' : node.isCompromised ? 'var(--alert-red)' : 'var(--accent-blue)'}
              style={{ filter: `drop-shadow(0 0 5px ${node.isTarget ? 'var(--warning-orange)' : node.isCompromised ? 'var(--alert-red)' : 'var(--accent-blue)'})` }}
            />
            {/* Asset Label */}
            <text 
              x={`${node.x}%`} y={`calc(${node.y}% + 20px)`} 
              textAnchor="middle" 
              fill="white" 
              fontSize="10px" 
              fontWeight="600"
              letterSpacing="0.5px"
              style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <style>{`
        .attack-line {
          animation: dash 3s linear infinite;
        }
        @keyframes dash {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .pulse-ring {
          animation: ringPulse 2s infinite;
          transform-origin: center;
        }
        @keyframes ringPulse {
          0% { r: 10px; opacity: 0.8; stroke-width: 2px; }
          100% { r: 35px; opacity: 0; stroke-width: 0px; }
        }
        .node-group:hover circle:nth-child(2) {
          transform: scale(1.3);
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default ThreatMap;
