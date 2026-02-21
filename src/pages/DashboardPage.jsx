import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import TaskGrid from '../components/tasks/TaskGrid'
import VideoPlayer from '../components/video/VideoPlayer'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'
import ActivityHeatmap from '../components/heatmap/ActivityHeatmap'

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
            <PomodoroTimer />
            <ActivityHeatmap />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardPage
