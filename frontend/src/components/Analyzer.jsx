import { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

export default function Analyzer() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
const [fileName, setFileName] = useState('');

const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowed = ['text/plain', 'text/markdown'];
  if (!allowed.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
    setError('Only .txt or .md files are supported.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    setTranscript(event.target.result);
    setFileName(file.name);
    setError('');
    setToast(`Loaded: ${file.name} ✓`);
    setTimeout(() => setToast(''), 2000);
  };
  reader.readAsText(file);
};

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('http://127.0.0.1:8000/analyze', { transcript });
      setResult(res.data);
      setToast('Analysis complete ✓');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const date = new Date().toLocaleString();

    const actionItemsMd = (result.action_items || [])
      .map((item) => {
        const owner = item.owner ? ` — ${item.owner}` : '';
        const deadline = item.deadline ? ` _(${item.deadline})_` : '';
        return `- **${item.task}**${owner}${deadline}`;
      })
      .join('\n') || '_None_';

    const decisionsMd =
      (result.decisions || []).map((d) => `- ${d}`).join('\n') || '_None_';

    const risksMd =
      (result.risks || []).map((r) => `- ${r}`).join('\n') || '_None_';

    const markdown = `# 🧠 MeetingMind AI — Meeting Summary

_Generated: ${date}_

---

## 📝 Summary
${result.summary}

## ✅ Action Items
${actionItemsMd}

## 📌 Decisions
${decisionsMd}

## ⚠️ Risks
${risksMd}

---

_Made with 🔥🌿 by Vivi — MeetingMind AI_
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meetingmind-summary-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast('Downloaded ✓');
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
      <h2 style={{ fontSize: '44px', marginBottom: '20px', textAlign: 'center' }}>
        Analyze your{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
          }}
        >
          meeting
        </span>
      </h2>

      <p
        style={{
          color: 'var(--color-muted)',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '16px',
        }}
      >
        Paste your transcript below and let AI do the rest.
      </p>
{/* File Upload Row */}
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '10px',
  }}
>
  <label
    htmlFor="fileUpload"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'transparent',
      color: 'var(--color-sage)',
      padding: '8px 16px',
      border: '1px solid var(--color-sage)',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--color-sage)';
      e.currentTarget.style.color = '#0F0F0F';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'var(--color-sage)';
    }}
  >
    📎 Upload .txt or .md
  </label>

  <input
    id="fileUpload"
    type="file"
    accept=".txt,.md,text/plain,text/markdown"
    onChange={handleFileUpload}
    style={{ display: 'none' }}
  />

  {fileName && (
    <span
      style={{
        color: 'var(--color-muted)',
        fontSize: '13px',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      📄 {fileName}
    </span>
  )}
</div>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste your meeting transcript here..."
        rows={10}
        style={{
          width: '100%',
          padding: '20px',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-text)',
          fontSize: '15px',
          fontFamily: 'Inter, sans-serif',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />

      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: loading
              ? 'rgba(245, 158, 11, 0.6)'
              : 'linear-gradient(90deg, #F59E0B, #FDBA74)',
            color: '#0F0F0F',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '999px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
            transition: 'transform 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {loading && <span className="spinner"></span>}
          {loading ? 'Analyzing…' : 'Analyze Meeting →'}
        </button>
      </div>

      {error && (
        <p
          style={{
            color: 'var(--color-danger)',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {error}
        </p>
      )}

      {loading && (
        <div style={{ marginTop: '60px', display: 'grid', gap: '20px' }}>
          <div className="skeleton" style={{ height: '110px' }}></div>
          <div className="skeleton" style={{ height: '160px' }}></div>
          <div className="skeleton" style={{ height: '90px' }}></div>
          <div className="skeleton" style={{ height: '90px' }}></div>
        </div>
      )}

      {result && !loading && (
        <>
          {/* Download button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px', marginBottom: '20px' }}>
            <button
              onClick={handleDownload}
              style={{
                background: 'transparent',
                color: 'var(--color-sage)',
                padding: '10px 20px',
                border: '1px solid var(--color-sage)',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sage)';
                e.currentTarget.style.color = '#0F0F0F';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-sage)';
              }}
            >
              ⬇ Download as Markdown
            </button>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            <ResultCard title="Summary" icon="📝" delay={1}>
              {result.summary}
            </ResultCard>

            <ResultCard title="Action Items" icon="✅" delay={2}>
              {result.action_items?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.action_items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>
                      <strong style={{ color: 'var(--color-text)' }}>{item.task}</strong>
                      {item.owner && (
                        <span style={{ color: 'var(--color-sage)' }}> — {item.owner}</span>
                      )}
                      {item.deadline && (
                        <span style={{ color: 'var(--color-peach)' }}> ({item.deadline})</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                'No action items found.'
              )}
            </ResultCard>

            <ResultCard title="Decisions" icon="📌" delay={3}>
              {result.decisions?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.decisions.map((d, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{d}</li>
                  ))}
                </ul>
              ) : (
                'No decisions recorded.'
              )}
            </ResultCard>

            <ResultCard title="Risks" icon="⚠️" delay={4}>
              {result.risks?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.risks.map((r, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{r}</li>
                  ))}
                </ul>
              ) : (
                'No risks identified.'
              )}
            </ResultCard>
          </div>
        </>
      )}

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-sage)',
            color: '#0F0F0F',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(132, 204, 22, 0.35)',
            animation: 'fadeInUp 0.35s ease forwards',
            zIndex: 999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}