import React, { useEffect } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Copy, Download, Share2, CornerDownRight, Lock, Activity } from 'lucide-react';
import RiskGauge from './RiskGauge';
import confetti from 'canvas-confetti';

export default function AnalysisResult({ result, inputData }) {
  if (!result) return null;

  const isSafe = result.riskScore < 30;

  useEffect(() => {
    if (isSafe) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, [result]);

  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputData.content);
    alert('Copied input to clipboard!');
  };

  const handleExportReport = () => {
    const reportText = `================================================
CYBERSHIELD AI - THREAT SECURITY REPORT
================================================
Timestamp: ${new Date().toLocaleString()}
Scan Type: ${inputData.type.toUpperCase()}
Input Analyzed: ${inputData.content}

THREAT ASSESSMENT RESULTS:
- Risk Score: ${result.riskScore}%
- Threat Level: ${result.riskLevel}
- Category: ${result.category}

PLAIN LANGUAGE EXPLANATION:
${result.explanation}

DETECTED SCAM TACTICS:
${result.tactics.map(t => `- ${t}`).join('\n')}

TECHNICAL DETAILS:
- Domain/Host Inspection: ${result.technicalDetails?.domainAnalysis || 'N/A'}
- Urgency Level: ${result.technicalDetails?.urgencyLevel || 'N/A'}
- SSL Certificate Status: ${result.technicalDetails?.sslTrust || 'N/A'}

RECOMMENDED SAFE ACTION:
${result.safeAction}
================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CyberShield_Threat_Report_${Date.now()}.txt`;
    link.click();
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', marginTop: '28px', border: isSafe ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.4)' }}>
      {/* Result Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isSafe ? (
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <ShieldCheck size={24} />
            </div>
          ) : (
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
              <ShieldAlert size={24} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {result.category}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Scanned via CyberShield AI Multi-Modal Engine
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={handleCopyInput} className="btn-secondary" style={{ fontSize: '12px' }}>
            <Copy size={14} />
            Copy Input
          </button>
          <button onClick={handleExportReport} className="btn-secondary" style={{ fontSize: '12px', color: '#00f2fe', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
            <Download size={14} />
            Download Threat Report
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Score Gauge + Explanation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
        
        {/* Score Gauge Component */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', border: '1px solid var(--border-glass)', padding: '16px' }}>
          <RiskGauge score={result.riskScore} level={result.riskLevel} />
        </div>

        {/* Explainable AI (XAI) Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#00f2fe', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} />
              Explainable AI (XAI) Threat Analysis
            </div>
            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6, background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              {result.explanation}
            </p>
          </div>

          {/* Scam Tactics Badges */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Detected Scam Tactics & Behavioral Signals:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.tactics.map((tactic, idx) => (
                <span key={idx} className="badge badge-danger" style={{ fontSize: '11px', textTransform: 'none' }}>
                  <AlertTriangle size={12} />
                  {tactic}
                </span>
              ))}
            </div>
          </div>

          {/* Action Recommendation Box */}
          <div style={{
            background: isSafe ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: isSafe ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: isSafe ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CornerDownRight size={16} />
              Recommended Safety Action:
            </div>
            <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 500 }}>
              {result.safeAction}
            </div>
          </div>

        </div>

      </div>

      {/* Technical Breakdown Subpanel */}
      {result.technicalDetails && (
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Domain / Host Analysis: </span>
            <span style={{ color: '#f8fafc', fontWeight: 500 }}>{result.technicalDetails.domainAnalysis}</span>
          </div>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Urgency Indicator: </span>
            <span style={{ color: result.technicalDetails.urgencyLevel === 'High' || result.technicalDetails.urgencyLevel === 'Extreme' ? '#ef4444' : '#10b981', fontWeight: 600 }}>{result.technicalDetails.urgencyLevel}</span>
          </div>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>SSL / Encryption Status: </span>
            <span style={{ color: '#f8fafc', fontWeight: 500 }}>{result.technicalDetails.sslTrust}</span>
          </div>
        </div>
      )}
    </div>
  );
}
