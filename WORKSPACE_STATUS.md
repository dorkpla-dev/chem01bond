# CHEM01 — Workspace Status

อัปเดตล่าสุด: 2026-09-04

## Source of truth ปัจจุบัน
- แผนการสอนทั้งหน่วย: `TEACHING_PLAN.md`
- แผนการสร้าง presentation: `PRESENTATION_BUILD_PLAN.md`
- Master visual system: `prototype_visual_v2.html` — VISUAL GATE PASSED / LOCKED
- QA ของ visual master: `PROTOTYPE_VISUAL_V2_QA.md`
- Visual tokens / spacing / interaction ที่ล็อก: `VISUAL_V2_REFINEMENT_NOTES.md`
- Molecular-geometry / lone-pair standard คาบ 9–12: `VISUAL_REFINEMENT_09_12.md`

## Slide plans ที่เสร็จแล้ว
- `SLIDE_PLAN_01_02.md` — คาบ 1–2
- `SLIDE_PLAN_03_04.md` — คาบ 3–4
- `SLIDE_PLAN_05_06.md` — คาบ 5–6
- `SLIDE_PLAN_07_08.md` — คาบ 7–8
- `SLIDE_PLAN_09_10.md` — คาบ 9–10 · IMPLEMENTED / QA PASSED
- `SLIDE_PLAN_11_12.md` — คาบ 11–12 · IMPLEMENTED / QA PASSED

## Prototype ที่เสร็จแล้ว
- `prototype_01_02_v2.html` — Slides 1–20
- `prototype_03_04_v2.html` — Slides 21–40
- `prototype_05_06_v2.html` — Slides 41–60
- `prototype_07_08_v2.html` — Slides 61–80
- `prototype_09_10_v2.html` — Slides 81–100
- `prototype_11_12_v2.html` — Slides 101–120

รวมปัจจุบัน: **120 slides / 12 periods**

## Master merged deck
- `index.html` — master candidate ปัจจุบัน Slides 1–120 / คาบ 1–12 · local/master QA PASSED · release pending
- สร้างด้วย `build_master_deck.js` ไม่ copy-paste manual
- CSS ของแต่ละช่วงถูก scope ด้วย `data-batch` เพื่อไม่ให้ style ช่วงหลัง override ช่วงก่อน
- ทุก `<section class="slide">` ยังเป็น direct child ของ `#deck` เพื่อรักษา geometry/render behavior ของต้นฉบับ
- Interaction contract: ArrowRight / PageDown / Space / Enter = reveal group ถัดไปก่อน; เมื่อ reveal หมดจึงไปสไลด์ถัดไป; ArrowLeft / PageUp = ย้อนสไลด์; Escape = reset reveal ของหน้าปัจจุบัน
- **ห้ามลด/ตัด reveal, เฉลย, staged reasoning, footer, SVG chemistry diagram หรือ teacher-facing instructional detail ตอน merge**
- Merge QA source of truth: `MASTER_MERGE_QA.md`

## Release ล่าสุด · คาบ 9–10 / Master 100 slides
- commit release: `be6857d86bfbf4af4e347002d953934a2a87cdcc`
- push สำเร็จไป `origin/main`
- GitHub Pages build สำเร็จจาก commit เดียวกัน
- production: `https://dorkpla-dev.github.io/chem01bond/`
- production HTTP 200 และ `index.html` มีขนาด 248,924 bytes
- SHA-256 production ตรงกับ local master: `403ceb8d1f8b512d3bbc8ac9faaf243b8b98ebb5683b9eb6305e3f9b289ba66c`
- production parse ได้ 100 slides และ batch `09-10` อยู่ที่ Slides 81–100
- local/master QA ก่อน release: 100-slide layout regression, interaction/reveal, exact mobile viewport, source/reveal/SVG parity ผ่านทั้งหมด
- direct handout verification: printed pages 38–39 ตรงกับ scope molecular polarity / integrated practice ที่เลือกใช้

## Candidate release ปัจจุบัน · คาบ 11–12 / Master 120 slides
- `prototype_11_12_v2.html` = Slides 101–120; master `index.html` = Slides 1–120
- visual refinement 9–12 ใช้ shape language จากคาบ 7–8 และ lone-pair domain แบบ radial/tangent โดยไม่สื่อเป็น electron orbit
- คาบ 11 รักษา assessment integrity: Slides 106–108 ไม่มี molecule-specific answer graphics; SO2 ควบคุม complexity; NH4+ bonus/non-scored
- คาบ 12 เป็น review / 8-item mini mock เท่านั้น ไม่มี concept ใหม่
- structure/content/chemistry gates: PASS
- master exact section/reveal/SVG-tag parity: 120/120 PASS
- full master layout regression: Slides 1–120 `outside=0`, no slide/deck overflow
- interaction regression: legacy + refined polarity + worksheet + final slide boundary PASS
- SVG computed-style + logical-geometry parity: PASS
- canonical visual parity: Slides 81–120 exact PNG identical; legacy 1–80 within strict anti-alias tolerance plus exact DOM/geometry parity
- master exact mobile regression: 360×640, 390×844, 412×915, 844×390 PASS across all batches
- สถานะ: **LOCAL / MASTER QA PASSED; รอ final diff → commit/push → production SHA verification**

## การตัดสินใจล่าสุดที่ล็อก
### Ionic Worksheet 10 คะแนน
- **ไม่ทำในคาบ**
- มอบหมายหลังปิดคาบ 4
- ทำชีทหน้า 9–10 ทุกข้อ
- คะแนนรวม 10 คะแนน
- ใช้ reference table ได้
- ไม่มี timer / work screen / submit screen ในชั้นเรียน
- ส่งตามกำหนดที่ครูแจ้ง

ผลต่อโครง 12 คาบ:
- คาบ 5 = Covalent bond + nomenclature
- คาบ 6 = Lewis Structure I
- คาบ 7 = Lewis Structure II
- คาบ 8 = Molecular shape
- คาบ 9 = Molecular polarity
- คาบ 10 = Integrated practice: Lewis → shape → polarity
- คาบ 11 = Covalent Worksheet 10 คะแนน
- คาบ 12 = Review / mini mock

## QA
- `SLIDE_QA_01_02.md` — QA คาบ 1–2
- `SLIDE_QA_05_06.md` — QA โครงล่าสุดคาบ 5–6 + homework consistency

QA ล่าสุดของชุด 41–60 · final regression 2026-09-02:
- section = 20/20; footer number ต่อเนื่อง 41–60
- ไม่มี `35 min`, `หมดเวลา`, `ส่งงาน`, `Worksheet work time`
- wheel/touch scroll ถูกปิด
- `qa_check_05_06.js` exit code 0
- `qa_lewis_geometry.js` exit code 0 / `LEWIS SVG GEOMETRY QA PASSED`
- `qa_layout_05_06.js` exit code 0; regression Slides 40–60 ทุกหน้า `outside=0`, `slideOverflow=false`, `deckOverflow=false`
- `qa_render_05_06.js` exit code 0; screenshot smoke render ใหม่สำเร็จที่ Slides 41, 50, 51, 52, 53, 54, 55, 56, 57, 60
- real Microsoft Edge reveal QA ผ่าน Slide 56 NH3 และ Slide 57 CH4 ทุกขั้นที่เกี่ยวข้อง; ไม่มี clipping / geometry jump / lone-pair error
- ไม่พบหัวข้อที่ตัดออก เช่น Born–Haber, Hess, lattice-energy calculation, net ionic equation

## Design system ที่ล็อก
- Prompt เป็น primary typeface โดยมี Leelawadee UI / Segoe UI fallback
- modern minimal / presentation-first
- whitespace + typography + hairline มากกว่า card/pill/shadow
- สีมี semantic meaning: element type / bond type / ion charge
- metadata/footer ต้องสงบ
- fixed 16:9 logical canvas 1600×900 และ scale ทั้งผืน
- reveal ต้องไม่ทำให้ layout reflow
- ถ้าข้อมูลแน่นให้ลดหรือแยก ไม่ย่อฟอนต์จนอ่านไม่ได้
- slide ไม่ทำซ้ำเอกสารประกอบ แต่ชี้หน้าเอกสาร สาธิต และถามก่อน reveal

## Teaching scope ที่ล็อก
แกนหน่วย:
periodic table → bond classification → ionic ions/formula/name/properties → covalent naming → Lewis → shape → polarity

ตัดออกจากการสอนและข้อสอบ:
- Born–Haber / energy-cycle calculations
- lattice/hydration energy calculations
- ionic equation / net ionic equation
- detailed solubility / precipitation rules
- bond-energy calculations / Hess’s law
- complex Lewis structures / coordinate covalent as separate topic
- 5–6 electron-domain advanced VSEPR shapes

## งานที่เสร็จในคาบ 5–6
### Period 5 · Covalent + nomenclature · Slides 41–50
- ใช้ชีทหน้า 26–28
- NaCl vs CO2 hook
- ionic vs covalent: transfer vs share
- simple sharing visual ก่อน Lewis
- prefix reference 1–10 โดยเน้น 1–5
- first/second element naming rules
- formula ↔ name worked examples
- guided practice + exit ticket
- ปิดด้วย bridge ไป Lewis คาบ 6

### Period 6 · Lewis Structure I · Slides 51–60
- ใช้ชีทหน้า 29–30
- bonding-pattern reference: H/halogen=1, O=2, N=3, C=4
- line = bonding pair; dots = lone pair
- worked: HF → H2O → NH3 → CH4
- guided: H2O, NH3, CF4, CH3Cl
- independent practice ลงชีท
- ย้ำ Lewis 2D ≠ molecular shape 3D
- Slide 60 bridge ไป double/triple bonds
- **Lewis Visual Standard v2 locked:** `LEWIS_VISUAL_STANDARD.md`
- molecular Lewis diagrams ใช้ SVG coordinate system เดียวต่อภาพ; bond เป็น `<line>` และ lone pairs เป็น `<circle>` ไม่ใช้ glyph `••` หรือ CSS line/dot แยกชิ้น
- HF / H2O / NH3 / CH4 ผ่าน numerical SVG geometry QA แล้ว
- Slide 56 NH3 และ Slide 57 CH4 ผ่าน real-render reveal QA ใน Microsoft Edge แล้ว
- acceptance rule: numerical geometry PASS อย่างเดียวไม่พอ ต้องผ่านภาพ render จริงด้วย

## QA utilities ปัจจุบัน
- `qa_check_05_06.js` — structural / unwanted-text / scroll checks
- `qa_layout_05_06.js` + `qa_layout_harness.html` — element bounds / overflow with all reveals open
- `qa_render_05_06.js` — Edge headless screenshot smoke render
- `qa_lewis_geometry.js` + `qa_lewis_geometry_harness.html` — วัด symmetry / atom-center / lone-pair-center ของ Lewis diagrams
- `qa_05_06_slide41.png`, `50`, `51`, `52`, `53`, `54`, `55`, `56`, `57`, `60` — render evidence
- `qa_check_07_08.js`, `qa_layout_07_08.js`, `qa_lewis_geometry_07_08.js`, `qa_render_states_07_08.js` — QA คาบ 7–8 รวม reveal states
- `qa_master_deck.js` — exact section parity / reveal parity / SVG tag parity ทั้ง 120 หน้า + navigation contract
- `qa_layout_master.js` — full Slides 1–120 element bounds / overflow regression
- `qa_interaction_master.js` + `qa_interaction_master_harness.html` — reveal-before-advance, Space, Escape, refined polarity, worksheet และ final-slide boundary
- `qa_visual_geometry_09_12.js` — template consistency: CH4/CH3Cl, NH3/NF3, H2O lone-pair domains + assessment-integrity graphics
- `qa_check_09_10.js`, `qa_check_11_12.js` — scope/content/forbidden-topic/answer-leak checks
- `qa_layout_09_10.js`, `qa_layout_11_12.js` — full prototype bounds/overflow
- `qa_interaction_09_10.js`, `qa_interaction_11_12.js` — reveal sequencing ของสอง batch ล่าสุด
- `qa_mobile_09_10.js`, `qa_mobile_11_12.js`, `qa_mobile_master.js` — exact mobile viewport regression
- `qa_visual_parity_master.js` + `qa_visual_parity_harness.html` — canonical 1600×900 source→master raster parity; 81–120 exact, legacy ใช้ strict anti-alias threshold
- `qa_svg_style_parity_master.js` + `qa_style_probe_harness.html` — exact computed style + normalized logical geometry parity สำหรับ Lewis / molecular-shape SVG

## Gate status
**หน่วยสไลด์คาบ 1–12 / Slides 1–120: LOCAL + MASTER QA PASSED**
- Periods 11–12 content/assessment/chemistry/interaction/layout/mobile gates ผ่าน
- visual refinement 9–12 ผ่าน geometry + render + source/master parity
- master full regression 1–120 ผ่านทุกหน้า
- ยังไม่ถือว่า RELEASED จนกว่า Git diff review, commit/push, GitHub Pages build และ production byte/SHA verification ผ่าน
- การแก้ Lewis ในอนาคตต้องรักษา `LEWIS_VISUAL_STANDARD.md`; การแก้ shape/polarity ต้องรักษา `VISUAL_REFINEMENT_09_12.md`

## ขั้นถัดไป
1. final Git diff / staged-file review
2. commit + push master 120 slides เมื่อ diff สะอาด
3. รอ GitHub Pages `built` และเทียบ production `index.html` กับ local แบบ byte-for-byte / SHA-256
4. หลัง slide deck 12 คาบ release สมบูรณ์ จึงเข้าสู่ขั้นสร้างข้อสอบปลายภาค 40 ข้อตาม blueprint หรือเส้นทาง PowerPoint เมื่อได้รับคำสั่ง
