# SoutaOS

A minimal, elegant workspace for uninterrupted focus. Built for developers, students, and remote workers who value deep work.

## Features

### 🎯 Enhanced Focus Timer
- Interactive circular timer with drag-to-set functionality
- Hold-to-start interaction for intentional sessions
- Smooth animations and real-time countdown
- **Keyboard shortcuts**: Space (pause/resume), R (reset), Esc (stop)
- **Sound notifications**: Completion chimes with volume control
- **Break timer**: Auto-start 5-minute breaks between sessions
- Last-minute heartbeat effect
- Pause/resume functionality

### ✅ Task Management
- Clean three-state system: Pending, In Progress, Completed
- Drag and drop support
- Real-time progress tracking

### 📊 Activity Heatmap
- 90-day visual productivity tracking
- GitHub-style contribution graph
- Daily activity visualization

### 🎥 Background Focus Mode
- Embed YouTube videos for ambient study/work
- Distraction-free video player

### 📈 Session History & Statistics
- **Automatic tracking**: Every session saved to localStorage
- **Detailed stats**: Total sessions, minutes, averages
- **Export data**: Download session history as JSON
- **Today's progress**: Separate tracking for current day

### ⚙️ Settings & Customization
- **Sound control**: Enable/disable with volume adjustment
- **Custom presets**: 15, 25, 45, 60-minute quick access
- **Break timer**: Customizable 1-15 minute breaks
- **Theme toggle**: Dark theme (light theme coming soon)
- **Browser notifications**: Optional completion alerts

### 📱 PWA Support
- **Offline functionality**: Works without internet
- **Install as app**: Add to home screen
- **Service worker**: Caches essential files
- **Mobile optimized**: Responsive on all devices

### ♿ Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Reduced motion support
- High contrast compatible

## Tech Stack

- **React 18** - UI framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Frictionalfor/soutaos.git

# Navigate to project directory
cd soutaos

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── pages/              # Route pages
│   ├── LandingPage.jsx
│   └── DashboardPage.jsx
├── components/         # Reusable components
│   ├── landing/       # Landing page components
│   ├── layout/        # Dashboard layout
│   ├── tasks/         # Task management
│   ├── pomodoro/      # Timer component
│   ├── heatmap/       # Activity visualization
│   └── video/         # Video player
├── context/           # React context
├── hooks/             # Custom hooks
└── utils/             # Utility functions
```

## Routes

- `/` - Landing page (marketing)
- `/app` - Dashboard (workspace)

## Keyboard Shortcuts

- `Space` - Pause/Resume timer (or Start if inactive)
- `R` - Reset timer
- `Esc` - Stop active session

## Features in Detail

### Sound Notifications
- Pleasant completion chimes using Web Audio API
- Adjustable volume (0-100%)
- Different sounds for focus and break completion
- Enable/disable in settings

### Session History
- Automatic tracking of all completed sessions
- View statistics: total sessions, minutes, averages
- Export data as JSON for external analysis
- Clear history option

### Break Timer
- Auto-start breaks after focus sessions
- Customizable duration (1-15 minutes)
- Visual distinction with cyan color scheme
- Optional auto-start toggle

### PWA Installation
1. Visit the site on mobile or desktop
2. Look for "Install" prompt in your browser
3. Click "Install" or "Add to Home Screen"
4. Launch as standalone app

Works offline after first visit!

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Reduced motion support for motion-sensitive users
- High contrast mode compatible

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Lazy loading for routes
- Optimized bundle size
- 60fps animations
- Timestamp-based timer (accurate even when tab is inactive)

## Deployment

Deployed on Vercel with automatic deployments from main branch.

```bash
# Deploy to production
vercel --prod
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Made by [Frictional](https://github.com/Frictionalfor)

## Acknowledgments

- Inspired by minimal productivity tools
- Design philosophy: Less is more
- Built with focus and intention
