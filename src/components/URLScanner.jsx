import React, { useState } from 'react';
import { Link2, Search, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export default function URLScanner({ onScan, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onScan({ type: 'url', content: url.trim() });
  };

  const samplePhishing = 'http://secure-login-update-paypal.verify-accounts.top/auth';
  const sampleSafe = 'https://github.com/openai/codex';

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Link2 size={20} />
          </div>
          <input
            type="text"
            className="glass-input font-mono"
            style={{ paddingLeft: '48px', fontSize: '14px' }}
            placeholder="Paste suspicious website URL or link (e.g. http://login-verify-account.top)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Quick Demo Fill Buttons for Judges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Test Samples:</span>
            <button
              type="button"
              onClick={() => setUrl(samplePhishing)}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '4px 10px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <AlertTriangle size={12} />
              Sample Phishing Link
            </button>
            <button
              type="button"
              onClick={() => setUrl(sampleSafe)}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '4px 10px', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <CheckCircle size={12} />
              Sample Safe Link
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !url.trim()}>
            {loading ? (
              <>
                <Zap className="pulse-glow" size={18} />
                Analyzing Cyber Threat...
              </>
            ) : (
              <>
                <Search size={18} />
                Scan Link Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
