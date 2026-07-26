import React from 'react';
import { ShieldCheck, Zap, Lock, Eye } from 'lucide-react';

export default function Header() {
  return (
    <div className="glass-panel" style={{ padding: '32px 28px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Subtle Gradient Orb */}
      <div style={{
        position: 'absolute',
        right: '-5%',
        top: '-20%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ maxWidth: '900px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', marginBottom: '16px' }}>
          <Zap size={14} color="#00f2fe" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#00f2fe', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Multi-Modal Scam Prevention & Explainable AI
          </span>
        </div>

        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', lineHeight: 1.25 }}>
          Identify Digital Scams <span className="gradient-text">Before You Become A Victim</span>
        </h2>

        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6, maxWidth: '780px' }}>
          CyberShield AI protects students, senior citizens, and online banking users by scanning links, QR codes, SMS messages, emails, and screenshots. Get instant real-time risk scores and plain-language threat explanations.
        </p>

        {/* Feature Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <ShieldCheck size={20} color="#10b981" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>0–100% Risk Score</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Real-time threat level rating</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <Eye size={20} color="#00f2fe" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>Explainable AI (XAI)</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Plain language security guidance</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <Lock size={20} color="#a855f7" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>Multi-Modal Analysis</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Links, QR, SMS, & Screenshots</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
