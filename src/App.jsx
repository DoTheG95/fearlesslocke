import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Rules from './pages/Rules';
import LoginForm from './components/LoginForm';
import MainScreen from './Mainscreen';

function App() {

   return (
      <div className='App'>
         <Routes>
         <Route path='/' element={<Header />} />
         <Route className="border border-white" path="/rules" element={<Rules />} />
         <Route path="/loginform" element={<LoginForm />} />
         <Route path="/Mainscreen" element={<MainScreen />} />
         </Routes>
      </div>
   );
}

export default App;
