export default function Hero({ onStart }) {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: '📝',
      title: 'Instant Summaries',
      desc: 'Turn hours of discussion into a crisp paragraph — no more note-taking chaos.',
    },
    {
      icon: '✅',
      title: 'Actionable Tasks',
      desc: 'Every action item comes with an owner and deadline, ready to assign.',
    },
    {
      icon: '📌',
      title: 'Key Decisions',
      desc: 'Never lose track of what was decided — surfaced automatically.',
    },
    {
      icon: '⚠️',
      title: 'Risk Detection',
      desc: 'Spot blockers, budget concerns, and red flags before they escalate.',
    },
    {
      icon: '💾',
      title: 'Meeting History',
      desc: 'Every analysis is saved, searchable, and always accessible.',
    },
    {
      icon: '📥',
      title: 'Export Anywhere',
      desc: 'One-click Markdown export — drop into Notion, Slack, or your docs.',
    },
  ];

  const steps = [
    { num: '01', title: 'Paste or upload', desc: 'Drop in your transcript or upload a .txt file.' },
    { num: '02', title: 'AI analyzes', desc: 'Llama 3.3 70B extracts structured insights in seconds.' },
    { num: '03', title: 'Take action', desc: 'Review, download, and share the results instantly.' },
  ];

  return (
    <>
      {/* HERO */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '780px' }}>
          <p
            className="fade-in fade-in-delay-1"
            style={{
              color: 'var(--color-sage)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '32px',
            }}
          >
            ✦ MeetingMind AI
          </p>

          <h1
            className="fade-in fade-in-delay-2"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.1,
              marginBottom: '28px',
            }}
          >
            Turn messy meetings into{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}
            >
              clear action.
            </span>
          </h1>

          <p
            className="fade-in fade-in-delay-3"
            style={{
              color: 'var(--color-muted)',
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '48px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Your AI-powered meeting assistant. Paste any transcript and get
            summaries, action items, decisions, and risks — instantly.
          </p>

          <div
            className="fade-in fade-in-delay-4"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '80px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onStart}
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
                color: '#0F0F0F',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Try Now →
            </button>

            <button
              onClick={scrollToFeatures}
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 500,
                border: '1px solid var(--color-border)',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              Learn More ↓
            </button>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section
        id="features"
        style={{
          padding: '100px 24px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              color: 'var(--color-sage)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            How it works
          </p>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              marginBottom: '60px',
              lineHeight: 1.2,
            }}
          >
            From transcript to{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}
            >
              action
            </span>{' '}
            in seconds.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginBottom: '100px',
            }}
          >
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    color: 'var(--color-peach)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                    marginBottom: '12px',
                  }}
                >
                  {s.num}
                </p>
                <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES GRID */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              color: 'var(--color-sage)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            Features
          </p>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              marginBottom: '60px',
              lineHeight: 1.2,
            }}
          >
            Everything you need,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}
            >
              nothing you don’t.
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '28px',
                  textAlign: 'left',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.35)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--color-muted)', lineHeight: 1.6, fontSize: '15px' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <button
            onClick={onStart}
            style={{
              background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
              color: '#0F0F0F',
              padding: '18px 40px',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Analyze your first meeting →
          </button>

          <div
            style={{
              width: '80px',
              height: '1px',
              backgroundColor: 'var(--color-border)',
              margin: '60px auto 24px',
            }}
          />

          <p style={{ color: 'var(--color-muted)', fontSize: '14px' }}>
           Made with ❤️ by{' '}
<span style={{ color: 'var(--color-sage)', fontWeight: 600 }}>
  MeetingMind AI
</span> </p>
        </div>
      </section>
    </>
  );
}