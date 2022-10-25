import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const IsAuthenticated: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return <Fragment>{children}</Fragment>
}

export { IsAuthenticated }
