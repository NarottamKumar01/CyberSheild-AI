import React from 'react';
import { Shield, LayoutDashboard, Radio, GraduationCap, Settings, Cpu } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSettings, hasApiKey }) {
  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 20px 20px', borderTop: 'none', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Team Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}>
            <Shield size={26} color="#07090e" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>
                CyberShield <span className="gradient-text">AI</span>
              </h1>
              <span className="badge badge-safe" style={{ fontSize: '10px', padding: '2px 8px' }}>
                SS26 AI Hackathon
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              AI-Powered Scam Detection & Prevention Platform • <span style={{ color: '#00f2fe' }}>Team CipherX</span>
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`btn-secondary ${activeTab === 'scanner' ? 'active-tab' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              border: 'none',
              background: activeTab === 'scanner' ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.15) 100%)' : 'transparent',
              color: activeTab === 'scanner' ? '#00f2fe' : 'var(--text-muted)',
              borderBottom: activeTab === 'scanner' ? '2px solid #00f2fe' : 'none'
            }}
          >
            <Shield size={16} />
            Scanner Hub
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`btn-secondary ${activeTab === 'dashboard' ? 'active-tab' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              border: 'none',
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.15) 100%)' : 'transparent',
              color: activeTab === 'dashboard' ? '#00f2fe' : 'var(--text-muted)',
              borderBottom: activeTab === 'dashboard' ? '2px solid #00f2fe' : 'none'
            }}
          >
            <LayoutDashboard size={16} />
            Security Dashboard
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`btn-secondary ${activeTab === 'feed' ? 'active-tab' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              border: 'none',
              background: activeTab === 'feed' ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.15) 100%)' : 'transparent',
              color: activeTab === 'feed' ? '#00f2fe' : 'var(--text-muted)',
              borderBottom: activeTab === 'feed' ? '2px solid #00f2fe' : 'none'
            }}
          >
            <Radio size={16} />
            Threat Intelligence Feed
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`btn-secondary ${activeTab === 'quiz' ? 'active-tab' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              border: 'none',
              background: activeTab === 'quiz' ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.15) 100%)' : 'transparent',
              color: activeTab === 'quiz' ? '#00f2fe' : 'var(--text-muted)',
              borderBottom: activeTab === 'quiz' ? '2px solid #00f2fe' : 'none'
            }}
          >
            <GraduationCap size={16} />
            Scam Quiz
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)' }}>
            <Cpu size={14} color={hasApiKey ? '#10b981' : '#f59e0b'} />
            <span>{hasApiKey ? 'Gemini 1.5 AI Active' : 'Hybrid AI Engine'}</span>
          </div>

          <button onClick={onOpenSettings} className="btn-secondary" title="Settings & API Key">
            <Settings size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}
