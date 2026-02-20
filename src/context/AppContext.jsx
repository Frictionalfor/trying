import { createContext, useContext, useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadFromStorage('tasks', []))
  const [pomodoroStats, setPomodoroStats] = useState(() => loadFromStorage('pomodoroStats', {}))
  const [videoUrl, setVideoUrl] = useState(() => loadFromStorage('videoUrl', ''))

  useEffect(() => {
    saveToStorage('tasks', tasks)
  }, [tasks])

  useEffect(() => {
    saveToStorage('pomodoroStats', pomodoroStats)
  }, [pomodoroStats])

  useEffect(() => {
    saveToStorage('videoUrl', videoUrl)
  }, [videoUrl])

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status, updatedAt: new Date().toISOString() } : task
    ))
  }

  const addPomodoroSession = (date) => {
    setPomodoroStats(prev => ({
      ...prev,
      [date]: (prev[date] || 0) + 1
    }))
  }

  const value = {
    tasks,
    addTask,
    deleteTask,
    updateTaskStatus,
    pomodoroStats,
    addPomodoroSession,
    videoUrl,
    setVideoUrl,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
