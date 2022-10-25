import * as React from 'react'
import splash from '../../assets/splash.jpg'
import logo from '../../assets/wallet.png'

function Login() {
  return (
    <React.Fragment>
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
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        autoComplete="email"
                        className="input-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        autoComplete="current-password"
                        className="input-primary"
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
    </React.Fragment>
  )
}

export default Login
