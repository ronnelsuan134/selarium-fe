import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../modules/auth/hooks'

const NotFound = () => {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const goHOmeUrl = isAuth ? '/' : '/login'

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
      <h1 className='font-extrabold tracking-widest text-blue-300 text-9xl'>
        404
      </h1>
      <div className='absolute px-2 text-sm bg-blue-500 rounded rotate-12'>
        <span className='text-white'>Page Not Found</span>
      </div>
      <button className='mt-5' onClick={() => navigate(goHOmeUrl)}>
        <a className='relative inline-block text-sm font-medium text-white group active:text-blue-300 focus:outline-none focus:ring'>
          <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-300 group-hover:translate-y-0 group-hover:translate-x-0'></span>

          <span className='relative block px-8 py-3 bg-blue-500 border border-current'>
            Go Home
          </span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
