import { useEffect, useState } from 'react'

export const useNotification = () => {
  const [permission, setPermission] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result
    }
    return permission
  }

  const showNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icon.svg',
        badge: '/icon.svg',
        ...options
      })
    }
  }

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: 'Notification' in window
  }
}
