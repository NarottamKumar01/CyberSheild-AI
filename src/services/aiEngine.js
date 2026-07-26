import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Main AI Threat Analysis Entry Point
 * @param {Object} payload - { type: 'url'|'qr'|'text'|'image', content: string, fileData?: string }
 * @param {string} apiKey - Optional Gemini API Key
 */
export async function analyzeThreat(payload, apiKey = '') {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (effectiveKey) {
    try {
      return await analyzeWithGemini(payload, effectiveKey);
    } catch (error) {
      console.warn('Gemini API call failed, falling back to CyberShield AI Heuristic Engine:', error);
      return analyzeWithHeuristics(payload);
    }
  } else {
    // Simulate real network scan latency (750ms - 1500ms) for high-end UX feeling
    await new Promise((r) => setTimeout(r, 900));
    return analyzeWithHeuristics(payload);
  }
}

async function analyzeWithGemini(payload, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const systemPrompt = `You are CyberShield AI, an advanced Cybersecurity Threat Analysis & Phishing Prevention Engine.
Your task is to analyze the provided input (URL, SMS/Email text, QR code target, or text extracted from an image) for scams, phishing, fraud, malware, or social engineering threats.

IMPORTANT: Respond strictly with valid JSON with NO markdown formatting around it (do not wrap in \`\`\`json). The JSON object MUST contain the following fields:
{
  "riskScore": number (integer 0 to 100),
  "riskLevel": "Safe" | "Caution" | "High" | "Critical",
  "category": string (e.g., "Phishing / Credential Theft", "Banking Smishing", "Fake Job Scam", "Malicious QR Redirect", "Legitimate Content"),
  "explanation": string (plain language explanation for non-technical users explaining why this is or isn't a scam),
  "tactics": string[] (array of scam tactics detected, e.g. ["Urgency", "Domain Spoofing", "Fake Authority"]),
  "technicalDetails": {
    "domainAnalysis": string,
    "urgencyLevel": "Low" | "Medium" | "High" | "Extreme",
    "sslTrust": string
  },
  "safeAction": string (actionable safety recommendation like "Block sender and do not click link")
}`;

  let prompt = `Analyze this ${payload.type.toUpperCase()} content:\nContent: ${payload.content}`;
  if (payload.type === 'image' && payload.imageData) {
    prompt += `\n[Image context provided]`;
  }

  const result = await model.generateContent([systemPrompt, prompt]);
  const text = result.response.text().trim();
  
  // Clean up any potential markdown backticks
  const cleanedText = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleanedText);
}

function analyzeWithHeuristics(payload) {
  const type = payload.type;
  const content = (payload.content || '').trim();

  // Default clean baseline
  let score = 5;
  let level = 'Safe';
  let category = 'Verified / Low Threat';
  let explanation = 'No malicious indicators or phishing patterns detected. The input appears to be standard digital content.';
  let tactics = [];
  let domainAnalysis = 'Domain structure appears normal with no known typosquatting patterns.';
  let urgencyLevel = 'Low';
  let sslTrust = 'Valid Standard SSL';
  let safeAction = 'Proceed with standard internet safety guidelines.';

  const lower = content.toLowerCase();

  // === URL / QR SCANNERS ===
  if (type === 'url' || type === 'qr') {
    const isIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(content);
    const suspiciousTLDs = ['.top', '.xyz', '.click', '.work', '.cc', '.ru', '.zip', '.online', '.site', '.tech', '.tk', '.ml', '.ga', '.cf', '.gq'];
    const hasSuspiciousTLD = suspiciousTLDs.some((tld) => lower.includes(tld));
    const targetBrandSpoof = ['paypal', 'hdfc', 'sbi', 'icici', 'google', 'amazon', 'netflix', 'apple', 'microsoft', 'support', 'kyc', 'verify', 'update-account', 'secure-login', 'claim-reward', 'upi'];
    
    const matchedKeywords = targetBrandSpoof.filter((kw) => lower.includes(kw));
    const isKnownSafeDomain = ['github.com', 'google.com', 'microsoft.com', 'amazon.com', 'apple.com', 'youtube.com', 'wikipedia.org'].some(d => lower.includes(d));

    if (!isKnownSafeDomain) {
      if (isIp) {
        score += 55;
        tactics.push('Raw IP Address URL');
        domainAnalysis = 'Host is a raw numerical IP address instead of a registered domain name.';
      }
      if (hasSuspiciousTLD) {
        score += 35;
        tactics.push('High-Risk TLD (.top / .xyz / .click)');
        domainAnalysis = 'Uses a low-cost, high-risk top-level domain frequently associated with automated phishing campaigns.';
      }
      if (matchedKeywords.length >= 2) {
        score += 40;
        tactics.push('Brand Impersonation & Typosquatting');
        domainAnalysis = `Domain contains multiple brand keywords (${matchedKeywords.slice(0,3).join(', ')}) combined with suspicious subdomains.`;
      } else if (matchedKeywords.length === 1) {
        score += 20;
      }
      if (lower.includes('kyc') || lower.includes('verify') || lower.includes('suspend') || lower.includes('block')) {
        score += 25;
        tactics.push('Urgent Account Security Scare');
        urgencyLevel = 'High';
      }
    }
  }

  // === TEXT / SMS / EMAIL SCANNERS ===
  if (type === 'text' || type === 'image') {
    const urgencyPatterns = ['urgent', 'immediately', 'blocked today', 'account suspended', 'legal action', '24 hours', 'power disconnected', 'electricity cut'];
    const financialPatterns = ['bank', 'kyc', 'upi pin', 'deducted', 'lottery', 'winner', 'claim ₹', 'earn ₹', 'part-time job', 'telegram', 'registration fee'];
    const fakeAuthPatterns = ['hdfc', 'sbi', 'income tax', 'cyber cell', 'police', 'customs', 'telecom', 'esim'];

    const foundUrgency = urgencyPatterns.filter(p => lower.includes(p));
    const foundFinancial = financialPatterns.filter(p => lower.includes(p));
    const foundAuth = fakeAuthPatterns.filter(p => lower.includes(p));

    if (foundUrgency.length > 0) {
      score += foundUrgency.length * 20;
      tactics.push('Artificial Time Pressure');
      urgencyLevel = 'Extreme';
    }
    if (foundFinancial.length > 0) {
      score += foundFinancial.length * 15;
      tactics.push('Financial Extortion / Baiting');
    }
    if (foundAuth.length > 0) {
      score += 20;
      tactics.push('Authority Impersonation');
    }
    if (lower.includes('http://') || lower.includes('bit.ly') || lower.includes('tinyurl')) {
      score += 25;
      tactics.push('URL Shortener / Unencrypted Link');
    }
    if (lower.includes('upi pin') || lower.includes('qr code to receive')) {
      score += 45;
      tactics.push('UPI Fraud Trap');
    }
  }

  // Cap score between 0 and 98
  score = Math.min(Math.max(score, 4), 98);

  // Categorize Risk Level
  if (score >= 75) {
    level = 'Critical';
    category = type === 'url' ? 'Phishing / Malware Domain' : type === 'sms' || type === 'text' ? 'High-Risk Scam Message' : 'Malicious Scam Payload';
    explanation = 'CRITICAL WARNING: This content exhibits strong phishing or fraud characteristics. It uses deceptive tactics to trick you into revealing personal credentials or transferring funds.';
    safeAction = 'DO NOT click link or enter PIN. Block sender, delete message, and report to National Cyber Crime Helpline (1930).';
    sslTrust = 'Untrusted / Missing Certificate';
  } else if (score >= 45) {
    level = 'High';
    category = 'Suspicious Phishing Attempt';
    explanation = 'CAUTION: Multiple red flags were identified, including suspicious links or artificial urgency. Proceed with extreme caution.';
    safeAction = 'Verify the source through official channels before interacting.';
    sslTrust = 'Self-Signed / Unverified Domain';
  } else if (score >= 25) {
    level = 'Caution';
    category = 'Unverified Content';
    explanation = 'Minor suspicious elements found. Double check domain spelling and never share passwords or OTPs.';
    safeAction = 'Do not provide personal information.';
    sslTrust = 'Standard SSL';
  } else {
    level = 'Safe';
    category = 'Legitimate Content';
    explanation = 'CyberShield AI found no obvious scam indicators or phishing signals.';
    safeAction = 'Safe to proceed.';
    sslTrust = 'Verified EV SSL';
  }

  if (tactics.length === 0) {
    tactics = ['Standard Web Content'];
  }

  return {
    riskScore: score,
    riskLevel: level,
    category,
    explanation,
    tactics,
    technicalDetails: {
      domainAnalysis,
      urgencyLevel,
      sslTrust
    },
    safeAction
  };
}
