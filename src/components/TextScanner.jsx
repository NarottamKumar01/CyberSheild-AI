import React, { useState } from 'react';
import { MessageSquare, Zap, Search, AlertTriangle, Briefcase, Gift } from 'lucide-react';

export default function TextScanner({ onScan, loading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onScan({ type: 'text', content: text.trim() });
  };

  const sampleBankSmishing = 'URGENT: Dear Customer, your HDFC netbanking access is blocked due to missing PAN verification. Click to update now: http://bit.ly/hdfc-pan-update-2026';
  const sampleJobScam = 'Congratulations! You have been selected for remote data entry job. Earn ₹5,000/day by typing simple captchas. Join Telegram @DataEntryJobs_Official and pay ₹499 registration fee to start.';
  const sampleLotteryScam = 'Dear winner! You won ₹25,00,000 in KBC Lucky Draw 2026. Send your bank account details and Aadhaar card photo to WhatsApp +91-9876543210 immediately to claim prize.';

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative' }}>
          <textarea
            className="glass-input font-mono"
            rows={5}
            style={{ width: '100%', resize: 'vertical', fontSize: '13px', lineHeight: 1.6 }}
            placeholder="Paste suspicious SMS, WhatsApp message, or Email text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Quick Demo Fill Samples */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quick Templates:</span>
            <button
              type="button"
              onClick={() => setText(sampleBankSmishing)}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '4px 10px', color: '#f87171' }}
            >
              <AlertTriangle size={12} />
              Bank Smishing SMS
            </button>
            <button
              type="button"
              onClick={() => setText(sampleJobScam)}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '4px 10px', color: '#fb923c' }}
            >
              <Briefcase size={12} />
              Fake Job Offer
            </button>
            <button
              type="button"
              onClick={() => setText(sampleLotteryScam)}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '4px 10px', color: '#a855f7' }}
            >
              <Gift size={12} />
              Lottery Scam
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !text.trim()}>
            {loading ? (
              <>
                <Zap className="pulse-glow" size={18} />
                Analyzing Message...
              </>
            ) : (
              <>
                <Search size={18} />
                Inspect Message Text
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
