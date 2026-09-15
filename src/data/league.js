// =================== TEAMS ===================

export const ADV_TEAMS = [
  { id: 1, name: 'BBO',                players: ['Iris Brewer','Jimmy Leyden','Dorian Dorsey','Nathan Draper','Christian Gilbertson','Johnathan Wang','Tali Swisher','Dan Fraguglia'] },
  { id: 2, name: 'Only A Little Gay',  players: ['Andrew Fischer','Matt Gelsomino','Ryan Grasell','Tom Leech','Tony Ding','Amy Hu','Danyion Reagan','Spencer Bundoc'] },
  { id: 3, name: 'Heated Spikealry',   players: ['Rhen LeClair','Oscar Ramos','Alex Schlick','Franco Castillo','Arslan Kasimov','JJ Chun','Marcus Abad','Cesar Arada'] },
  { id: 4, name: 'Ella Got Swindled',  players: ['Joe Barkus','Jason Giblin','Trey Godfrey','James Prietto','Aaron Lee','Colin Rosenow','Jeremy Wang','James Mullen'] },
  { id: 5, name: 'Laying Pipe',        players: ['Nick Wise','Alex Bast','Garrick Monaghan','Patrick Godfrey','Rian Cagang','Kae Saeturn','Brian Kim','Jamil Al-Ghosein'] },
  { id: 6, name: 'Hit It & Quit It',   players: ['Brett Kellaher','Daniel Quade','Connor Graflund','Jon Birchler',"Shayne O'Brien",'Eric Ricker','Jimmy Jin','Teddy Luther'] },
  { id: 7, name: 'Ball Handlers',      players: ['Brandon Styles','Ethan Dressen','Sai Sunga','David Solomon','Chris Im','Roel Robleza','Matt Merritt','Ohu Phomtavang'] },
];

export const INT_TEAMS = [
  { id: 1, name: 'Big Digs Energy',          players: ['AJ Martins','Rox Guo','Andy Yeo','Kevin Normoyle','Wellington Chang','Matt Solomon','Jonny Hsieh','TJ Bleichner'] },
  { id: 2, name: "Gotta Catch 'Em Balls",    players: ['Son Dinh','Alex Liou','Tim Dy Guani','Kyle Rosenthal','Taylor Horn','Jonathan Tang','Brian Tang','Eric Tang'] },
  { id: 3, name: 'Victorious Secret',        players: ['Ari Fontanilla','Jocelyn Ho','Adam LaMar','Rich Sucre','Jared Chu','DaShaunn Woolard','Jason Malabed','Tony Wu'] },
  { id: 4, name: 'Ace Hardware',             players: ['Diego Almodiel','Lorenzo Labitigan','Adrian Sanborn','Kevin Kuo','Ryan Sue','Patrick Chiang','Ben Ng','Go Takei'] },
  { id: 5, name: 'New Kids On The Block',    players: ['Thang Huynh','Travis Beck','Jeffrey Ng','Androgony King','Aaron Liu','Jake Castrejon','Derrick Hau','Abby Arcilla'] },
  { id: 6, name: 'A Little Bit Verse',       players: ['Danny Chin','Austin Lam','Jihwan Kim','Abel Reyna','Mark Salzer','Vigo Jiang','Brenda Young'] },
  { id: 7, name: 'Douched & Dangerous "DnD"', players: ['Hosea Lee','Sia Assar','Rob Peralta','Diego Perez','Evan Yang','Weston White','Eric Gaudet','Tony Tran'] },
];

// =================== SCHEDULES ===================

export const ADV_SCHEDULE = [
  { week: 1, date: 'Wed 09/16', slots: [
    { time: '6:20', court1: { a:7, b:3, ref:4 }, court2: { a:2, b:5, ref:1 } },
    { time: '7:00', court1: { a:2, b:4, ref:5 }, court2: { a:6, b:1, ref:3 } },
    { time: '7:40', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:7, ref:3 } },
    { time: '8:20', court1: { a:3, b:6, ref:2 }, court2: { a:1, b:4, ref:7 } },
  ]},
  { week: 2, date: 'Wed 09/23', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:1, b:4, ref:7 } },
    { time: '7:00', court1: { a:2, b:7, ref:5 }, court2: { a:3, b:4, ref:6 } },
    { time: '7:40', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:6, ref:7 } },
    { time: '8:20', court1: { a:7, b:3, ref:1 }, court2: { a:2, b:5, ref:4 } },
  ]},
  { week: 3, date: 'Wed 09/30', slots: [
    { time: '6:20', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:00', court1: { a:6, b:7, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '7:40', court1: { a:7, b:1, ref:3 }, court2: { a:4, b:6, ref:5 } },
    { time: '8:20', court1: { a:6, b:2, ref:7 }, court2: { a:3, b:5, ref:4 } },
  ]},
  { week: 4, date: 'Wed 10/07', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:6, b:7, ref:5 } },
    { time: '7:00', court1: { a:3, b:5, ref:7 }, court2: { a:1, b:6, ref:4 } },
    { time: '7:40', court1: { a:5, b:7, ref:1 }, court2: { a:2, b:4, ref:6 } },
    { time: '8:20', court1: { a:1, b:2, ref:3 }, court2: { a:4, b:7, ref:6 } },
  ]},
  { week: 5, date: 'Wed 10/14', slots: [
    { time: '6:20', court1: { a:2, b:6, ref:1 }, court2: { a:3, b:4, ref:5 } },
    { time: '7:00', court1: { a:5, b:7, ref:3 }, court2: { a:1, b:2, ref:4 } },
    { time: '7:40', court1: { a:6, b:3, ref:7 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:2, b:3, ref:6 }, court2: { a:7, b:1, ref:5 } },
  ]},
  { week: 6, date: 'Wed 10/21', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:2, b:4, ref:7 } },
    { time: '7:00', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:40', court1: { a:7, b:3, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:1, b:6, ref:5 }, court2: { a:4, b:7, ref:2 } },
  ]},
  { week: 7, date: 'Wed 10/28', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:7, ref:6 } },
    { time: '7:00', court1: { a:2, b:5, ref:7 }, court2: { a:4, b:6, ref:1 } },
    { time: '7:40', court1: { a:7, b:1, ref:5 }, court2: { a:3, b:6, ref:4 } },
    { time: '8:20', court1: { a:6, b:5, ref:3 }, court2: { a:2, b:7, ref:1 } },
  ]},
];

export const INT_SCHEDULE = [
  { week: 1, date: 'Thu 09/17', slots: [
    { time: '6:20', court1: { a:7, b:3, ref:4 }, court2: { a:2, b:5, ref:1 } },
    { time: '7:00', court1: { a:2, b:4, ref:5 }, court2: { a:6, b:1, ref:3 } },
    { time: '7:40', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:7, ref:3 } },
    { time: '8:20', court1: { a:3, b:6, ref:2 }, court2: { a:1, b:4, ref:7 } },
  ]},
  { week: 2, date: 'Thu 09/24', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:1, b:4, ref:7 } },
    { time: '7:00', court1: { a:2, b:7, ref:5 }, court2: { a:3, b:4, ref:6 } },
    { time: '7:40', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:6, ref:7 } },
    { time: '8:20', court1: { a:7, b:3, ref:1 }, court2: { a:2, b:5, ref:4 } },
  ]},
  { week: 3, date: 'Thu 10/01', slots: [
    { time: '6:20', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:00', court1: { a:6, b:7, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '7:40', court1: { a:7, b:1, ref:3 }, court2: { a:4, b:6, ref:5 } },
    { time: '8:20', court1: { a:6, b:2, ref:7 }, court2: { a:3, b:5, ref:4 } },
  ]},
  { week: 4, date: 'Thu 10/08', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:6, b:7, ref:5 } },
    { time: '7:00', court1: { a:3, b:5, ref:7 }, court2: { a:1, b:6, ref:4 } },
    { time: '7:40', court1: { a:5, b:7, ref:1 }, court2: { a:2, b:4, ref:6 } },
    { time: '8:20', court1: { a:1, b:2, ref:3 }, court2: { a:4, b:7, ref:6 } },
  ]},
  { week: 5, date: 'Thu 10/15', slots: [
    { time: '6:20', court1: { a:2, b:6, ref:1 }, court2: { a:3, b:4, ref:5 } },
    { time: '7:00', court1: { a:5, b:7, ref:3 }, court2: { a:1, b:2, ref:4 } },
    { time: '7:40', court1: { a:6, b:3, ref:7 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:2, b:3, ref:6 }, court2: { a:7, b:1, ref:5 } },
  ]},
  { week: 6, date: 'Thu 10/22', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:2, b:4, ref:7 } },
    { time: '7:00', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:40', court1: { a:7, b:3, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:1, b:6, ref:5 }, court2: { a:4, b:7, ref:2 } },
  ]},
  { week: 7, date: 'Thu 10/29', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:7, ref:6 } },
    { time: '7:00', court1: { a:2, b:5, ref:7 }, court2: { a:4, b:6, ref:1 } },
    { time: '7:40', court1: { a:7, b:1, ref:5 }, court2: { a:3, b:6, ref:4 } },
    { time: '8:20', court1: { a:6, b:5, ref:3 }, court2: { a:2, b:7, ref:1 } },
  ]},
];

// =================== UTILITIES ===================

export const getTeams = (div) => div === 'adv' ? ADV_TEAMS : INT_TEAMS;
export const getTeam  = (div, id) => getTeams(div).find(t => t.id === id);
export const getTeamName = (div, id) => getTeam(div, id)?.name ?? `Team ${id}`;
export const getSchedule = (div) => div === 'adv' ? ADV_SCHEDULE : INT_SCHEDULE;

// Bump this each season. Prior seasons' rows stay in the database under their
// own prefix — a new season starts with an empty board rather than deleting them.
export const SEASON = 'f26';

export const gameKey = (div, week, slotIdx, court) =>
  `${SEASON}_${div}_w${week}_s${slotIdx}_c${court}`;

// Rows are looked up by key almost everywhere, which scopes them to the season
// for free. Use this wherever code scans all loaded rows instead.
export const isCurrentSeason = (key) => typeof key === 'string' && key.startsWith(`${SEASON}_`);

export function checkWinner(sA, sB) {
  if (sA >= 27 && sB >= 27) return 'T';
  if (sA >= 27) return 'A';
  if (sB >= 27) return 'B';
  if (sA >= 25 && sA - sB >= 2) return 'A';
  if (sB >= 25 && sB - sA >= 2) return 'B';
  return null;
}

/**
 * Returns the week number whose game date is closest to today.
 * This is the only week whose games can be edited.
 */
export function getEditableWeek(div) {
  const schedule = getSchedule(div);
  // Use PST so the day-before defaulting works regardless of device timezone
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Return the first week whose game date is today or in the future
  for (const wk of schedule) {
    const [, datePart] = wk.date.split(' ');
    const [m, d] = datePart.split('/');
    const gameDate = new Date(2026, parseInt(m, 10) - 1, parseInt(d, 10));
    if (gameDate >= today) return wk.week;
  }

  // All games are in the past — show last week
  return schedule[schedule.length - 1].week;
}

/**
 * Computes setup/teardown duties from the schedule itself:
 * setup   = teams reffing the FIRST time slot
 * teardown = teams reffing the LAST time slot
 */
export function getWeekDuties(wkData) {
  const firstSlot = wkData.slots[0]
  const lastSlot  = wkData.slots[wkData.slots.length - 1]

  const setup    = []
  const teardown = []

  ;[firstSlot.court1, firstSlot.court2].forEach(g => {
    if (g?.ref && !setup.includes(g.ref)) setup.push(g.ref)
  })
  ;[lastSlot.court1, lastSlot.court2].forEach(g => {
    if (g?.ref && !teardown.includes(g.ref)) teardown.push(g.ref)
  })

  return { setup, teardown }
}

export function computeStandings(div, results) {
  const teams = getTeams(div);
  const schedule = getSchedule(div);
  const rec = {};
  teams.forEach(t => { rec[t.id] = { wins: 0, losses: 0, ptsFor: 0, ptsAgainst: 0 }; });

  schedule.forEach(wk => {
    wk.slots.forEach((slot, si) => {
      ['court1', 'court2'].forEach((ct, ci) => {
        const g = slot[ct];
        if (!g) return;
        const k = gameKey(div, wk.week, si, ci + 1);
        for (const rk of [k, k + '_s2']) {
          const r = results[rk];
          const w = r?.winner ?? (r ? checkWinner(r.score_a ?? 4, r.score_b ?? 4) : null);
          if (w) {
            if (w === 'T') {
              if (rec[g.a]) rec[g.a].wins++;
              if (rec[g.b]) rec[g.b].wins++;
            } else {
              const winnerId = w === 'A' ? g.a : g.b;
              const loserId  = w === 'A' ? g.b : g.a;
              if (rec[winnerId]) rec[winnerId].wins++;
              if (rec[loserId])  rec[loserId].losses++;
            }
            const sA = r?.score_a ?? 4;
            const sB = r?.score_b ?? 4;
            if (rec[g.a]) { rec[g.a].ptsFor += sA; rec[g.a].ptsAgainst += sB; }
            if (rec[g.b]) { rec[g.b].ptsFor += sB; rec[g.b].ptsAgainst += sA; }
          }
        }
      });
    });
  });

  return teams.map(t => ({
    ...t,
    wins:       rec[t.id].wins,
    losses:     rec[t.id].losses,
    ptsFor:     rec[t.id].ptsFor,
    ptsAgainst: rec[t.id].ptsAgainst,
    pct: rec[t.id].wins + rec[t.id].losses === 0
      ? 0
      : rec[t.id].wins / (rec[t.id].wins + rec[t.id].losses),
  })).sort((a, b) => b.wins - a.wins || b.pct - a.pct || a.losses - b.losses);
}
