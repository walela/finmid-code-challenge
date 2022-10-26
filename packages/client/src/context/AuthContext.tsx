import * as React from 'react'
import type { User } from '@/constants'

type AuthContextProps = {
  user: User
  isAuthenticated: boolean
  setUserInfo: (userInfo: Record<string, string>) => void
  removeUserInfo: () => void
}

const AuthContext = React.createContext<AuthContextProps | null>(null)

const getUserInfo = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState(getUserInfo)

  const isAuthenticated = () => {
    if (user && user.token) return true
    return false
  }

  const setUserInfo = (userInfo: Record<string, string>) => {
    localStorage.setItem('user', JSON.stringify(userInfo))
    setUser(userInfo)
  }

  const removeUserInfo = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    setUserInfo,
    removeUserInfo,
    isAuthenticated: isAuthenticated(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export { AuthProvider, useAuth, getUserInfo }
