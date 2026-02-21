import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<DashboardPage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  )
}

export default App
