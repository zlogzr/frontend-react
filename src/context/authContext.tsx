import { get, post } from '@/utils/request'
import { message } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthForm {
  password: string
}

export const AuthContext = React.createContext<
  | {
      isLogin: boolean | undefined
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    get('/api/isLogin').then(res => {
      if (res?.data) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [])

  // 登陆
  const login = (form: AuthForm) =>
    post('/api/login', form).then(res => {
      if (res?.data) {
        setIsLogin(true)
        navigate('/home')
        message.destroy()
        message.success('登陆成功')
      } else {
        message.destroy()
        message.error(res?.errMsg)
      }
    })

  // 登出
  const logout = () =>
    get('/api/logout').then(res => {
      if (res?.data) {
        setIsLogin(false)
        navigate('/login')
      } else {
        message.destroy()
        message.error(res?.errMsg)
      }
    })

  return isLogin === undefined ? null : (
    <AuthContext.Provider children={children} value={{ isLogin, login, logout }} />
  )
}
