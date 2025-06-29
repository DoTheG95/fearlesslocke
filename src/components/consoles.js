import React, { useState } from 'react';
import '../App.css';
import GameIconsPopup from './gameiconspopup';

// List of consoles and their keys (should match GameIconsPopup keys)
const consoles = [
  { name: 'Gameboy Color', iconSrc: '/images/consoles/game-boy.png', key: 'gbc' },
  { name: 'GBA', iconSrc: '/images/consoles/gba.png', key: 'gba' },
  { name: 'Nintendo DS', iconSrc: '/images/consoles/nintendo-ds.png', key: 'nds' },
  { name: 'Nintendo 3DS', iconSrc: '/images/consoles/3ds.png', key: 'tds' },
  { name: 'Switch', iconSrc: '/images/consoles/nintendo-switch.png', key: 'switch' }
];


export default function ConsoleRow() {
  const [openConsole, setOpenConsole] = useState(null);
  const handleConsoleClick = key =>
    setOpenConsole(prev => (prev === key ? null : key));

  return (
    <div className="icon-row">
      {consoles.map(c => (
        <div key={c.key} className="icon-container">
          <img
            src={c.iconSrc}
            alt={c.name}
            className="icon"
            onClick={() => handleConsoleClick(c.key)}
          />
          {openConsole === c.key && <GameIconsPopup consoleKey={c.key} />}
        </div>
      ))}
    </div>
  );
}
