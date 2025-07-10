import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Rules from './pages/Rules';

function App() {

   return (
      <div className='App'>
         <Routes>
         <Route path='/' element={<Header />} />
         <Route className="border border-white" path="/rules" element={<Rules />} />
         </Routes>
      </div>
   );
}

export default App;
