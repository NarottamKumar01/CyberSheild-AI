import React, { useState } from 'react';
import { X, Key, Save, CheckCircle, Cpu } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/storage';

export default function SettingsModal({ isOpen, onClose, onSettingsUpdated }) {
  if (!isOpen) return null;

  const currentSettings = getSettings();
  const [apiKey, setApiKey] = useState(currentSettings.apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings({ ...currentSettings, apiKey: apiKey.trim() });
    setSavedSuccess(true);
    onSettingsUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 9, 14, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '28px', border: '1px solid var(--primary-cyan)' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={20} color="#00f2fe" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              AI Engine & API Settings
            </h3>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Google Gemini API Key (Optional)
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="glass-input font-mono"
                style={{ paddingLeft: '38px', fontSize: '13px' }}
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '6px', lineHeight: 1.4 }}>
              If left blank, CyberShield AI automatically uses its built-in offline Threat Intelligence Heuristic Matrix for instant live hackathon demos.
            </p>
          </div>

          {savedSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '13px' }}>
              <CheckCircle size={16} />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              Save Configuration
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
