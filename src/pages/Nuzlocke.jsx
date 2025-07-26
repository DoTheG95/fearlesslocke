import React, { useState } from 'react';
import '../App.css';
import ConsoleRow from '../components/ConsoleRow';
import NuzlockeTeamBuilder from '../components/NuzlockeTeamBuilder';

// const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export default function Nuzlocke() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="App">
      {selectedGame ? (
        <div className='selected-game'>
          <NuzlockeTeamBuilder teamBuildFor = {selectedGame}/>
        </div>
      ) : (
        <header className='App-header mainheader'>
          <h1 style={{ margin:0, textAlign:'center' }}>
            Select What game you would like to play
          </h1>
          <div style={{ width:'100%', paddingTop:'6em' }}>
            <ConsoleRow onGameSelect={ setSelectedGame }/>
          </div>
        </header>
      )}
    </div>
  );
}
