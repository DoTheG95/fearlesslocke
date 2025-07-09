import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Rules from './pages/Rules';

function App() {

   const { pathname } = (useLocation() === '/');

   return (
      <div className='App'>
         {pathname && <Header />}
         <Routes>
         <Route path="/rules" element={<Rules />} />
         </Routes>
      </div>
   );
}

export default App;
