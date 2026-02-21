import { motion } from 'framer-motion'
import DashboardOverview from './DashboardOverview'
import TaskGrid from '../tasks/TaskGrid'
import VideoPlayer from '../video/VideoPlayer'
import EnhancedPomodoroTimer from '../pomodoro/EnhancedPomodoroTimer'
import ActivityHeatmap from '../heatmap/ActivityHeatmap'
import FloatingSettingsButton from '../common/FloatingSettingsButton'

const Dashboard = () => {
  return (
    <div className="min-h-screen pb-16 bg-gradient-radial">
      {/* Main Dashboard Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-8 py-8"
        style={{ minHeight: '100vh', paddingBottom: '60px' }}
      >
        {/* Dashboard Overview Section (Self-contained header) */}
        <DashboardOverview />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '20px' }}>
          <div className="space-y-5">
            <div style={{ minHeight: '400px' }}>
              <TaskGrid />
            </div>
            <div className="h-80">
              <VideoPlayer />
            </div>
          </div>

          <div className="space-y-5">
            <div style={{ minHeight: '400px' }}>
              <EnhancedPomodoroTimer />
            </div>
            <ActivityHeatmap />
          </div>
        </div>
      </motion.div>

      {/* Floating Settings Button */}
      <FloatingSettingsButton />
    </div>
  )
}

export default Dashboard
