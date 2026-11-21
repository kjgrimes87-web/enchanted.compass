# @enchanted.compass — posting playbook

Read this whole file before making or scheduling any post. These are the owner's standing rules.

## What the page is
Global travel: interesting and lesser-known places, beautiful things, practical travel tips.
Audience: Europe and Asia first (not the US). China is fine occasionally, but most posts should be elsewhere.

## Schedule
- 3 posts a week: **Monday, Wednesday, Friday at 18:00 Asia/Shanghai** (10:00 London, 11:00 Paris).
- Metricool blogId **7791083**, timezone **Asia/Shanghai**, network Instagram, carousel 1080x1350.
- If a slot is empty and its time has passed, post at the next slot rather than skip a day.
- Never schedule two posts for the same day. Check `getScheduledPosts` first.

## Hard rules
1. **Never guess.** Every fact must come from credible, current sources (official sites, government pages, major outlets). Search in the local language too. Check that the source is about the current season/year.
2. **Complete information.** Give all options, exceptions, requirements, prices, dates, and who a rule applies to. Say when something is unknown ("no published price") instead of filling it in.
3. **Safety.** If a destination has a government warning (US State Dept, UK FCDO), say so plainly and name safer alternatives.
4. **Triple check before scheduling:**
   - Facts: complete and current, each matched to a source.
   - Wording: plain, simple English; no unclear references ("below the rock" — which rock?); dates say if they're fixed every year or for this year only.
   - Visuals: open every slide at full size. Check every edge, every subject, every person (no faces cut off), no orphan words on a line by themselves, nothing overlapping, nothing stretched.
5. **Design: bright editorial "A2" style. Never boring, never business-like.**
   - Fonts: Fraunces 900 for headings/big numbers, Inter for body. Big sizes (headings ~80px, body 30–34px).
   - Colors: SUN #FFC93C, CORAL #FF5A3C, TEAL #0FA3A3, INK #16213A, CREAM #FFF7E8, AEGEAN #1F5FBF, PLUM #3A2A5C, JADE #127A5E. A different bold background per slide.
   - Text centered or aligned sensibly. No strange layouts. Stacked text in circles/stickers must be centered.
   - No pointless stickers (e.g. "My own photos").
   - Slide counter top-right, @enchanted.compass bottom-left, SWIPE → bottom-right (not on the last slide).
6. **Photos:** never stretch or distort. Crop/zoom only. Measure the subject against the frame's aspect ratio before cropping; change the frame shape if needed.
7. Don't call man-made pools "hot springs". Don't present the owner's neutral comments as complaints.
8. Don't tell the owner to use their own photos. When there are no photos, use original illustrations (see `tools/monarch/bfly.js`) or Blender renders (`tools/eta/scene_eta.py`); mark renders `isAiGenerated: true`.
9. Never draw copyrighted characters, logos or real artworks.

## Caption format
Hook line, 3–6 short paragraphs or bullet lines with the key facts, a question to drive comments, "Sources:" line naming the sources, 15–25 relevant hashtags. Keep it in plain English.

## How to build a post
1. Research (WebSearch/WebFetch). Note each fact's source.
2. Copy a generator from `tools/` (e.g. `tools/monarch/slides.js`) and edit the slide HTML.
3. Setup once per machine:
   `npm i -g playwright && npx playwright install chromium`
   `mkdir -p /home/claude/ig/design && cd /home/claude/ig/design && npm i @fontsource/fraunces @fontsource/caveat`
   Run with `NODE_PATH=$(npm root -g) node slides.js`.
4. Review every PNG at full size (rule 4). Fix and re-render until clean.
5. Commit PNGs to `posts/YYYY-MM-DD-slug/` in this repo and push.
6. Verify each URL returns HTTP 200:
   `https://raw.githubusercontent.com/kjgrimes87-web/enchanted.compass/main/posts/<folder>/<file>.png`
7. Schedule with Metricool `createScheduledPost`: autoPublish true, draft false, Instagram carousel, publicationDate `YYYY-MM-DDT18:00:00` timezone Asia/Shanghai.
8. Confirm it appears in `getScheduledPosts`.

## Topic ideas (not yet used)
- Europe's most punctual airlines (Cirium 2025 data)
- Winter-only sights: Abraham Lake ice bubbles (Canada)
- Where to go in December / January (Europe & Asia)
- Lesser-known UNESCO sites in Europe and Asia

## Posted so far
2026-11-03 China visa · 11-04 China payments · 11-06 Asia-Pacific punctual airlines · 11-09 UK/Europe entry rules (ETA/EES/ETIAS) · 11-11 Acropolis & Athens · 11-13 Hezhong hot spring pools, Qingyuan · 11-23 Monarch butterfly sanctuaries, Mexico · 11-25 Christmas markets beyond the famous ones (Montreux, Tallinn, Valkenburg, Kaysersberg) · 11-27 Iceland ice caves
