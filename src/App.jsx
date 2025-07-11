import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigationbar from './pages/Navigationbar';

function App() {
  return (
    <div className='App'>
      <Navigationbar />
      <Outlet />
    </div>
  );
}

export default App;
