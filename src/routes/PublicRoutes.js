import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import NotFound from '../components/common/NotFound'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default PublicRoutes
