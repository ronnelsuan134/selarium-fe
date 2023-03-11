import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  Select
} from '@chakra-ui/react'
import api from '../../Api'
import { AuthenticatedContext } from '../../Api/context'

const initUserTransfer = {
  email: '',
  amount: ''
}

const initBankTransfer = {
  provider: '',
  bank: '',
  account_number: '',
  amount: ''
}
const BankTransfer = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [bankErrors, setBankErrors] = useState(null)
  const [userTransfer, setUserTransfer] = useState(initUserTransfer)
  const [bankTransfer, setBankTransfer] = useState(initBankTransfer)
  const [banks, setBanks] = useState(null)
  const toast = useToast()
  const isAuth = useContext(AuthenticatedContext)

  useEffect(() => {
    if (!isAuth.isAuthenticated) {
      navigate('/login')
    }
  }, [])

  const onChangeUserTransferForm = e =>
    setUserTransfer(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  const onChangeBankTransferForm = e =>
    setBankTransfer(
      prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }),
      e.target.name === 'provider' ? getBanksByType(e.target.value) : ''
    )

  const getBanksByType = async type => {
    try {
      const { data } = await api.get(`/banks?type=${type}`)
      setBanks(data.result)
    } catch (e) {
      console.log(e.response)
    }
  }

  const onUserTransferHandler = async () => {
    setErrors(null)
    try {
      const { data } = await api.post(`/user-transfer`, userTransfer)
      setUserTransfer(initUserTransfer)

      toast({
        title: data.message,
        position: 'top-right'
      })

      setTimeout(() => {
        toast.closeAll()
      }, 2000)
      setErrors(null)
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }
    }
  }

  const onBankTransferHandler = async () => {
    setBankErrors(null)
    try {
      const { data } = await api.post(`/bank-transfer`, bankTransfer)
      setBankTransfer(initBankTransfer)

      toast({
        title: data.message,
        position: 'top-right'
      })

      setTimeout(() => {
        toast.closeAll()
      }, 2000)
      setBankErrors(null)
    } catch (e) {
      if (e.response.status === 422) {
        setBankErrors(e.response.data.errors)
      }

      if (e.response.status === 400) {
        setBankErrors(e.response.data.errors)
      }
    }
  }

  return (
    <div className='p-7 w-[70%]'>
      <div className='text-2xl font-semibold'> Transfer Money Page </div>
      <div className='w-full p-2 mt-16 border border-gray-300 shadow-md'>
        <Tabs variant='enclosed' size='lg'>
          <TabList>
            <Tab>User Transfer</Tab>
            <Tab>Bank Transfer</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className='w-[50%] p-2'>
                <div className='w-full '>
                  <FormControl isInvalid={errors && errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      value={userTransfer.email}
                      name='email'
                      onChange={onChangeUserTransferForm}
                    />
                    <FormErrorMessage>
                      {errors && errors.email}
                    </FormErrorMessage>
                  </FormControl>
                </div>
                <div className='w-full my-2'>
                  <FormControl isInvalid={errors && errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type='text'
                      value={userTransfer.amount}
                      name='amount'
                      onChange={onChangeUserTransferForm}
                    />
                    <FormErrorMessage>
                      {errors && errors.amount}
                    </FormErrorMessage>
                  </FormControl>
                </div>
                <div className='flex justify-end'>
                  <Button
                    colorScheme='blue'
                    variant='solid'
                    onClick={onUserTransferHandler}
                  >
                    Transfer
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='w-[50%] p-2'>
                <div className='w-full my-1'>
                  <FormControl isInvalid={bankErrors && bankErrors.provider}>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      name='provider'
                      placeholder='Select Provider'
                      value={bankTransfer.provider}
                      onChange={onChangeBankTransferForm}
                    >
                      <option value='instapay'>instapay</option>
                      <option value='pesonet'>pesonet</option>
                    </Select>
                    <FormErrorMessage>
                      {bankErrors && bankErrors.provider}
                    </FormErrorMessage>
                  </FormControl>
                </div>

                {bankTransfer && bankTransfer.provider && (
                  <div className='w-full my-1'>
                    <FormControl isInvalid={bankErrors && bankErrors.bank}>
                      <FormLabel>Banks</FormLabel>
                      <Select
                        name='bank'
                        placeholder='Select Bank'
                        value={bankTransfer.bank}
                        onChange={onChangeBankTransferForm}
                      >
                        {banks &&
                          banks.map((data, index) => (
                            <option key={index} value={data.name}>
                              {data.name}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>
                        {bankErrors && bankErrors.bank}
                      </FormErrorMessage>
                    </FormControl>
                  </div>
                )}
                <div className='w-full my-1'>
                  <FormControl
                    isInvalid={bankErrors && bankErrors.account_number}
                  >
                    <FormLabel>Account Number</FormLabel>
                    <Input
                      type='text'
                      name='account_number'
                      value={bankTransfer.account_number}
                      onChange={onChangeBankTransferForm}
                    />
                    <FormErrorMessage>
                      {bankErrors && bankErrors.account_number}
                    </FormErrorMessage>
                  </FormControl>
                </div>
                <div className='w-full my-1'>
                  <FormControl isInvalid={bankErrors && bankErrors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type='text'
                      name='amount'
                      value={bankTransfer.amount}
                      onChange={onChangeBankTransferForm}
                    />
                    <FormErrorMessage>
                      {bankErrors && bankErrors.amount}
                    </FormErrorMessage>
                  </FormControl>
                </div>
                <div className='flex justify-end'>
                  <Button
                    colorScheme='blue'
                    variant='solid'
                    onClick={onBankTransferHandler}
                  >
                    Transfer
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default BankTransfer
