import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use(request => {
  const token = localStorage.getItem('token') ?? false
  if (token) {
    request.headers['Authorization'] = `Bearer ${
      JSON.parse(token).access_token
    }`
  }
  // const token = JSON.parse(localStorage.getItem('token')).access_token ?? false
  // request.headers.common['Access-Control-Allow-Origin'] = '*';

  return request
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status == 401) {
      localStorage.removeItem('token') // Remove session storage when 401 error detected.
      localStorage.removeItem('data') // Remove session storage when 401 error detected.
      localStorage.removeItem('isAuthenticated') // Remove session storage when 401 error detected.
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default instance
