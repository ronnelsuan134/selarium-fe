import React, { useEffect, useState, useContext } from 'react'
import api from '../../common/api'

const Dashboard = () => {
  const [data, setAccountNumber] = useState(null)
  useEffect(() => {
    const bankAccount = async () => {
      const { data } = await api.get('/user-bank-account')
      setAccountNumber(data.result)
    }

    bankAccount()
  }, [])

  return (
    <div className='p-7'>
      <div className='text-2xl font-semibold'> Dashboard Page </div>
      <div className='p-2 mt-16 border-l-4 border-blue-500 rounded-sm shadow-md w-96 h-28'>
        <div className='p-2'>
          <span className='text-xl font-semibold'> Current Balance</span>
        </div>
        <div className='ml-3 -mt-3'>
          <span className='text-xs text-gray-400'>
            {data && data.account_number}
          </span>
        </div>
        <div className='flex items-end justify-end'>
          <span className='font-medium text-gray-500 '>
            <span className='text-sm'>PHP </span>
            <span className='text-xl'> {data && data.balance}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
