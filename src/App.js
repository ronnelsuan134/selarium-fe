import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import TransactionHistory from './pages/TransactionHistory'
import BankTransfer from './pages/BankTransfer'

const App = () => {
  return (
    <Router>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/transfer' element={<BankTransfer />} />
            <Route
              path='/transaction-history'
              element={<TransactionHistory />}
            />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
