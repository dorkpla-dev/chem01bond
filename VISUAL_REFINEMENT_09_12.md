# CHEM01 · Visual Refinement Plan คาบ 9–12

สถานะ: RELEASED · QA PASSED (prototype/master/production) · GitHub Pages verified
อัปเดต: 2026-09-04

## เป้าหมาย

รวม visual language ที่ดีที่สุดจากสองช่วงให้เป็นระบบเดียว:

1. **Molecular shape language จากคาบ 7–8**
   - atom = วงกลมมีเส้นขอบสี covalent
   - solid bond = อยู่ในระนาบ
   - dashed bond = ชี้ไปด้านหลัง
   - wedge = ชี้ออกมาด้านหน้า
   - ใช้ depth cue เฉพาะเมื่อรูปทรง 3D ต้องการจริง

2. **Lone-pair domain language จากคาบ 9–10**
   - lone pairs บนอะตอมกลางไม่วางเป็นแถวแบนเหนืออะตอม
   - จัดคู่จุดตามทิศ electron-domain geometry รอบอะตอมกลาง
   - คู่จุดแต่ละคู่เอียงตามแนวสัมผัสของ “วงสมมติ” รอบอะตอมกลาง เพื่อให้รู้สึกว่าล้อมรอบ central atom
   - **ห้ามวาดวงเป็น electron orbit จริง**; ถ้ามี guide circle ใน teaching slide ต้องจางและระบุว่าเป็น schematic guide ไม่ใช่วงโคจรของ electron

---

# Scientific / Visual distinction ที่ต้องล็อก

## Lewis view
ใช้สำหรับแสดง connectivity + lone pairs แบบ 2D
- lone pairs วางแบบ conventional รอบ symbol
- ไม่ใช้ wedge/dash เพื่อบอก molecular shape

## Molecular geometry view
ใช้สำหรับแสดงตำแหน่งอะตอมและ electron domains ใน 3D
- ใช้ atom circles + solid/dash/wedge แบบคาบ 7–8
- lone-pair dots เป็น **domain cue** รอบ central atom
- lone-pair dots ไม่ใช่การบอกตำแหน่ง electron จริงแบบ orbital

ห้ามผสมสองภาษาจนเด็กเข้าใจว่า Lewis 2D = molecular geometry 3D

---

# Lone-pair placement standard

## AX3E · trigonal pyramidal
ตัวอย่าง: NH3, NF3
- central atom อยู่กลาง diagram
- 3 X ใช้ tetrahedral depth cues: solid + dash + wedge ตาม template คาบ 7–8
- E 1 คู่ อยู่ใน tetrahedral direction ที่เหลือ
- dot pair วางบน radius รอบ central atom และเอียงแบบ tangent ต่อวงสมมติ
- dot pair ต้องเห็นชัดว่าเป็น 1 domain แยกจาก atom label

## AX2E2 · bent
ตัวอย่าง: H2O
- 2 X อยู่สองทิศด้านล่าง/ข้างตาม bent template
- E 2 คู่ อยู่สอง tetrahedral directions ที่เหลือบริเวณด้านบนซ้าย/บนขวา
- แต่ละคู่เอียงตาม tangent ของวงสมมติรอบ O
- ระยะจาก central atom ของ E ทั้งสองคู่ควรใกล้เคียงกัน

## AX4 · tetrahedral
ตัวอย่าง: CH4, CH3Cl
- ใช้ solid / dashed / wedge แบบเดียวกับ Slide 77
- ไม่มี lone-pair dot บน central atom

## AX3 · trigonal planar
ตัวอย่าง: BCl3
- ใช้ planar 120° template
- ไม่ใช้ wedge/dashโดยไม่จำเป็น

## AX2 · linear
ตัวอย่าง: CO2
- ใช้ 180° template

---

# Dipole overlay standard

เมื่อ geometry เป็นเรื่องหลัก ให้ใช้ shape diagram เป็นฐาน แล้ว overlay dipole arrows:
- arrow ชี้ไปทางอะตอม EN สูงกว่า
- dipole arrows ต้องไม่ทับ atom labels / lone-pair dots
- CO2: ลูกศรสองข้างต้องสมมาตรและตรงข้าม
- H2O: ลูกศรตาม O–H bonds และ net direction แสดงหลัง bond dipoles
- reveal order แนะนำ: geometry → lone-pair/domain cue → bond dipoles → net polarity

---

# Migration Map · คาบ 9

## Slide 81 · Recall shape
ปรับ 3 cards จาก text-heavy เป็น mini molecular-shape diagrams:
- CO2 = linear template จากคาบ 7–8
- NH3 = trigonal pyramidal + lone pair แบบ radial/tangent
- H2O = bent + 2 lone pairs แบบ radial/tangent

## Slide 82 · CO2 vs H2O hook
ใช้ molecular-shape visual แบบเดียวกับคาบ 7–8 ทั้งสองฝั่ง
- CO2 planar linear
- H2O bent + lone-pair domain cues

## Slides 83–84
คง bond-level visual เดิม
- ไม่บังคับ 3D เพราะกำลังสอน bond polarity ไม่ใช่ molecular geometry

## Slide 85
คง reasoning flow เป็นหลัก
- ถ้าจะเพิ่ม icon ให้ใช้ shape icon ขนาดเล็ก ไม่เพิ่มข้อมูลใหม่

## Slide 86 · CO2
เปลี่ยนฐานภาพเป็น `shape-svg` language จากคาบ 7–8
แล้ว overlay dipole arrows

## Slide 87 · H2O
เปลี่ยนเป็น bent shape template
- O เป็น central atom circle
- lone pairs 2 คู่ radial/tangent
- O–H dipoles reveal ก่อน net dipole

## Slide 88 · Classification set
เพิ่ม mini geometry ใน 6 cards:
- CO2 / BCl3 / CH4 / H2O / NH3 / CH3Cl
- คำตอบ polar/nonpolar ยัง reveal ทีหลัง

## Slide 89 · We do / You do
ก่อน reveal: formula + question เท่านั้น
หลัง reveal: แสดง mini geometry พร้อมคำตอบ
เพื่อไม่ให้ shape image ทำหน้าที่เฉลยก่อนนักเรียนคิด

## Slide 90
เน้น exit reasoning; ไม่จำเป็นต้องเพิ่มภาพถ้าทำให้แน่น

---

# Migration Map · คาบ 10

## Slides 91–92
คง strategy/decision-flow visual

## Slide 93 · HF
คง diatomic schematic เรียบง่าย

## Slide 94 · CH4
ใช้ tetrahedral template จาก Slide 77 โดยตรงเป็น visual reference

## Slide 95 · CH3Cl
ใช้ tetrahedral template เดียวกับ CH4
- เปลี่ยนหนึ่ง X เป็น Cl
- รักษา wedge/dash geometry เดิม เพื่อให้เด็กเห็นว่า shape เหมือน แต่ substituent ต่าง

## Slide 96 · Error analysis CO2
ฝั่ง reasoning ที่ถูกสามารถ reveal mini linear geometry + opposing dipoles

## Slide 97 · NH3 vs BCl3
เพิ่ม shape diagram เต็ม:
- NH3 = pyramidal + radial/tangent lone pair
- BCl3 = trigonal planar

## Slide 98 · NF3
หลังตอบ AX3E ให้ reveal pyramidal geometry + radial/tangent lone pair

## Slide 99
Independent practice: ไม่แสดง molecule-specific shape ก่อนทำ
quick check หลังตอบใช้ text เป็นหลักเพื่อไม่ทำสไลด์แน่น

## Slide 100
คง exit flow

---

# Migration Map · คาบ 11

คาบ 11 เป็นใบงานคะแนน จึงต้องรักษา assessment integrity

## Slides 101–104
ใช้ icon / geometry เฉพาะเพื่อสอน process หรือ rubric ได้

## Slide 105 · Shape + Polarity rubric
เพิ่ม **generic 5-shape reference strip** แบบ Slide 74:
- AX2 linear
- AX3 trigonal planar
- AX4 tetrahedral
- AX3E trigonal pyramidal + radial/tangent LP
- AX2E2 bent + radial/tangent LPs

ห้ามผูก icon เหล่านี้เข้ากับ 6 สูตรคะแนนโดยตรง

## Slides 106–108 · Work sets
**ห้ามแสดง molecule-specific geometry หรือ answer reveal**
- HF + BCl3
- CH4 + CH3Cl
- NF3 + H2O

เหตุผล: shape image จะกลายเป็นเฉลยของงานคะแนน

## Slide 109 · Self-check
ใช้ generic shape library ขนาดเล็กได้
แต่ไม่มี mapping ว่า formula ใดตรงกับ shape ใด

## Slide 110
คง final scoring / bridge ไม่มีเฉลย

---

# Migration Map · คาบ 12

## Slide 111
unit map ไม่ต้องเพิ่ม molecular graphic

## Slide 112 · 5 things not to miss
ใน card `Lewis → shape` / `shape → polarity` เพิ่ม icon geometry แบบ generic ได้

## Slides 113–117 · Mini mock questions
ห้ามใช้ภาพที่เปิดคำตอบก่อนนักเรียนตอบ
โดยเฉพาะ Q7 NH3 shape และ Q8 BCl3/H2O polarity

## Slide 118
ionic answer review ไม่เกี่ยวกับ molecular shape

## Slide 119 · Covalent answer review
เพิ่ม visual เฉพาะหลัง reveal:
- Q6 H2O: Lewis cue → bent geometry + 2 radial/tangent lone-pair domains
- Q7 NH3: trigonal pyramidal + radial/tangent lone pair
- Q8: BCl3 trigonal planar เทียบ H2O bent

## Slide 120
exam strategy ใช้ generic shape icon เล็ก ๆ ใน `Shape` และ `Polarity` cards ได้

---

# Reusable component plan

สร้าง visual primitives สำหรับคาบ 9–12 ให้ใช้ coordinate system เดียวกัน:

- `.shape-svg`
- `.sbond`
- `.sdash`
- `.swedge`
- `.satom`
- `.slabel`
- `.sdot`
- `.dipole-arrow`
- `.lp-domain`

แนวทาง implementation ของ `.lp-domain`:
- group ของ 2 dots
- position จาก polar/radial coordinates รอบ central atom
- rotate pair ให้ tangent กับ imaginary ring
- ใช้ template coordinate เดียวซ้ำใน NH3/NF3 และ H2O

ไม่ hard-code lone-pair dots แบบคนละมาตรฐานในแต่ละ slide

---

# QA ใหม่สำหรับ visual refinement

## Geometry QA
เพิ่ม numerical checks:
- central atom center consistency
- radial distance ของ lone-pair domains
- symmetry ของ H2O lone pairs
- NH3/NF3 ใช้ geometry template เดียวกัน
- CH4/CH3Cl ใช้ tetrahedral bond directions เดียวกัน
- wedge/dash ไม่กลับทิศโดยไม่ตั้งใจ

## Visual QA
render/review representative slides:
- 81, 82, 86, 87, 88, 89
- 94, 95, 97, 98
- 105, 109
- 119, 120

## Assessment-integrity QA
- Slides 106–110: ห้ามมี answer mapping ของ 6 สารคะแนน
- Slides 114–117: ห้ามมี answer graphic ก่อนเฉลย

## Regression QA
หลัง refine:
- prototype 09–10 layout + mobile + interaction ใหม่
- prototype 11–12 layout + mobile + interaction ใหม่
- rebuild master 120 slides
- source/reveal/SVG parity 120/120
- full layout regression 1–120
- mobile representative across batches
- production byte/SHA verification หลัง deploy

---

# Implementation / QA Record · 2026-09-04

Visual refinement ถูกนำไปใช้จริงแล้วใน `prototype_09_10_v2.html` และ `prototype_11_12_v2.html`:
- molecular geometry ใช้ atom circles + solid/dash/wedge language ต่อเนื่องจากคาบ 7–8
- NH3/NF3 ใช้ pyramidal template เดียวกันและ lone-pair domain แบบ radial/tangent
- H2O ใช้ bent template + lone-pair domains สองคู่เอียงตาม tangent โดยไม่วาด electron orbit
- CH4/CH3Cl ใช้ tetrahedral bond directions เดียวกัน
- Slides 106–108 และ 114–117 ไม่เพิ่ม molecule-specific answer graphics จึงรักษา assessment integrity

ผล QA หลัง refinement:
- `qa_visual_geometry_09_12.js`: PASS
- `qa_check_09_10.js` / `qa_check_11_12.js`: PASS
- prototype layout: Slides 81–120 ทุกหน้า `outside=0`, ไม่มี slide/deck overflow
- prototype interaction: reveal order / Space / Escape / final-slide boundary PASS
- prototype exact mobile viewport: 360×640, 390×844, 412×915, 844×390 PASS
- master build: 120 slides / 6 batches
- master source parity / reveal parity / SVG-tag parity: 120/120 PASS
- master full layout regression: Slides 1–120 PASS
- master interaction regression: legacy + Slides 87/89/98/101/106/118/120 PASS
- SVG computed-style + logical-geometry parity: PASS ทุก representative sample
- canonical visual parity: Slides 81–120 exact PNG identical ทุก sample; legacy 1–80 ผ่าน tight anti-aliasing tolerance พร้อม exact DOM/geometry parity
- master mobile regression: 4 viewports × representative slides ทุก batch PASS

Release gate: **RELEASED / QA PASSED / PRODUCTION VERIFIED**
- release commit: `a93e926f213398a3bff951d3dd37399238c57c61`
- GitHub Pages build: `built`
- production `index.html`: 323,975 bytes / 120 slides
- SHA-256 production = local: `2966a8073fed3363126094ce8a21df7778f59c48de2caa67cf43f00c7cee7700`
- production byte-for-byte identical กับ local master
