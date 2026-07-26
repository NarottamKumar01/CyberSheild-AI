const STORAGE_KEY_HISTORY = 'cybershield_scan_history';
const STORAGE_KEY_SETTINGS = 'cybershield_settings';

export const getScanHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_HISTORY);
    return data ? JSON.parse(data) : getInitialHistory();
  } catch (e) {
    console.error('Failed to load scan history:', e);
    return getInitialHistory();
  }
};

export const saveScanToHistory = (scanItem) => {
  try {
    const history = getScanHistory();
    const updated = [scanItem, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save scan:', e);
    return [];
  }
};

export const clearScanHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    return [];
  } catch (e) {
    console.error('Failed to clear history:', e);
    return [];
  }
};

export const getSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
    return data ? JSON.parse(data) : { apiKey: '', autoScan: true, strictness: 'high' };
  } catch (e) {
    return { apiKey: '', autoScan: true, strictness: 'high' };
  }
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

function getInitialHistory() {
  return [
    {
      id: 'scan-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: 'url',
      input: 'https://secure-login-update-paypal.verify-accounts.top/auth',
      riskScore: 92,
      riskLevel: 'Critical',
      category: 'Credential Harvesting Phishing',
      explanation: 'The domain "verify-accounts.top" is using typosquatting to impersonate PayPal. It lacks valid organization SSL details and uses high-risk suspicious TLD (.top).',
      tactics: ['Urgency Manipulation', 'Domain Spoofing', 'Credential Harvesting'],
      safeAction: 'Block immediately. Do NOT enter any login details or passwords.'
    },
    {
      id: 'scan-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      type: 'sms',
      input: 'URGENT: Your HDFC Bank account #9812 will be blocked today due to pending KYC update. Click here to verify now: http://bit.ly/hdfc-kyc-fix',
      riskScore: 88,
      riskLevel: 'High',
      category: 'Banking Smishing (SMS Fraud)',
      explanation: 'Uses artificial urgency ("blocked today"), suspicious URL shortener (bit.ly), and impersonates a recognized bank to trick you into downloading malware or giving banking credentials.',
      tactics: ['Artificial Urgency', 'URL Masking', 'Financial Extortion'],
      safeAction: 'Do not click the link. Report SMS to 1930 Cyber Helpline.'
    },
    {
      id: 'scan-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      type: 'url',
      input: 'https://github.com/openai/codex',
      riskScore: 5,
      riskLevel: 'Safe',
      category: 'Legitimate Repository',
      explanation: 'Verified official domain belonging to GitHub Inc. Valid SSL certificate and transparent domain registration.',
      tactics: ['None Identified'],
      safeAction: 'Safe to proceed.'
    }
  ];
}
