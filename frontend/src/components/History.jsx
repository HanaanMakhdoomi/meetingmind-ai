import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History({ onBack }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/history')
      .then((res) => setMeetings(res.data))
      .catch(() => setMeetings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '36px' }}>
          Meeting{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}
          >
            history
          </span>
        </h2>

        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            padding: '10px 20px',
            border: '1px solid var(--color-border)',
            borderRadius: '999px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>

      {loading && <p style={{ color: 'var(--color-muted)' }}>Loading history…</p>}

      {!loading && meetings.length === 0 && (
        <p style={{ color: 'var(--color-muted)' }}>
          No meetings analyzed yet. Go analyze one!
        </p>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        {meetings.map((m, i) => (
          <div
            key={m.id}
            className={`fade-in fade-in-delay-${(i % 4) + 1}`}
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '20px 24px',
              transition: 'border-color 0.25s ease, transform 0.25s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.35)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ color: 'var(--color-sage)' }}>Meeting #{m.id}</strong>
              <span style={{ color: 'var(--color-muted)', fontSize: '13px' }}>
                {new Date(m.created_at).toLocaleString()}
              </span>
            </div>
            <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
              {m.summary}
            </p>
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--color-peach)' }}>
              ✅ {m.action_items?.length || 0} actions · 📌 {m.decisions?.length || 0} decisions · ⚠️ {m.risks?.length || 0} risks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}