import { useApp } from '../../context/AppContext'

const TaskCard = ({ task, index }) => {
  const { updateTaskStatus, deleteTask } = useApp()

  const statusConfig = {
    pending: {
      color: 'text-text-secondary',
      bg: 'glass-card-light',
      nextStatus: 'processing',
      nextLabel: 'Start',
    },
    processing: {
      color: 'text-text-primary',
      bg: 'glass-card-light',
      nextStatus: 'completed',
      nextLabel: 'Done',
    },
    completed: {
      color: 'text-accent-3',
      bg: 'glass-card-light glow-green-subtle',
      nextStatus: 'pending',
      nextLabel: 'Reset',
    },
  }

  const config = statusConfig[task.status]

  return (
    <div 
      className={`${config.bg} rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <p className={`${config.color} mb-3 text-sm font-light leading-relaxed ${
        task.status === 'completed' ? 'line-through opacity-60' : ''
      }`}>
        {task.title}
      </p>
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => updateTaskStatus(task.id, config.nextStatus)}
          className="flex-1 px-3 py-1.5 text-xs glass-card-light rounded-full hover:bg-white/10 transition-all duration-200 active:scale-95"
        >
          {config.nextLabel}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1.5 text-xs glass-card-light rounded-full hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard
