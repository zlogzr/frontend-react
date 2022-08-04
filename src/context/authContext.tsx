import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import React, { ReactNode, useEffect, useState } from 'react'

interface AuthForm {
  password: string
}

export const AuthContext = React.createContext<
  | {
      isLogin: boolean
      login: (form: AuthForm) => Promise<void>
      // logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)

  const login = (form: AuthForm) =>
    axios
      .post('/api/login', qs.stringify(form), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        if (res.data?.data) {
          setIsLogin(true)
          message.destroy()
          message.success('登陆成功')
        } else {
          message.destroy()
          message.error(res.data?.errMsg)
        }
      })

  useEffect(() => {
    axios.get('/api/isLogin').then(res => {
      if (res.data?.data) {
        setIsLogin(true)
      }
    })
  }, [])

  return <AuthContext.Provider children={children} value={{ isLogin, login }} />
}
