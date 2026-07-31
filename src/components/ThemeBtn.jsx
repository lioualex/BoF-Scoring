import { useState, useEffect, useRef } from 'react'

export default function ThemeBtn({ theme, onSetTheme, user, onLogin, onLogout, onSync, syncing, syncResult }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  const options = [
    { value: null,    label: 'Auto' },
    { value: 'light', label: 'Light' },
    { value: 'dark',  label: 'Dark' },
  ]

  return (
    <div className="theme-btn-wrap" ref={ref}>
      <button className="theme-icon-btn" onClick={() => setOpen(o => !o)} aria-label="Settings">
        <GearIcon />
      </button>
      {open && (
        <div className="theme-popup">
          <div className="theme-popup-label">Appearance</div>
          <div className="theme-popup-options">
            {options.map(o => (
              <button
                key={String(o.value)}
                className={`theme-option${theme === o.value ? ' active' : ''}`}
                onClick={() => { onSetTheme(o.value); setOpen(false) }}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="theme-popup-divider" />

          {user ? (
            <>
              <div className="theme-popup-label">Signed in as admin</div>
              <div className="theme-popup-email">{user.email}</div>
              <button
                className="theme-popup-sync"
                onClick={() => onSync?.()}
                disabled={syncing}
              >
                {syncing ? 'Syncing…' : syncResult === 'ok' ? '✓ Synced' : syncResult === 'err' ? '✗ Sync failed' : 'Sync scores to database'}
              </button>
              <button
                className="theme-popup-signout"
                onClick={() => { onLogout?.(); setOpen(false) }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="theme-popup-label">Admin</div>
              <button
                className="theme-popup-google"
                onClick={() => { onLogin?.(); setOpen(false) }}
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
