# SoutaOS

A minimal personal productivity operating system with premium dark aesthetic.

## Features

- Task Management (pending → processing → completed)
- Circular Pomodoro Timer with SVG progress ring
- YouTube Focus Video Player
- Activity Heatmap (GitHub-style yearly grid)
- Performance Stats in Header Pills
- localStorage persistence
- Single-page application
- Glassmorphism UI with curved design

## Tech Stack

- React 18 (Vite)
- TailwindCSS
- No backend, no auth, no database

## Design Philosophy

- Black + charcoal background
- Soft grey surfaces
- Green accent for productivity
- Everything curved (rounded-3xl, rounded-full)
- Smooth transitions (300ms)
- Premium SaaS aesthetic
- Glassmorphism (subtle)

## Setup

```bash
npm install
npm run dev
```

## Layout Structure

- Header Control Panel (large curved card)
  - Logo and greeting
  - Motivation quote
  - Performance pills (Tasks, Pending, Done, Focus, Sessions, Streak)
- Two-column grid
  - Left: Tasks + YouTube Video
  - Right: Pomodoro Timer + Activity Heatmap

## Pomodoro Timer

- Circular SVG progress ring
- Three modes: Focus (25m), Short (5m), Long (15m)
- Smooth countdown animation
- Green glow when active
- Pulse animation on completion
- Persists across page refreshes

## Color System

- Background: Deep black → charcoal gradient
- Cards: Translucent dark grey with backdrop blur
- Accent: Green for done tasks, streak, heatmap intensity, active timer
- No emojis, only symbols: ☰ ▷ ● □ ◉

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Dashboard.jsx
│   │   └── Header.jsx
│   ├── tasks/
│   │   ├── TaskGrid.jsx
│   │   └── TaskCard.jsx
│   ├── video/
│   │   └── VideoPlayer.jsx
│   ├── pomodoro/
│   │   └── PomodoroTimer.jsx
│   └── heatmap/
│       └── Heatmap.jsx
├── context/
│   └── AppContext.jsx
├── utils/
│   ├── storage.js
│   └── date.js
├── App.jsx
└── main.jsx
```
