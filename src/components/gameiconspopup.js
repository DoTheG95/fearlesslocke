import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const gameIconsByConsole = {
  gbc: [
    { src: '/images/games/gbc/red.ico',   alt: 'Pokémon Red' },
    { src: '/images/games/gbc/blue.ico',  alt: 'Pokémon Blue' },
    { src: '/images/games/gbc/green.ico', alt: 'Pokémon Green' },
    { src: '/images/games/gbc/yellow.ico',alt: 'Pokémon Yellow' },
    { src: '/images/games/gbc/gold.ico',  alt: 'Pokémon Gold' },
    { src: '/images/games/gbc/silver.ico',alt: 'Pokémon Silver' },
    { src: '/images/games/gbc/crystal.ico',alt: 'Pokémon Crystal' },
  ],
  gba: [
    { src: '/images/games/gba/ruby.ico',       alt: 'Pokémon Ruby' },
    { src: '/images/games/gba/sapphire.ico',   alt: 'Pokémon Sapphire' },
    { src: '/images/games/gba/emerald.ico',    alt: 'Pokémon Emerald' },
    { src: '/images/games/gba/fire-red.ico',   alt: 'Pokémon Fire Red' },
    { src: '/images/games/gba/leaf-green.ico', alt: 'Pokémon Leaf Green' },
  ],
  nds: [
    { src: '/images/games/nds/diamond.ico', alt: 'Pokémon Diamond' },
    { src: '/images/games/nds/pearl.ico',   alt: 'Pokémon Pearl' },
    { src: '/images/games/nds/platinum.ico',alt: 'Pokémon Platinum' },
    { src: '/images/games/nds/heartgold.ico',alt: 'Pokémon Heart Gold' },
    { src: '/images/games/nds/soulsilver.ico',alt:'Pokémon Soul Silver' },
    { src: '/images/games/nds/black.ico',   alt: 'Pokémon Black' },
    { src: '/images/games/nds/white.ico',   alt: 'Pokémon White' },
    { src: '/images/games/nds/black2.ico',  alt: 'Pokémon Black 2' },
    { src: '/images/games/nds/white2.ico',  alt: 'Pokémon White 2' },
  ],
  tds: [
    { src: '/images/games/3ds/x.png',            alt: 'Pokémon X' },
    { src: '/images/games/3ds/y.png',            alt: 'Pokémon Y' },
    { src: '/images/games/3ds/sun.png',          alt: 'Pokémon Sun' },
    { src: '/images/games/3ds/moon.png',         alt: 'Pokémon Moon' },
    { src: '/images/games/3ds/us.png',    alt: 'Pokémon Ultra Sun' },
    { src: '/images/games/3ds/um.png',   alt: 'Pokémon Ultra Moon' },
    { src: '/images/games/3ds/or.png',   alt: 'Pokémon Omega Ruby' },
    { src: '/images/games/3ds/as.png', alt: 'Pokémon Alpha Sapphire' },
  ],
  switch: [
    { src: '/images/games/switch/sword.png',   alt: 'Pokémon Sword' },
    { src: '/images/games/switch/shield.png',  alt: 'Pokémon Shield' },
  ]
};

export default function GameIconsPopup({ consoleKey }) {
  const icons = gameIconsByConsole[consoleKey];
  if (!icons) return null;

  return (
    <div className="game-popup">
      {icons.map((g, i) => (
        <img key={i} src={g.src} alt={g.alt} className="game-icon" />
      ))}
    </div>
  );
}

GameIconsPopup.propTypes = {
  consoleKey: PropTypes.string, 
};

GameIconsPopup.defaultProps = {
  consoleKey: null
};
