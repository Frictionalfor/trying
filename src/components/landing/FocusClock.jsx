import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const FocusClock = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('focus-clock')?.getBoundingClientRect()
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

  const circumference = 2 * Math.PI * 140

  return (
    <motion.div
      id="focus-clock"
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative w-96 h-96 flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-accent-3/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-80 h-80" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#26a641" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#39d353" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
            fill="none"
          />

          <motion.circle
            cx="150"
            cy="150"
            r="140"
            stroke="url(#clockGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            filter="url(#glow)"
          />

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
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-6xl font-light text-text-primary tracking-wider mb-2">
            25:00
          </div>
          <div className="text-sm text-text-secondary font-light tracking-widest opacity-60">
            FOCUS
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(38, 166, 65, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}

export default FocusClock
