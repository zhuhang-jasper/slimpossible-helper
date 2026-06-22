# ZUS Slimpossible Challenge 2026 — Source Reference

Distilled from the official PDF (`ZUS Slimpossible Challenge 2026.pdf`, 16 pp) and the
Google Sheet tracker. **This file is the source of truth for `src/data.js`.** Read this
instead of re-parsing the PDF/sheet. Last cross-checked: 2026-06-22 — `data.js` fully matches.

- Sheet: https://docs.google.com/spreadsheets/d/1EJsSEJlTFtIZPupKgwq07I76MgpqXdylr9xv3JRoivI/edit
- The point-allocation tables in the PDF are **images** (pages 5–6); they do NOT extract via
  `pdftotext`. Render with `pdftoppm -png -r 200 -f 5 -l 6 <pdf> out` and read the PNGs.

## Challenge frame
- 14 weeks, **22 Jun – 27 Sep 2026**. W1 Monday = 22 Jun. Weeks are exactly 7 days.
- **Final Report: 28 Sep** (sheet only; the day after W14 ends).
- Early-registration merch bonus if registered by 30 June.
- All activities **outside working hours**. Only weight *losses* score (maintain/gain = 0).
- All submissions go to the **Lark Base Tracker** — mandatory for any points.

## Weekly recurring points (every week W1–W14)

### Weigh-in — cap 40/wk
Every Monday. Photo/video of scale (feet + display visible). Only losses score.
| Tier | Points |
|------|--------|
| Lose > 0.5 kg | 10 |
| Lose > 1 kg | 40 |

### Step count — cap 100/wk
Log once weekly. Screenshot of any step app (Google Fit, Fitbit, Apple Health, Strava…).
| Weekly steps | Points |
|------|--------|
| 20,000 | 20 |
| 25,000 | 25 |
| 30,000 | 30 |
| 35,000 | 35 |
| > 40,000 | 100 |

### Workouts — cap 100/wk
On separate days (cannot do all 3 in one day). Photo/video showing your face.
| No. of workouts | Points |
|------|--------|
| 1 | 30 |
| 2 | 60 |
| > 3 (i.e. 3+) | 100 |

**Realistic weekly benchmark (`WEEK_MAX`) = 240 pts** = 100 steps + 100 workouts + 40 booster.
Weigh-in (max 40) is **excluded** from the ceiling — the >1 kg/40-pt tier can't be banked
every week. Bi-weekly max (`BIWEEKLY_MAX`) = 480. Cumulative over 14 weeks = 3,360.

## Bi-weekly boosters (30 pts Lark Base required; +10 = 40 pts with ZUS Moments post)

All posts also tag **#ChampionsFuelChampions**. Rule: max 1 submission/week, max 2 per pair.

| Wk | Dates | Booster | Hashtag | Notes |
|----|-------|---------|---------|-------|
| W1–W2 | 22 Jun–5 Jul | 👣 Buddy Steps | #ZUSBuddySteps | Walk/jog w/ buddy (incl. family/pets). Max 2 across W1+W2. |
| W3–W4 | 6–19 Jul | 🥗 ZUS SnapFuel | #ZUSSnapFuel | Cook healthy meal/smoothie, time-lapse video. Only meals cooked during challenge weeks. |
| W5–W6 | 20 Jul–2 Aug | 🏃 ZUS Pace Challenge | #ZUSPaceChallenge | 2km in **20 min**. Show distance+time. Bonus: ZUS merch. |
| W7–W8 | 3–16 Aug | 💧 Hydration Hustle | #ZUSHydrationHustle | ≥2L water/day. 15–30s clip: sip + 1 health fact. |
| W9–W10 | 17–30 Aug | ⚡ Pace Challenge: Level Up | #ZUSPaceUp | 2km in **15 min**. |
| W11–W12 | 31 Aug–13 Sep | 🧘 ZUS Zen Time | #ZUSZenTime | Yoga/Zumba/meditation/wellness class. 15–30s time-lapse. No duplicate sessions. |
| W13–W14 | 14–27 Sep | 🧠 ZUS Mind Break Mission | #ZUSMindBreakMission | Attend ZUS Mental Health Talk / Wellness session. Submission required after attending. |

Booster bonus tips live in a dedicated `bonus` field on the **first week of each pair**
(surfaced from the start of the phase, rendered bold). Per the PDF every ZUS Moments bonus
is **+10 pts (30 → 40)** — the bonus string states this explicitly.

## Bonus actionables (boosters only — not weigh-in/steps/workouts)
- 📣 **Post on ZUS Moments**: lifts a booster 30 → 40 pts. Tag #ChampionsFuelChampions + week's booster hashtag.
- 🥤 **Show ZUS merch**: in Pace/Hydration clips, feature tumbler/cup/canned drink/merch.
- 👥 **Tag colleagues**: on Buddy Steps, tag colleagues in the ZUS Moments post.

## Prizes
- **Individual:** 1st RM1,000 · 2nd RM700 · 3rd RM500 · 4th & 5th RM200.
- **Group (team of 2–5):** 1st RM5,000 · 2nd RM3,500 · 3rd RM1,500 · 4th & 5th RM1,000 (split equally per pax).
- Each participant joins **one** category only; no switching after registering.
- Weekly leaderboard; Top 5 individuals & Top 5 groups featured each week.

## Known issues in the source PDF (their typos, NOT ours — `data.js` is correct)
- Hydration Hustle (D) submission rule says "Week 5 & 6" — should be **Week 7 & 8**.

## Not yet reflected in the app (candidates)
- "Final Report: 28 Sep" date (sheet only).
- Prize amounts / leaderboard mechanics (intentionally out of scope — this is a timetable view).
