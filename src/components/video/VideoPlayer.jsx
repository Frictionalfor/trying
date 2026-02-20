import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const VideoPlayer = () => {
  const { videoUrl, setVideoUrl } = useApp()
  const [inputUrl, setInputUrl] = useState('')

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const videoId = extractVideoId(inputUrl)
    if (videoId) {
      setVideoUrl(`https://www.youtube.com/embed/${videoId}`)
      setInputUrl('')
    }
  }

  const handleClear = () => {
    setVideoUrl('')
    setInputUrl('')
  }

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col animate-slide-up" style={{ animationDelay: '100ms' }}>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste YouTube URL..."
          className="flex-1 glass-card-light text-text-primary px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-sm placeholder:text-text-secondary/40"
        />
        <button
          type="submit"
          className="px-6 py-3 glass-card-light rounded-full hover:bg-white/10 transition-all duration-300 text-sm active:scale-95 whitespace-nowrap"
        >
          Load
        </button>
        {videoUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 glass-card-light rounded-full hover:bg-white/10 transition-all duration-300 text-sm active:scale-95"
          >
            Clear
          </button>
        )}
      </form>

      {videoUrl ? (
        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 animate-fade-in glow-green-subtle">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex-1 glass-card-light rounded-2xl flex flex-col items-center justify-center gap-4">
          <div className="text-6xl opacity-20">▷</div>
          <div className="text-center">
            <p className="text-text-primary text-base mb-2 font-light">Focus Video</p>
            <p className="text-text-secondary text-sm font-light opacity-60">Paste a YouTube URL to begin</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
