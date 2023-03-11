import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticatedContext } from '../../Api/context'
import api from '../../Api'
const Dashboard = () => {
  const isAuth = useContext(AuthenticatedContext)
  const [transactionHistory, setTransactionHistory] = useState(null)
  const [lastPage, setLastPage] = useState(null)
  const navigate = useNavigate()

  const transHistory = async (currentPage = 1) => {
    try {
      const { data } = await api.get(
        `/transaction-history?per_page=5&current_page=${currentPage}`
      )
      setTransactionHistory(data.result)
      setLastPage(data.result.meta.last_page)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!isAuth.isAuthenticated) {
      navigate('/login')
    }

    transHistory()
    console.log(transactionHistory && transactionHistory.meta)
  }, [])

  const Pagination = () => {
    const pageNumbers = []
    for (let i = 1; i <= lastPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => transHistory(i)}
          className='w-6 mx-1 text-white bg-blue-400 rounded-sm'
        >
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className='p-7'>
      <div className='text-2xl font-semibold'> Transaction History Page </div>
      <div className='mt-16 w-[50%]'>
        <ul className='pt-2'>
          {transactionHistory &&
            transactionHistory.data.map((item, index) => (
              <li
                className={`items-center p-2 mt-5 text-black rounded-md gap-x-4 hover:bg-gray-300 border-2 shadow-sm h-16`}
                key={index}
              >
                <div className='flex justify-between mx-4'>
                  <span className={`text-base font-medium`}>
                    {item.description} - {item.to_account_email}
                  </span>
                  <span className='text-base font-medium'>
                    {item.transaction_type == 'debit'
                      ? -item.amount
                      : +item.amount}
                  </span>
                </div>
                <div className='flex justify-end mx-4'>
                  <span className='text-sm text-gray-400'>
                    Last balance: {item.last_current_balance}
                  </span>
                </div>
              </li>
            ))}
        </ul>
        <div className='flex justify-end p-4'>{Pagination()}</div>
      </div>
    </div>
  )
}

export default Dashboard
