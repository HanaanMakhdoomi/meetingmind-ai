export default function ResultCard({ title, icon, children, delay = 0 }) {
  return (
    <div
      className={`fade-in fade-in-delay-${delay}`}
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '28px',
        transition: 'transform 0.25s ease, border-color 0.25s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.35)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <h3
        style={{
          fontSize: '22px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--color-text)',
        }}
      >
        <span style={{ fontSize: '22px' }}>{icon}</span> {title}
      </h3>
      <div style={{ color: 'var(--color-muted)', lineHeight: 1.7, fontSize: '15px' }}>
        {children}
      </div>
    </div>
  );
}