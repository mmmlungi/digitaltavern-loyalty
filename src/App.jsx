import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Overview from './pages/Overview/Overview'
import ProgramSetup from './pages/ProgramSetup/ProgramSetup'
import Customers from './pages/Customers/Customers'
import Messages from './pages/Messages/Messages'
import Settings from './pages/Settings/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
