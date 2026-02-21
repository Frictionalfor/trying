import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'

const ActivityHeatmap = () => {
  const { tasks, pomodoroStats } = useApp()
  const [hoveredCell, setHoveredCell] = useState(null)

  const heatmapData = useMemo(() => {
    const days = []
    const today = new Date()
    
    // Generate last 90 days
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      // Calculate activity for this day
      const completedTasks = tasks.filter(task => {
        if (task.status !== 'completed' || !task.updatedAt) return false
        const taskDate = new Date(task.updatedAt).toISOString().split('T')[0]
        return taskDate === dateStr
      }).length
      
      const pomodoroSessions = pomodoroStats[dateStr] || 0
      const focusMinutes = pomodoroSessions * 25
      
      // Combined score: tasks + focus minutes
      const activityScore = completedTasks + (focusMinutes / 10) // Normalize minutes
      
      days.push({
        date: dateStr,
        displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completedTasks,
        pomodoroSessions,
        focusMinutes,
        activityScore,
      })
    }
    
    return days
  }, [tasks, pomodoroStats])

  const getIntensityClass = (score) => {
    if (score === 0) return 'bg-white/5'
    if (score < 2) return 'bg-accent-0'
    if (score < 5) return 'bg-accent-1'
    if (score < 10) return 'bg-accent-2'
    return 'bg-accent-3'
  }

  // Group days into weeks for grid layout
  const weeks = useMemo(() => {
    const result = []
    let currentWeek = []
    
    heatmapData.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay()
      
      // Fill empty cells at start of first week
      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null)
        }
      }
      
      currentWeek.push(day)
      
      // Complete week or last day
      if (dayOfWeek === 6 || index === heatmapData.length - 1) {
        result.push([...currentWeek])
        currentWeek = []
      }
    })
    
    return result
  }, [heatmapData])

  return (
    <div className="glass-card rounded-3xl p-4 md:p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
      <h3 className="text-sm font-medium text-text-primary mb-3 md:mb-4 tracking-wider opacity-90">
        Activity Heatmap
      </h3>
      
      <div className="overflow-x-auto hide-scrollbar">
        <div className="inline-flex gap-1 min-w-full">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                    day 
                      ? `${getIntensityClass(day.activityScore)} hover:scale-125 hover:ring-1 hover:ring-white/30 cursor-pointer` 
                      : 'bg-transparent'
                  }`}
                  onMouseEnter={() => day && setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {hoveredCell && (
        <div className="mt-4 glass-card-light rounded-xl p-3 animate-fade-in">
          <p className="text-text-primary text-xs font-medium mb-1.5">
            {hoveredCell.displayDate}
          </p>
          <div className="space-y-0.5 text-xs text-text-secondary">
            <p>{hoveredCell.completedTasks} tasks completed</p>
            <p>{hoveredCell.focusMinutes}m focus time</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 text-xs text-text-secondary opacity-60">
        <span className="font-light">Last 90 days</span>
        <div className="flex items-center gap-2">
          <span className="font-light">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-white/5" />
            <div className="w-3 h-3 rounded-sm bg-accent-0" />
            <div className="w-3 h-3 rounded-sm bg-accent-1" />
            <div className="w-3 h-3 rounded-sm bg-accent-2" />
            <div className="w-3 h-3 rounded-sm bg-accent-3" />
          </div>
          <span className="font-light">More</span>
        </div>
      </div>
    </div>
  )
}

export default ActivityHeatmap
