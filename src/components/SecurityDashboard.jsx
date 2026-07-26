import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Activity, Trash2, Search, Filter, Calendar } from 'lucide-react';
import { clearScanHistory } from '../utils/storage';

export default function SecurityDashboard({ history = [], onSelectHistoryItem, onClearHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const totalScans = history.length;
  const criticalThreats = history.filter(h => h.riskScore >= 75).length;
  const highThreats = history.filter(h => h.riskScore >= 45 && h.riskScore < 75).length;
  const safeItems = history.filter(h => h.riskScore < 45).length;

  const avgRiskScore = totalScans > 0 
    ? Math.round(history.reduce((acc, item) => acc + (item.riskScore || 0), 0) / totalScans) 
    : 0;

  const filteredHistory = history.filter(item => {
    const matchesSearch = (item.input || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Stats Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Total Scans</span>
            <Activity size={18} color="#00f2fe" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>{totalScans}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>Multi-modal inputs evaluated</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Scams Blocked</span>
            <ShieldAlert size={18} color="#ef4444" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ef4444' }}>{criticalThreats + highThreats}</div>
          <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{criticalThreats} Critical • {highThreats} High Risk</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Safe Interactions</span>
            <ShieldCheck size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981' }}>{safeItems}</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Clean URLs & verified content</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Threat Score</span>
            <span className="badge badge-caution" style={{ fontSize: '10px' }}>Index</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: avgRiskScore > 50 ? '#f97316' : '#34d399' }}>{avgRiskScore}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>Average across scan history</div>
        </div>

      </div>

      {/* History Log Panel */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              Scan History & Threat Log
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Persistent record of all scanned links, QR codes, SMS text, and screenshots
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="glass-input"
                style={{ paddingLeft: '34px', padding: '6px 12px 6px 34px', fontSize: '12px' }}
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <select
              className="glass-input"
              style={{ width: '110px', padding: '6px 10px', fontSize: '12px' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="url">URL</option>
              <option value="qr">QR Code</option>
              <option value="text">SMS/Text</option>
              <option value="image">Image</option>
            </select>

            <button onClick={onClearHistory} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#f87171' }} title="Clear Log History">
              <Trash2 size={14} />
              Clear
            </button>
          </div>
        </div>

        {/* History Table */}
        {filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No scan history records found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px 14px' }}>Time</th>
                  <th style={{ padding: '12px 14px' }}>Type</th>
                  <th style={{ padding: '12px 14px' }}>Target / Snippet</th>
                  <th style={{ padding: '12px 14px' }}>Risk Score</th>
                  <th style={{ padding: '12px 14px' }}>Category</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => {
                  let badge = 'badge-safe';
                  if (item.riskScore >= 75) badge = 'badge-critical';
                  else if (item.riskScore >= 45) badge = 'badge-danger';
                  else if (item.riskScore >= 25) badge = 'badge-caution';

                  return (
                    <tr key={item.id || index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.2s ease' }}>
                      <td style={{ padding: '14px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '12px' }}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', textTransform: 'uppercase' }}>
                          {item.type}
                        </span>
                      </td>
                      <td className="font-mono" style={{ padding: '14px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#e2e8f0' }}>
                        {item.input}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span className={`badge ${badge}`} style={{ fontSize: '11px' }}>
                          {item.riskScore}% {item.riskLevel}
                        </span>
                      </td>
                      <td style={{ padding: '14px', color: 'var(--text-muted)', fontSize: '12px' }}>
                        {item.category}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          onClick={() => onSelectHistoryItem(item)}
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          View Breakdown
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
