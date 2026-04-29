import React, { useEffect, useState } from 'react';

// A simple custom SVG to simulate a GNN network topology graph
const ThreatMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Generate some mock nodes
    const n = [];
    for(let i=0; i<15; i++) {
      n.push({
        id: i,
        x: Math.random() * 80 + 10, // percentage
        y: Math.random() * 80 + 10, // percentage
        isCompromised: i === 3 || i === 7,
        isTarget: i === 12
      });
    }
    
    // Generate some edges
    const e = [];
    for(let i=0; i<20; i++) {
      const source = Math.floor(Math.random() * 15);
      const target = Math.floor(Math.random() * 15);
      if (source !== target) {
        e.push({ source, target, isAttackPath: (source === 3 && target === 7) || (source === 7 && target === 12) });
      }
    }
    
    setNodes(n);
    setEdges(e);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '250px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
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
              stroke={edge.isAttackPath ? 'var(--alert-red)' : 'var(--border-color)'}
              strokeWidth={edge.isAttackPath ? 2 : 1}
              strokeDasharray={edge.isAttackPath ? "5,5" : "none"}
              className={edge.isAttackPath ? "attack-line" : ""}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map(node => (
          <g key={`n-${node.id}`} transform={`translate(${node.x}%, ${node.y}%)`} style={{ transformOrigin: 'center' }}>
            <circle 
              r={node.isTarget ? 12 : 8} 
              fill={node.isTarget ? 'var(--warning-orange)' : node.isCompromised ? 'var(--alert-red)' : 'var(--accent-blue)'}
              className={node.isCompromised || node.isTarget ? "pulse-node" : ""}
              style={{ cursor: 'pointer', transition: 'all 0.3s' }}
            />
          </g>
        ))}
      </svg>
      <style>{`
        .attack-line {
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        .pulse-node {
          animation: nodePulse 2s infinite;
        }
        @keyframes nodePulse {
          0% { filter: drop-shadow(0 0 2px currentColor); }
          50% { filter: drop-shadow(0 0 10px currentColor); }
          100% { filter: drop-shadow(0 0 2px currentColor); }
        }
      `}</style>
    </div>
  );
};

export default ThreatMap;
