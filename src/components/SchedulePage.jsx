import { useState } from 'react'
import { getSchedule, getTeamName, getWeekDuties, gameKey } from '../data/league'

const DIV_KEY = 'bof_last_div'

const fmtTime = t => `${t} pm`

const DAY_MAP = { Thu: 'Thur', Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' }
const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']
function ordinal(n) {
  if (n % 10 === 1 && n !== 11) return `${n}st`
  if (n % 10 === 2 && n !== 12) return `${n}nd`
  if (n % 10 === 3 && n !== 13) return `${n}rd`
  return `${n}th`
}
function fmtDropdownDate(dateStr) {
  const [dayAbbr, datePart] = dateStr.split(' ')
  if (!datePart) return dateStr
  const [m, d] = datePart.split('/').map(Number)
  return `${DAY_MAP[dayAbbr] ?? dayAbbr}, ${MONTHS[m - 1]} ${ordinal(d)}`
}

function WhistleIcon() {
  // Pencil with scribble (matches nav scoring icon)
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12, flexShrink: 0 }}>
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4z"/>
    </svg>
  )
}

function ChevronTiny() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" className="court-chevron" style={{ width: 13, height: 13 }}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}

function isToday(dateStr) {
  const [, datePart] = dateStr.split(' ')
  const [m, d] = datePart.split('/')
  const game = new Date(2026, parseInt(m, 10) - 1, parseInt(d, 10))
  const now  = nowPST()
  return (
    game.getFullYear() === now.getFullYear() &&
    game.getMonth()    === now.getMonth()    &&
    game.getDate()     === now.getDate()
  )
}

function nowPST() {
  // Use device local time; device should be in America/Los_Angeles
  // but force PST explicitly so the app works correctly regardless of device timezone
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
}

function isSlotLive(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const hour24 = h + 12  // All games are evening (PM): 6:20 → 18:20
  const now   = nowPST()
  const start = new Date(now); start.setHours(hour24, m, 0, 0)
  const end   = new Date(now); end.setHours(hour24, m + 45, 0, 0)
  return now >= start && now <= end
}

function slotHasPassed(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const hour24 = h + 12
  const now = nowPST()
  const end = new Date(now); end.setHours(hour24, m + 45, 0, 0)
  return now > end
}

export default function SchedulePage({
  div,
  onDivChange,
  gameResults,
  editableWeekAdv,
  editableWeekInt,
  onSelectGame,
}) {
  const [week, setWeek]         = useState(() => div === 'adv' ? editableWeekAdv : editableWeekInt)
  const [slideDir, setSlideDir] = useState(null)
  const [animKey, setAnimKey]   = useState(0)

  const editableWeek = div === 'adv' ? editableWeekAdv : editableWeekInt
  const schedule     = getSchedule(div)
  const wkData       = schedule.find(w => w.week === week)

  function switchDiv(d) {
    if (d === div) return
    setSlideDir(d === 'int' ? 'left' : 'right')
    setAnimKey(k => k + 1)
    onDivChange(d)
    setWeek(d === 'adv' ? editableWeekAdv : editableWeekInt)
  }

  function handleCourtClick(wkData, slotIdx, courtNum) {
    const slot       = wkData.slots[slotIdx]
    const courtKey   = courtNum === 1 ? 'court1' : 'court2'
    const otherKey   = courtNum === 1 ? 'court2' : 'court1'
    const match      = slot[courtKey]
    const otherMatch = slot[otherKey]
    if (!match) return

    const gk      = gameKey(div, wkData.week, slotIdx, courtNum)
    const otherGk = otherMatch
      ? gameKey(div, wkData.week, slotIdx, courtNum === 1 ? 2 : 1)
      : null

    onSelectGame({
      div, week: wkData.week, slotIdx, court: courtNum,
      match, otherMatch,
      gameKey:      gk,
      gameKey2:     gk + '_s2',
      otherGameKey:  otherGk,
      otherGameKey2: otherGk ? otherGk + '_s2' : null,
      time: fmtTime(slot.time),
    })
  }

  const duties  = wkData ? getWeekDuties(wkData) : null
  const gameDay = wkData ? isToday(wkData.date) : false

  return (
    <div className={`sched-wrap div-${div}`}>
{/* ── Header ── */}
      <div className="header sched-header-inline">
        <div className="app-title">BoF <span>Scoring</span></div>
        <div className="div-toggle-mini">
          <button className={`div-btn-mini ${div === 'adv' ? 'active' : ''}`} onClick={() => switchDiv('adv')}>ADV</button>
          <button className={`div-btn-mini ${div === 'int' ? 'active' : ''}`} onClick={() => switchDiv('int')}>INT</button>
        </div>
      </div>

      <div className="sched-week-select">
        <select
          className="week-select"
          value={week}
          onChange={e => setWeek(Number(e.target.value))}
        >
          {schedule.map(w => (
            <option key={w.week} value={w.week}>
              Week {w.week} · {fmtDropdownDate(w.date)}{w.week === editableWeek ? '  ★' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* ── Schedule content ── */}
      {wkData && (
        <div key={animKey} className="sched-content-anim" data-dir={slideDir || ''}>
          <div className="full-schedule-week">

            {/* Net setup box */}
            {duties?.setup.length > 0 && (
              <div className="duty-inline duty-inline-setup duty-block">
                <span className="duty-inline-label">Net Setup</span>
                <div className="duty-inline-teams">
                  {duties.setup.map(id => (
                    <div key={id} className="duty-inline-team">{getTeamName(div, id)}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="section-label">Scoring</div>

            {wkData.slots.map((slot, si) => {
              const live       = gameDay && isSlotLive(slot.time)
              // Only collapse past slots once the full game day is over (not mid-day)
              const isPast     = false
              const isEditable = wkData.week === editableWeek

              // ── Collapsed past slot ──
              if (isPast) {
                return (
                  <div key={si} className="full-slot past">
                    <div className="past-slot-row">
                      <span className="past-slot-time">{fmtTime(slot.time)}</span>
                      <div className="past-slot-scores">
                        {[1, 2].map(courtNum => {
                          const g = slot[courtNum === 1 ? 'court1' : 'court2']
                          if (!g) return null
                          const k  = gameKey(div, wkData.week, si, courtNum)
                          const r1 = gameResults[k]
                          const r2 = gameResults[k + '_s2']
                          return (
                            <span
                              key={courtNum}
                              className={`past-slot-game${isEditable ? ' clickable' : ''}`}
                              onClick={() => isEditable && handleCourtClick(wkData, si, courtNum)}
                            >
                              {getTeamName(div, g.a)}{' '}
                              {r1?.winner
                                ? <span className="past-score">{r1.score_a}–{r1.score_b}{r2?.winner ? `, ${r2.score_a}–${r2.score_b}` : ''}</span>
                                : '–'}{' '}
                              {getTeamName(div, g.b)}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }

              // ── Full slot ──
              return (
                <div key={si} className={`full-slot${live ? ' slot-live' : ''}`}>
                  <div className={`full-slot-time${live ? ' slot-time-live' : ''}`}>
                    {fmtTime(slot.time)}
                    {live && (
                      <span className="live-badge">
                        <span className="live-dot" />NOW
                      </span>
                    )}
                  </div>
                  <div className="full-slot-courts">
                    {[1, 2].map(courtNum => {
                      const ctKey   = courtNum === 1 ? 'court1' : 'court2'
                      const g       = slot[ctKey]
                      const k        = g ? gameKey(div, wkData.week, si, courtNum) : null
                      const k2       = k ? k + '_s2' : null
                      const resultS1 = k  ? gameResults[k]  : null
                      const resultS2 = k2 ? gameResults[k2] : null
                      const hasScore = r => r && (r.winner || r.score_a !== 4 || r.score_b !== 4)

                      return (
                        <div
                          key={courtNum}
                          className={`full-court court-${courtNum}${g && isEditable ? ' clickable' : ''}`}
                          onClick={() => g && isEditable && handleCourtClick(wkData, si, courtNum)}
                        >
                          {/* Ref row — whistle icon + court number + chevron */}
                          {g && (
                            <div className="full-court-ref">
                              <WhistleIcon />
                              {getTeamName(div, g.ref)}
                              {live && <span className={`score-dot dot-${courtNum}`} />}
                              <span className="court-label">Court {courtNum}</span>
                              {isEditable && <ChevronTiny />}
                            </div>
                          )}

                          {g ? (
                            <div className="full-match-layout">
                              <div className="full-match-team-row">
                                <div className="full-team-name">{getTeamName(div, g.a)}</div>
                                {(hasScore(resultS1) || hasScore(resultS2)) && (
                                  <div className="full-set-scores">
                                    {hasScore(resultS1) && <span className={`full-team-score${resultS1.winner === 'A' ? ' score-winner' : ''}`}>{resultS1.score_a}</span>}
                                    {hasScore(resultS2) && <span className={`full-team-score s2${resultS2.winner === 'A' ? ' score-winner' : ''}`}>{resultS2.score_a}</span>}
                                  </div>
                                )}
                              </div>
                              <div className="full-vs">vs</div>
                              <div className="full-match-team-row">
                                <div className="full-team-name">{getTeamName(div, g.b)}</div>
                                {(resultS1 || resultS2) && (
                                  <div className="full-set-scores">
                                    {resultS1 && <span className={`full-team-score${resultS1.winner === 'B' ? ' score-winner' : ''}`}>{resultS1.score_b}</span>}
                                    {resultS2 && <span className={`full-team-score s2${resultS2.winner === 'B' ? ' score-winner' : ''}`}>{resultS2.score_b}</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="full-no-match">No match</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Nets down box */}
            {duties?.teardown.length > 0 && (
              <div className="duty-inline duty-inline-teardown duty-block">
                <span className="duty-inline-label">Nets Down</span>
                <div className="duty-inline-teams">
                  {duties.teardown.map(id => (
                    <div key={id} className="duty-inline-team">{getTeamName(div, id)}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
