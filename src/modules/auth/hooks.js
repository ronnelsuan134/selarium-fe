import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context'
import { checkIfAuthenticated } from '../../common/auth'

export const useAuth = () => useContext(AuthContext)

export const useCheckIfAuthenticated = () => {
  const { setAuth } = useAuth()
  const [isAppReady, setAppReady] = useState(false)

  const checkAuth = async () => {
    if (!checkIfAuthenticated()) {
      setAuth(false)
    }
    setAppReady(true)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return [isAppReady]
}
