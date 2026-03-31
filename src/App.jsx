import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabase'
import { getEditableWeek } from './data/league'

const SUPABASE_CONFIGURED =
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.startsWith('your_')
import Navigation    from './components/Navigation'
import LeaderboardPage from './components/LeaderboardPage'
import SchedulePage    from './components/SchedulePage'
import GameScorerModal from './components/GameScorerModal'
import AllStarsPage    from './components/AllStarsPage'

const DIV_KEY = 'bof_last_div'

export default function App() {
  const [tab, setTab] = useState(() =>
    window.location.hash === '#allstars' ? 'allstars' : 'leaderboard'
  )
  const [div, setDiv] = useState(() => localStorage.getItem(DIV_KEY) || 'adv')

  function handleDivChange(d) {
    setDiv(d)
    localStorage.setItem(DIV_KEY, d)
  }

  // Keyed by game_key string
  const [gameResults, setGameResults] = useState({})
  const [allStars,    setAllStars]    = useState({})
  const [loading,     setLoading]     = useState(true)

  // The game currently open for scoring (null = none)
  const [selectedGame, setSelectedGame] = useState(null)

  // Which week is editable for each division (closest to today)
  const editableWeekAdv = getEditableWeek('adv')
  const editableWeekInt = getEditableWeek('int')

  // ── Load & subscribe ──────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED) { setLoading(false); return }
    loadAll()

    const resultsCh = supabase
      .channel('game_results_rt')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'game_results' },
        ({ eventType, new: row, old }) => {
          if (eventType === 'DELETE') {
            setGameResults(prev => {
              const next = { ...prev }
              delete next[old.game_key]
              return next
            })
          } else {
            setGameResults(prev => ({ ...prev, [row.game_key]: row }))
          }
        }
      )
      .subscribe()

    const allstarsCh = supabase
      .channel('allstars_rt')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'allstars' },
        ({ eventType, new: row, old }) => {
          if (eventType === 'DELETE') {
            setAllStars(prev => {
              const next = { ...prev }
              delete next[old.game_key]
              return next
            })
          } else {
            setAllStars(prev => ({ ...prev, [row.game_key]: row }))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(resultsCh)
      supabase.removeChannel(allstarsCh)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadAll() {
    try {
      const [{ data: resData }, { data: starData }] = await Promise.all([
        supabase.from('game_results').select('*'),
        supabase.from('allstars').select('*'),
      ])
      if (resData) {
        const map = {}
        resData.forEach(r => { map[r.game_key] = r })
        setGameResults(map)
      }
      if (starData) {
        const map = {}
        starData.forEach(a => { map[a.game_key] = a })
        setAllStars(map)
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Mutations ─────────────────────────────────────────────
  const updateGameResult = useCallback(async (key, data) => {
    setGameResults(prev => ({
      ...prev,
      [key]: { game_key: key, ...prev[key], ...data },
    }))
    if (!SUPABASE_CONFIGURED) return
    await supabase.from('game_results').upsert(
      { game_key: key, ...data, updated_at: new Date().toISOString() },
      { onConflict: 'game_key' }
    )
  }, [])

  const updateAllStar = useCallback(async (key, data) => {
    setAllStars(prev => ({
      ...prev,
      [key]: { game_key: key, ...prev[key], ...data },
    }))
    if (!SUPABASE_CONFIGURED) return
    await supabase.from('allstars').upsert(
      { game_key: key, ...data, updated_at: new Date().toISOString() },
      { onConflict: 'game_key' }
    )
  }, [])

  // ── Render ────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', fontSize: 16 }}>
        Loading…
      </div>
    )
  }

  return (
    <div className="app-wrap">
      {!SUPABASE_CONFIGURED && (
        <div style={{ background: '#7B3F00', color: '#FFD580', fontSize: 13, fontWeight: 600, textAlign: 'center', padding: '8px 16px', paddingTop: 'calc(8px + env(safe-area-inset-top))', flexShrink: 0 }}>
          ⚠ Supabase not configured — scores save locally only
        </div>
      )}
      {selectedGame && (
        <GameScorerModal
          game={selectedGame}
          gameResults={gameResults}
          allStars={allStars}
          onUpdateResult={updateGameResult}
          onUpdateAllStar={updateAllStar}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <div className="page">
        {tab === 'leaderboard' && (
          <LeaderboardPage div={div} gameResults={gameResults} onDivChange={handleDivChange} />
        )}
        {tab === 'schedule' && (
          <SchedulePage
            div={div}
            onDivChange={handleDivChange}
            gameResults={gameResults}
            editableWeekAdv={editableWeekAdv}
            editableWeekInt={editableWeekInt}
            onSelectGame={setSelectedGame}
          />
        )}
        {tab === 'allstars' && (
          <AllStarsPage div={div} allStars={allStars} onDivChange={handleDivChange} />
        )}
      </div>

      <Navigation
        tab={tab}
        setTab={setTab}
        scheduleAccent={div === 'int' ? '#16A34A' : '#2563EB'}
        lbAccent={div === 'int' ? '#16A34A' : '#2563EB'}
      />
    </div>
  )
}
