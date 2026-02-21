import { motion } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'
import FocusClock from './FocusClock'

const LandingPage = ({ onStart }) => {
  const features = [
    {
      title: 'Task Management',
      description: 'Organize tasks with three states: pending, processing, and completed.',
    },
    {
      title: 'Pomodoro Timer',
      description: 'Focus sessions with circular progress visualization and three time modes.',
    },
    {
      title: 'Focus Video Integration',
      description: 'Embed YouTube videos directly in your workspace for background focus.',
    },
    {
      title: 'Activity Heatmap',
      description: 'Track your daily productivity with a 90-day visual activity grid.',
    },
    {
      title: 'Daily Progress Tracking',
      description: 'Monitor completion rates and focus minutes with live performance stats.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-radial relative overflow-hidden"
    >
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-16"
          >
            <img src="/icon.svg" alt="SoutaOS" className="w-10 h-10 opacity-90" />
            <h1 className="text-3xl font-bold text-text-primary tracking-wide">SoutaOS</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-7xl font-semibold text-text-primary mb-8 leading-tight tracking-wide">
                Focus Without Noise.
              </h2>
              
              <p className="text-xl text-text-secondary font-light leading-relaxed mb-12 opacity-90">
                SoutaOS combines task management, focus sessions, and progress tracking into a single minimal workspace.
              </p>
              
              <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative glass-card-light px-12 py-4 rounded-full text-lg font-medium text-text-primary transition-all duration-300 overflow-hidden group"
                style={{
                  boxShadow: '0 4px 20px rgba(38, 166, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <span className="relative z-10">Start</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-2/20 to-accent-3/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:flex items-center justify-center"
            >
              <FocusClock />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-32"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <h3 className="text-lg font-medium text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-light leading-relaxed opacity-85">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-24 mb-12 flex justify-center"
          >
            <div className="glass-card rounded-full px-8 py-4 inline-flex items-center gap-4">
              <p className="text-sm font-medium text-text-secondary tracking-wide">
                Made by Frictional
              </p>
              <motion.a
                href="https://github.com/Frictionalfor"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(38, 166, 65, 0))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(38, 166, 65, 0.4))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(38, 166, 65, 0))'
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-primary"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LandingPage
