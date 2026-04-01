import { useState, useEffect, useRef } from 'react'
import { getTeam, getTeamName, checkWinner, getSchedule } from '../data/league'

const CONFETTI = ['🏐', '⭐', '🎉', '✨', '🏆', '🌟', '🏐', '⭐']

function getWeekDate(div, weekNum) {
  return getSchedule(div).find(w => w.week === weekNum)?.date ?? ''
}

function isWeekPast(div, weekNum) {
  const dateStr = getWeekDate(div, weekNum)
  if (!dateStr) return false
  const [, datePart] = dateStr.split(' ')
  const [m, d] = datePart.split('/')
  const gameDate = new Date(2026, parseInt(m, 10) - 1, parseInt(d, 10))
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return gameDate < today
}

export default function GameScorerModal({
  game,
  gameResults,
  allStars,
  onUpdateResult,
  onUpdateAllStar,
  onClose,
}) {
  const gk1 = game.gameKey
  const gk2 = game.gameKey2 ?? (game.gameKey + '_s2')

  const resultS1 = gameResults[gk1] ?? {}
  const resultS2 = gameResults[gk2] ?? {}
  const allStar  = allStars[gk1]   ?? {}

  const scoreA_s1 = resultS1.score_a ?? 4
  const scoreB_s1 = resultS1.score_b ?? 4
  const winnerS1  = resultS1.winner  ?? checkWinner(scoreA_s1, scoreB_s1)

  const scoreA_s2 = resultS2.score_a ?? 4
  const scoreB_s2 = resultS2.score_b ?? 4
  const winnerS2  = resultS2.winner  ?? checkWinner(scoreA_s2, scoreB_s2)

  const [activeSet,  setActiveSet]  = useState(1)
  const [flipped,    setFlipped]    = useState(false)
  const [flipping,   setFlipping]   = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [starBurstA, setStarBurstA] = useState(false)
  const [starBurstB, setStarBurstB] = useState(false)
  const prevWinnerRef = useRef(null)

  // Auto-flip when switching sets (teams switch sides in volleyball)
  useEffect(() => {
    setFlipping(true)
    const t = setTimeout(() => {
      setFlipped(activeSet === 2)
      setFlipping(false)
    }, 180)
    return () => clearTimeout(t)
  }, [activeSet])

  // Auto-advance to set 2 when set 1 is won
  useEffect(() => {
    if (winnerS1 && activeSet === 1) setActiveSet(2)
  }, [winnerS1])

  // Celebrate new wins
  const winner = activeSet === 1 ? winnerS1 : winnerS2
  useEffect(() => {
    if (winner && winner !== prevWinnerRef.current) {
      setCelebrating(true)
      const t = setTimeout(() => setCelebrating(false), 2800)
      return () => clearTimeout(t)
    }
    prevWinnerRef.current = winner
  }, [winner])

  const scoreA = activeSet === 1 ? scoreA_s1 : scoreA_s2
  const scoreB = activeSet === 1 ? scoreB_s1 : scoreB_s2
  const activeGk = activeSet === 1 ? gk1 : gk2

  // Display order — left/right swapped when flipped
  const leftSide   = flipped ? 'B' : 'A'
  const rightSide  = flipped ? 'A' : 'B'
  const leftTeam   = flipped ? getTeam(game.div, game.match.b) : getTeam(game.div, game.match.a)
  const rightTeam  = flipped ? getTeam(game.div, game.match.a) : getTeam(game.div, game.match.b)
  const leftScore  = flipped ? scoreB : scoreA
  const rightScore = flipped ? scoreA : scoreB
  const leftWin    = winner === leftSide || winner === 'T'
  const rightWin   = winner === rightSide || winner === 'T'

  // Set button labels — scores shown in display order (left–right)
  const s1ScoreLeft  = flipped ? scoreB_s1 : scoreA_s1
  const s1ScoreRight = flipped ? scoreA_s1 : scoreB_s1
  const s2ScoreLeft  = flipped ? scoreB_s2 : scoreA_s2
  const s2ScoreRight = flipped ? scoreA_s2 : scoreB_s2

  const teamA   = getTeam(game.div, game.match.a)
  const teamB   = getTeam(game.div, game.match.b)
  const refName = getTeamName(game.div, game.match.ref)

  const otherTeamA    = game.otherMatch ? getTeam(game.div, game.otherMatch.a) : null
  const otherTeamB    = game.otherMatch ? getTeam(game.div, game.otherMatch.b) : null
  const otherResultCur = game.otherMatch
    ? (gameResults[activeSet === 1 ? game.otherGameKey : game.otherGameKey2] ?? {})
    : null

  const wkDate = getWeekDate(game.div, game.week)
  const isPast = isWeekPast(game.div, game.week)

  function pushUpdate(newA, newB) {
    const newWinner = checkWinner(newA, newB)
    onUpdateResult(activeGk, {
      division:    game.div,
      week:        game.week,
      slot_idx:    game.slotIdx,
      court:       game.court,
      team_a_id:   game.match.a,
      team_b_id:   game.match.b,
      score_a:     newA,
      score_b:     newB,
      winner:      newWinner,
      is_complete: !!newWinner,
    })
  }

  function adjust(side, delta) {
    const newA = side === 'A' ? Math.max(0, Math.min(27, scoreA + delta)) : scoreA
    const newB = side === 'B' ? Math.max(0, Math.min(27, scoreB + delta)) : scoreB
    pushUpdate(newA, newB)
  }

  function tap(side, e) {
    const rect  = e.currentTarget.getBoundingClientRect()
    const isTop = (e.clientY - rect.top) < rect.height / 2
    adjust(side, isTop ? 1 : -1)
  }

  function setAllStarA(player) {
    if (player) { setStarBurstA(true); setTimeout(() => setStarBurstA(false), 700) }
    onUpdateAllStar(gk1, {
      division:       game.div,
      week:           game.week,
      team_a_allstar: player || null,
      team_b_allstar: allStar.team_b_allstar ?? null,
    })
  }

  function setAllStarB(player) {
    if (player) { setStarBurstB(true); setTimeout(() => setStarBurstB(false), 700) }
    onUpdateAllStar(gk1, {
      division:       game.div,
      week:           game.week,
      team_a_allstar: allStar.team_a_allstar ?? null,
      team_b_allstar: player || null,
    })
  }

  const confettiPieces = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      x:        (i * 4.7 + Math.sin(i * 1.3) * 8 + 50) % 95,
      delay:    (i * 0.09) % 0.9,
      duration: 1.6 + (i % 5) * 0.25,
      spin:     (i % 2 === 0 ? '' : '-') + (360 + (i * 47) % 360) + 'deg',
      size:     18 + (i % 4) * 6,
      emoji:    CONFETTI[i % CONFETTI.length],
    }))
  ).current

  return (
    <div className={`scorer-fullscreen div-${game.div}`}>

      {/* Confetti celebration */}
      {celebrating && (
        <div className="confetti-container" aria-hidden>
          {confettiPieces.map((p, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left:               `${p.x}%`,
                fontSize:           `${p.size}px`,
                animationDelay:     `${p.delay}s`,
                animationDuration:  `${p.duration}s`,
                '--spin':           p.spin,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      )}

      {/* Header — match info left, ref + close right */}
      <div className="scorer-header">
        <div>
          <div className="scorer-match-title">
            Match {game.slotIdx + 1} · Court {game.court}
          </div>
          <div className="scorer-match-sub">
            Week {game.week} · {wkDate}
          </div>
        </div>
        <div className="scorer-header-right">
          <div className="scorer-ref-inline">
            <WhistleIcon />
            <span>{refName}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
      </div>

      {/* ── FROZEN (non-scrolling) section ── */}

      {/* Team names — right below header */}
      <div className={`scorer-names-row${flipping ? ' side-flipping' : ''}`}>
        <div className={`scorer-team-name${leftWin ? ' name-winner' : ''}`}>{leftTeam?.name}</div>
        <button
          className={`swap-btn${flipped ? ' swapped' : ''}`}
          onClick={() => setFlipped(f => !f)}
          title="Swap sides"
        >
          <SwapIcon />
        </button>
        <div className={`scorer-team-name${rightWin ? ' name-winner' : ''}`}>{rightTeam?.name}</div>
      </div>

      {/* ── SCROLLABLE body ── */}
      <div className="scorer-body">

        {/* Score zones */}
        <div className={`scorer-zones${flipping ? ' side-flipping' : ''}`}>
          <div
            className={`score-zone${leftWin ? ' zone-winner' : ''}`}
            onClick={e => tap(leftSide, e)}
          >
            <div className="score-zone-top"><PlusIcon /></div>
            <div className="score-num">{leftScore}</div>
            <div className="score-zone-bot"><MinusIcon /></div>
          </div>
          <div
            className={`score-zone${rightWin ? ' zone-winner' : ''}`}
            onClick={e => tap(rightSide, e)}
          >
            <div className="score-zone-top"><PlusIcon /></div>
            <div className="score-num">{rightScore}</div>
            <div className="score-zone-bot"><MinusIcon /></div>
          </div>
        </div>

        {/* Set toggle */}
        <div className="set-toggle">
          <button
            className={`set-btn${activeSet === 1 ? ' active' : ''}${winnerS1 ? ' done' : ''}`}
            onClick={() => setActiveSet(1)}
          >
            Set 1{winnerS1 ? ` · ${s1ScoreLeft}–${s1ScoreRight}` : ''}
          </button>
          <button
            className={`set-btn${activeSet === 2 ? ' active' : ''}${winnerS2 ? ' done' : ''}`}
            onClick={() => setActiveSet(2)}
          >
            Set 2{winnerS2 ? ` · ${s2ScoreLeft}–${s2ScoreRight}` : ''}
          </button>
        </div>

        {/* Score rules */}
        <div className="score-note-top">
          Start 4-4 · Win by 2 from 25 · Cap 27
        </div>

        {/* Win banner */}
        {winner && (
          <div className="win-banner">
            {winner === 'T' ? `Tie — both teams win Set ${activeSet}!` : `${leftWin ? leftTeam?.name : rightTeam?.name} wins Set ${activeSet}!`}
          </div>
        )}

        {/* All-Stars — hidden for past weeks */}
        {!isPast && (
          <div className="allstar-mini">
            <div className="allstar-mini-header">
              <StarIcon />
              All-Stars
            </div>
            <div className={`allstar-mini-row${starBurstA ? ' star-selected' : ''}`}>
              <span className="allstar-mini-label">{teamA?.name}</span>
              <select
                className="player-select"
                value={allStar.team_a_allstar ?? ''}
                onChange={e => setAllStarA(e.target.value)}
              >
                <option value="">Select player</option>
                {teamA?.players.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className={`allstar-mini-row${starBurstB ? ' star-selected' : ''}`}>
              <span className="allstar-mini-label">{teamB?.name}</span>
              <select
                className="player-select"
                value={allStar.team_b_allstar ?? ''}
                onChange={e => setAllStarB(e.target.value)}
              >
                <option value="">Select player</option>
                {teamB?.players.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Other court — shows active set scores */}
        {game.otherMatch && otherTeamA && (
          <>
            <div className="other-court-eyebrow">Other live scores:</div>
            <div className="other-court-box">
              <div className="other-court-header">
                <span className="other-court-meta">Court {game.court === 1 ? 2 : 1} · Set {activeSet}</span>
              </div>
              <div className="other-court-scores">
                <span className="other-team-name">{otherTeamA?.name}</span>
                <span className="other-score">{otherResultCur?.score_a ?? 4}</span>
                <span className="other-vs">—</span>
                <span className="other-score">{otherResultCur?.score_b ?? 4}</span>
                <span className="other-team-name right">{otherTeamB?.name}</span>
              </div>
            </div>
          </>
        )}

        <div className="scorer-done-spacer" />
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" style={{ width: 22, height: 22 }}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" style={{ width: 22, height: 22 }}>
      <path d="M5 12h14"/>
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
      <path d="M18 8H6m12 0l-3-3m3 3l-3 3"/>
      <path d="M6 16h12M6 16l3-3M6 16l3 3"/>
    </svg>
  )
}

function WhistleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"
      style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--div-accent)' }}>
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4z"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
