import { useAuth } from '@/context'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const { isLogin } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin])
  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
