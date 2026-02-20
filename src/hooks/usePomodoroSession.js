import { useApp } from '../context/AppContext'
import { getTodayDate } from '../utils/date'

export const usePomodoroSession = () => {
  const { addPomodoroSession } = useApp()

  const completeSession = () => {
    addPomodoroSession(getTodayDate())
  }

  return { completeSession }
}
