import React, { useEffect, useState, useContext } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import api from '../../common/api'
import { AuthenticatedContext } from '../../common/context'

const initLoginForm = {
  email: '',
  password: ''
}

const Login = () => {
  const [dataLogin, loginForm] = useState(initLoginForm)
  const [errors, setErrors] = useState(null)
  const [unauthorize, setUnauthorize] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {}, [])

  const onChangeLoginForm = e =>
    loginForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  const onLoginHandler = async () => {
    setErrors(null)
    setUnauthorize(null)
    try {
      const { data } = await api.post(`/login`, dataLogin)
      localStorage.setItem('token', JSON.stringify(data.result.authorization))
      localStorage.setItem('data', JSON.stringify(data.result.user))
      localStorage.setItem('isAuthenticated', true)
      window.location.href = '/'
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }

      if (e.response.status === 401) {
        setUnauthorize(e.response.data.errors)
      }
    }
  }

  return (
    <div
      className={`flex items-center justify-center w-full h-screen overflow-hidden`}
    >
      <div className='flex flex-col items-center justify-center border rounded-sm shadow-lg w-96 h-96'>
        <div className='mb-10'>
          <h1 className='text-3xl font-bold'>
            <span> SALA</span>
            <span className='text-blue-500'>RIUM </span>
            <span className='text-blue-500'> EXAM </span>
          </h1>
        </div>
        <span className='w-[80%] mx-auto rounded-sm text-lg font-serif text-center text-white bg-red-400'>
          {unauthorize}
        </span>

        <div className='px-6 mx-auto mt-2 w-96'>
          <FormControl isInvalid={errors && errors.email}>
            <FormLabel> Email * </FormLabel>
            <Input
              type='text'
              borderColor={'gray.300'}
              name='email'
              value={dataLogin.email}
              onChange={onChangeLoginForm}
            />
            <FormErrorMessage>{errors && errors.email}</FormErrorMessage>
          </FormControl>
        </div>
        <div className='px-6 mx-auto mt-2 w-96'>
          <FormControl isInvalid={errors && errors.password}>
            <FormLabel> Password * </FormLabel>
            <Input
              type='password'
              borderColor={'gray.300'}
              name='password'
              value={dataLogin.password}
              onChange={onChangeLoginForm}
            />
            <FormErrorMessage>{errors && errors.password}</FormErrorMessage>
          </FormControl>
        </div>
        <Stack direction='row' spacing={4} align='center' className='mt-4'>
          <Button colorScheme='blue' variant='solid' onClick={onLoginHandler}>
            Login
          </Button>
        </Stack>
      </div>
    </div>
  )
}
export default Login
