import { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const allowedExtensions = [
      '.mp3',
      '.wav',
      '.m4a',
      '.webm',
      '.mp4',
      '.mpeg',
      '.mpga',
      '.ogg'
    ];

    const fileName = selectedFile.name.toLowerCase();

    const isValid = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValid) {
      setError(
        'Unsupported audio format. Please upload MP3, WAV, M4A, WebM, MP4, MPEG, MPGA, or OGG.'
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError('');
    setToast(`Loaded: ${selectedFile.name} ✓`);

    setTimeout(() => setToast(''), 2000);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a meeting audio file first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze-audio`,
        formData
      );

      setResult(res.data);

      setToast('Meeting analyzed successfully ✓');

      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail ||
        'Something went wrong while processing the meeting.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const date = new Date().toLocaleString();

    const actionItemsMd =
      (result.action_items || [])
        .map((item) => {
          const owner = item.owner ? ` — ${item.owner}` : '';
          const deadline = item.deadline
            ? ` _(${item.deadline})_`
            : '';

          return `- **${item.task}**${owner}${deadline}`;
        })
        .join('\n') || '_None_';

    const decisionsMd =
      (result.decisions || [])
        .map((d) => `- ${d}`)
        .join('\n') || '_None_';

    const risksMd =
      (result.risks || [])
        .map((r) => `- ${r}`)
        .join('\n') || '_None_';

    const markdown = `# 🧠 MeetingMind AI — Meeting Summary

_Generated: ${date}_

---

## 📝 Summary

${result.summary}

## 📄 Transcript

${result.transcript}

## ✅ Action Items

${actionItemsMd}

## 📌 Decisions

${decisionsMd}

## ⚠️ Risks

${risksMd}

---

_Made with MeetingMind AI_
`;

    const blob = new Blob([markdown], {
      type: 'text/markdown',
    });

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
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '80px 24px',
      }}
    >
      <h2
        style={{
          fontSize: '44px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Analyze your{' '}
        <span
          style={{
            background:
              'linear-gradient(90deg, #F59E0B, #FDBA74)',
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
        Upload your meeting audio and let AI create an
        action-oriented summary.
      </p>

      {/* Audio Upload */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '30px',
        }}
      >
        <label
          htmlFor="audioUpload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: 'var(--color-sage)',
            padding: '12px 24px',
            border: '1px solid var(--color-sage)',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🎙️ Upload Meeting Audio
        </label>

        <input
          id="audioUpload"
          type="file"
          accept=".mp3,.wav,.m4a,.webm,.mp4,.mpeg,.mpga,.ogg,audio/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {file && (
          <div
            style={{
              color: 'var(--color-muted)',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            🎵 {file.name}
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '28px',
        }}
      >
        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          style={{
            background:
              loading || !file
                ? 'rgba(245, 158, 11, 0.5)'
                : 'linear-gradient(90deg, #F59E0B, #FDBA74)',
            color: '#0F0F0F',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '999px',
            cursor:
              loading || !file
                ? 'not-allowed'
                : 'pointer',
            boxShadow:
              '0 8px 24px rgba(245, 158, 11, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {loading && <span className="spinner"></span>}

          {loading
            ? 'Processing Meeting…'
            : 'Analyze Meeting →'}
        </button>
      </div>

      {/* Error */}
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

      {/* Loading */}
      {loading && (
        <div
          style={{
            marginTop: '60px',
            display: 'grid',
            gap: '20px',
          }}
        >
          <div
            className="skeleton"
            style={{ height: '180px' }}
          ></div>

          <div
            className="skeleton"
            style={{ height: '110px' }}
          ></div>

          <div
            className="skeleton"
            style={{ height: '160px' }}
          ></div>

          <div
            className="skeleton"
            style={{ height: '90px' }}
          ></div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <>
          {/* Download */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '48px',
              marginBottom: '20px',
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                background: 'transparent',
                color: 'var(--color-sage)',
                padding: '10px 20px',
                border:
                  '1px solid var(--color-sage)',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⬇ Download Summary
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            {/* Transcript */}
            <ResultCard
              title="Transcript"
              icon="📄"
              delay={1}
            >
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  lineHeight: '1.7',
                }}
              >
                {result.transcript}
              </div>
            </ResultCard>

            {/* Summary */}
            <ResultCard
              title="Summary"
              icon="📝"
              delay={2}
            >
              {result.summary}
            </ResultCard>

            {/* Action Items */}
            <ResultCard
              title="Action Items"
              icon="✅"
              delay={3}
            >
              {result.action_items?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.action_items.map(
                    (item, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: '12px',
                        }}
                      >
                        <strong
                          style={{
                            color:
                              'var(--color-text)',
                          }}
                        >
                          {item.task}
                        </strong>

                        {item.owner && (
                          <span
                            style={{
                              color:
                                'var(--color-sage)',
                            }}
                          >
                            {' '}
                            — {item.owner}
                          </span>
                        )}

                        {item.deadline && (
                          <span
                            style={{
                              color:
                                'var(--color-peach)',
                            }}
                          >
                            {' '}
                            ({item.deadline})
                          </span>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'No action items found.'
              )}
            </ResultCard>

            {/* Decisions */}
            <ResultCard
              title="Decisions"
              icon="📌"
              delay={4}
            >
              {result.decisions?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.decisions.map(
                    (decision, i) => (
                      <li
                        key={i}
                        style={{ marginBottom: '8px' }}
                      >
                        {decision}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'No decisions recorded.'
              )}
            </ResultCard>

            {/* Risks */}
            <ResultCard
              title="Risks"
              icon="⚠️"
              delay={5}
            >
              {result.risks?.length ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {result.risks.map((risk, i) => (
                    <li
                      key={i}
                      style={{ marginBottom: '8px' }}
                    >
                      {risk}
                    </li>
                  ))}
                </ul>
              ) : (
                'No risks identified.'
              )}
            </ResultCard>
          </div>
        </>
      )}

      {/* Toast */}
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
            boxShadow:
              '0 10px 30px rgba(132, 204, 22, 0.35)',
            zIndex: 999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}