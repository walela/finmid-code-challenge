import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import { useAuth } from '@/context/AuthContext'
import React, { Fragment, FunctionComponent } from 'react'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth redirectTo="/login">
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

type RequireAuthProps = {
  children: React.ReactNode
  redirectTo: string
}

const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
  let { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to={redirectTo} />
  )
}

const Page404 = () => {
  return (
    <h1 style={{ textAlign: 'center', marginTop: 100 }}>
      Page Not Found <Link to="/">Home</Link>{' '}
    </h1>
  )
}

export default App
