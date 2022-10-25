import axios, { AxiosRequestConfig } from 'axios'
import { getUserInfo } from '../context/AuthContext'

let config: Record<string, string> = {
  baseURL: 'http://localhost:3000/',
}

const axiosInstance = axios.create(config)
const axiosWithAuth = axios.create(config)

axiosWithAuth.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = getUserInfo().token
    config.headers = config.headers ?? {}
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response.data
//   },
//   function (error) {
//     return error
//   }
// )
export default axiosInstance
export { axiosWithAuth }
