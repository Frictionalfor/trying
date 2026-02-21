import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '../components/landing/AnimatedBackground'
import FocusClock from '../components/landing/FocusClock'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Stay Organized',
      description: 'Manage tasks with a clean three-state system.',
    },
    {
      title: 'Deep Work Timer',
      description: 'Built-in Pomodoro with circular progress visualization.',
    },
    {
      title: 'Visualize Consistency',
      description: 'Track daily productivity with a 90-day activity heatmap.',
    },
    {
      title: 'Background Focus Mode',
      description: 'Embed YouTube videos for ambient study or work sessions.',
    },
  ]

  const handleLaunchApp = () => {
    navigate('/app')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-radial relative overflow-hidden"
    >
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Brand Identity */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="pt-16 pb-10 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <motion.img 
                src="/icon.svg" 
                alt="SoutaOS" 
                className="w-12 h-12 opacity-90"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <h1 className="text-[2.25rem] font-extrabold text-text-primary tracking-[0.03em]" style={{ marginTop: '3px' }}>
                Souta<span className="text-accent-3">OS</span>
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="flex items-center justify-center px-6 pt-8 pb-16" style={{ minHeight: '70vh' }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-6xl font-semibold text-text-primary mb-8 leading-tight tracking-wide">
                  A workspace for uninterrupted focus.
                </h2>
                
                <p className="text-lg text-text-secondary font-light leading-relaxed mb-10 opacity-90">
                  Task management, deep focus sessions, and progress tracking in one place.
                </p>
                
                <div className="flex flex-col items-start gap-2">
                  <motion.button
                    onClick={handleLaunchApp}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative glass-card-light px-10 py-3.5 rounded-full text-base font-medium text-text-primary transition-all duration-300 overflow-hidden group"
                    style={{
                      boxShadow: '0 4px 20px rgba(38, 166, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    <span className="relative z-10">Launch App</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-3/20 via-cyan-500/15 to-accent-3/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <p className="text-xs text-text-secondary/60 font-light ml-2">
                    No signup required
                  </p>
                </div>
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
          </div>
        </div>

        {/* Product Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="py-16 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Task Board Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: '0 12px 32px rgba(38, 166, 65, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
                className="glass-card rounded-xl p-6 transition-all duration-300"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div>
                  <div className="text-xs text-accent-3 font-medium mb-4 tracking-wider">TASK BOARD</div>
                  <div className="space-y-2.5">
                    <motion.div 
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                      className="glass-card-light rounded-lg p-3 border-l-2 border-yellow-500/50"
                    >
                      <div className="text-xs text-text-secondary">Pending</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                      className="glass-card-light rounded-lg p-3 border-l-2 border-blue-500/50"
                    >
                      <div className="text-xs text-text-secondary">In Progress</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                      className="glass-card-light rounded-lg p-3 border-l-2 border-accent-3/50"
                    >
                      <div className="text-xs text-text-secondary">Done</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Pomodoro Timer Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: '0 12px 32px rgba(38, 166, 65, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
                className="glass-card rounded-xl p-6 transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-accent-3/10 via-cyan-500/5 to-transparent rounded-full blur-2xl"
                />
                <div className="relative">
                  <div className="text-xs text-accent-3 font-medium mb-4 tracking-wider">POMODORO</div>
                  <div className="flex items-center justify-center py-2">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#26a641" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#39d353" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#miniGradient)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 70 }}
                        transition={{
                          duration: 2,
                          ease: "easeOut"
                        }}
                        style={{
                          filter: 'drop-shadow(0 0 6px rgba(38, 166, 65, 0.4))'
                        }}
                      />
                    </svg>
                  </div>
                  <div className="text-center mt-1">
                    <div className="text-xl font-light text-text-primary">25:00</div>
                  </div>
                </div>
              </motion.div>

              {/* Activity Heatmap Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: '0 12px 32px rgba(38, 166, 65, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
                className="glass-card rounded-xl p-6 transition-all duration-300"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div className="text-xs text-accent-3 font-medium mb-4 tracking-wider">90-DAY HEATMAP</div>
                <div className="grid grid-cols-10 gap-1.5">
                  {[...Array(50)].map((_, i) => {
                    const intensity = Math.random()
                    const color = intensity > 0.7 ? 'bg-accent-3' : 
                                 intensity > 0.4 ? 'bg-accent-2' : 
                                 intensity > 0.2 ? 'bg-accent-1' : 'bg-accent-0'
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
                        className={`w-2 h-2 rounded-sm ${color} cursor-pointer`}
                      />
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="py-16 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    boxShadow: '0 12px 32px rgba(38, 166, 65, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                  className="glass-card rounded-xl p-7 transition-all duration-300 cursor-pointer"
                  style={{
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-light leading-relaxed opacity-85">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="py-20 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-semibold text-text-primary mb-8 leading-tight">
              Built for focused builders.
            </h3>
            <motion.button
              onClick={handleLaunchApp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative glass-card-light px-12 py-4 rounded-full text-base font-medium text-text-primary transition-all duration-300 overflow-hidden group"
              style={{
                boxShadow: '0 4px 20px rgba(38, 166, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <span className="relative z-10">Launch App</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-3/20 via-cyan-500/15 to-accent-3/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 px-6"
        >
          <div className="max-w-7xl mx-auto flex justify-center">
            <div className="glass-card rounded-full px-6 py-3 inline-flex items-center gap-3">
              <p className="text-xs font-medium text-text-secondary tracking-wide">
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
                  width="20"
                  height="20"
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LandingPage
