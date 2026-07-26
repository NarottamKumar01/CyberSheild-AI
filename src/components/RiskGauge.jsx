import React from 'react';

export default function RiskGauge({ score = 0, level = 'Safe' }) {
  // Determine color based on score/level
  let color = '#10b981'; // Green
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  let badgeClass = 'badge-safe';

  if (score >= 75) {
    color = '#ef4444'; // Red
    glowColor = 'rgba(239, 68, 68, 0.4)';
    badgeClass = 'badge-critical';
  } else if (score >= 50) {
    color = '#f97316'; // Orange
    glowColor = 'rgba(249, 115, 22, 0.4)';
    badgeClass = 'badge-danger';
  } else if (score >= 25) {
    color = '#f59e0b'; // Amber/Yellow
    glowColor = 'rgba(245, 158, 11, 0.4)';
    badgeClass = 'badge-caution';
  }

  // SVG Gauge calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background Track Circle */}
        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated Value Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease',
              filter: `drop-shadow(0 0 10px ${glowColor})`
            }}
          />
        </svg>

        {/* Center Score Text */}
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>
            {score}<span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>%</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Threat Index
          </div>
        </div>
      </div>

      {/* Risk Badge Pill */}
      <div className={`badge ${badgeClass}`} style={{ marginTop: '12px', fontSize: '13px', padding: '6px 16px' }}>
        <span>Risk Level: {level.toUpperCase()}</span>
      </div>
    </div>
  );
}
