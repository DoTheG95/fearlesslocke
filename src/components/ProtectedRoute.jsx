// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser]       = useState(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) return null
  return user ? children : <Navigate to='/login' replace />
}
