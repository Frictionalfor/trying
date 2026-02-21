import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import LandingPage from './components/landing/LandingPage'
import Dashboard from './components/layout/Dashboard'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  const handleStart = () => {
    setShowDashboard(true)
  }

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <LandingPage key="landing" onStart={handleStart} />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </AppProvider>
  )
}

export default App
