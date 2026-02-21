import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'

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

const Header = () => {
  const { tasks, pomodoroStats } = useApp()
  const [quote, setQuote] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

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
    <div className="glass-card rounded-3xl p-8 pt-6 animate-fade-in relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src="/icon.svg" alt="SoutaOS" className="w-9 h-9 opacity-90" />
          <h1 className="text-3xl font-bold text-text-primary tracking-wide">SoutaOS</h1>
        </div>
        
        <div className="text-right">
          <p className="text-4xl font-light text-text-primary tracking-wider tabular-nums">
            {formatTime()}
          </p>
          <p className="text-base font-light text-text-primary opacity-80 mt-1.5 tracking-wide">
            {formatDate()}
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-xl font-medium text-text-primary mb-2">{getGreeting()}</p>
        <p className="text-base font-light text-text-secondary italic opacity-80 mb-4">{quote}</p>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-light text-text-secondary opacity-60">Today's Progress</span>
            <span className="text-xs font-light text-text-secondary opacity-60">{progress}%</span>
          </div>
          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-2 to-accent-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-3 rounded-full shadow-lg shadow-accent-3/50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-32 bg-accent-2/5 blur-3xl rounded-full"></div>
        </div>
        
        <div className="relative flex flex-wrap gap-3">
          <StatPill label="Tasks" value={stats.totalTasks} />
          <StatPill label="Pending" value={stats.pending} />
          <StatPill label="Done" value={stats.done} accent={stats.done > 0} />
          <StatPill label="Focus" value={`${stats.focusMinutes}m`} />
          <StatPill label="Sessions" value={stats.sessions} />
        </div>
      </div>
    </div>
  )
}

const StatPill = ({ label, value, accent, glow }) => {
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
    <div 
      className={`glass-card-light rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
        glow ? 'glow-green' : ''
      }`}
    >
      <span className="text-text-secondary text-xs mr-2.5 font-light tracking-wide">{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-accent-3' : 'text-text-primary'}`}>
        {displayValue}
      </span>
    </div>
  )
}

export default Header
