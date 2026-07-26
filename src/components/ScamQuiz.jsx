import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { SCAM_QUIZ_QUESTIONS } from '../services/mockThreats';
import confetti from 'canvas-confetti';

export default function ScamQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = SCAM_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentIndex + 1 < SCAM_QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Spot The Scam - Awareness Quiz
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Test your cybersecurity instincts against real-world scam scenarios
              </span>
            </div>
          </div>

          {!quizFinished && (
            <span className="badge badge-safe font-mono" style={{ fontSize: '12px' }}>
              Question {currentIndex + 1} / {SCAM_QUIZ_QUESTIONS.length}
            </span>
          )}
        </div>

        {/* Quiz Body */}
        {quizFinished ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f2fe 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#07090e' }}>
              <Award size={36} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Quiz Completed!
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              You scored <span style={{ color: '#00f2fe', fontWeight: 700 }}>{score}</span> out of <span style={{ color: '#ffffff', fontWeight: 700 }}>{SCAM_QUIZ_QUESTIONS.length}</span>
            </p>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-glass)', marginBottom: '24px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '14px', color: '#34d399', marginBottom: '6px' }}>CyberShield Security Certification:</h4>
              <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5, margin: 0 }}>
                {score === SCAM_QUIZ_QUESTIONS.length 
                  ? '🏆 Cyber Security Master! You have sharp scam detection instincts.'
                  : score >= 2 
                  ? '👍 Good Job! Stay cautious and double-check unexpected URLs or urgency demands.'
                  : '⚠️ Vulnerable to Fraud. Review prevention tips in the Threat Feed!'}
              </p>
            </div>

            <button onClick={handleRestart} className="btn-primary">
              <RotateCcw size={16} />
              Try Quiz Again
            </button>
          </div>
        ) : (
          <div>
            {/* Question Text */}
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '20px', lineHeight: 1.5 }}>
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentQ.options.map((option, idx) => {
                let border = '1px solid var(--border-glass)';
                let bg = 'rgba(15, 23, 42, 0.6)';
                let icon = null;

                if (showExplanation) {
                  if (idx === currentQ.correctIndex) {
                    border = '1px solid #10b981';
                    bg = 'rgba(16, 185, 129, 0.12)';
                    icon = <CheckCircle2 size={18} color="#10b981" />;
                  } else if (idx === selectedOption) {
                    border = '1px solid #ef4444';
                    bg = 'rgba(239, 68, 68, 0.12)';
                    icon = <XCircle size={18} color="#ef4444" />;
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showExplanation}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: bg,
                      border,
                      color: '#f8fafc',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: showExplanation ? 'default' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Explanation & Security Context:
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {currentQ.explanation}
                </div>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <div style={{ textAlign: 'right' }}>
                <button onClick={handleNextQuestion} className="btn-primary">
                  Next Question →
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
