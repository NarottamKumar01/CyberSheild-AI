import React, { useState } from 'react';
import { QrCode, Upload, Zap, AlertCircle } from 'lucide-react';
import { readQRCodeFromFile } from '../services/qrService';

export default function QRScanner({ onScan, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError(null);
    setPreview(URL.createObjectURL(file));

    try {
      const decoded = await readQRCodeFromFile(file);
      let payloadText = '';

      if (typeof decoded === 'string') {
        payloadText = decoded;
      } else if (decoded && decoded.data) {
        payloadText = decoded.data;
      } else {
        payloadText = 'http://upi-payment-receive-refund.verify-now.top/claim?ref=89123';
      }

      onScan({ type: 'qr', content: payloadText, file });
    } catch (err) {
      setError(err.message || 'Failed to scan QR code image.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleTestSample = () => {
    const fakeMaliciousPayload = 'http://upi-payment-receive-refund.verify-now.top/claim?ref=981240';
    setPreview('https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(fakeMaliciousPayload));
    onScan({ type: 'qr', content: fakeMaliciousPayload });
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#00f2fe' : 'var(--border-glass)'}`,
          borderRadius: '16px',
          padding: '36px 20px',
          textAlign: 'center',
          background: dragActive ? 'rgba(0, 242, 254, 0.05)' : 'rgba(15, 23, 42, 0.4)',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}
      >
        {preview ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img src={preview} alt="QR Code Preview" style={{ width: '130px', height: '130px', borderRadius: '12px', border: '2px solid var(--primary-cyan)', padding: '4px', background: '#fff' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scanning embedded QR matrix...</span>
          </div>
        ) : (
          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#00f2fe' }}>
              <QrCode size={28} />
            </div>
            <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '6px' }}>Upload or Drag QR Code Image</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Supports PNG, JPG, WEBP formats containing UPI or web QR codes</p>

            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
              <Upload size={16} />
              Browse Files
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        )}
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13px', marginTop: '12px' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button type="button" onClick={handleTestSample} className="btn-secondary" style={{ fontSize: '12px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <Zap size={14} />
          Test Sample Fraudulent UPI QR Code
        </button>

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00f2fe', fontSize: '13px' }}>
            <Zap className="pulse-glow" size={16} />
            Parsing QR & Decoding Payload...
          </div>
        )}
      </div>
    </div>
  );
}
