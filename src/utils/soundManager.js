class SoundManager {
  constructor() {
    this.audioContext = null
    this.volume = 0.5
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  playCompletionSound() {
    this.init()
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    // Pleasant completion chime (C major chord)
    const now = this.audioContext.currentTime
    
    // First note (C)
    oscillator.frequency.setValueAtTime(523.25, now)
    gainNode.gain.setValueAtTime(this.volume * 0.3, now)
    
    // Second note (E)
    oscillator.frequency.setValueAtTime(659.25, now + 0.1)
    
    // Third note (G)
    oscillator.frequency.setValueAtTime(783.99, now + 0.2)
    
    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
    
    oscillator.type = 'sine'
    oscillator.start(now)
    oscillator.stop(now + 0.8)
  }

  playTickSound() {
    this.init()
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    const now = this.audioContext.currentTime
    
    oscillator.frequency.setValueAtTime(800, now)
    gainNode.gain.setValueAtTime(this.volume * 0.1, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05)
    
    oscillator.type = 'sine'
    oscillator.start(now)
    oscillator.stop(now + 0.05)
  }

  playBreakSound() {
    this.init()
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    const now = this.audioContext.currentTime
    
    // Gentle break notification
    oscillator.frequency.setValueAtTime(440, now)
    gainNode.gain.setValueAtTime(this.volume * 0.2, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
    
    oscillator.type = 'sine'
    oscillator.start(now)
    oscillator.stop(now + 0.5)
  }
}

export const soundManager = new SoundManager()
