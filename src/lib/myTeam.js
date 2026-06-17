// Persisted "my team" selection — stored as { div, id } in localStorage.

const MY_TEAM_KEY = 'bof_my_team'

export function loadMyTeam() {
  try {
    const raw = localStorage.getItem(MY_TEAM_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && (parsed.div === 'adv' || parsed.div === 'int') && typeof parsed.id === 'number') {
      return parsed
    }
  } catch {
    // ignore malformed value
  }
  return null
}

export function saveMyTeam(myTeam) {
  if (myTeam) {
    localStorage.setItem(MY_TEAM_KEY, JSON.stringify({ div: myTeam.div, id: myTeam.id }))
  } else {
    localStorage.removeItem(MY_TEAM_KEY)
  }
}

export function isMyTeam(myTeam, div, id) {
  return !!myTeam && myTeam.div === div && myTeam.id === id
}
