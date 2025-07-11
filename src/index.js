// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './pages/Landingpage';
import Rules from './pages/Rules';
import Login from './pages/Login';
import MainScreen from './pages/Mainscreen';
import ProtectedRoute from './components/ProtectedRoute';
import Navigationbar from './pages/Navigationbar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Header />} />
          <Route path='rules' element={<Rules />} />
          <Route path='login' element={<Login />} />
          <Route
            path='Mainscreen'
            element={
              <ProtectedRoute>
                <MainScreen />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
