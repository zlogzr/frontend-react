import { useAuth } from '@/context'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const { isLogin } = useAuth()
  if (!isLogin) {
    return (
      <Routes>
        <Route element={<Login />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
