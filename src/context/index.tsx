import React from 'react'
import { ReactNode } from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { AuthContext, AuthProvider } from './authContext'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
