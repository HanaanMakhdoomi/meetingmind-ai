import { useState } from 'react';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import History from './components/History';

export default function App() {
  const [screen, setScreen] = useState('hero'); // 'hero' | 'analyzer' | 'history'

  return (
    <>
      {/* Top nav */}
      {screen !== 'hero' && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            display: 'flex',
            gap: '12px',
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setScreen('analyzer')}
            style={navBtn(screen === 'analyzer')}
          >
            Analyze
          </button>
          <button
            onClick={() => setScreen('history')}
            style={navBtn(screen === 'history')}
          >
            History
          </button>
        </div>
      )}

      {screen === 'hero' && <Hero onStart={() => setScreen('analyzer')} />}
      {screen === 'analyzer' && <Analyzer />}
      {screen === 'history' && <History onBack={() => setScreen('analyzer')} />}
    </>
  );
}

function navBtn(active) {
  return {
    background: active
      ? 'linear-gradient(90deg, #F59E0B, #FDBA74)'
      : 'transparent',
    color: active ? '#0F0F0F' : 'var(--color-text)',
    padding: '8px 18px',
    border: active ? 'none' : '1px solid var(--color-border)',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  };
}