import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { loginPagePath } from '@constants/path'

const ProtectedRoute = ({ component, isAuthOnly = true }) => {
  const { isAuth } = useSelector((store) => store.rootReducer.user)
  const location = useLocation()
  const from = location.state?.from || '/'

  if (!isAuthOnly && isAuth) {
    return <Navigate to={from} replace />
  }

  if (!isAuth && isAuthOnly) {
    return <Navigate to={loginPagePath} state={{ from: location }} replace />
  }

  return component
}

export default ProtectedRoute
