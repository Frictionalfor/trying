import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { getPreferences } from '../../utils/preferences'
import { saveSession } from '../../utils/sessionHistory'
import { soundManager } from '../../utils/soundManager'
import { useNotification } from '../../hooks/useNotification'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'

const EnhancedPomodoroTimer = () => {
  const [preferences, setPreferences] = useState(getPreferences())
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(25 * 60)
  const [showCompletion, setShowCompletion] = useState(false)
  
  const sessionEndTimeRef = useRef(null)
  const sessionStartTimeRef = useRef(null)
  const animationFrameRef = useRef(null)
  const { showNotification, requestPermission } = useNotification()

  // Load preferences
  useEffect(() => {
    const prefs = getPreferences()
    setPreferences(prefs)
    soundManager.setVolume(prefs.soundVolume)
  }, [])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    ' ': () => {
      if (isActive) {
        togglePause()
      } else {
        startSession()
      }
    },
    'r': () => resetTimer(),
    'escape': () => {
      if (isActive) {
        resetTimer()
      }
    }
  })

  // Timestamp-based timer
  useEffect(() => {
    if (!isActive || isPaused) return

    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((sessionEndTimeRef.current - now) / 1000))
      
      setTimeRemaining(remaining)
      
      if (remaining === 0) {
        handleSessionComplete()
      } else {
        animationFrameRef.current = requestAnimationFrame(updateTimer)
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateTimer)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, isPaused])

  const startSession = () => {
    setIsActive(true)
    setIsPaused(false)
    sessionStartTimeRef.current = Date.now()
    sessionEndTimeRef.current = Date.now() + timeRemaining * 1000
    
    if (preferences.notificationsEnabled) {
      requestPermission()
    }
  }

  const togglePause = () => {
    if (isPaused) {
      // Resume
      sessionEndTimeRef.current = Date.now() + timeRemaining * 1000
      setIsPaused(false)
    } else {
      // Pause
      setIsPaused(true)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setIsBreak(false)
    setTimeRemaining(focusMinutes * 60)
    sessionEndTimeRef.current = null
    sessionStartTimeRef.current = null
  }

  const handleSessionComplete = () => {
    setIsActive(false)
    setShowCompletion(true)

    // Save session to history
    if (!isBreak) {
      saveSession({
        type: 'focus',
        duration: focusMinutes,
        completedAt: new Date().toISOString()
      })
    }

    // Play sound
    if (preferences.soundEnabled) {
      if (isBreak) {
        soundManager.playBreakSound()
      } else {
        soundManager.playCompletionSound()
      }
    }

    // Show notification
    if (preferences.notificationsEnabled) {
      showNotification(
        isBreak ? 'Break Complete!' : 'Focus Session Complete!',
        {
          body: isBreak 
            ? 'Time to get back to work!' 
            : `Great job! You completed a ${focusMinutes}-minute focus session.`,
          tag: 'session-complete'
        }
      )
    }

    // Auto-start break or reset
    setTimeout(() => {
      setShowCompletion(false)
      
      if (!isBreak && preferences.autoStartBreak) {
        // Start break
        setIsBreak(true)
        setTimeRemaining(preferences.breakDuration * 60)
        setFocusMinutes(preferences.breakDuration)
        sessionEndTimeRef.current = Date.now() + preferences.breakDuration * 60 * 1000
        setIsActive(true)
      } else {
        // Reset to focus
        setIsBreak(false)
        setTimeRemaining(focusMinutes * 60)
      }
    }, 2000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeRemaining / (focusMinutes * 60)) * 100
  const isLastMinute = isActive && timeRemaining <= 60

  // Calculate circle progress (adjusted for mobile size)
  const radius = 82
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="glass-card rounded-3xl p-4 md:p-8 animate-fade-in" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)' }}>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary">
          {isBreak ? 'Break Time' : 'Focus Timer'}
        </h2>
        <div className="flex gap-1.5 md:gap-2">
          <button
            onClick={() => setFocusMinutes(15)}
            disabled={isActive}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              focusMinutes === 15 && !isBreak
                ? 'bg-accent-3 text-white glow-green-subtle'
                : 'glass-card-light text-text-secondary hover:text-text-primary'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            15m
          </button>
          <button
            onClick={() => setFocusMinutes(25)}
            disabled={isActive}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              focusMinutes === 25 && !isBreak
                ? 'bg-accent-3 text-white glow-green-subtle'
                : 'glass-card-light text-text-secondary hover:text-text-primary'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            25m
          </button>
          <button
            onClick={() => setFocusMinutes(45)}
            disabled={isActive}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              focusMinutes === 45 && !isBreak
                ? 'bg-accent-3 text-white glow-green-subtle'
                : 'glass-card-light text-text-secondary hover:text-text-primary'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            45m
          </button>
        </div>
      </div>

      {/* Circular Timer Display */}
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <div className="relative" style={{ width: '180px', height: '180px' }}>
          {/* SVG Circle Progress */}
          <svg 
            className="transform -rotate-90" 
            width="180" 
            height="180"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#26a641" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#39d353" stopOpacity="0.5" />
              </linearGradient>
              <filter id="timerGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background circle (track) */}
            <circle
              cx="90"
              cy="90"
              r="82"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="5"
              fill="none"
            />
            
            {/* Progress circle */}
            <circle
              cx="90"
              cy="90"
              r="82"
              stroke="url(#timerGradient)"
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#timerGlow)"
              style={{
                transition: 'stroke-dashoffset 1s linear'
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Time display */}
            <motion.div
              animate={{
                scale: isLastMinute ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.8,
                repeat: isLastMinute ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <div 
                className="font-light font-mono tabular-nums"
                style={{ 
                  fontSize: '36px', 
                  color: '#f5f5f5',
                  fontWeight: 300,
                  lineHeight: 1
                }}
              >
                {formatTime(timeRemaining)}
              </div>
              
              {/* Session label */}
              <div 
                className="mt-2 uppercase tracking-[0.15em]"
                style={{
                  fontSize: '10px',
                  color: '#555555',
                  fontWeight: 500
                }}
              >
                {isBreak ? 'BREAK' : 'FOCUS'}
              </div>
            </motion.div>

            {/* Completion message */}
            {showCompletion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute text-xs md:text-sm font-medium"
                style={{ color: '#ffffff' }}
              >
                {isBreak ? 'Break Complete!' : 'Session Complete!'}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isActive ? (
          <button
            onClick={startSession}
            className="flex-1 rounded-xl py-4 font-medium transition-all hover:scale-105 bg-accent-3 text-white glow-green-subtle"
          >
            Start Session
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className="flex-1 glass-card-light hover:bg-white/10 text-text-primary rounded-xl py-4 font-medium transition-all"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 rounded-xl py-4 font-medium transition-all hover:bg-accent-3/10"
              style={{
                background: 'transparent',
                border: '1px solid rgba(38, 166, 65, 0.5)',
                color: '#ffffff'
              }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-4 text-center text-xs text-text-secondary opacity-60 hidden md:block">
        <span className="inline-block mr-3">Space: {isActive ? 'Pause' : 'Start'}</span>
        <span className="inline-block mr-3">R: Reset</span>
        <span className="inline-block">Esc: Stop</span>
      </div>
    </div>
  )
}

export default EnhancedPomodoroTimer
