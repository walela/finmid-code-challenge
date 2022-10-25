import * as React from 'react'
import axios, { axiosWithAuth } from '../../utils/axios'
import sleep from '../../utils/sleep'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useAuth, getUserInfo } from '../../context/AuthContext'
import splash from '../../assets/splash.jpg'
import logo from '../../assets/wallet.png'

function Login() {
  const { setUserInfo } = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const skedaddle = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const handleLogin = (data: any) => {
    setLoading(true)
    sleep(3000).then(() => {
      axios
        .post('/login', data)
        .then((res: any) => {
          setUserInfo({ token: res?.token })
        })
        .then(() => {
          axiosWithAuth.get('/users').then((res) => {
            const loggedInUser = res.data.find(
              (user: any) => user.email === data.email
            )
            let token = getUserInfo()
            let updatedUserInfo = Object.assign(token, loggedInUser)
            setUserInfo(updatedUserInfo)
          })
        })
        .catch(({ response }) => {
          console.log(response)
        })
    })
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
                  onSubmit={handleSubmit(handleLogin)}>
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
                        name="remember-me"
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
                    <button type="submit" className="btn-primary">
                      Sign in
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
