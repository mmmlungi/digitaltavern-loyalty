import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import Overview from './pages/Overview/Overview'
import ProgramSetup from './pages/ProgramSetup/ProgramSetup'
import Customers from './pages/Customers/Customers'
import Messages from './pages/Messages/Messages'
import Settings from './pages/Settings/Settings'

function App() {
  const [token, setToken] = useState(localStorage.getItem('lt_token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('lt_user') || 'null'))

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem('lt_token', newToken)
    localStorage.setItem('lt_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('lt_token')
    localStorage.removeItem('lt_user')
    setToken(null)
    setUser(null)
  }

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
      <Route path="/" element={token ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
        <Route index element={<Overview />} />
        <Route path="program-setup" element={<ProgramSetup />} />
        <Route path="customers" element={<Customers />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
