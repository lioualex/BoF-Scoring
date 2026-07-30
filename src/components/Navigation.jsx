import { useState } from 'react'

export default function Navigation({ tab, setTab, scheduleAccent = '#C8A946', lbAccent = '#C8A946', user, onLogin, onLogout }) {
  const [showSettings, setShowSettings] = useState(false)

  function switchTab(t) {
    setTab(t)
    setShowSettings(false)
  }

  return (
    <>
      {showSettings && (
        <div className="nav-settings-backdrop" onClick={() => setShowSettings(false)} />
      )}

      {showSettings && (
        <div className="nav-settings-panel">
          {user ? (
            <>
              <div className="nav-settings-user">
                <IconPersonFilled />
                <span className="nav-settings-email">{user.email}</span>
              </div>
              <div className="nav-settings-divider" />
              <button
                className="nav-settings-btn nav-settings-signout"
                onClick={() => { onLogout(); setShowSettings(false) }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="nav-settings-title">Admin Login</div>
              <div className="nav-settings-subtitle">Unlock score editing for all weeks</div>
              {onLogin ? (
                <button
                  className="nav-settings-btn nav-settings-google"
                  onClick={() => { onLogin(); setShowSettings(false) }}
                >
                  <GoogleIcon />
                  Sign in with Google
                </button>
              ) : (
                <div className="nav-settings-note">Login unavailable — Supabase not configured.</div>
              )}
            </>
          )}
        </div>
      )}

      <nav className="nav">
        <button
          className={`nav-btn ${tab === 'schedule' ? 'active' : ''}`}
          style={tab === 'schedule' ? { color: scheduleAccent } : undefined}
          onClick={() => switchTab('schedule')}
        >
          <IconCalendar />
          <span className="nav-label">Scoring</span>
        </button>
        <button
          className={`nav-btn ${tab === 'leaderboard' ? 'active' : ''}`}
          style={tab === 'leaderboard' ? { color: lbAccent } : undefined}
          onClick={() => switchTab('leaderboard')}
        >
          <IconTrophy />
          <span className="nav-label">Leaderboard</span>
        </button>
        <button
          className={`nav-btn nav-btn-account${user ? ' account-active' : ''}`}
          onClick={() => setShowSettings(s => !s)}
          aria-label="Account settings"
        >
          {user ? <IconPersonFilled /> : <IconPerson />}
        </button>
      </nav>
    </>
  )
}

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function IconPersonFilled() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24 }}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function IconTrophy() {
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
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
