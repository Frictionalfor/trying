import { useState, useEffect, useRef, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { getTodayDate } from '../../utils/date'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const MODES = {
  focus: { label: 'Focus', duration: 25 * 60 },
  short: { label: 'Short', duration: 5 * 60 },
  long: { label: 'Long', duration: 15 * 60 },
}

const PomodoroTimer = () => {
  const { addPomodoroSession } = useApp()
  const [mode, setMode] = useState('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
  const [isActive, setIsActive] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const totalDuration = MODES[mode].duration

  useEffect(() => {
    const saved = loadFromStorage('pomodoroState', null)
    if (saved && saved.isActive && saved.mode) {
      const elapsed = Math.floor((Date.now() - saved.startTime) / 1000)
      const remaining = saved.duration - elapsed
      if (remaining > 0) {
        setMode(saved.mode)
        setTimeLeft(remaining)
        setIsActive(true)
        startTimeRef.current = saved.startTime
      }
    }
  }, [])

  const handleComplete = useCallback(() => {
    setIsActive(false)
    setIsCompleting(true)
    
    if (mode === 'focus') {
      addPomodoroSession(getTodayDate())
    }
    
    setTimeout(() => {
      setIsCompleting(false)
      setTimeLeft(MODES[mode].duration)
    }, 1000)
    
    saveToStorage('pomodoroState', { isActive: false })
  }, [mode, addPomodoroSession])

  useEffect(() => {
    if (isActive) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
      }

      saveToStorage('pomodoroState', {
        isActive: true,
        mode,
        startTime: startTimeRef.current,
        duration: timeLeft,
      })

      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      startTimeRef.current = null
      saveToStorage('pomodoroState', { isActive: false })
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, handleComplete, mode, timeLeft])

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(MODES[mode].duration)
    startTimeRef.current = null
    saveToStorage('pomodoroState', { isActive: false })
  }

  const handleModeChange = (newMode) => {
    if (isActive) return
    setMode(newMode)
    setTimeLeft(MODES[newMode].duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((totalDuration - timeLeft) / totalDuration) * 100
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="glass-card rounded-3xl p-8 animate-slide-up" style={{ animationDelay: '150ms' }}>
      <h3 className="text-sm font-medium text-text-primary mb-6 tracking-wider opacity-90 text-center">
        Pomodoro Timer
      </h3>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
              fill="none"
            />
            
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke={isCompleting ? '#39d353' : '#26a641'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-linear ${
                isActive ? 'glow-green-ring' : ''
              } ${isCompleting ? 'animate-pulse-ring' : ''}`}
              style={{
                filter: isActive ? 'drop-shadow(0 0 8px rgba(38, 166, 65, 0.4))' : 'none',
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-5xl font-light tracking-wider transition-all duration-300 ${
                isActive ? 'text-accent-3' : 'text-text-primary'
              }`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {Object.entries(MODES).map(([key, { label, duration }]) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            disabled={isActive}
            className={`px-5 py-2 rounded-full text-xs font-light transition-all duration-300 ${
              mode === key
                ? 'glass-card-light text-accent-3 ring-1 ring-accent-3/30'
                : 'glass-card-light text-text-secondary hover:text-text-primary'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
          >
            {label} {duration / 60}m
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-8 py-3 glass-card-light rounded-full hover:bg-white/10 transition-all duration-300 text-sm active:scale-95 hover:scale-105"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-8 py-3 glass-card-light rounded-full hover:bg-white/10 transition-all duration-300 text-sm active:scale-95 hover:scale-105"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-8 py-3 glass-card-light rounded-full hover:bg-white/10 transition-all duration-300 text-sm active:scale-95 hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default PomodoroTimer
