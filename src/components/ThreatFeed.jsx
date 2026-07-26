import React from 'react';
import { Radio, AlertOctagon, ShieldCheck, ExternalLink, Flame } from 'lucide-react';
import { TRENDING_SCAMS } from '../services/mockThreats';

export default function ThreatFeed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #00f2fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div className="pulse-glow" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00f2fe' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Live Cyber Threat Intelligence Feed (2026)
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          Real-time updates on emerging digital scams targeting online banking, WhatsApp, Telegram, and UPI users in India and globally.
        </p>
      </div>

      {/* Grid of Scam Vectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {TRENDING_SCAMS.map((scam) => (
          <div key={scam.id} className="glass-panel glass-panel-hover" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-critical" style={{ fontSize: '10px' }}>
                  <AlertOctagon size={12} />
                  {scam.severity} Threat
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                  {scam.date}
                </span>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>
                {scam.title}
              </h4>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                {scam.summary}
              </p>
            </div>

            <div style={{ background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.15)', borderRadius: '12px', padding: '12px 14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#00f2fe', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} />
                CyberShield Prevention Tip:
              </div>
              <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4 }}>
                {scam.prevention}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
