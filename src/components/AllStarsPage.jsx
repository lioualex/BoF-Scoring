import { useMemo } from 'react'
import { getTeams, getTeamName } from '../data/league'

export default function AllStarsPage({ div, allStars, onDivChange }) {
  const tally = useMemo(() => {
    const counts = {}
    const teamOf  = {}

    // Build a player→teamName lookup for this division
    getTeams(div).forEach(team => {
      team.players.forEach(p => { teamOf[p] = team.name })
    })

    Object.values(allStars).forEach(row => {
      if (row.division !== div) return
      if (row.team_a_allstar) counts[row.team_a_allstar] = (counts[row.team_a_allstar] ?? 0) + 1
      if (row.team_b_allstar) counts[row.team_b_allstar] = (counts[row.team_b_allstar] ?? 0) + 1
    })

    return Object.entries(counts)
      .map(([player, count]) => ({ player, count, team: teamOf[player] ?? '' }))
      .sort((a, b) => b.count - a.count || a.player.localeCompare(b.player))
  }, [div, allStars])

  return (
    <div className={`lb-wrap div-${div}`}>
      <div className="header">
        <div className="app-title">BoF <span>All Stars</span></div>
        <div className="app-sub">Spring 2026 · St. Mary's Rec Center</div>
      </div>

      <div className="div-toggle">
        <button className={`div-btn ${div === 'adv' ? 'active' : ''}`} onClick={() => onDivChange?.('adv')}>
          Advanced
        </button>
        <button className={`div-btn ${div === 'int' ? 'active' : ''}`} onClick={() => onDivChange?.('int')}>
          Intermediate
        </button>
      </div>

      <div className="section-label">All-Star Selections</div>

      {tally.length === 0 && (
        <div style={{ color: 'var(--text3)', fontSize: 14, padding: '8px 20px' }}>
          No all-stars recorded yet.
        </div>
      )}

      {tally.map(({ player, count, team }, idx) => (
        <div key={player} className="team-card">
          {idx < 3
            ? <span className="medal-badge">{['🥇','🥈','🥉'][idx]}</span>
            : <div className="rank-badge">{idx + 1}</div>
          }
          <div style={{ flex: 1 }}>
            <div className="team-name">{player}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{team}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18 }}>⭐</span>
            <span className="team-record">{count}</span>
          </div>
        </div>
      ))}

      <div style={{ height: 16 }} />
    </div>
  )
}
