// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import '../App.css'

export default function Navigationbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
    })
    return unsub
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  // If user is logged in send them to the mode select screen (still logged in) 
  // Else send them to the main screen 
  const logoLink = user ? '/modeselect' : '/mainscreen' 

  return (
    <nav className='nav-bar'>
      <div className='nav-left'>
        <Link to={logoLink} className='nav-home'>
          <img src='/images/home.svg' alt='Home' className='nav-icon' />
        </Link>
      </div>
      <div className='nav-right'>
        <Link to='/rules' id="nav-rules" className='nav-link'>Rules</Link>
        {!user && (
          <Link to='/login' id="nav-login" className='nav-link'>Login</Link>
        )}
        {user && (
          <button onClick={handleLogout} className='nav-logout'>
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
