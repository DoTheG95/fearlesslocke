import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function Header() {
  return (
    <header
      className="App-header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <h1>Fearless Nuzlocke</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button">Proceed</button>
         <button
          type="button"
          onClick={() => {
            window.location.href = '../pages/Rules.jsx';
          }}
        >Rules</button>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
