import '../App.css';
import React, { useState, useEffect } from 'react'

export default function Landingpage() {
  
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

  useEffect(() => {
    const nav = document.querySelector('.nav-bar')
    if (nav) nav.classList.add('hidden')
    return () => {
      if (nav) nav.classList.remove('hidden')
    }
  }, []);

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
        <a href="/Login" style={buttonStyle}>
          Login
        </a>
        <a href="/Rules" style={buttonStyle}>
          Rules
        </a>
      </div>
    </header>
  );
}
