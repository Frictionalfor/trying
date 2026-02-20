import Header from './Header'
import TaskGrid from '../tasks/TaskGrid'
import VideoPlayer from '../video/VideoPlayer'
import PomodoroTimer from '../pomodoro/PomodoroTimer'
import Heatmap from '../heatmap/Heatmap'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-radial p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6 flex flex-col">
            <div className="flex-1 min-h-[500px]">
              <TaskGrid />
            </div>
            <div className="h-[400px]">
              <VideoPlayer />
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <PomodoroTimer />
            <div className="flex-1 min-h-[400px]">
              <Heatmap />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
