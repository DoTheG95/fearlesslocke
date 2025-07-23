// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Landingpage from './pages/Landingpage';
import Rules from './pages/Rules';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import Modeselect from './pages/Modeselect';
import Fearlesslocke from './pages/Fearlesslocke';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Landingpage />} />
          <Route path='rules' element={<Rules />} />
          <Route path='login' element={<Login />} />
          <Route
            path='modeselect'
            element={
              <ProtectedRoute>
                <Modeselect />
              </ProtectedRoute>
            }
          />
          <Route
            path='fearlesslocke'
            element={
              <ProtectedRoute>
                <Fearlesslocke />
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
