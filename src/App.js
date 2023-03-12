import React from 'react'

import { useAuth } from './modules/auth/hooks'
import PrivateRoutes from './routes/PrivateRoutes'
import PublicRoutes from './routes/PublicRoutes'
const App = () => {
  const { isAuth } = useAuth()
  return isAuth ? <PrivateRoutes /> : <PublicRoutes />
}
export default App
