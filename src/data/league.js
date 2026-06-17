// =================== TEAMS ===================

export const ADV_TEAMS = [
  { id: 1, name: 'Jollibeetches',           players: ['Rhenard Leclair','Jack Connolly','David Solomon','Jon Birchler','Alex Pacheco','Arslan Kasimov','Danyion Reagan'] },
  { id: 2, name: 'Ball Handlers',           players: ['Ricardo Alves','Brandon Styles','Blake Van Grouw','Ethan Dressen','Johnathan Wang','Cesar Arada','Jamil Al-Ghosein'] },
  { id: 3, name: 'Volhalla',                players: ['Teddy Luther','Christian Monaghan','Iris Brewer','Dorian Dorsey','Kae Saetern','Stefan "Steffy" Wojkowski','Enzo Arada'] },
  { id: 4, name: 'Keta Mean Girls',         players: ['Alexander Bast','Alan Zhou','Matt Merritt','Alex Wu','Kwok "Chris" Im','Xavier Tenorio','Kyle Reiley'] },
  { id: 5, name: 'Hole Foods',              players: ['Chen-Chen Huo','Aidan Dillon','Cody Howard','Patrick Godfrey','Immy Martiniano','Tali Swisher','Thomas Leech'] },
  { id: 6, name: 'Gay Straight Alliance',   players: ['Andrew Fischer','Connor Graflund','Ryan Grasell','Alex Schlick','Spencer Bundoc','Quinton Walker','Brian Kim'] },
  { id: 7, name: "Jaylen's Grey Sweatpants", players: ['Joseph Barkus','Jason Giblin','Trey Godfrey','Nathan Draper','Diego Almodiel','Scott Faludi','Ryan Schleeter'] },
];

export const INT_TEAMS = [
  { id: 1, name: 'Open.Gay.Thighs.',        players: ['JJ Chun','Hosea Lee','Jeremy Wang','James Mullen','Tony Wu','Ben Ng','Jonny Hsieh','Kerry Phomtavang'] },
  { id: 2, name: 'Ugly But Legal',          players: ['Ari Fontanilla','Jocelyn Ho','Weston White','Kevin Normoyle','Abby Arcilla','Ricky Irizarry Caro','Andrew Aquino','Tommy Cu'] },
  { id: 3, name: 'Celebrity Trait-Whores',  players: ['Timothy Dy Guani','Brett Kellaher','Taylor Horn','Son Quyen Dinh','Brenda Young','Patrick Chiang','AJ Martins','Jason Malabed'] },
  { id: 4, name: 'Whorio Karts',            players: ['Kyle Rosenthal','Vigo Jiang','Alex Liou','Austin Lam','Mark Salzer','Derrick Hau','Jake Castrejon'] },
  { id: 5, name: 'NKOTB',                   players: ['Thang Huynh','Robert Peralta','Kyle Miller','Adam La Mar','Jeff Ng','Tony Tran','Go Takei','Cesar Cardona'] },
  { id: 6, name: 'Bump Set Ooops',          players: ['Robbie Wise','Richard Sucre','David Sechko','Shayne OBrien','Adrian Sanborn','Kevin Kuo','Lorenzo Labitigan'] },
  { id: 7, name: 'Mortal Cumbacks',         players: ['Eric Ricker','Danny Chin','Willow Taylor','Jihwan Kim','Eric Gaudet','Andy Yeo','TJ Bleichner','Brian Tang'] },
];

// =================== SCHEDULES ===================

export const ADV_SCHEDULE = [
  { week: 1, date: 'Wed 06/17', slots: [
    { time: '6:20', court1: { a:7, b:3, ref:4 }, court2: { a:2, b:5, ref:1 } },
    { time: '7:00', court1: { a:2, b:4, ref:5 }, court2: { a:6, b:1, ref:3 } },
    { time: '7:40', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:7, ref:3 } },
    { time: '8:20', court1: { a:3, b:6, ref:2 }, court2: { a:1, b:4, ref:7 } },
  ]},
  { week: 2, date: 'Wed 06/24', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:1, b:4, ref:7 } },
    { time: '7:00', court1: { a:2, b:7, ref:5 }, court2: { a:3, b:4, ref:6 } },
    { time: '7:40', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:6, ref:7 } },
    { time: '8:20', court1: { a:7, b:3, ref:1 }, court2: { a:2, b:5, ref:4 } },
  ]},
  { week: 3, date: 'Wed 07/08', slots: [
    { time: '6:20', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:00', court1: { a:6, b:7, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '7:40', court1: { a:7, b:1, ref:3 }, court2: { a:4, b:6, ref:5 } },
    { time: '8:20', court1: { a:6, b:2, ref:7 }, court2: { a:3, b:5, ref:4 } },
  ]},
  { week: 4, date: 'Wed 07/15', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:6, b:7, ref:5 } },
    { time: '7:00', court1: { a:3, b:5, ref:7 }, court2: { a:1, b:6, ref:4 } },
    { time: '7:40', court1: { a:5, b:7, ref:1 }, court2: { a:2, b:4, ref:6 } },
    { time: '8:20', court1: { a:1, b:2, ref:3 }, court2: { a:4, b:7, ref:6 } },
  ]},
  { week: 5, date: 'Wed 07/22', slots: [
    { time: '6:20', court1: { a:2, b:6, ref:1 }, court2: { a:3, b:4, ref:5 } },
    { time: '7:00', court1: { a:5, b:7, ref:3 }, court2: { a:1, b:2, ref:4 } },
    { time: '7:40', court1: { a:6, b:3, ref:7 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:2, b:3, ref:6 }, court2: { a:7, b:1, ref:5 } },
  ]},
  { week: 6, date: 'Wed 07/29', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:2, b:4, ref:7 } },
    { time: '7:00', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:40', court1: { a:7, b:3, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:1, b:6, ref:5 }, court2: { a:4, b:7, ref:2 } },
  ]},
  { week: 7, date: 'Wed 08/05', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:7, ref:6 } },
    { time: '7:00', court1: { a:2, b:5, ref:7 }, court2: { a:4, b:6, ref:1 } },
    { time: '7:40', court1: { a:7, b:1, ref:5 }, court2: { a:3, b:6, ref:4 } },
    { time: '8:20', court1: { a:6, b:5, ref:3 }, court2: { a:2, b:7, ref:1 } },
  ]},
];

export const INT_SCHEDULE = [
  { week: 1, date: 'Thu 06/18', slots: [
    { time: '6:20', court1: { a:7, b:3, ref:4 }, court2: { a:2, b:5, ref:1 } },
    { time: '7:00', court1: { a:2, b:4, ref:5 }, court2: { a:6, b:1, ref:3 } },
    { time: '7:40', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:7, ref:3 } },
    { time: '8:20', court1: { a:3, b:6, ref:2 }, court2: { a:1, b:4, ref:7 } },
  ]},
  { week: 2, date: 'Thu 06/25', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:1, b:4, ref:7 } },
    { time: '7:00', court1: { a:2, b:7, ref:5 }, court2: { a:3, b:4, ref:6 } },
    { time: '7:40', court1: { a:1, b:3, ref:2 }, court2: { a:4, b:6, ref:7 } },
    { time: '8:20', court1: { a:7, b:3, ref:1 }, court2: { a:2, b:5, ref:4 } },
  ]},
  { week: 3, date: 'Thu 07/09', slots: [
    { time: '6:20', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:00', court1: { a:6, b:7, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '7:40', court1: { a:7, b:1, ref:3 }, court2: { a:4, b:6, ref:5 } },
    { time: '8:20', court1: { a:6, b:2, ref:7 }, court2: { a:3, b:5, ref:4 } },
  ]},
  { week: 4, date: 'Thu 07/16', slots: [
    { time: '6:20', court1: { a:1, b:3, ref:2 }, court2: { a:6, b:7, ref:5 } },
    { time: '7:00', court1: { a:3, b:5, ref:7 }, court2: { a:1, b:6, ref:4 } },
    { time: '7:40', court1: { a:5, b:7, ref:1 }, court2: { a:2, b:4, ref:6 } },
    { time: '8:20', court1: { a:1, b:2, ref:3 }, court2: { a:4, b:7, ref:6 } },
  ]},
  { week: 5, date: 'Thu 07/23', slots: [
    { time: '6:20', court1: { a:2, b:6, ref:1 }, court2: { a:3, b:4, ref:5 } },
    { time: '7:00', court1: { a:5, b:7, ref:3 }, court2: { a:1, b:2, ref:4 } },
    { time: '7:40', court1: { a:6, b:3, ref:7 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:2, b:3, ref:6 }, court2: { a:7, b:1, ref:5 } },
  ]},
  { week: 6, date: 'Thu 07/30', slots: [
    { time: '6:20', court1: { a:5, b:6, ref:3 }, court2: { a:2, b:4, ref:7 } },
    { time: '7:00', court1: { a:1, b:5, ref:6 }, court2: { a:2, b:3, ref:4 } },
    { time: '7:40', court1: { a:7, b:3, ref:1 }, court2: { a:4, b:5, ref:2 } },
    { time: '8:20', court1: { a:1, b:6, ref:5 }, court2: { a:4, b:7, ref:2 } },
  ]},
  { week: 7, date: 'Thu 08/06', slots: [
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

export const gameKey = (div, week, slotIdx, court) =>
  `${div}_w${week}_s${slotIdx}_c${court}`;

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
  teams.forEach(t => { rec[t.id] = { wins: 0, losses: 0 }; });

  schedule.forEach(wk => {
    wk.slots.forEach((slot, si) => {
      ['court1', 'court2'].forEach((ct, ci) => {
        const g = slot[ct];
        if (!g) return;
        const k = gameKey(div, wk.week, si, ci + 1);
        // Count both set 1 and set 2 separately
        for (const rk of [k, k + '_s2']) {
          const r = results[rk];
          if (r?.winner) {
            if (r.winner === 'T') {
              if (rec[g.a]) rec[g.a].wins++;
              if (rec[g.b]) rec[g.b].wins++;
            } else {
              const winnerId = r.winner === 'A' ? g.a : g.b;
              const loserId  = r.winner === 'A' ? g.b : g.a;
              if (rec[winnerId]) rec[winnerId].wins++;
              if (rec[loserId])  rec[loserId].losses++;
            }
          }
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
