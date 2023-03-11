import React, { useState, useContext } from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { AiFillBank } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { BiNotepad, BiTransfer } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AuthenticatedContext } from '../../Api/context'
import { BiLogOut } from 'react-icons/bi'

import api from '../../Api'
const Sidebar = () => {
  const isAuth = useContext(AuthenticatedContext)
  const [open, setOpen] = useState(true)

  const Logout = async () => {
    try {
      const { data } = await api.post('/logout')

      localStorage.removeItem('token')
      localStorage.removeItem('data')
      localStorage.removeItem('isAuthenticated')
      window.location.href = '/login'
    } catch (e) {}
  }
  const Menus = [
    {
      title: 'Dashboard',
      icon: <RxDashboard />,
      link: '/'
    },
    {
      title: 'Transfer Money',
      icon: <BiTransfer />,
      link: '/transfer'
    },
    {
      title: 'Transaction History',
      icon: <BiNotepad />,
      link: '/transaction-history'
    }
  ]
  return (
    isAuth.isAuthenticated && (
      <div
        className={`bg-gray-50 h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} }
      relative duration-300`}
      >
        <button onClick={() => setOpen(!open)}>
          <FiArrowLeftCircle
            className={`bg-white text-2xl absolute -right-2.5 top-9
            ${!open && 'rotate-180'}`}
          />
        </button>
        <div className='inline-flex items-center'>
          <AiFillBank className='block mx-1 text-5xl text-blue-500 rounded' />
          <h1
            className={`font-bold text-xl origin-left duration-300 ${
              !open && 'scale-0'
            }`}
          >
            SALA<span className='text-blue-500'>RIUM EXAM </span>
          </h1>
        </div>
        <ul className='pt-2'>
          {Menus.map((item, index) => (
            <Link to={`${item.link}`} key={index}>
              <li
                className={`items-center p-2 mt-5 text-black rounded-md cursor-pointer gap-x-4 hover:bg-gray-300 ${
                  !open && 'h-10'
                }`}
              >
                <span className='block float-left mr-1 text-2xl'>
                  {item.icon}
                </span>
                <span className={`text-base font-medium ${!open && 'hidden'}`}>
                  {item.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div className='absolute bottom-32' onClick={Logout}>
          <div className='items-center p-2 mt-5 text-black rounded-md cursor-pointer gap-x-4 hover:bg-gray-300'>
            <span className='block float-left mr-1 text-2xl'>
              <BiLogOut />
            </span>
            <span className={`text-base font-medium ${!open && 'hidden'}`}>
              Logout
            </span>
          </div>
        </div>
      </div>
    )
  )
}

export default Sidebar
