import React, { useState } from 'react';

export default function HelpModal({ onClose }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleReportIssue = () => {
    const subject = encodeURIComponent('Task Management App - Issue Report');
    const body = encodeURIComponent(
      'Hi Support Team,\n\nI would like to report an issue with the Task Management App.\n\nDescription of the issue:\n\n\nSteps to reproduce:\n\n\nBrowser & Device details:\n'
    );
    window.location.href = `mailto:support@taskflow.app?subject=${subject}&body=${body}`;
  };

  const faqs = [
    {
      q: 'How do I create a task?',
      a: 'Click the "+ Create Task" button on your dashboard, enter a required task title (up to 100 characters) and an optional description, then click "Create Task".',
    },
    {
      q: 'How do I change a task status?',
      a: 'On any task card, locate the "Status" dropdown menu and select a new status: Planned, In Progress, or Complete. The status will update instantly in real time.',
    },
    {
      q: 'What do the task statuses mean?',
      a: '• Planned (Blue): Tasks that are created and waiting to be started.\n• In Progress (Yellow): Tasks currently being worked on.\n• Complete (Green): Finished tasks.',
    },
    {
      q: "Why can't I see another user's tasks?",
      a: "TaskFlow enforces strict user data isolation. Tasks are private to your authenticated Firebase UID. Firestore database rules prohibit any user from reading or modifying another user's tasks.",
    },
    {
      q: 'What should I do if something is not working?',
      a: 'Ensure your internet connection is active. If Firestore connection errors persist, verify that your browser allows Google popups and check the troubleshooting guide below.',
    },
  ];

  const troubleshootingSteps = [
    { step: '1', title: 'Understand', desc: 'Identify the exact error message or symptom.' },
    { step: '2', title: 'Reproduce', desc: 'Repeat the steps that led to the issue.' },
    { step: '3', title: 'Check Errors', desc: 'Inspect browser console for Firebase errors.' },
    { step: '4', title: 'Verify Rules', desc: 'Ensure user authentication and data rules pass.' },
    { step: '5', title: 'Resolve & Verify', desc: 'Apply fix or retry request, then confirm.' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card help-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="help-header-title">
            <div className="help-icon-badge">?</div>
            <h2>Help & Support</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close Help Modal">
            &times;
          </button>
        </div>

        <div className="help-modal-content">
          {/* Section 1: Privacy Note */}
          <div className="help-note-banner">
            <span className="note-icon">🔒</span>
            <span><strong>Privacy Notice:</strong> All task data is strictly private and tied to your authenticated account.</span>
          </div>

          {/* Section 2: FAQ Accordion */}
          <section className="help-section">
            <h3 className="help-section-title">Quick Help / FAQ</h3>
            <div className="faq-list">
              {faqs.map((item, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? 'faq-open' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(idx)}>
                    <span>{item.q}</span>
                    <span className="faq-arrow">{activeFaq === idx ? '▲' : '▼'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Troubleshooting Flow */}
          <section className="help-section">
            <h3 className="help-section-title">Support Troubleshooting Flow</h3>
            <div className="troubleshooting-flow">
              {troubleshootingSteps.map((s, idx) => (
                <div key={idx} className="flow-step">
                  <div className="flow-step-num">{s.step}</div>
                  <div className="flow-step-body">
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Report An Issue */}
          <section className="help-section help-report-section">
            <div>
              <h3 className="help-section-title" style={{ marginBottom: '4px' }}>Encountering an Unresolved Issue?</h3>
              <p className="help-report-subtitle">Report a bug directly to our support engineering team via email.</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleReportIssue}>
              ✉️ Report an Issue
            </button>
          </section>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
