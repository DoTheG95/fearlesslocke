// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loginButton = document.getElementById('nav-login');
    if (loginButton) loginButton.classList.add('hidden');
    return () => {
      if (loginButton) loginButton.classList.remove('hidden');
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg('');
    if (newUser && password !== confirmPw) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      if (newUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/nuzlocke');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1.25rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    border: 'none',
    display: 'inline-block',
    textAlign: 'center'
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    maxWidth: '320px',
    marginTop: '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    fontSize: '1rem'
  };

  return (
    <header className='App-header' style={headerStyle}>
      <h1 style={{ margin: 0, textAlign: 'center' }}>
        {newUser ? 'Create Account' : 'Sign In'}
      </h1>
      {errorMsg && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</p>
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div className='input-wrapper'>
          <input
            id ='email_input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className='input-wrapper'>
          <input
            id ='password_input'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <img
            src='/images/eyeicon.svg'
            alt={showPassword ? 'Hide password' : 'Show password'}
            className='toggle-icon'
            onClick={() => setShowPassword(prev => !prev)}
          />
        </div>
        {newUser && (
          <div className='input-wrapper'>
            <input
              id ='confirm_password_input'
              type={showConfirm ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              required
              style={inputStyle}
            />
            <img
              src='/images/eyeicon.svg'
              alt={showConfirm ? 'Hide password' : 'Show password'}
              className='toggle-icon'
              onClick={() => setShowConfirm(prev => !prev)}
            />
          </div>
        )}
        <button type='submit' style={buttonStyle}>
          {newUser ? 'Register' : 'Login'}
        </button>
        <button
          type='button'
          onClick={() => {
            setNewUser(!newUser);
            setErrorMsg('');
            setConfirmPw('');
          }}
          style={{
            ...buttonStyle,
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            background: 'none',
            textDecoration: 'underline',
            marginTop: '0.5rem'
          }}
        >
          {newUser
            ? 'Already have an account? Sign In'
            : "Don't have an account? Register"}
        </button>
      </form>
    </header>
  );
}
