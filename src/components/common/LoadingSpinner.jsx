import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-radial">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-16 h-16" viewBox="0 0 50 50">
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#26a641" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#39d353" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#spinnerGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="80, 200"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(38, 166, 65, 0.4))'
            }}
          />
        </svg>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
