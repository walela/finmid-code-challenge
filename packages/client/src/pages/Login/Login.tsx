import * as React from 'react'
import axios, { axiosWithAuth } from '../../utils/axios'
import sleep from '../../utils/sleep'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../../context/AuthContext'
import splash from '../../assets/splash.jpg'
import logo from '../../assets/wallet.png'

type LoginData = {
  email: string
  password: string
}

function Login() {
  const { setUserInfo } = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  async function getUserToken(data: LoginData) {
    const response: any = await axios.post('/login', data)
    setUserInfo({ token: response?.data.token })
    return response?.data
  }

  async function getUserDetails(data: LoginData) {
    const token = await getUserToken(data)
    const { data: users } = await axiosWithAuth.get('/users')
    const loggedInUser = users.find((user: any) => user.email === data.email)
    const updatedUserInfo = Object.assign(token, loggedInUser)
    return updatedUserInfo
  }

  async function handleLogin(data: LoginData) {
    setLoading(true)
    await sleep(3000)
    try {
      const userInfo = await getUserDetails(data)
      if (userInfo) {
        setLoading(false)
        setUserInfo(userInfo)
        navigate('/dashboard')
      } else {
        throw new Error('User not found')
      }
    } catch (error: any) {
      toast.error(`${error.response.data.payload.message}. Please try again.`)
      setLoading(false)
      console.error('error', error.response.data.payload.message)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-full w-full h-screen flex">
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full min-h-screen w-full object-cover"
            src={splash}
            alt="Abstract splash image"
          />
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 justify-center py-12 lg:flex-1">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-10 w-auto" src={logo} alt="FinBank logo" />
              <h2 className="mt-8 text-3xl font-bold text-gray-800">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(handleLogin as any)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    {errors.email && (
                      <div className="text-red-600 text-sm flex gap-1 items-center">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        {errors.email.message as any}
                      </div>
                    )}
                    <div className="mt-1">
                      <input
                        type="email"
                        autoComplete="email"
                        className="input-primary"
                        {...register('email', {
                          required: 'Please enter an email address',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    {errors.password && (
                      <div className="text-red-600 text-sm flex gap-1 items-center">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        {errors.password.message as any}
                      </div>
                    )}
                    <div className="mt-1">
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="input-primary"
                        {...register('password', {
                          required: 'Please enter a password',
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-finmidpurple focus:ring-finmindpurple-light border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900">
                        Stay signed in for a week
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}>
                      {loading ? (
                        <div role="status">
                          <svg
                            className="inline mr-2 w-5 h-5 text-gray-200 animate-spin fill-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span>Sign in</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
