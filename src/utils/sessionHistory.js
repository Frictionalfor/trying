const HISTORY_KEY = 'soutaos_session_history'

export const saveSession = (session) => {
  try {
    const history = getSessionHistory()
    history.push({
      ...session,
      id: Date.now(),
      timestamp: new Date().toISOString()
    })
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('Error saving session:', error)
  }
}

export const getSessionHistory = () => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading session history:', error)
    return []
  }
}

export const getSessionStats = () => {
  const history = getSessionHistory()
  const today = new Date().toDateString()
  
  const todaySessions = history.filter(s => 
    new Date(s.timestamp).toDateString() === today
  )
  
  const totalSessions = history.length
  const totalMinutes = history.reduce((sum, s) => sum + s.duration, 0)
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0)
  
  return {
    totalSessions,
    totalMinutes,
    todaySessions: todaySessions.length,
    todayMinutes,
    averageSessionLength: totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0
  }
}

export const exportSessionData = () => {
  const history = getSessionHistory()
  const stats = getSessionStats()
  
  const data = {
    exportDate: new Date().toISOString(),
    stats,
    sessions: history
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `soutaos-sessions-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}
