import { useEffect } from 'react'

export const useKeyboardShortcuts = (callbacks) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      const key = e.key.toLowerCase()

      if (callbacks[key]) {
        e.preventDefault()
        callbacks[key]()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [callbacks])
}
