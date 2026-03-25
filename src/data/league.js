// =================== TEAMS ===================

export const ADV_TEAMS = [
  { id: 1, name: 'Trader Hoes',        players: ['Chen-Chen Huo','Aidan Dillon','Thomas Leech','Patrick Godfrey','Cody Howard','Chris Im','Immy Martiniano','Ruan Poindexter'] },
  { id: 2, name: "Weiner's Circle",    players: ['Ricardo Alves','Alex Bast','Garrick Monaghan','Nick Wise','Ben Beyer','Alberto Chun','Xavier Tenorio','Johnathan Wang'] },
  { id: 3, name: 'Zaddy Please',       players: ['Iris Brewer','Dorian Dorsey','Jimmy Leyden','Jamil Al-Ghosein','Jocelyn Ho','Matt Merritt','David Pena-Guzman','Tali Swisher'] },
  { id: 4, name: 'Harmonious Hoes',    players: ['Andrew Fischer','Alex Schlick','Ryan Grassell','Connor Graflund','Cesar Arada','Teddy Luther','Christian Monaghan','Kae Saeturn'] },
  { id: 5, name: 'Fourth Alternate',   players: ['Joe Barkus','Jason Giblin','Trey Godfrey','James Prietto','Enzo Arada','Nathan Draper','Dan Fraguglia','Kyle Reiley'] },
  { id: 6, name: 'Mabuhay Beki Divas', players: ['Rhenard LeClair','James Cardenas','Ethan Dressen','Matt Gelsomino','Jack Connolly','Manit Limlamai','Finn MacDonald','Alex Wu'] },
  { id: 7, name: 'Chicas Divertidas',  players: ['Oscar Ramos','Danyion Reagan','Spencer Bundoc','Franco Rossi','Levon Kalustyan','Arslan Kasimov','Alan Zhu'] },
];

export const INT_TEAMS = [
  { id: 1, name: 'Cottage Crew',              players: ['Kyle Rosenthal','Alex Liou','Austin Lam','Vigo Jiang','Andrew Aquino','Derrick Hau','Liza Justo','Tony Tran'] },
  { id: 2, name: 'K Pop D Hunters',           players: ['Tim Dy Guani','Son Dinh','Brett Kellaher','Danny Chin','Jessica Anderson','Joel Bodilly','AJ Martins','Abel Reyna'] },
  { id: 3, name: 'White Lotus: Season Whore', players: ['Eric Ricker','Sia Assar','Go Takei','DaShaunn Woolard','Ben Ng','Tony Wu','Brenda Young'] },
  { id: 4, name: 'NKOTB',                     players: ['Thang Huynh','Travis Beck','Rob Peralta','Jihwan Kim','Felipe De Bedout','Eric Gaudet','Mark Salzer','Weston White'] },
  { id: 5, name: 'The Gays of Whoremuz',      players: ['JJ Chun','Jeremy Wang','James Mullen','TJ Bleichner','Abby Arcilla','Ari Fontanilla','Jason Malabed'] },
  { id: 6, name: 'Textbook Volleyball',       players: ['Shayne O\'Brien','Robbie Wise','Rich Sucre','David Sechko','Jake Castrejon','Jonny Hsieh','Lorenzo Labitigon','Chhun Tov'] },
];

// =================== SCHEDULES ===================

export const ADV_SCHEDULE = [
  { week: 1, date: 'Wed 03/25', firstRefs: [1,2], lastRefs: [3], slots: [
    { time: '6:20', court1: { a:2, b:4, ref:7 }, court2: { a:6, b:1, ref:3 } },
    { time: '7:00', court1: { a:4, b:6, ref:2 }, court2: { a:1, b:3, ref:5 } },
    { time: '7:40', court1: { a:7, b:2, ref:4 }, court2: { a:3, b:5, ref:1 } },
    { time: '8:20', court1: { a:1, b:2, ref:6 }, court2: { a:5, b:7, ref:3 } },
  ]},
  { week: 2, date: 'Wed 04/01', firstRefs: [3,4], lastRefs: [7], slots: [
    { time: '6:20', court1: { a:2, b:3, ref:5 }, court2: { a:4, b:7, ref:6 } },
    { time: '7:00', court1: { a:7, b:2, ref:1 }, court2: { a:3, b:5, ref:4 } },
    { time: '7:40', court1: { a:5, b:6, ref:3 }, court2: { a:1, b:4, ref:7 } },
    { time: '8:20', court1: { a:6, b:1, ref:2 }, court2: { a:3, b:4, ref:7 } },
  ]},
  { week: 3, date: 'Wed 04/08', firstRefs: [5,6], lastRefs: [4], slots: [
    { time: '6:20', court1: { a:6, b:2, ref:7 }, court2: { a:3, b:5, ref:4 } },
    { time: '7:00', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:40', court1: { a:7, b:1, ref:2 }, court2: { a:4, b:6, ref:5 } },
    { time: '8:20', court1: { a:6, b:7, ref:1 }, court2: { a:4, b:5, ref:3 } },
  ]},
  { week: 4, date: 'Wed 04/15', firstRefs: [1,7], lastRefs: [6], slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:6, b:7, ref:5 } },
    { time: '7:00', court1: { a:3, b:5, ref:7 }, court2: { a:6, b:1, ref:4 } },
    { time: '7:40', court1: { a:5, b:7, ref:1 }, court2: { a:2, b:4, ref:6 } },
    { time: '8:20', court1: { a:7, b:1, ref:3 }, court2: { a:2, b:4, ref:6 } },
  ]},
  { week: 5, date: 'Wed 04/22', firstRefs: [2,3], lastRefs: [5], slots: [
    { time: '6:20', court1: { a:2, b:3, ref:6 }, court2: { a:7, b:1, ref:5 } },
    { time: '7:00', court1: { a:5, b:7, ref:3 }, court2: { a:1, b:2, ref:4 } },
    { time: '7:40', court1: { a:6, b:3, ref:7 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:2, b:3, ref:1 }, court2: { a:4, b:6, ref:5 } },
  ]},
  { week: 6, date: 'Wed 04/29', firstRefs: [4,5], lastRefs: [2], slots: [
    { time: '6:20', court1: { a:5, b:6, ref:1 }, court2: { a:2, b:4, ref:7 } },
    { time: '7:00', court1: { a:6, b:1, ref:3 }, court2: { a:2, b:5, ref:4 } },
    { time: '7:40', court1: { a:1, b:3, ref:5 }, court2: { a:4, b:7, ref:2 } },
    { time: '8:20', court1: { a:7, b:3, ref:6 }, court2: { a:4, b:5, ref:2 } },
  ]},
  { week: 7, date: 'Wed 05/06', firstRefs: [6,7], lastRefs: [1], slots: [
    { time: '6:20', court1: { a:7, b:1, ref:5 }, court2: { a:3, b:6, ref:4 } },
    { time: '7:00', court1: { a:1, b:3, ref:2 }, court2: { a:5, b:7, ref:6 } },
    { time: '7:40', court1: { a:6, b:2, ref:7 }, court2: { a:4, b:5, ref:1 } },
    { time: '8:20', court1: { a:6, b:7, ref:3 }, court2: { a:2, b:4, ref:1 } },
  ]},
];

export const INT_SCHEDULE = [
  { week: 1, date: 'Thu 03/26', firstRefs: [1,3], lastRefs: [5], slots: [
    { time: '6:20', court1: { a:1, b:2, ref:5 }, court2: { a:3, b:4, ref:6 } },
    { time: '7:00', court1: { a:1, b:5, ref:3 }, court2: null },
    { time: '7:40', court1: { a:2, b:4, ref:5 }, court2: { a:3, b:6, ref:1 } },
    { time: '8:20', court1: { a:5, b:6, ref:2 }, court2: { a:1, b:3, ref:4 } },
  ]},
  { week: 2, date: 'Thu 04/02', firstRefs: [4,5], lastRefs: [6], slots: [
    { time: '6:20', court1: { a:1, b:6, ref:3 }, court2: { a:2, b:5, ref:4 } },
    { time: '7:00', court1: { a:2, b:3, ref:6 }, court2: { a:4, b:5, ref:1 } },
    { time: '7:40', court1: { a:4, b:6, ref:5 }, court2: null },
    { time: '8:20', court1: { a:1, b:4, ref:6 }, court2: { a:3, b:5, ref:2 } },
  ]},
  { week: 3, date: 'Thu 04/09', firstRefs: [3,6], lastRefs: [2], slots: [
    { time: '6:20', court1: { a:1, b:3, ref:4 }, court2: { a:5, b:6, ref:2 } },
    { time: '7:00', court1: { a:1, b:5, ref:3 }, court2: { a:2, b:4, ref:6 } },
    { time: '7:40', court1: { a:3, b:6, ref:2 }, court2: null },
    { time: '8:20', court1: { a:2, b:3, ref:5 }, court2: { a:4, b:6, ref:1 } },
  ]},
  { week: 4, date: 'Thu 04/16', firstRefs: [1,2], lastRefs: [3,4], slots: [
    { time: '6:20', court1: { a:1, b:6, ref:5 }, court2: { a:2, b:4, ref:3 } },
    { time: '7:00', court1: null,                court2: { a:1, b:3, ref:4 } },
    { time: '7:40', court1: { a:4, b:5, ref:1 }, court2: { a:2, b:6, ref:3 } },
    { time: '8:20', court1: { a:1, b:2, ref:6 }, court2: { a:3, b:5, ref:4 } },
  ]},
  { week: 5, date: 'Thu 04/23', firstRefs: [3,4,5,6], lastRefs: [1,2], slots: [
    { time: '6:20', court1: { a:1, b:4, ref:2 }, court2: { a:3, b:6, ref:5 } },
    { time: '7:00', court1: { a:2, b:3, ref:4 }, court2: { a:5, b:6, ref:1 } },
    { time: '7:40', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:4, ref:3 } },
    { time: '8:20', court1: { a:4, b:6, ref:2 }, court2: { a:3, b:5, ref:1 } },
  ]},
  { week: 6, date: 'Thu 04/30', firstRefs: [1,2,5,6], lastRefs: [3,4], slots: [
    { time: '6:20', court1: { a:1, b:2, ref:4 }, court2: { a:3, b:5, ref:6 } },
    { time: '7:00', court1: { a:4, b:6, ref:1 }, court2: { a:2, b:5, ref:3 } },
    { time: '7:40', court1: { a:1, b:6, ref:4 }, court2: { a:2, b:3, ref:5 } },
    { time: '8:20', court1: { a:1, b:4, ref:2 }, court2: { a:5, b:6, ref:3 } },
  ]},
  { week: 7, date: 'Thu 05/07', firstRefs: [2,4], lastRefs: [5], slots: [
    { time: '6:20', court1: { a:3, b:4, ref:1 }, court2: { a:2, b:6, ref:5 } },
    { time: '7:00', court1: { a:1, b:5, ref:4 }, court2: { a:2, b:6, ref:3 } },
    { time: '7:40', court1: { a:4, b:5, ref:2 }, court2: null },
    { time: '8:20', court1: { a:1, b:3, ref:6 }, court2: { a:2, b:4, ref:5 } },
  ]},
];

// =================== UTILITIES ===================

export const getTeams = (div) => div === 'adv' ? ADV_TEAMS : INT_TEAMS;
export const getTeam  = (div, id) => getTeams(div).find(t => t.id === id);
export const getTeamName = (div, id) => getTeam(div, id)?.name ?? `Team ${id}`;
export const getSchedule = (div) => div === 'adv' ? ADV_SCHEDULE : INT_SCHEDULE;

export const gameKey = (div, week, slotIdx, court) =>
  `${div}_w${week}_s${slotIdx}_c${court}`;

export function checkWinner(sA, sB) {
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
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  let closest = schedule[0].week;
  let minDiff = Infinity;

  for (const wk of schedule) {
    const [, datePart] = wk.date.split(' ');
    const [m, d] = datePart.split('/');
    const gameDate = new Date(2026, parseInt(m, 10) - 1, parseInt(d, 10));
    gameDate.setHours(12, 0, 0, 0);
    const diff = Math.abs(gameDate - today);
    if (diff < minDiff) {
      minDiff = diff;
      closest = wk.week;
    }
  }
  return closest;
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
  teams.forEach(t => { rec[t.id] = { wins: 0, losses: 0 }; });

  schedule.forEach(wk => {
    wk.slots.forEach((slot, si) => {
      ['court1', 'court2'].forEach((ct, ci) => {
        const g = slot[ct];
        if (!g) return;
        const k = gameKey(div, wk.week, si, ci + 1);
        const r = results[k];
        if (r?.winner) {
          const winnerId = r.winner === 'A' ? g.a : g.b;
          const loserId  = r.winner === 'A' ? g.b : g.a;
          if (rec[winnerId]) rec[winnerId].wins++;
          if (rec[loserId])  rec[loserId].losses++;
        }
      });
    });
  });

  return teams.map(t => ({
    ...t,
    wins:   rec[t.id].wins,
    losses: rec[t.id].losses,
    pct: rec[t.id].wins + rec[t.id].losses === 0
      ? 0
      : rec[t.id].wins / (rec[t.id].wins + rec[t.id].losses),
  })).sort((a, b) => b.wins - a.wins || b.pct - a.pct || a.losses - b.losses);
}
