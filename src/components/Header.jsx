import React from 'react';
import '../App.css';

export default function Header() {
  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1.25rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    border: 'none',
    display: 'inline-block',
    textAlign: 'center',
  };

  return (
    <header
      className="App-header"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center' }}>Fearless Nuzlocke</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            window.location.href = '/proceed';
          }}
        >
          Proceed
        </button>
        <a href="/Rules" style={buttonStyle}>
          Rules
        </a>
      </div>
    </header>
  );
}
