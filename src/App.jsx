import { Fragment, useEffect, useRef, useState } from "react";

import { BIWEEKLY_MAX, BONUS_TASKS, BOOSTERS, buildDayPlan, CHALLENGE_START, WEEK_MAX, WEEKLY_TASKS } from "./data.js";

export default function App() {
  // Which week is "now"? 0-based index into BOOSTERS; -1 if outside the challenge.
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksSinceStart = Math.floor((Date.now() - CHALLENGE_START.getTime()) / msPerWeek);
  const currentWeek = weeksSinceStart >= 0 && weeksSinceStart < BOOSTERS.length ? weeksSinceStart : -1;

  // running cumulative total computed from WEEK_MAX; flag current week + phase starts
  let acc = 0;
  const rows = BOOSTERS.map((b, i) => {
    acc += WEEK_MAX;
    const phaseStart = i === 0 || BOOSTERS[i - 1].phase !== b.phase;
    return { ...b, total: acc, isCurrent: i === currentWeek, phaseStart };
  });
  const fmt = (n) => n.toLocaleString("en-US");

  // Expandable 7-day plan: which week index is open (current week by default).
  const [openWeek, setOpenWeek] = useState(currentWeek);
  const rowRefs = useRef({});
  const scrollRowIntoView = (i) => {
    const row = rowRefs.current[i];
    if (!row) {
      return;
    }
    // account for the sticky hero + sticky table header so the row isn't hidden under them
    const heroH = document.querySelector("header.hero")?.offsetHeight || 0;
    const headerH = document.querySelector(".tablecard thead")?.offsetHeight || 0;
    const top = row.getBoundingClientRect().top + window.scrollY - heroH - headerH - 16; // 8px top gap + 8px gap between the two sticky bars
    window.scrollTo({ top, behavior: "smooth" });
  };
  const toggleWeek = (i) =>
    setOpenWeek((cur) => {
      const next = cur === i ? -1 : i;
      // scroll the row into view when it opens (after the plan row renders)
      if (next === i) {
        requestAnimationFrame(() => scrollRowIntoView(i));
      }
      return next;
    });

  // Keep --hero-h in sync with the sticky hero's height so the table header
  // can stack right below it. Also auto-scroll the current week into view on load.
  useEffect(() => {
    const hero = document.querySelector("header.hero");
    const setHeroH = () => {
      if (hero) {
        document.documentElement.style.setProperty(
          "--hero-h",
          // hero height + its 8px top gap + an 8px gap between the two sticky bars
          `${hero.offsetHeight + 16}px`,
        );
      }
    };
    setHeroH();
    window.addEventListener("resize", setHeroH);
    if (currentWeek >= 0) {
      scrollRowIntoView(currentWeek);
    }
    return () => window.removeEventListener("resize", setHeroH);
    // mount-only: currentWeek is derived from Date.now() and is stable for the session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrap">
      <header className="hero">
        <h1>🏋️ Slimpossible Challenge 2026</h1>
        <div className="sub">
          14-week weekly timetable · Challenge runs <span className="gold">22 Jun – 27 Sep 2026</span> · Cash prizes up to RM5,000
        </div>
      </header>

      {/* Every-week tasks */}
      <section className="recurring">
        <h2>
          🔁 Do these EVERY week (W1–W14) <span className="maxbadge">up to {WEEK_MAX} pts/wk</span>
        </h2>
        <p className="scope everyweek-scope">— All submissions go to the Lark Base Tracker</p>
        <div className="pill-row">
          {WEEKLY_TASKS.map((t) => (
            <div className="pill" key={t.title}>
              <div className="t">
                <span>
                  {t.icon} {t.title}
                </span>
                <span className="cap">{t.cap}</span>
              </div>
              <div className="d">{t.desc}</div>
              <table className="ptab">
                <tbody>
                  {(() => {
                    const maxVal = Math.max(...t.rows.map(([, v]) => v));
                    return t.rows.map(([label, val]) => (
                      <tr key={label} className={val === maxVal ? "target" : ""}>
                        <td>{label}</td>
                        <td>{val}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus actionables — boosters only */}
      <section className="recurring bonus">
        <h2>
          <span className="h2-title">🌟 Bonus actionables</span>
          <span className="maxbadge bonus-max">up to 40++ pts/wk</span>
        </h2>
        <p className="scope">— BOOSTERS ONLY (does NOT apply to weigh-in / steps / workouts)</p>
        <div className="pill-row">
          {BONUS_TASKS.map((t) => (
            <div className="pill" key={t.title}>
              <div className="t">
                <span>
                  {t.icon} {t.title}
                </span>
                <span className="cap bonus-cap">{t.badge}</span>
              </div>
              <div className="d">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booster rotation table */}
      <div className="tablecard">
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th className="th-wk">Week</th>
                <th className="th-booster">Bi-Weekly Booster</th>
                <th>Wk target</th>
                <th>Acc. total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b, i) => {
                const open = openWeek === i;
                return (
                  <Fragment key={b.wk}>
                    {/* eslint-disable jsx-a11y/prefer-tag-over-role -- a <tr> can't be a <button>; keyboard handler + aria-labelledby below provide button semantics */}
                    <tr
                      ref={(el) => (rowRefs.current[i] = el)}
                      data-phase={b.phase}
                      role="button"
                      tabIndex={0}
                      aria-labelledby={`week-toggle-label-${i}`}
                      onClick={() => toggleWeek(i)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleWeek(i);
                        }
                      }}
                      className={`wkrow${b.isCurrent ? " current" : ""}${b.phaseStart ? " phase-start" : ""}${open ? " open" : ""}`}
                    >
                      {/* eslint-enable jsx-a11y/prefer-tag-over-role */}
                      <td className="wk">
                        <span
                          id={`week-toggle-label-${i}`}
                          style={{
                            position: "absolute",
                            width: "1px",
                            height: "1px",
                            padding: 0,
                            margin: "-1px",
                            overflow: "hidden",
                            clip: "rect(0,0,0,0)",
                            whiteSpace: "nowrap",
                            border: 0,
                          }}
                        >
                          Toggle week {b.wk} plan
                        </span>
                        {b.isCurrent && <span className="caret">{open ? "▼" : "▶"}</span>}
                        {b.wk}
                        <span className="dates">{b.dates}</span>
                      </td>
                      <td>
                        <span className="booster">
                          {b.icon} {b.name}
                        </span>
                        <br />
                        <span className="post">{b.desc}</span>
                        <br />
                        {b.bonus && (
                          <>
                            <span className="bonusline">🌟 Bonus: {b.bonus}</span>
                            <br />
                          </>
                        )}
                        {b.extra && (
                          <>
                            <span className="extraline">✨ {b.extra}</span>
                            <br />
                          </>
                        )}
                        <span className="tag">{b.tags}</span>
                      </td>
                      <td className="wkmax">
                        <span className="wkmax-total">{WEEK_MAX}</span>
                        <span className="wkmax-base">
                          <b className="p-base">200</b>
                          <b className="p-boost">+30</b>
                          <b className="p-bonus">+10</b>
                        </span>
                      </td>
                      <td className="total">{fmt(b.total)}</td>
                    </tr>
                    {open && (
                      <tr className={`planrow${b.isCurrent ? " current" : ""}`}>
                        <td colSpan={4} aria-label={`Week ${b.wk} day plan`}>
                          <div className="wp-strip">
                            <ul className="wp-actions">
                              {buildDayPlan(b).map((d) => (
                                <li key={d.label} className={`wp-act ${d.kind}`}>
                                  <span className="wp-clabel">{d.label}</span>
                                  {d.cue && <span className="wp-ccue">{d.cue}</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <section className="legend">
        <h2>📌 How to read this</h2>
        <ul>
          <li>
            <b>The 3 cards up top happen every single week</b> — weigh-in (Mon), step log, and 3 workouts.
          </li>
          <li>
            <b>The booster changes every 2 weeks.</b> Just check your week's row for what's special.
          </li>
          <li>
            <b>Booster pts = 30 / 40:</b> <span className="req">30</span> = Lark Base submission (required for any points).{" "}
            <span className="opt">40</span> = Lark Base <i>+</i> post on ZUS Moments with the hashtags.
          </li>
          <li>
            <b>Wk target = {WEEK_MAX}:</b> the realistic ceiling — 100 steps + 100 workouts + 40 booster. <b>Weigh-in is excluded</b> (you can't bank
            the 40-pt loss tier every week). Bi-weekly max is <b>{fmt(BIWEEKLY_MAX)}</b>; <b>Acc. total</b> is the running cumulative max, ending at{" "}
            <b>{fmt(WEEK_MAX * BOOSTERS.length)}</b> — your leaderboard benchmark.
          </li>
          <li>
            <b>All submissions go to the Lark Base Tracker</b> — that's mandatory for points to count.
          </li>
          <li>
            All activities must be done <b>outside working hours</b>. Only weight <i>losses</i> earn points (maintain/gain = 0).
          </li>
          <li>
            <b>Final report: 28 Sep</b> — the day after W14 closes; final standings are tallied then.
          </li>
        </ul>
      </section>
    </div>
  );
}
