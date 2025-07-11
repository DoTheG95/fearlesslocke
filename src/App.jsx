import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Landingpage';
import Rules from './pages/Rules';
import Login from './pages/Login';
import MainScreen from './pages/Mainscreen';
import ProtectedRoute from './components/ProtectedRoute'
import Navigationbar from './pages/Navigationbar';


function App() {

   return (
      <div className='App'>
        < Navigationbar />
         <Routes>
         <Route path='/' element={<Header />} />
         <Route className="border border-white" path="/rules" element={<Rules />} />
         <Route path="/login" element={<Login />} />
         <Route path="/Mainscreen" element={
          <ProtectedRoute>
            <MainScreen />
          </ProtectedRoute>
          } />
         </Routes>
      </div>
   );
}

export default App;
