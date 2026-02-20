import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { getYearDates } from '../../utils/date'

const Heatmap = () => {
  const { pomodoroStats } = useApp()
  const [hoveredCell, setHoveredCell] = useState(null)

  const heatmapData = useMemo(() => {
    const dates = getYearDates()
    const weeks = []
    let currentWeek = []

    dates.forEach((date, index) => {
      const dayOfWeek = new Date(date).getDay()
      
      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null)
        }
      }

      currentWeek.push({
        date,
        count: pomodoroStats[date] || 0,
      })

      if (dayOfWeek === 6 || index === dates.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })

    return weeks
  }, [pomodoroStats])

  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-accent-0'
    if (count <= 2) return 'bg-accent-1'
    if (count <= 4) return 'bg-accent-2'
    if (count <= 6) return 'bg-accent-3'
    return 'bg-accent-4'
  }

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-xs font-light text-text-secondary mb-5 tracking-widest opacity-70">
        Activity Heatmap
      </h3>
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="inline-flex gap-1.5">
          {heatmapData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 rounded-md transition-all duration-300 ${
                    day ? `${getIntensityColor(day.count)} hover:scale-110 hover:ring-2 hover:ring-accent-3/40 cursor-pointer` : 'bg-transparent'
                  }`}
                  title={day ? `${day.date}: ${day.count} sessions • ${day.count * 25}m` : ''}
                  onMouseEnter={() => day && setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ 
                    animationDelay: `${weekIndex * 8 + dayIndex * 3}ms`,
                    animation: 'fadeIn 0.4s ease-out forwards'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {hoveredCell && (
        <div className="mt-4 glass-card-light rounded-2xl p-3 text-center animate-fade-in">
          <p className="text-text-primary text-sm font-light">
            {hoveredCell.count} sessions • {hoveredCell.count * 25}m
          </p>
          <p className="text-text-secondary text-xs mt-1 opacity-60">{hoveredCell.date}</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-5 text-xs text-text-secondary font-light opacity-60">
        <span>Less</span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-4 h-4 rounded-md bg-accent-${level} transition-transform duration-200 hover:scale-110`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default Heatmap
