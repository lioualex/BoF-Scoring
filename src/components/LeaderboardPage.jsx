import { useState, useMemo } from 'react'
import { computeStandings, getSchedule, getTeamName, getWeekDuties, gameKey } from '../data/league'

export default function LeaderboardPage({ div, gameResults, onDivChange }) {
  const [selectedTeam, setSelectedTeam] = useState(null)

  const standings = useMemo(
    () => computeStandings(div, gameResults),
    [div, gameResults]
  )

  function switchDiv(d) {
    onDivChange?.(d)
  }

  return (
    <div className={`lb-wrap div-${div}`}>
      <div className="header">
        <div className="app-title">BoF <span>Scoring</span></div>
        <div className="app-sub">Spring 2026 · St. Mary's Rec Center</div>
      </div>

      <div className="div-toggle">
        <button className={`div-btn ${div === 'adv' ? 'active' : ''}`} onClick={() => switchDiv('adv')}>
          Advanced
        </button>
        <button className={`div-btn ${div === 'int' ? 'active' : ''}`} onClick={() => switchDiv('int')}>
          Intermediate
        </button>
      </div>

      <div className="section-label">Standings</div>

      {standings.map((team, idx) => (
        <div key={team.id} className="team-card" onClick={() => setSelectedTeam(team)}>
          {idx < 3
            ? <span className="medal-badge">{['🥇','🥈','🥉'][idx]}</span>
            : <div className="rank-badge">{idx + 1}</div>
          }
          <div style={{ flex: 1 }}>
            <div className="team-name">{team.name}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="team-record">{team.wins}–{team.losses}</span>
            {team.wins + team.losses > 0 && (
              <span className="team-pct">{(team.pct * 100).toFixed(0)}%</span>
            )}
            <ChevronRight />
          </div>
        </div>
      ))}

      <div style={{ height: 16 }} />

      {selectedTeam && (
        <TeamModal
          div={div}
          team={selectedTeam}
          standings={standings}
          gameResults={gameResults}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  )
}

function TeamModal({ div, team, standings, gameResults, onClose }) {
  const rankOf = id => {
    const i = standings.findIndex(t => t.id === id)
    return i >= 0 ? i + 1 : null
  }
  const schedule = getSchedule(div)

  // Build match history grouped by week
  const byWeek = {}
  let totalWins = 0, totalLosses = 0
  let totalPts = 0, totalPtsAgainst = 0

  schedule.forEach(wk => {
    wk.slots.forEach((slot, si) => {
      ['court1', 'court2'].forEach((ct, ci) => {
        const g = slot[ct]
        if (!g || (g.a !== team.id && g.b !== team.id)) return

        const courtNum = ci + 1
        const bk   = gameKey(div, wk.week, si, courtNum)
        const r1   = gameResults[bk]        ?? null
        const r2   = gameResults[bk + '_s2'] ?? null
        const side = g.a === team.id ? 'A' : 'B'
        const oppId = g.a === team.id ? g.b : g.a

        if (r1?.winner) { if (r1.winner === 'T' || r1.winner === side) totalWins++; else totalLosses++ }
        if (r2?.winner) { if (r2.winner === 'T' || r2.winner === side) totalWins++; else totalLosses++ }

        const hasR1 = r1 && (r1.winner || r1.score_a !== 4 || r1.score_b !== 4)
        const hasR2 = r2 && (r2.winner || r2.score_a !== 4 || r2.score_b !== 4)
        if (hasR1) { totalPts += side === 'A' ? r1.score_a : r1.score_b; totalPtsAgainst += side === 'A' ? r1.score_b : r1.score_a }
        if (hasR2) { totalPts += side === 'A' ? r2.score_a : r2.score_b; totalPtsAgainst += side === 'A' ? r2.score_b : r2.score_a }

        if (!byWeek[wk.week]) byWeek[wk.week] = { wk, matches: [] }
        byWeek[wk.week].matches.push({ oppId, side, r1, r2 })
      })
    })
  })

  const weekNums = Object.keys(byWeek).map(Number).sort((a, b) => a - b)

  // Role sequence per week: P = playing, R = reffing, O = off
  const weekRoles = {}
  schedule.forEach(wk => {
    const roles = wk.slots.map(slot => {
      const courts = ['court1', 'court2'].map(ct => slot[ct]).filter(Boolean)
      if (courts.some(g => g.a === team.id || g.b === team.id)) return 'P'
      if (courts.some(g => g.ref === team.id)) return 'R'
      return 'O'
    })
    weekRoles[wk.week] = roles
  })

  // Net duties — find the next upcoming one
  const allDuties = []
  schedule.forEach(wk => {
    const { setup, teardown } = getWeekDuties(wk)
    const datePart = wk.date.split(' ')[1] ?? wk.date
    const [m, d] = datePart.split('/')
    const dutyDate = new Date(2026, parseInt(m, 10) - 1, parseInt(d, 10))
    if (setup.includes(team.id))    allDuties.push({ week: wk.week, date: datePart, type: 'Net Setup',  dutyDate })
    if (teardown.includes(team.id)) allDuties.push({ week: wk.week, date: datePart, type: 'Nets Down', dutyDate })
  })
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const nextDuty = allDuties.find(d => d.dutyDate >= today) ?? allDuties[allDuties.length - 1] ?? null

  return (
    <div className={`team-fullscreen div-${div}`}>
      {/* Header */}
      <div className="team-modal-header">
        <div>
          <div className="team-modal-div">{div === 'adv' ? 'Advanced' : 'Intermediate'}</div>
          <div className="team-modal-name">{team.name}</div>
          <div className="team-modal-record">
            {rankOf(team.id) && <><span className="record-rank">#{rankOf(team.id)}</span><span className="record-sep"> · </span></>}
            <span className="record-label">Record: </span>
            <span className="record-win">{totalWins}</span>
            <span className="record-sep"> – </span>
            <span className="record-loss">{totalLosses}</span>
            {totalPts + totalPtsAgainst > 0 && (
              <span className="record-pct"> · {Math.round(totalPts / (totalPts + totalPtsAgainst) * 100)}% pts won</span>
            )}
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>

      {/* Body */}
      <div className="team-modal-body">

        {/* Next duty */}
        {nextDuty && (
          <>
            <div className="section-label" style={{ paddingTop: 8 }}>Next Duty</div>
            <div className="result-match-row">
              <div className="result-opp">{nextDuty.type}</div>
              <div style={{ color: 'var(--text3)' }}>Wk {nextDuty.week} · {nextDuty.date}</div>
            </div>
          </>
        )}

        {/* Results grouped by week */}
        <div className="section-label" style={{ paddingTop: 16 }}>Results</div>

        {weekNums.length === 0 && (
          <div style={{ color: 'var(--text3)', fontSize: 14, padding: '8px 0' }}>No matches scheduled yet.</div>
        )}

        {weekNums.map(wkNum => {
          const { wk, matches } = byWeek[wkNum]
          const datePart = wk.date.split(' ')[1] ?? wk.date

          return (
            <div key={wkNum} className="result-week-group">
              <div className="result-week-header">
                <span>Week {wkNum} · {datePart}</span>
                {weekRoles[wkNum] && (
                  <span className="week-role-tags">
                    {weekRoles[wkNum].map((r, i) => (
                      <span key={i} className={`week-role-tag week-role-${r}`}>{r}</span>
                    ))}
                  </span>
                )}
              </div>

              {matches.map(({ oppId, side, r1, r2 }, i) => {
                const myS1    = side === 'A' ? r1?.score_a : r1?.score_b
                const theirS1 = side === 'A' ? r1?.score_b : r1?.score_a
                const myS2    = side === 'A' ? r2?.score_a : r2?.score_b
                const theirS2 = side === 'A' ? r2?.score_b : r2?.score_a
                const w1 = r1?.winner ? (r1.winner === 'T' || r1.winner === side ? 'W' : 'L') : null
                const w2 = r2?.winner ? (r2.winner === 'T' || r2.winner === side ? 'W' : 'L') : null
                const hasAnyResult = r1?.winner || r2?.winner

                return (
                  <div key={i} className="result-match-row">
                    <div className="result-opp">
                      vs {getTeamName(div, oppId)}
                    </div>
                    <div className="result-sets">
                      {(r1?.winner || (r1 && (r1.score_a !== 4 || r1.score_b !== 4))) ? (
                        <div className="result-set-line">
                          <span className="result-set-tag">S1</span>
                          <span className="result-set-scores">{myS1}–{theirS1}</span>
                          <span className={`wl-dot${w1 ? ` wl-${w1}` : ' wl-empty'}`}>{w1 ?? ''}</span>
                        </div>
                      ) : null}
                      {(r2?.winner || (r2 && (r2.score_a !== 4 || r2.score_b !== 4))) ? (
                        <div className="result-set-line">
                          <span className="result-set-tag">S2</span>
                          <span className="result-set-scores">{myS2}–{theirS2}</span>
                          <span className={`wl-dot${w2 ? ` wl-${w2}` : ' wl-empty'}`}>{w2 ?? ''}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* Roster */}
        <div className="section-label" style={{ paddingTop: 16 }}>Roster</div>
        <div className="roster-chips">
          {team.players.map(p => <span key={p} className="roster-chip">{p}</span>)}
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
