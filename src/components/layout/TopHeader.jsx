import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TopHeader = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

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

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-16 border-b border-white/5 backdrop-blur-xl bg-black/20"
    >
      <div className="h-full max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        {/* Left: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-6">
          {/* Sidebar Toggle */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="text-text-secondary/60 hover:text-text-primary transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="SoutaOS" className="w-6 h-6 opacity-80" />
            <h1 className="text-lg font-semibold text-text-primary tracking-tight">
              Souta<span className="text-accent-3">OS</span>
            </h1>
          </div>
        </div>

        {/* Right: Time Display Only */}
        <div className="text-2xl font-light text-text-primary tracking-tight tabular-nums">
          {formatTime()}
        </div>
      </div>
    </motion.header>
  )
}

export default TopHeader
