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
  // Clipboard / score sheet icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  )
}
