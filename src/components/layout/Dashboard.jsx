import { motion } from 'framer-motion'
import Header from './Header'
import TaskGrid from '../tasks/TaskGrid'
import VideoPlayer from '../video/VideoPlayer'
import EnhancedPomodoroTimer from '../pomodoro/EnhancedPomodoroTimer'
import ActivityHeatmap from '../heatmap/ActivityHeatmap'

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-radial p-6 pt-4 md:p-8 md:pt-6"
    >
      <div className="max-w-[1400px] mx-auto space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskGrid />
            <div className="h-80">
              <VideoPlayer />
            </div>
          </div>

          <div className="space-y-6">
            <EnhancedPomodoroTimer />
            <ActivityHeatmap />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard
