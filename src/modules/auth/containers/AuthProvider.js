import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context'

const AuthContextProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(true)
  useEffect(() => {}, [])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
