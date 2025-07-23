// src/components/Login.jsx
import React from 'react';
import '../App.css';

export default function Modeselect() {

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  return (
    <header className='App-header' style={headerStyle}>
      <h1 style={{ margin: 0, textAlign: 'center' }}>
        How do you want to play?
      </h1>
      <div className='buttoncontainer'>
        <button type='submit' className='mainbutton'>
          <a href='/Nuzlocke'>Nuzlocke </a>
        </button>
        <button type='button' className='mainbutton'> 
          <a href="/Fearlesslocke">Fearlesslocke</a>
        </button>
      </div>
    </header>
  );
}
