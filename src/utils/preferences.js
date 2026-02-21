const PREFERENCES_KEY = 'soutaos_preferences'

const defaultPreferences = {
  soundEnabled: true,
  soundVolume: 0.5,
  notificationsEnabled: false,
  theme: 'dark',
  customPresets: [
    { name: 'Quick Focus', duration: 15 },
    { name: 'Standard', duration: 25 },
    { name: 'Deep Work', duration: 45 },
    { name: 'Extended', duration: 60 }
  ],
  breakDuration: 5,
  autoStartBreak: true
}

export const getPreferences = () => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY)
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences
  } catch (error) {
    console.error('Error loading preferences:', error)
    return defaultPreferences
  }
}

export const savePreferences = (preferences) => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

export const updatePreference = (key, value) => {
  const preferences = getPreferences()
  preferences[key] = value
  savePreferences(preferences)
  return preferences
}
