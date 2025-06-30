import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GameIconsPopup from './GameIconsPopup';
import '../App.css';

const consoles = [
  { name: 'GBC', key: 'gbc', iconSrc: '/images/consoles/game-boy.png' },
  { name: 'GBA', key: 'gba', iconSrc: '/images/consoles/gba.png' },
  { name: 'Nintendo DS',  key: 'nds', iconSrc: '/images/consoles/nintendo-ds.png' },
  { name: 'Nintendo 3DS', key: 'tds', iconSrc: '/images/consoles/3ds.png' },
  { name: 'Switch', key: 'switch', iconSrc: '/images/consoles/nintendo-switch.png' }
];

export default function ConsoleRow({ onSelectDex }) {
  const [openConsole, setOpenConsole] = useState(null);

  return (
    <div className="icon-row">
      {consoles.map(c => (
        <div key={c.key} className="icon-container">
          <img
            src={c.iconSrc}
            alt={c.name}
            className="icon"
            onClick={() =>
              setOpenConsole(openConsole === c.key ? null : c.key)
            }
          />
          {openConsole === c.key && (
            <GameIconsPopup
              consoleKey={c.key}
              onGameClick={onSelectDex}
            />
          )}
        </div>
      ))}
    </div>
  );
}

ConsoleRow.propTypes = {
  onSelectDex: PropTypes.func.isRequired
};
