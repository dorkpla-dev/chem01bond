# CHEM01 — prototype_visual_v2 refinement cycle

Master: `prototype_visual_v2.html`
Status: **LOCKED VISUAL SYSTEM — Visual Gate passed 2026-09-01**

## Design intent
- Modern minimal science-classroom presentation, not a web dashboard.
- Prompt is the primary Thai/Latin family; use Light/Regular/Medium/SemiBold only.
- Fixed 1600×900 (16:9), entire deck scales as one canvas; no scrolling.
- 80–90% neutral visual field, semantic color only where it carries chemistry meaning.
- Metadata and footer are quiet; teaching content owns attention.
- Open composition, hairlines and whitespace preferred over cards/pills/shadows.

## Locked type hierarchy
- Hook/display: ~88–92px, weight 300–400
- Main slide title: ~54–56px, weight 400; emphasis 600 only on key phrase
- Key formula: ~58–64px, weight 500
- Body / reasoning: ~22–30px, weight 400
- Result / answer: ~20–23px, weight 500–600, semantic color
- Kicker: ~18–19px, weight 400
- Metadata: ~16–17px, muted
- Footer: ~15–16px, muted
- Student-facing text that matters should generally not fall below 18px logical

## Locked spacing/composition rules
- Outer slide safe area about 80px left/right, 52–58px top, 50px bottom
- Title-to-content breathing room must be visibly larger than internal text spacing
- Think → Reveal result separation: at least ~18px vertical on worked examples
- Use 1 dominant focal point per slide
- Prefer open rows / split composition / typography-led grids over bordered cards
- Thin dividers are allowed when they organize scan paths
- If content does not fit at these sizes, reduce/split content; do not shrink indiscriminately

## Locked semantic palette
- Ionic: blue `#2E6F9E`
- Covalent: violet `#7357A6`
- Metallic: graphite `#59616C`
- Element metal: teal `#397A8B`
- Element nonmetal: amber `#A87022`
- Metalloid: gray/sage `#6C746E` + dashed cue where useful
- Positive ion: warm red-brown `#A45743`
- Negative ion / electron: teal-cyan `#267786`
- Neutral background: warm off-white `#F7F6F2`
- Main ink: charcoal `#19202B`

## Locked interaction rules
- Right arrow / Space: reveal next answer group; after final reveal advance slide
- Left arrow: previous slide and reset reveal state
- Reveal uses opacity + small vertical movement only; no reflow
- Practice answer set may reveal all at once when pedagogically appropriate
- Wheel scrolling is disabled; slide deck never scrolls

## Archetype results
1. Hook — PASS
2. Periodic-table tool — PASS
3. Concept/rules — PASS
4. We do — PASS after Think→Answer spacing correction
5. You do — PASS including all-answer reveal
6. Polyatomic-ion reference — PASS; Thai-first and formula-first in future use

## Migration rule
The full periods 1–2 deck must inherit this system, but may vary composition to match teaching purpose. Consistency means shared typography, spacing logic, semantic color and interaction—not forcing every slide into the same component template.
