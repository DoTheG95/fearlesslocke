import React, { useState, useEffect } from 'react';
import '../App.css';
import ConsoleRow from '../components/ConsoleRow';

const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export default function Nuzlocke() {


  return (
    <div className="App">
        <header className='App-header mainheader' >
            <h1 style={{ margin: 0, textAlign: 'center' }}>
                Select What game you would like to play
            </h1>
            <div style={{width:"100%", paddingTop:"6em" }} >
                <ConsoleRow />
            </div>
        </header>
    </div>
  );
}
