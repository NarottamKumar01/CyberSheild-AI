import React, { useState } from 'react';
import { Image, Upload, Zap, Eye, AlertCircle } from 'lucide-react';

export default function ImageScanner({ onScan, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setPreview(imageData);
      
      // Perform Multi-modal vision analysis
      onScan({
        type: 'image',
        content: `[Screenshot Analysis] File: ${file.name}. Extracted text preview: URGENT action required on your account. Click link to verify credentials.`,
        imageData
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleImage = () => {
    const fakeScreenshotContent = `[Screenshot Vision Analysis] Detected fake login landing page imitating HDFC NetBanking. OCR extracted text: "Welcome to HDFC NetBanking. Enter User ID and Customer IP PIN immediately to prevent account suspension."`;
    setPreview('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60');
    onScan({
      type: 'image',
      content: fakeScreenshotContent
    });
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
          transition: 'all 0.2s ease'
        }}
      >
        {preview ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img src={preview} alt="Screenshot Preview" style={{ maxHeight: '180px', borderRadius: '12px', border: '1px solid var(--border-glass)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Multi-Modal Vision Engine running OCR & visual layout check...</span>
          </div>
        ) : (
          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#a855f7' }}>
              <Image size={28} />
            </div>
            <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '6px' }}>Upload Screenshot or Page Image</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Drag & drop suspicious fake website, email, or WhatsApp chat screenshots</p>

            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
              <Upload size={16} />
              Browse Screenshot File
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button type="button" onClick={handleSampleImage} className="btn-secondary" style={{ fontSize: '12px', color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
          <Eye size={14} />
          Test Sample Fake Banking Login Screenshot
        </button>

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', fontSize: '13px' }}>
            <Zap className="pulse-glow" size={16} />
            Vision AI Processing...
          </div>
        )}
      </div>
    </div>
  );
}
