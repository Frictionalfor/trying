import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const FocusClock = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [3, -3])
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3])

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
      whileHover={{ scale: 1.05 }}
      className="relative w-96 h-96 flex items-center justify-center cursor-pointer"
    >
      {/* Outer glow aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(38, 166, 65, 0.4) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Pulsing glow layer */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-br from-accent-3/30 via-cyan-500/20 to-transparent rounded-full blur-2xl"
      />

      {/* Rotating ring animation */}
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

          {/* Animated progress ring */}
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
            animate={{ strokeDashoffset: circumference * 0.25 }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
            filter="url(#glow)"
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

      {/* Center content with enhanced glow */}
      <motion.div
        whileHover={{
          textShadow: [
            '0 0 20px rgba(38, 166, 65, 0.4)',
            '0 0 40px rgba(34, 211, 238, 0.6)',
            '0 0 20px rgba(38, 166, 65, 0.4)',
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{
              textShadow: [
                '0 0 20px rgba(38, 166, 65, 0.3)',
                '0 0 30px rgba(34, 211, 238, 0.4)',
                '0 0 20px rgba(38, 166, 65, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl font-light text-text-primary tracking-wider mb-3"
          >
            25:00
          </motion.div>
          <div className="text-xs text-text-secondary font-light tracking-widest opacity-70 uppercase">
            Focus Session
          </div>
        </div>
      </motion.div>

      {/* Inner radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(38, 166, 65, 0.15) 0%, rgba(34, 211, 238, 0.1) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}

export default FocusClock
