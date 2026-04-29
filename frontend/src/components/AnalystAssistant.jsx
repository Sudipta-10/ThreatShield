import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const AnalystAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'I am your CyberGuard AI Assistant. I am monitoring the Kafka data stream and ML models in real-time. How can I help you investigate today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8001/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to the AI backend.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Network error communicating with AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', paddingRight: '5px' }}>
        
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '85%' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: msg.role === 'user' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(186, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-accent" />}
            </div>
            <div style={{ 
              background: msg.role === 'user' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)', 
              padding: '10px 14px', 
              borderRadius: msg.role === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px', 
              fontSize: '0.85rem', 
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(186, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={16} className="text-accent" />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '0 12px 12px 12px', fontSize: '0.85rem' }}>
              <span className="alert-pulse">Analyzing...</span>
            </div>
          </div>
        )}

      </div>

      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Assistant to analyze logs or generate playbooks..." 
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.3)',
            color: 'var(--text-main)',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: '0.85rem'
          }}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          style={{ 
            position: 'absolute', 
            right: '8px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            background: 'none', 
            border: 'none', 
            color: 'var(--accent-blue)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            opacity: isLoading ? 0.5 : 1
          }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AnalystAssistant;
