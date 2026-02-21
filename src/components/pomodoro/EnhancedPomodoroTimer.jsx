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

  return (
    <div className="glass-card rounded-3xl p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          {isBreak ? 'Break Time' : 'Focus Timer'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFocusMinutes(15)}
            disabled={isActive}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              focusMinutes === 15 && !isBreak
                ? 'bg-accent-3 text-white'
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
                ? 'bg-accent-3 text-white'
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
                ? 'bg-accent-3 text-white'
                : 'glass-card-light text-text-secondary hover:text-text-primary'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            45m
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: isLastMinute ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: isLastMinute ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="text-center"
        >
          <div className="text-7xl font-light text-text-primary tracking-wider mb-4">
            {formatTime(timeRemaining)}
          </div>
          
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent-3 font-medium text-lg"
            >
              {isBreak ? 'Break Complete!' : 'Session Complete!'}
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mt-6">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
            className={`absolute top-0 left-0 h-full rounded-full ${
              isBreak ? 'bg-cyan-500' : 'bg-gradient-to-r from-accent-2 to-accent-3'
            }`}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isActive ? (
          <button
            onClick={startSession}
            className="flex-1 bg-accent-3 hover:bg-accent-4 text-white rounded-xl py-4 font-medium transition-all hover:scale-105"
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
              className="flex-1 glass-card-light hover:bg-white/10 text-text-secondary hover:text-text-primary rounded-xl py-4 font-medium transition-all"
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-4 text-center text-xs text-text-secondary opacity-60">
        <span className="inline-block mr-3">Space: {isActive ? 'Pause' : 'Start'}</span>
        <span className="inline-block mr-3">R: Reset</span>
        <span className="inline-block">Esc: Stop</span>
      </div>
    </div>
  )
}

export default EnhancedPomodoroTimer
