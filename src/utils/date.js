export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]
}

export const getTodayDate = () => {
  return formatDate(new Date())
}

export const getYearDates = () => {
  const dates = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)
  
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    dates.push(formatDate(new Date(d)))
  }
  
  return dates
}

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
