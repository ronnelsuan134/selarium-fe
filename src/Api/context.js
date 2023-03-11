import React, { createContext } from 'react'

export const AuthenticatedContext = createContext({
  isAuthenticated: localStorage.getItem('isAuthenticated') ?? false
})
