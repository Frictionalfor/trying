import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const FocusClock = () => {
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [isActive, setIsActive] = useState(true) // Auto-start on landing page
  const [timeRemaining, setTimeRemaining] = useState(25 * 60)
  const [isHovering, setIsHovering] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const clockRef = useRef(null)
  const holdTimerRef = useRef(null)
  const sessionEndTimeRef = useRef(Date.now() + 25 * 60 * 1000)
  const animationFrameRef = useRef(null)
  const holdStartTimeRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [2, -2])
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2])

  // Common snap points
  const snapPoints = [10, 15, 25, 30, 45, 60, 75, 90]
  const snapThreshold = 2

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = clockRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Timestamp-based timer for accuracy
  useEffect(() => {
    if (!isActive) return

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
  }, [isActive])

  const handleSessionComplete = () => {
    setIsActive(false)
    setShowCompletion(true)

    // Show completion animation for 2 seconds, then restart
    setTimeout(() => {
      setShowCompletion(false)
      setTimeRemaining(focusMinutes * 60)
      sessionEndTimeRef.current = Date.now() + focusMinutes * 60 * 1000
      setIsActive(true)
    }, 2000)
  }

  const getAngleFromPoint = (clientX, clientY) => {
    const rect = clockRef.current?.getBoundingClientRect()
    if (!rect) return 0

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    angle = (angle + 90 + 360) % 360
    return angle
  }

  const angleToMinutes = (angle) => {
    const minutes = Math.round((angle / 360) * 80) + 10
    return Math.max(10, Math.min(90, minutes))
  }

  const minutesToAngle = (minutes) => {
    return ((minutes - 10) / 80) * 360
  }

  const applySnapping = (minutes) => {
    for (const snap of snapPoints) {
      if (Math.abs(minutes - snap) <= snapThreshold) {
        return snap
      }
    }
    return minutes
  }

  const handleMouseDown = (e) => {
    if (isActive) return

    const rect = clockRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )

    // Check if clicking center (hold to start)
    if (distance < 80) {
      setIsHolding(true)
      holdStartTimeRef.current = Date.now()

      const animateHold = () => {
        if (!holdStartTimeRef.current) return

        const elapsed = Date.now() - holdStartTimeRef.current
        const progress = Math.min(elapsed / 1000, 1)
        setHoldProgress(progress)

        if (progress >= 1) {
          startSession()
        } else {
          holdTimerRef.current = requestAnimationFrame(animateHold)
        }
      }

      holdTimerRef.current = requestAnimationFrame(animateHold)
    } else {
      // Dragging to set time
      setIsDragging(true)
      const angle = getAngleFromPoint(e.clientX, e.clientY)
      const minutes = applySnapping(angleToMinutes(angle))
      setFocusMinutes(minutes)
      setTimeRemaining(minutes * 60)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || isActive) return

    const angle = getAngleFromPoint(e.clientX, e.clientY)
    const minutes = applySnapping(angleToMinutes(angle))
    setFocusMinutes(minutes)
    setTimeRemaining(minutes * 60)
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    if (isHolding) {
      setIsHolding(false)
      holdStartTimeRef.current = null
      if (holdTimerRef.current) {
        cancelAnimationFrame(holdTimerRef.current)
      }
      setHoldProgress(0)
    }
  }

  const startSession = () => {
    setIsHolding(false)
    setHoldProgress(0)
    setIsActive(true)
    sessionEndTimeRef.current = Date.now() + focusMinutes * 60 * 1000
    holdStartTimeRef.current = null
    if (holdTimerRef.current) {
      cancelAnimationFrame(holdTimerRef.current)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isHolding])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentAngle = isActive
    ? (timeRemaining / (focusMinutes * 60)) * 360
    : minutesToAngle(focusMinutes)

  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (currentAngle / 360) * circumference

  const isLastMinute = isActive && timeRemaining <= 60
  const glowIntensity = isActive ? Math.max(0.3, 1 - (timeRemaining / (focusMinutes * 60))) : 0.2

  return (
    <motion.div
      ref={clockRef}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-96 h-96 flex items-center justify-center cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label={`Focus timer: ${formatTime(timeRemaining)} remaining`}
      aria-live="polite"
      tabIndex={0}
    >
      {/* Outer glow aura - intensity based on progress */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.15, 1] : [1, 1.1, 1],
          opacity: isActive ? [glowIntensity * 0.4, glowIntensity * 0.6, glowIntensity * 0.4] : [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: isLastMinute ? 1 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(38, 166, 65, ${glowIntensity}) 0%, rgba(34, 211, 238, ${glowIntensity * 0.5}) 50%, transparent 70%)`,
        }}
      />

      {/* Pulsing glow layer */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.08, 1] : [1, 1.05, 1],
          opacity: isActive ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isLastMinute ? 0.8 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-br from-accent-3/30 via-cyan-500/20 to-transparent rounded-full blur-2xl pointer-events-none"
      />

      {/* Hover glow */}
      <motion.div
        animate={{
          opacity: isHovering && !isActive ? 0.3 : 0,
          scale: isHovering && !isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-accent-3/20 rounded-full blur-2xl pointer-events-none"
      />

      {/* Main SVG Circle */}
      <motion.div
        animate={{
          rotate: isActive ? 0 : 360,
        }}
        transition={{
          duration: 60,
          repeat: isActive ? 0 : Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg className="w-80 h-80" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#26a641" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#39d353" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="2"
            fill="none"
          />

          {/* Progress arc */}
          <motion.circle
            cx="150"
            cy="150"
            r="140"
            stroke="url(#clockGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#glow)"
            transition={{
              strokeDashoffset: {
                duration: 0.5,
                ease: "linear"
              }
            }}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '150px 150px',
            }}
          />

          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x1 = 150 + 130 * Math.cos(angle)
            const y1 = 150 + 130 * Math.sin(angle)
            const x2 = 150 + 140 * Math.cos(angle)
            const y2 = 150 + 140 * Math.sin(angle)

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </motion.div>

      {/* Center content */}
      <motion.div
        animate={{
          scale: isHolding ? 0.95 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center relative">
          {/* Hold to start charging ring */}
          {isHolding && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <svg className="w-40 h-40 absolute" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(38, 166, 65, 0.3)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * holdProgress)}
                  strokeLinecap="round"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50px 50px',
                    filter: 'drop-shadow(0 0 8px rgba(38, 166, 65, 0.6))'
                  }}
                />
              </svg>
            </motion.div>
          )}

          {/* Time display */}
          <motion.div
            animate={{
              textShadow: isActive
                ? [
                    `0 0 20px rgba(38, 166, 65, ${glowIntensity * 0.4})`,
                    `0 0 30px rgba(34, 211, 238, ${glowIntensity * 0.6})`,
                    `0 0 20px rgba(38, 166, 65, ${glowIntensity * 0.4})`,
                  ]
                : [
                    '0 0 20px rgba(38, 166, 65, 0.3)',
                    '0 0 30px rgba(34, 211, 238, 0.4)',
                    '0 0 20px rgba(38, 166, 65, 0.3)',
                  ],
              scale: isLastMinute ? [1, 1.05, 1] : 1,
            }}
            transition={{
              textShadow: {
                duration: isLastMinute ? 1 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="text-6xl font-light text-text-primary tracking-wider mb-3"
          >
            {formatTime(timeRemaining)}
          </motion.div>

          {/* Status text */}
          <motion.div
            animate={{
              opacity: isHolding || showCompletion ? 0 : 1,
            }}
            className="text-xs text-text-secondary font-light tracking-widest opacity-70 uppercase"
          >
            {isActive ? 'Focus Session' : isDragging ? 'Set Duration' : 'Hold to Start'}
          </motion.div>

          {/* Hold instruction */}
          {isHolding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-accent-3 font-light tracking-widest uppercase"
            >
              Starting...
            </motion.div>
          )}

          {/* Completion message */}
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-sm text-accent-3 font-medium tracking-widest uppercase"
            >
              Session Complete
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Inner radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: isActive ? [0.3, 0.5, 0.3] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: isLastMinute ? 2 : 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(38, 166, 65, ${glowIntensity * 0.15}) 0%, rgba(34, 211, 238, ${glowIntensity * 0.1}) 40%, transparent 70%)`,
        }}
      />

      {/* Completion animation */}
      {showCompletion && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-accent-3/30 pointer-events-none"
        />
      )}

      {/* Idle breathing animation */}
      {!isActive && !isDragging && !isHolding && (
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-accent-3/10 rounded-full blur-xl pointer-events-none"
        />
      )}
    </motion.div>
  )
}

export default FocusClock
