export const TRENDING_SCAMS = [
  {
    id: 'scam-1',
    title: 'AI Voice Cloning & Emergency Ransom Call',
    category: 'AI Fraud',
    severity: 'Critical',
    date: '2026-07-25',
    summary: 'Scammers use 3-second audio clips scraped from social media to clone voices of family members, calling relatives to claim an emergency accident and demand instant UPI transfers.',
    prevention: 'Always establish a personal secret codeword with family. Never send funds based solely on an unexpected phone call without calling back on a secondary trusted number.'
  },
  {
    id: 'scam-2',
    title: 'Fake Telegram Data Entry & Part-Time Job Scams',
    category: 'Job Scam',
    severity: 'High',
    date: '2026-07-24',
    summary: 'Offers high daily earnings (₹3,000 - ₹10,000/day) for liking YouTube videos or typing text, then forces victims to pay "registration fees" or "security deposits" to withdraw earnings.',
    prevention: 'Legitimate employers never demand payment upfront or hire exclusively via unverified Telegram bots.'
  },
  {
    id: 'scam-3',
    title: 'Malicious UPI QR Code Payment Traps',
    category: 'Payment Fraud',
    severity: 'Critical',
    date: '2026-07-22',
    summary: 'Buyers on OLX/Marketplace claim to send money by sending a QR code to the seller. Scanning the QR code and entering UPI PIN actually DEBITS money from the victim\'s bank account.',
    prevention: 'Remember: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money!'
  },
  {
    id: 'scam-4',
    title: 'eSIM Swap & WhatsApp Hijacking',
    category: 'Identity Theft',
    severity: 'High',
    date: '2026-07-20',
    summary: 'Victims receive phishing calls impersonating telecom providers urging eSIM upgrades. Scammers capture the eSIM activation code to hijack SMS OTPs.',
    prevention: 'Never share eSIM QR codes or activation SMS with anyone calling claiming to be telecom customer support.'
  }
];

export const SCAM_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "You receive an SMS: 'Your Electricity bill of ₹1,450 is unpaid. Power will be disconnected tonight at 9:30 PM. Call Officer at 9876543210.' What should you do?",
    options: [
      "Call the number provided immediately to stop power cut.",
      "Click the link attached or pay via the contact's personal UPI.",
      "Ignore the SMS and verify bill status directly on your official electricity board app/portal.",
      "Forward the SMS to all family members so they pay it."
    ],
    correctIndex: 2,
    explanation: "Scammers create artificial time pressure ('disconnected tonight') with personal numbers. Utility companies never request payments through random mobile numbers."
  },
  {
    id: 2,
    question: "To RECEIVE a payment of ₹5,000 from a buyer on OLX, the buyer sends you a QR Code. What will happen if you scan it and enter your UPI PIN?",
    options: [
      "You will receive ₹5,000 into your bank account.",
      "₹5,000 will be DEDUCTED from your bank account.",
      "Your UPI PIN will be updated safely.",
      "It will check your bank account balance."
    ],
    correctIndex: 1,
    explanation: "Entering your UPI PIN ALWAYS authorizes a debit (deduction) from your account! You never enter your PIN to receive money."
  },
  {
    id: 3,
    question: "Which of the following URLs is MOST LIKELY a phishing domain attempting to steal Amazon login credentials?",
    options: [
      "https://www.amazon.in/gp/history",
      "https://amazon-security-update-kyc.com/login",
      "https://pay.amazon.com",
      "https://aws.amazon.com"
    ],
    correctIndex: 1,
    explanation: "Phishing URLs insert hyphens and keywords like 'amazon-security-update-kyc.com'. The real domain is always the suffix right before '.com' or '.in'."
  },
  {
    id: 4,
    question: "You get an email claiming you won a ₹1,00,000 lucky draw, sent from 'rewards-winner@gmail.com'. What is the biggest red flag?",
    options: [
      "The reward amount is too small.",
      "It uses a free @gmail.com address instead of an official company domain name.",
      "It has nice graphics.",
      "It arrived in the morning."
    ],
    correctIndex: 1,
    explanation: "Official corporate sweepstakes and organizations use verified corporate domains (e.g., @company.com), not free public email domains like @gmail.com or @yahoo.com."
  }
];
