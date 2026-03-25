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
        <span className="nav-label">Schedule</span>
      </button>
    </nav>
  )
}

function IconTrophy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8"  x2="8"  y1="2" y2="6"/>
      <line x1="3"  x2="21" y1="10" y2="10"/>
    </svg>
  )
}
