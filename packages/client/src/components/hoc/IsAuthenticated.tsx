import { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

type Props = {
  children: React.ReactNode
}

const IsAuthenticated: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return <Fragment>{children}</Fragment>
}

export { IsAuthenticated }
