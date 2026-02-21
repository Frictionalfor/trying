import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import SettingsModal from '../common/SettingsModal'

const PremiumHeader = () => {
  const { tasks, pomodoroStats } = useApp()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getInspirationalQuote = () => {
    const quotes = [
      'Small steps forward',
      'Progress over perfection',
      'One task at a time',
      'Stay calm and productive',
      'Build momentum daily',
      'Consistency is key',
      'Trust the process',
      'Focus on what matters'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  const [quote] = useState(getInspirationalQuote())

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateStats = () => {
    const totalTasks = tasks.length
    const done = tasks.filter(t => t.status === 'completed').length
    const sessions = Object.values(pomodoroStats).reduce((sum, count) => sum + count, 0)
    const focusMinutes = sessions * 25

    return { totalTasks, done, focusMinutes, sessions }
  }

  const stats = calculateStats()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-8 pt-8 pb-16"
      >
        {/* Subtle radial glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(38, 166, 65, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Top Utility Row */}
          <div className="flex items-start justify-between mb-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <img src="/icon.svg" alt="SoutaOS" className="w-7 h-7 opacity-80" />
                <h1 className="text-xl font-medium text-text-primary tracking-tight">
                  Souta<span className="text-accent-3">OS</span>
                </h1>
              </motion.div>

              {/* Settings Icon */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => setShowSettings(true)}
                className="text-text-secondary/40 hover:text-text-secondary/80 transition-colors duration-300"
                aria-label="Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.button>
            </div>

            {/* Right: Clock */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-right"
            >
              <div className="text-5xl font-extralight text-text-primary tracking-tight tabular-nums mb-1">
                {formatTime()}
              </div>
              <div className="text-sm font-light text-text-secondary/50 tracking-wide">
                {formatDate()}
              </div>
            </motion.div>
          </div>

          {/* Main Greeting Section (Hero) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-medium text-text-primary mb-3 tracking-tight">
              {getGreeting()}
            </h2>
            <p className="text-base text-text-secondary/50 font-light tracking-wide">
              {quote}
            </p>
          </motion.div>

          {/* Premium Inline Metric Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-1 text-sm text-text-secondary/60 font-light tracking-wide"
          >
            <span>Today:</span>
            <span className="text-text-primary/70">{stats.focusMinutes}m Focus</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="text-text-primary/70">{stats.sessions} {stats.sessions === 1 ? 'Session' : 'Sessions'}</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="text-text-primary/70">{stats.done} {stats.done === 1 ? 'Task' : 'Tasks'} Done</span>
          </motion.div>
        </div>
      </motion.div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}

export default PremiumHeader
