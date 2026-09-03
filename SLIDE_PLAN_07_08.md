# CHEM01 · Slide Plan คาบ 7–8

อัปเดต: 2026-09-02
ช่วงสไลด์: 61–80
แนวคิดร่วม: สไลด์ทำหน้าที่กำกับการคิด ไม่แทนชีท; ใช้ชีทหน้า 30 สำหรับ Lewis II และหน้า 35–37 สำหรับ shape แบบคัดเลือก

Visual/interaction contract:
- สืบทอด `prototype_visual_v2.html`, `VISUAL_V2_REFINEMENT_NOTES.md`, และ rhythm จาก `prototype_05_06_v2.html`
- Lewis molecular diagrams ทุกภาพต้องผ่าน `LEWIS_VISUAL_STANDARD.md`
- multiple bond ใช้ SVG หลายเส้นใน coordinate system เดียว; equivalent bonds ต้องวัดได้และสมมาตร
- reveal เปลี่ยน opacity/visibility เท่านั้น ห้าม reflow/geometry jump
- fixed 1600×900; no scroll; student-facing key text ≥ 18 px logical

Scope guard:
- ไม่สอน bond-energy calculation / Hess
- resonance กล่าวเพียงว่า “บางโมเลกุลอธิบายได้มากกว่า 1 Lewis form” และไม่ใช้คำนวณ/ไม่ออกแบบฝึกในคาบนี้
- ไม่ใช้ SCl6, PCl5, XeCl4, BrF3, IF5, XeOF4, ICl4−
- shape จำกัด AX2, AX3, AX4, AX3E, AX2E2 เท่านั้น

---

## คาบ 7 · Lewis Structure II: double / triple bonds · Slides 61–70
ชีทหลัก: หน้า 30 (เลือก O2, N2, CO2, HCN, CH2O)
เป้าหมาย: นักเรียนเห็นว่า pattern เดิม H/halogen=1, O=2, N=3, C=4 ยังใช้ได้ แต่บางคู่ต้องแชร์มากกว่า 1 electron pair

### Slide 61 — Hook: O2 จากคำถามคาบก่อน
- เปิดด้วย O · O และคำถาม: “O แต่ละตัวต้องการ 2 bonds แต่มีคู่แค่ O–O จะทำอย่างไร?”
- reveal single bond แล้วชี้ว่าแต่ละ O ยังนับได้เพียง 1 bond
- reveal เส้นที่สอง → O=O
- teacher move: ให้นักเรียนพูดคำว่า “เพิ่มจำนวนคู่ e− ที่แชร์” ก่อนบอกคำว่า double bond
- timing ~4 min

### Slide 62 — One / two / three shared pairs
- แสดง single / double / triple เป็น 3 open rows
- 1 line = 1 shared pair; 2 lines = 2 shared pairs; 3 lines = 3 shared pairs
- ย้ำ “จำนวนเส้นรอบอะตอม” ใช้เช็ก pattern
- note เงียบด้านล่าง: resonance มีในบางสาร แต่วันนี้ไม่ลงรายละเอียด
- timing ~4 min

### Slide 63 — Worked O2
- O pattern = 2 bonds
- SVG: O=O; O แต่ละตัวมี lone pairs 2 คู่
- reveal 1 = double bond; reveal 2 = lone pairs + check “2 lines around each O”
- ไม่ใช้ electron-counting algorithm ยาว
- timing ~5 min

### Slide 64 — Worked N2
- N pattern = 3 bonds
- SVG: N≡N; N แต่ละตัวมี lone pair 1 คู่
- reveal จาก “N ต้องการ 3 bonds” → triple bond → lone pairs
- compare O2 vs N2 อย่างสั้น: O needs 2 lines, N needs 3 lines
- timing ~5 min

### Slide 65 — Worked CO2
- C กลาง; pattern C=4, O=2
- SVG: O=C=O; O แต่ละตัว 2 lone pairs; C 0 lone pair
- ให้นับเส้นรอบ C: 2 + 2 = 4
- footer bridge: multiple bond ยังนับเป็น “หนึ่งทิศทาง” ตอนหา shape ในคาบ 8
- timing ~5 min

### Slide 66 — Worked HCN
- skeleton H–C–N ก่อน
- H ต้องการ 1; C ต้องการ 4; N ต้องการ 3
- reveal → H–C≡N; N มี lone pair 1 คู่
- ให้นับที่ C: 1 + 3 = 4
- timing ~5 min

### Slide 67 — Worked CH2O
- C เป็น central atom; H 2 ตัว + O 1 ตัว
- SVG จัด H–C–H แบบ open 2D และ C=O โดยไม่สื่อว่า Lewis 2D = shape จริง
- final: C–H single ×2 + C=O double; O lone pairs 2 คู่
- นับ C: 1 + 1 + 2 = 4
- timing ~5 min

### Slide 68 — Guided: pattern → bond order
- 5 สูตร: O2, N2, CO2, HCN, CH2O
- prompt ไม่ให้วาดเต็มก่อน: “แต่ละอะตอมต้องได้กี่เส้น?”
- reveal answer set:
  - O2 → O=O
  - N2 → N≡N
  - CO2 → O=C=O
  - HCN → H–C≡N
  - CH2O → 2 C–H + C=O
- teacher checks reasoning, not memorized picture
- timing ~6 min

### Slide 69 — You do in handout
- ชีทหน้า 30: วาด Lewis ของ O2, N2, CO2, HCN, CH2O
- reference pattern allowed
- on-screen checklist only: central atom? bond pattern? lone pairs? no overflow of octet in selected examples?
- reveal เฉพาะ quick-check structure skeleton หลังเวลาทำ ไม่ให้เฉลยเต็มทันที
- timing ~8 min

### Slide 70 — Exit + bridge to molecular shape
- A: O2 ใช้พันธะกี่เส้นระหว่าง O? → 2
- B: N2? → 3
- C: C ใน CO2 มี bond-line total กี่เส้น? → 4
- D: Lewis บอก “การเชื่อม + lone pairs” แต่ยังไม่บอกรูปร่าง 3D
- bridge concept: ใน shape, single/double/triple ที่ชี้ไปอะตอมเดียวกันนับเป็น **1 electron domain / 1 ทิศทาง**
- timing ~3 min

---

## คาบ 8 · Molecular shape · Slides 71–80
ชีทหลัก: หน้า 35–37 แบบคัดเลือก
เป้าหมาย: จาก Lewis → นับ X/E รอบ central atom → เลือก 1 ใน 5 shape หลัก

### Slide 71 — Hook: Lewis 2D ≠ molecular shape 3D
- เทียบ Lewis ของ CO2, NH3, H2O แบบ 2D กับคำถาม “ภาพบนกระดาษคือรูปร่างจริงทั้งหมดไหม?”
- reveal: ไม่ใช่; Lewis บอก connectivity/lone pairs แต่ shape ต้องดูการผลักกันรอบ central atom
- timing ~4 min

### Slide 72 — VSEPR idea without overload
- visual central atom + 2/3/4 electron domains spreading apart
- key sentence: electron domains รอบ central atom ผลักกัน → อยู่ห่างกันมากที่สุด
- ไม่ลง derivation/energy
- multiple bond = 1 domain เพราะชี้ไปอะตอมเดียวกัน
- timing ~5 min

### Slide 73 — Read AXE notation
- A = central atom
- X = bonded atom directions/domains
- E = lone pairs on central atom
- examples: CO2 = AX2; NH3 = AX3E; H2O = AX2E2
- explicitly: double/triple bond counts as X 1
- timing ~5 min

### Slide 74 — Reference: 5 essential shapes
- AX2 → linear
- AX3 → trigonal planar
- AX4 → tetrahedral
- AX3E → trigonal pyramidal
- AX2E2 → bent
- use 5 compact SVG molecular models; names Thai-first + English caption
- reference allowed; no memorization-only demand
- timing ~5 min

### Slide 75 — Worked CO2 → AX2 → linear
- start from O=C=O Lewis
- central C has 2 bonded directions + 0 lone pair → AX2
- reveal final 3D/shape diagram linear, ~180° as supporting cue not memorization target
- key misconception: two double bonds = 2 domains, not 4
- timing ~5 min

### Slide 76 — Worked BCl3 → AX3 → trigonal planar
- B central; 3 bonded directions; 0 lone pair → AX3
- reveal shape trigonal planar, ~120° supporting cue
- no detour into boron octet exception beyond “ใช้ตัวอย่างนี้เพื่อดู 3 directions”
- timing ~4 min

### Slide 77 — Worked CH4 → AX4 → tetrahedral
- C central; 4 bonded directions; 0 lone pair → AX4
- reveal tetrahedral model with wedge/dash depth cues
- ~109.5° supporting cue
- reinforce: cross-shaped Lewis on paper is not the 3D shape
- timing ~5 min

### Slide 78 — Lone pairs change molecular shape: NH3 vs H2O
- side-by-side
- NH3: 3 X + 1 E → AX3E → trigonal pyramidal
- H2O: 2 X + 2 E → AX2E2 → bent
- lone pair occupies space but is not named as an atom in molecular shape
- optionally show smaller approximate angles (107°, 104.5°) as reference only; do not test exact angle unless teacher later chooses
- timing ~6 min

### Slide 79 — Guided shape practice
- formulas: CO2, BCl3, CH4, NH3, H2O
- student gives AXE first, then shape
- reveal all in one set after think time:
  - CO2 AX2 linear
  - BCl3 AX3 trigonal planar
  - CH4 AX4 tetrahedral
  - NH3 AX3E trigonal pyramidal
  - H2O AX2E2 bent
- link to selected rows on handout pp36–37; explicitly skip advanced examples
- timing ~7 min

### Slide 80 — Exit + bridge to polarity
- A CO2 shape? linear
- B NH3? trigonal pyramidal
- C H2O? bent
- final thought: shape controls whether bond dipoles cancel or reinforce
- bridge to period 9: polarity = bond polarity + shape/symmetry
- timing ~4 min

## Acceptance checklist ก่อนล็อก Slides 61–80
### Chemistry
- O2 = O=O, 2 lone pairs per O
- N2 = N≡N, 1 lone pair per N
- CO2 = O=C=O, 2 lone pairs per O, C no lone pair
- HCN = H–C≡N, N 1 lone pair
- CH2O = H2C=O, O 2 lone pairs
- multiple bond counts as 1 electron domain in VSEPR
- five shapes and AXE labels correct

### Teaching
- pattern-first; no long valence-electron counting algorithm
- every worked example asks before reveal
- handout page references visible but quiet
- no advanced VSEPR or bond-energy content leaks in
- Lewis 2D ≠ shape 3D repeated at transition

### Visual/technical
- 1600×900 fixed canvas, whole-deck scaling
- no scrolling / no clipping / no overflow
- molecule SVG atoms, bonds, dots explicit and measurable
- double/triple bond parallel-line spacing consistent
- reveal does not alter coordinates or layout
- shape models use labels/depth cues; color never carries meaning alone
- real-render QA required for at least O2/N2/CO2/HCN/CH2O and all 5 shape archetypes
