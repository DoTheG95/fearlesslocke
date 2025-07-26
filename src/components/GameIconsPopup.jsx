import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const gameIconsByConsole = {
  gbc: [
    [
      { src: '/images/games/gbc/red.ico', alt: 'Pokémon Red', dexid: 2, region: "kanto" },
      { src: '/images/games/gbc/blue.ico', alt: 'Pokémon Blue', dexid: 2, region: "kanto" },
      { src: '/images/games/gbc/green.ico', alt: 'Pokémon Green', dexid: 2, region: "kanto" },
      { src: '/images/games/gbc/yellow.ico', alt: 'Pokémon Yellow', dexid: 2, region: "kanto" }
    ],[
      { src: '/images/games/gbc/gold.ico', alt: 'Pokémon Gold', dexid: 3, region: "johto" },
      { src: '/images/games/gbc/silver.ico', alt: 'Pokémon Silver', dexid: 3, region: "johto" },
      { src: '/images/games/gbc/crystal.ico', alt: 'Pokémon Crystal', dexid: 3, region: "johto" }
    ]
  ],

  gba: [
    [
      { src: '/images/games/gba/ruby.ico', alt: 'Pokémon Ruby', dexid: 4, region: "hoenn" },
      { src: '/images/games/gba/sapphire.ico', alt: 'Pokémon Sapphire', dexid: 4, region: "hoenn" },
      { src: '/images/games/gba/emerald.ico', alt: 'Pokémon Emerald', dexid: 4, region: "hoenn" }
    ],[
      { src: '/images/games/gba/fire-red.ico', alt: 'Pokémon Fire Red', dexid: 2, region: "kanto" },
      { src: '/images/games/gba/leaf-green.ico', alt: 'Pokémon Leaf Green', dexid: 2, region: "kanto" }
    ]
  ],

  nds: [
    [
      { src: '/images/games/nds/diamond.ico', alt: 'Pokémon Diamond', dexid: 5, region: "sinnoh" },
      { src: '/images/games/nds/pearl.ico', alt: 'Pokémon Pearl', dexid: 5, region: "sinnoh" },
      { src: '/images/games/nds/platinum.ico', alt: 'Pokémon Platinum', dexid: 5, region: "sinnoh" }
    ],[
      { src: '/images/games/nds/heartgold.ico', alt: 'Pokémon Heart Gold', dexid: 3, region: "johto" },
      { src: '/images/games/nds/soulsilver.ico', alt: 'Pokémon Soul Silver', dexid: 3, region: "johto" }
    ],[
      { src: '/images/games/nds/black.ico', alt: 'Pokémon Black', dexid: 8, region: "unova" },
      { src: '/images/games/nds/white.ico', alt: 'Pokémon White', dexid: 8, region: "unova" },
      { src: '/images/games/nds/black2.ico', alt: 'Pokémon Black 2', dexid: 8, region: "unova"},
      { src: '/images/games/nds/white2.ico', alt: 'Pokémon White 2', dexid: 8, region: "unova" }
    ]
  ],

  tds: [
    [
      { src: '/images/games/3ds/x.png', alt: 'Pokémon X', dexid: 12, region: "kalos" },
      { src: '/images/games/3ds/y.png', alt: 'Pokémon Y', dexid: 12, region: "kalos" }
    ],[
      { src: '/images/games/3ds/or.png', alt: 'Pokémon Omega Ruby', dexid: 15, region: "hoenn" },
      { src: '/images/games/3ds/as.png', alt: 'Pokémon Alpha Sapphire', dexid: 15, region: "hoenn" }
    ],[
      { src: '/images/games/3ds/sun.png', alt: 'Pokémon Sun', dexid: 16, region: "alola" },
      { src: '/images/games/3ds/moon.png', alt: 'Pokémon Moon', dexid: 16, region: "alola" },
      { src: '/images/games/3ds/us.png', alt: 'Pokémon Ultra Sun', dexid: 16, region: "alola" },
      { src: '/images/games/3ds/um.png', alt: 'Pokémon Ultra Moon', dexid: 16, region: "alola" }
    ]
  ],

  switch: [
    [
      { src: '/images/games/switch/sword.png', alt: 'Pokémon Sword', dexid: 27 },
      { src: '/images/games/switch/shield.png', alt: 'Pokémon Shield', dexid: 27 }
    ],[
      { src: '/images/games/switch/scarlet.png', alt: 'Pokémon Scarlet', dexid: 30 },
      { src: '/images/games/switch/violet.png', alt: 'Pokémon Violet', dexid: 30 }
    ]
  ]
};

export default function GameIconsPopup({
  consoleKey,
  onGameClick
}) {
  const rows = gameIconsByConsole[consoleKey]
  if (!rows) return null

  return (
    <div className='game-popup'>
      {rows.map((row, i) => (
        <div key={i} className='game-popup-row'>
          {row.map((g, j) => (
            <img
              key={j}
              src={g.src}
              alt={g.alt}
              className='game-icon'
              onClick={() => onGameClick(g)}  // <-- attach click
            />
          ))}
        </div>
      ))}
    </div>
  )
}

GameIconsPopup.propTypes = {
  consoleKey : PropTypes.string,
  onGameClick: PropTypes.func.isRequired
}

GameIconsPopup.defaultProps = {
  consoleKey : null,
  onGameClick: () => {}
}