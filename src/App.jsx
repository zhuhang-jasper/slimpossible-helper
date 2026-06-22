import { WEEKLY_TASKS, BONUS_TASKS, BOOSTERS, WEEK_MAX, BIWEEKLY_MAX, CHALLENGE_START } from './data.js'

export default function App() {
  // Which week is "now"? 0-based index into BOOSTERS; -1 if outside the challenge.
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weeksSinceStart = Math.floor((Date.now() - CHALLENGE_START.getTime()) / msPerWeek)
  const currentWeek = weeksSinceStart >= 0 && weeksSinceStart < BOOSTERS.length ? weeksSinceStart : -1

  // running cumulative total computed from WEEK_MAX; flag current week + phase starts
  let acc = 0
  const rows = BOOSTERS.map((b, i) => {
    acc += WEEK_MAX
    const phaseStart = i === 0 || BOOSTERS[i - 1].phase !== b.phase
    return { ...b, total: acc, isCurrent: i === currentWeek, phaseStart }
  })
  const fmt = (n) => n.toLocaleString('en-US')

  return (
    <div className="wrap">
      <header className="hero">
        <h1>🏋️ ZUS Slimpossible Challenge 2026</h1>
        <div className="sub">
          14-week weekly timetable · Challenge runs{' '}
          <span className="gold">22 Jun – 27 Sep 2026</span> · Cash prizes up to RM5,000
        </div>
      </header>

      {/* Every-week tasks */}
      <section className="recurring">
        <h2>
          🔁 Do these EVERY week (W1–W14){' '}
          <span className="maxbadge">up to {WEEK_MAX} pts/week</span>
        </h2>
        <div className="pill-row">
          {WEEKLY_TASKS.map((t) => (
            <div className="pill" key={t.title}>
              <div className="t">
                <span>{t.icon} {t.title}</span>
                <span className="cap">{t.cap}</span>
              </div>
              <div className="d">{t.desc}</div>
              <table className="ptab">
                <tbody>
                  {t.rows.map(([label, val]) => (
                    <tr key={label}><td>{label}</td><td>{val}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus actionables — boosters only */}
      <section className="recurring bonus">
        <h2>
          🌟 Bonus actionables{' '}
          <span className="scope">— BOOSTERS ONLY (does NOT apply to weigh-in / steps / workouts)</span>
        </h2>
        <div className="pill-row">
          {BONUS_TASKS.map((t) => (
            <div className="pill" key={t.title}>
              <div className="t">
                <span>{t.icon} {t.title}</span>
                <span className="cap bonus-cap">{t.badge}</span>
              </div>
              <div className="d">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booster rotation table */}
      <div className={`tablecard${currentWeek >= 0 ? ' has-current' : ''}`}>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Dates</th>
                <th>This week's Booster (bi-weekly)</th>
                <th>Booster</th>
                <th>Wk target</th>
                <th>Acc. total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr
                  key={b.wk}
                  data-phase={b.phase}
                  className={`${b.isCurrent ? 'current' : ''}${b.phaseStart ? ' phase-start' : ''}`}
                >
                  <td className="wk">{b.isCurrent ? '▶ ' : ''}{b.wk}</td>
                  <td className="dates">{b.dates}</td>
                  <td>
                    <span className="booster">{b.icon} {b.name}</span><br />
                    <span className="post">{b.desc}</span><br />
                    {b.bonus && <><span className="bonusline">🌟 Bonus: {b.bonus}</span><br /></>}
                    <span className="tag">{b.tags}</span>
                  </td>
                  <td className="pts">{b.pts}</td>
                  <td className="wkmax">{WEEK_MAX}</td>
                  <td className="total">{fmt(b.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="legend">
        <h2>📌 How to read this</h2>
        <ul>
          <li><b>The 3 cards up top happen every single week</b> — weigh-in (Mon), step log, and 3 workouts.</li>
          <li><b>The booster changes every 2 weeks.</b> Just check your week's row for what's special.</li>
          <li><b>Booster pts = 30 / 40:</b> <span className="req">30</span> = Lark Base submission (required for any points). <span className="opt">40</span> = Lark Base <i>+</i> post on ZUS Moments with the hashtags.</li>
          <li><b>Wk target = {WEEK_MAX}:</b> the realistic ceiling — 100 steps + 100 workouts + 40 booster. <b>Weigh-in is excluded</b> (you can't bank the 40-pt loss tier every week). Bi-weekly max is <b>{fmt(BIWEEKLY_MAX)}</b>; <b>Acc. total</b> is the running cumulative max, ending at <b>{fmt(WEEK_MAX * BOOSTERS.length)}</b> — your leaderboard benchmark.</li>
          <li><b>All submissions go to the Lark Base Tracker</b> — that's mandatory for points to count.</li>
          <li>All activities must be done <b>outside working hours</b>. Only weight <i>losses</i> earn points (maintain/gain = 0).</li>
          <li><b>Final report: 28 Sep</b> — the day after W14 closes; final standings are tallied then.</li>
        </ul>
      </section>
    </div>
  )
}
