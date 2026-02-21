import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hero radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent-3/10 via-cyan-500/5 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-accent-2/12 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-3/8 via-cyan-500/5 to-transparent rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl"
      ></motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,68,41,0.12),transparent_50%)]"></div>
      
      <motion.div
        animate={{
          opacity: [0.25, 0.4, 0.25],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(38,166,65,0.04) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(34,211,238,0.03) 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}

export default AnimatedBackground
