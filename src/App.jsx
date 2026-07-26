import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import URLScanner from './components/URLScanner';
import QRScanner from './components/QRScanner';
import TextScanner from './components/TextScanner';
import ImageScanner from './components/ImageScanner';
import AnalysisResult from './components/AnalysisResult';
import SecurityDashboard from './components/SecurityDashboard';
import ThreatFeed from './components/ThreatFeed';
import ScamQuiz from './components/ScamQuiz';
import SettingsModal from './components/SettingsModal';

import { analyzeThreat } from './services/aiEngine';
import { getScanHistory, saveScanToHistory, clearScanHistory, getSettings } from './utils/storage';
import { Link2, QrCode, MessageSquare, Image as ImageIcon, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'dashboard' | 'feed' | 'quiz'
  const [scannerMode, setScannerMode] = useState('url'); // 'url' | 'qr' | 'text' | 'image'
  
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentInput, setCurrentInput] = useState(null);
  
  const [history, setHistory] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({ apiKey: '' });

  useEffect(() => {
    setHistory(getScanHistory());
    setSettings(getSettings());
  }, []);

  const handleUpdateSettings = () => {
    setSettings(getSettings());
  };

  const handleScan = async (inputData) => {
    setLoading(true);
    setAnalysisResult(null);
    setCurrentInput(inputData);

    try {
      const result = await analyzeThreat(inputData, settings.apiKey);
      setAnalysisResult(result);

      // Create history record
      const historyItem = {
        id: 'scan-' + Date.now(),
        timestamp: new Date().toISOString(),
        type: inputData.type,
        input: inputData.content.length > 80 ? inputData.content.substring(0, 80) + '...' : inputData.content,
        ...result
      };

      const updatedHistory = saveScanToHistory(historyItem);
      setHistory(updatedHistory);
    } catch (err) {
      console.error('Scan Error:', err);
      alert('An error occurred during threat analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setAnalysisResult(item);
    setCurrentInput({ type: item.type, content: item.input });
    setActiveTab('scanner');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all scan history logs?')) {
      const cleared = clearScanHistory();
      setHistory(cleared);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasApiKey={!!settings.apiKey}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '24px 16px' }}>
        
        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <div>
            <Header />

            {/* Multi-modal Input Hub */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              
              {/* Scanner Mode Sub-tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
                <button
                  onClick={() => setScannerMode('url')}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    borderColor: scannerMode === 'url' ? '#00f2fe' : 'var(--border-glass)',
                    color: scannerMode === 'url' ? '#00f2fe' : 'var(--text-muted)',
                    background: scannerMode === 'url' ? 'rgba(0, 242, 254, 0.1)' : 'transparent'
                  }}
                >
                  <Link2 size={16} />
                  Phishing Link Scanner
                </button>

                <button
                  onClick={() => setScannerMode('qr')}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    borderColor: scannerMode === 'qr' ? '#00f2fe' : 'var(--border-glass)',
                    color: scannerMode === 'qr' ? '#00f2fe' : 'var(--text-muted)',
                    background: scannerMode === 'qr' ? 'rgba(0, 242, 254, 0.1)' : 'transparent'
                  }}
                >
                  <QrCode size={16} />
                  QR Code Security
                </button>

                <button
                  onClick={() => setScannerMode('text')}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    borderColor: scannerMode === 'text' ? '#00f2fe' : 'var(--border-glass)',
                    color: scannerMode === 'text' ? '#00f2fe' : 'var(--text-muted)',
                    background: scannerMode === 'text' ? 'rgba(0, 242, 254, 0.1)' : 'transparent'
                  }}
                >
                  <MessageSquare size={16} />
                  SMS & Email Inspector
                </button>

                <button
                  onClick={() => setScannerMode('image')}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    borderColor: scannerMode === 'image' ? '#00f2fe' : 'var(--border-glass)',
                    color: scannerMode === 'image' ? '#00f2fe' : 'var(--text-muted)',
                    background: scannerMode === 'image' ? 'rgba(0, 242, 254, 0.1)' : 'transparent'
                  }}
                >
                  <ImageIcon size={16} />
                  Screenshot Vision AI
                </button>
              </div>

              {/* Active Scanner Sub-component */}
              {scannerMode === 'url' && <URLScanner onScan={handleScan} loading={loading} />}
              {scannerMode === 'qr' && <QRScanner onScan={handleScan} loading={loading} />}
              {scannerMode === 'text' && <TextScanner onScan={handleScan} loading={loading} />}
              {scannerMode === 'image' && <ImageScanner onScan={handleScan} loading={loading} />}

            </div>

            {/* Analysis Result Output */}
            {analysisResult && (
              <AnalysisResult result={analysisResult} inputData={currentInput} />
            )}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <SecurityDashboard
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* Threat Feed Tab */}
        {activeTab === 'feed' && <ThreatFeed />}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && <ScamQuiz />}

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontWeight: 700, color: '#fff' }}>CyberShield AI</span> • Built for Summer School '26 AI First Hackathon (I3C - IIT Jammu)
          </div>
          <div>
            Team <span style={{ color: '#00f2fe', fontWeight: 600 }}>CipherX</span> (Lovely Professional University) • Narottam Kumar, Simar Bhatti, Maroof Ahmad Malik
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsUpdated={handleUpdateSettings}
      />
    </div>
  );
}
