import { useApp } from '../../context/AppContext'

const TaskCard = ({ task, index }) => {
  const { updateTaskStatus, deleteTask } = useApp()

  const statusConfig = {
    pending: {
      label: 'Not Started',
      color: 'text-text-secondary',
      bg: 'glass-card-light',
      dotColor: 'bg-text-secondary/40',
      glow: '',
      nextStatus: 'processing',
      nextLabel: 'Start',
    },
    processing: {
      label: 'Pending',
      color: 'text-yellow-200',
      bg: 'glass-card-light',
      dotColor: 'bg-yellow-400/60',
      glow: 'ring-1 ring-yellow-500/20 shadow-lg shadow-yellow-500/10',
      nextStatus: 'completed',
      nextLabel: 'Done',
    },
    completed: {
      label: 'Done',
      color: 'text-accent-3',
      bg: 'glass-card-light',
      dotColor: 'bg-accent-3',
      glow: 'ring-1 ring-accent-3/20 shadow-lg shadow-accent-3/10',
      nextStatus: 'pending',
      nextLabel: 'Reset',
    },
  }

  const config = statusConfig[task.status]

  return (
    <div 
      className={`${config.bg} ${config.glow} rounded-2xl p-5 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:-translate-y-0.5 group`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-2 h-2 rounded-full ${config.dotColor} mt-1.5 flex-shrink-0 transition-all duration-500`} />
        <p className={`${config.color} text-sm font-light leading-relaxed flex-1 transition-all duration-500 ${
          task.status === 'completed' ? 'line-through opacity-60' : ''
        }`}>
          {task.title}
        </p>
      </div>
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-5">
        <button
          onClick={() => updateTaskStatus(task.id, config.nextStatus)}
          className="flex-1 px-3 py-2 text-xs glass-card-light rounded-full hover:bg-white/10 transition-all duration-200 active:scale-95"
        >
          {config.nextLabel}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-2 text-xs glass-card-light rounded-full hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard
