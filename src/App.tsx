import Login from '@/pages/Login'
import { Navigate, Route, Routes } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to={'/login'} />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </Router>
    // <div className="app">
    //   <Login />
    // </div>
  )
}

export default App
