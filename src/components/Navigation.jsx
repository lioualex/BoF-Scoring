export default function Navigation({ tab, setTab, scheduleAccent = '#C8A946', lbAccent = '#C8A946' }) {
  return (
    <nav className="nav">
      <button
        className={`nav-btn ${tab === 'leaderboard' ? 'active' : ''}`}
        style={tab === 'leaderboard' ? { color: lbAccent } : undefined}
        onClick={() => setTab('leaderboard')}
      >
        <IconTrophy />
        <span className="nav-label">Leaderboard</span>
      </button>
      <button
        className={`nav-btn ${tab === 'schedule' ? 'active' : ''}`}
        style={tab === 'schedule' ? { color: scheduleAccent } : undefined}
        onClick={() => setTab('schedule')}
      >
        <IconCalendar />
        <span className="nav-label">Scoring</span>
      </button>
    </nav>
  )
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function IconTrophy() {
  // Filled trophy
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 3v6a5 5 0 0 0 10 0V3H7z"/>
      <path d="M5 4H3.5A1.5 1.5 0 0 0 2 5.5v1A2.5 2.5 0 0 0 4.5 9H5V4z"/>
      <path d="M19 4h1.5A1.5 1.5 0 0 1 22 5.5v1A2.5 2.5 0 0 1 19.5 9H19V4z"/>
      <path d="M11 13.9V16h-2v2h6v-2h-2v-2.1A6 6 0 0 1 7 8V3h10v5a6 6 0 0 1-6 5.9z" opacity="0"/>
      <rect x="10" y="14" width="4" height="3" rx="0.5"/>
      <rect x="7.5" y="17" width="9" height="2.5" rx="1"/>
    </svg>
  )
}

function IconCalendar() {
  // Pencil with scribble (filled)
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4z"/>
    </svg>
  )
}
