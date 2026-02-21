# SoutaOS

A minimal personal productivity operating system with premium dark aesthetic.

## Features

- Task Management (pending → processing → completed)
- Circular Pomodoro Timer with SVG progress ring
- YouTube Focus Video Player
- Activity Heatmap (90-day productivity tracking)
- Performance Stats in Header Pills
- localStorage persistence
- Single-page application
- Glassmorphism UI with curved design

## Tech Stack

- React 18 (Vite)
- TailwindCSS
- Framer Motion
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

## Activity Heatmap

- Tracks last 90 days of productivity
- Combined metric: completed tasks + focus minutes
- Intensity levels: 5 shades from grey to green
- Hover tooltips show daily stats
- Updates automatically when tasks complete or pomodoro sessions finish

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
│   ├── heatmap/
│   │   └── ActivityHeatmap.jsx
│   └── landing/
│       ├── LandingPage.jsx
│       ├── FocusClock.jsx
│       └── AnimatedBackground.jsx
├── context/
│   └── AppContext.jsx
├── utils/
│   ├── storage.js
│   └── date.js
├── App.jsx
└── main.jsx
```
