import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import Sidebar from '../components/common/Sidebar'
import Dashboard from '../pages/Dashboard'
import TransactionHistory from '../pages/TransactionHistory'
import BankTransfer from '../pages/BankTransfer'
import NotFound from '../components/common/NotFound'
import { useCheckIfAuthenticated } from '../modules/auth/hooks'

const PrivateRoutes = () => {
  const [isAppLoaded] = useCheckIfAuthenticated()
  return !isAppLoaded ? (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        type='messaenger'
      />
    </div>
  ) : (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transfer' element={<BankTransfer />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default PrivateRoutes
