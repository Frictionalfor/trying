import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const DashboardOverview = () => {
  const { tasks, pomodoroStats } = useApp()
  const [quote, setQuote] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const quotes = [
      'Focus on what matters',
      'One task at a time',
      'Progress over perfection',
      'Stay calm and productive',
      'Build momentum daily',
      'Consistency is key',
      'Small steps forward',
      'Trust the process',
    ]
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDay = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long'
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const calculateStats = () => {
    const totalTasks = tasks.length
    const pending = tasks.filter(t => t.status === 'pending').length
    const done = tasks.filter(t => t.status === 'completed').length
    const processing = tasks.filter(t => t.status === 'processing').length
    const sessions = Object.values(pomodoroStats).reduce((sum, count) => sum + count, 0)
    const focusMinutes = sessions * 25

    return { totalTasks, pending, done, processing, focusMinutes, sessions }
  }

  const stats = calculateStats()

  const calculateProgress = () => {
    if (stats.totalTasks === 0) return 0
    return Math.round((stats.done / stats.totalTasks) * 100)
  }

  const progress = calculateProgress()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card rounded-2xl mb-6"
      style={{ padding: '32px 40px' }}
    >
      {/* Top Row: Brand + Clock */}
      <div className="flex items-start justify-between mb-8">
        {/* Left: SoutaOS Logo - Bigger, no hamburger */}
        <div className="flex items-center gap-3">
          <img src="/icon.svg" alt="SoutaOS" className="w-7 h-7 opacity-80" />
          <h1 className="text-[28px] font-bold tracking-[0.08em]">
            <span style={{ color: '#f5f5f5' }}>SOUTA</span>
            <span className="text-accent-3">OS</span>
          </h1>
        </div>

        {/* Right: Date, Day & Time */}
        <div className="text-right">
          <div className="text-2xl font-mono tracking-tight tabular-nums text-text-primary font-light">
            {formatTime()}
          </div>
          <div className="text-sm text-text-secondary/70 mt-1 font-medium">
            {formatDay()}
          </div>
          <div className="text-sm text-text-secondary/60 mt-0.5">
            {formatDate()}
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-text-primary mb-2">
          {getGreeting()}
        </h2>
        <p className="text-base text-text-secondary font-light opacity-70">
          {quote}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">Today's Progress</span>
          <span className="text-sm font-semibold text-text-primary">{progress}%</span>
        </div>
        
        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #26a641 0%, #22d3ee 50%, #39d353 100%)',
              boxShadow: '0 0 12px rgba(38, 166, 65, 0.4)'
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-3 rounded-full shadow-lg glow-green-ring"></div>
          </motion.div>
        </div>
      </div>

      {/* Stats Pills Row */}
      <div className="flex flex-wrap gap-3">
        <StatPill label="Tasks" value={stats.totalTasks} />
        <StatPill label="Pending" value={stats.pending} />
        <StatPill label="Done" value={stats.done} accent={stats.done > 0} />
        <StatPill label="Focus" value={`${stats.focusMinutes}m`} />
        <StatPill label="Sessions" value={stats.sessions} />
      </div>
    </motion.div>
  )
}

const StatPill = ({ label, value, accent }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseInt(value) : value
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    let start = 0
    const duration = 1000
    const increment = numericValue / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        const suffix = typeof value === 'string' ? value.replace(/\d+/g, '') : ''
        setDisplayValue(Math.floor(start) + suffix)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="glass-card-light rounded-full px-5 py-2.5 transition-all duration-300"
    >
      <span className="text-text-secondary text-xs mr-2 font-light tracking-wide">{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-accent-3 glow-green-ring' : 'text-text-primary'}`}>
        {displayValue}
      </span>
    </motion.div>
  )
}

export default DashboardOverview
