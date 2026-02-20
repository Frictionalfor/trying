import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import TaskCard from './TaskCard'

const TaskGrid = () => {
  const { tasks, addTask } = useApp()
  const [newTask, setNewTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTask(newTask.trim())
      setNewTask('')
    }
  }

  const displayTasks = tasks.slice(0, 56)

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col animate-slide-up">
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="w-full glass-card-light text-text-primary px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 placeholder:text-text-secondary/40 text-sm"
        />
      </form>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 gap-3">
          {displayTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {displayTasks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-sm font-light mb-2">No tasks yet</p>
              <p className="text-text-secondary/60 text-xs font-light">Add one to get started</p>
            </div>
          )}
        </div>
      </div>

      {tasks.length > 56 && (
        <p className="text-text-secondary text-xs mt-4 text-center font-light opacity-60">
          Showing 56 of {tasks.length} tasks
        </p>
      )}
    </div>
  )
}

export default TaskGrid
