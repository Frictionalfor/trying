import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getPreferences, savePreferences } from '../../utils/preferences'
import { exportSessionData, clearHistory, getSessionStats } from '../../utils/sessionHistory'

const SettingsModal = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState(getPreferences())
  const [stats, setStats] = useState(getSessionStats())
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    if (isOpen) {
      setPreferences(getPreferences())
      setStats(getSessionStats())
    }
  }, [isOpen])

  const handleSave = () => {
    savePreferences(preferences)
    onClose()
  }

  const handleExport = () => {
    exportSessionData()
  }

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all session history? This cannot be undone.')) {
      clearHistory()
      setStats(getSessionStats())
    }
  }

  const updatePref = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            {['general', 'presets', 'stats'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'text-accent-3 border-b-2 border-accent-3'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Sound Settings */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Sound</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <label className="text-text-secondary">Enable Sound</label>
                  <button
                    onClick={() => updatePref('soundEnabled', !preferences.soundEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.soundEnabled ? 'bg-accent-3' : 'bg-bg-border'
                    }`}
                  >
                    <motion.div
                      animate={{ x: preferences.soundEnabled ? 24 : 2 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                {preferences.soundEnabled && (
                  <div>
                    <label className="text-text-secondary text-sm mb-2 block">
                      Volume: {Math.round(preferences.soundVolume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={preferences.soundVolume}
                      onChange={(e) => updatePref('soundVolume', parseFloat(e.target.value))}
                      className="w-full accent-accent-3"
                    />
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notifications</h3>
                <div className="flex items-center justify-between">
                  <label className="text-text-secondary">Browser Notifications</label>
                  <button
                    onClick={() => updatePref('notificationsEnabled', !preferences.notificationsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.notificationsEnabled ? 'bg-accent-3' : 'bg-bg-border'
                    }`}
                  >
                    <motion.div
                      animate={{ x: preferences.notificationsEnabled ? 24 : 2 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>
              </div>

              {/* Break Timer */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Break Timer</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <label className="text-text-secondary">Auto-start Break</label>
                  <button
                    onClick={() => updatePref('autoStartBreak', !preferences.autoStartBreak)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.autoStartBreak ? 'bg-accent-3' : 'bg-bg-border'
                    }`}
                  >
                    <motion.div
                      animate={{ x: preferences.autoStartBreak ? 24 : 2 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div>
                  <label className="text-text-secondary text-sm mb-2 block">
                    Break Duration: {preferences.breakDuration} minutes
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={preferences.breakDuration}
                    onChange={(e) => updatePref('breakDuration', parseInt(e.target.value))}
                    className="w-full accent-accent-3"
                  />
                </div>
              </div>

              {/* Theme */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Theme</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => updatePref('theme', 'dark')}
                    className={`flex-1 glass-card-light rounded-lg p-4 transition-all ${
                      preferences.theme === 'dark' ? 'ring-2 ring-accent-3' : ''
                    }`}
                  >
                    <div className="text-text-primary font-medium">Dark</div>
                    <div className="text-text-secondary text-sm">Current theme</div>
                  </button>
                  <button
                    onClick={() => updatePref('theme', 'light')}
                    className={`flex-1 glass-card-light rounded-lg p-4 transition-all opacity-50 cursor-not-allowed ${
                      preferences.theme === 'light' ? 'ring-2 ring-accent-3' : ''
                    }`}
                    disabled
                  >
                    <div className="text-text-primary font-medium">Light</div>
                    <div className="text-text-secondary text-sm">Coming soon</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Presets Tab */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Timer Presets</h3>
              <p className="text-text-secondary text-sm mb-4">
                Customize your focus session durations
              </p>
              
              {preferences.customPresets.map((preset, index) => (
                <div key={index} className="glass-card-light rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="text-text-primary font-medium">{preset.name}</div>
                    <div className="text-text-secondary text-sm">{preset.duration} minutes</div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={preset.duration}
                      onChange={(e) => {
                        const newPresets = [...preferences.customPresets]
                        newPresets[index].duration = parseInt(e.target.value)
                        updatePref('customPresets', newPresets)
                      }}
                      className="w-20 bg-bg-secondary text-text-primary rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card-light rounded-lg p-4">
                  <div className="text-text-secondary text-sm mb-1">Total Sessions</div>
                  <div className="text-3xl font-bold text-accent-3">{stats.totalSessions}</div>
                </div>
                
                <div className="glass-card-light rounded-lg p-4">
                  <div className="text-text-secondary text-sm mb-1">Total Minutes</div>
                  <div className="text-3xl font-bold text-accent-3">{stats.totalMinutes}</div>
                </div>
                
                <div className="glass-card-light rounded-lg p-4">
                  <div className="text-text-secondary text-sm mb-1">Today's Sessions</div>
                  <div className="text-3xl font-bold text-text-primary">{stats.todaySessions}</div>
                </div>
                
                <div className="glass-card-light rounded-lg p-4">
                  <div className="text-text-secondary text-sm mb-1">Today's Minutes</div>
                  <div className="text-3xl font-bold text-text-primary">{stats.todayMinutes}</div>
                </div>
              </div>

              <div className="glass-card-light rounded-lg p-4">
                <div className="text-text-secondary text-sm mb-1">Average Session</div>
                <div className="text-2xl font-bold text-text-primary">{stats.averageSessionLength} minutes</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex-1 glass-card-light rounded-lg px-4 py-3 text-text-primary hover:text-accent-3 transition-colors font-medium"
                >
                  Export Data
                </button>
                <button
                  onClick={handleClearHistory}
                  className="flex-1 glass-card-light rounded-lg px-4 py-3 text-text-secondary hover:text-red-400 transition-colors font-medium"
                >
                  Clear History
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 glass-card-light rounded-lg px-6 py-3 text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-accent-3 rounded-lg px-6 py-3 text-white hover:bg-accent-4 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SettingsModal
