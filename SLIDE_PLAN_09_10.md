# CHEM01 · Slide Plan คาบ 9–10

สถานะ: RELEASED · QA PASSED (local/master/production) · GitHub Pages verified

อ้างอิง:
- TEACHING_PLAN.md
- PRESENTATION_BUILD_PLAN.md
- SLIDE_PLAN_07_08.md (pattern เดิม)
- เอกสารประกอบการเรียนหน่วยที่ 2 พันธะเคมี หน้า 29–39

หลักการ:
- ทำทีละ 2 คาบเหมือนช่วงก่อนหน้า
- สไลด์ไม่แทนชีท แต่ชี้หน้าชีท + นำการคิด
- ใช้ pattern: Recall → Concept → We do → You do → Exit ticket
- ยังไม่สร้าง prototype จนกว่า plan ผ่าน review

---

# คาบ 9 · Molecular Polarity

ช่วงสไลด์เป้าหมาย: 81–90
ชีทหลัก: หน้า 38–39

## เป้าหมาย

นักเรียนแยกได้ว่า:

bond polarity ≠ molecular polarity เสมอไป

และใช้ขั้นตอน:

Lewis → shape → symmetry → polarity

## Scope

สอน:
- electronegativity แบบใช้งาน
- bond dipole
- dipole cancellation
- polar / nonpolar molecules

ไม่สอน:
- EN calculation เชิงตัวเลข
- dipole moment calculation
- shape ใหม่

## Slide flow

### 81 Recall shape
ทบทวน Lewis และ 5 shapes จากคาบ 8

### 82 Hook
CO₂ vs H₂O

คำถาม:
ทำไมสารที่มีพันธะคล้ายกันจึงมี polarity ต่างกัน?

### 83 Bond polarity
H–Cl
δ+ / δ− และทิศลูกศร

### 84 Dipole direction
ฝึกอ่านทิศทางการดึง electron

### 85 Bond polarity ไม่เท่ากับ molecular polarity
Flow:
Lewis → shape → dipole arrangement

### 86 Worked CO₂
linear + symmetry → dipole cancel → nonpolar

### 87 Worked H₂O
bent + dipole ไม่ cancel → polar

### 88 Compare set
CO₂, BCl₃, CH₄, H₂O, NH₃, CH₃Cl

### 89 We do / You do
วิเคราะห์ NH₃, CH₄, CH₃Cl, BCl₃

### 90 Exit ticket
อธิบาย CO₂ vs H₂O

---

# คาบ 10 · Integrated Practice: Lewis → Shape → Polarity

ช่วงสไลด์เป้าหมาย: 91–100
ชีทหลัก: หน้า 29–39 แบบเลือก

## เป้าหมาย

นักเรียนใช้ framework เดียววิเคราะห์ molecule ใหม่ได้

ไม่เพิ่ม concept ใหม่

## Scope

ใช้สารแกนเดิม:
- HF
- BCl₃
- CH₄
- CH₃Cl
- NH₃
- H₂O
- SO₂ (ใช้เมื่อเหมาะสม)

ไม่เพิ่ม:
- advanced VSEPR
- complex Lewis

## Slide flow

### 91 Retrieval
ย้อนขั้นตอนทั้งชุด:
formula → Lewis → shape → polarity

### 92 Strategy map
สร้าง decision flow สำหรับนักเรียน

### 93 Worked example 1
HF:
Lewis → bond polarity → molecular polarity

### 94 Worked example 2
CH₄:
Lewis → tetrahedral → symmetry → nonpolar

### 95 Worked example 3
CH₃Cl:
shape → asymmetric → polar

### 96 Compare mistakes
ตัวอย่างความเข้าใจผิด:
"มีพันธะขั้ว = โมเลกุลขั้วเสมอ"

### 97 We do
ทำร่วมกัน:
NH₃ และ BCl₃

### 98 Guided practice
นักเรียนวิเคราะห์สารจากชีท

### 99 You do
Independent practice

### 100 Exit ticket
เขียนขั้นตอนวิเคราะห์ polarity 4 ขั้น

---

# QA Gate ก่อนสร้าง Prototype

## Content
- เทียบ TEACHING_PLAN.md
- ไม่เกินชีทหน้า 29–39
- ไม่มีหัวข้อที่ตัดออก

## Chemistry
- Lewis ถูก
- shape ถูก
- symmetry ถูก
- polar/nonpolar ถูก

## Teaching
- Recall มี
- We do มี
- You do มี
- Exit ticket มี

## Visual
- ไม่สื่อ Lewis 2D เป็น 3D shape
- dipole direction ถูก
- reveal ไม่ทำให้ layout กระโดด

## Release Rule
ห้ามสร้าง prototype / commit / push จนกว่า QA ทุกข้อผ่าน

---

# Implementation / QA Record · 2026-09-04

ไฟล์ที่สร้าง:
- `prototype_09_10_v2.html` — Slides 81–100
- master `index.html` ขยายเป็น Slides 1–100 / คาบ 1–10 ผ่าน `build_master_deck.js`

ผล QA ก่อน release:
- prototype structure/content: 20/20 slides; footer 81–100 ต่อเนื่อง; scope 09–10 ถูกต้อง
- chemistry review: CO₂/BCl₃/CH₄ nonpolar; H₂O/NH₃/CH₃Cl/HF/NF₃ polar; ไม่มี shape ใหม่หรือหัวข้อที่ตัดออก
- prototype layout: Slides 81–100 ทุกหน้า `outside=0`, `slideOverflow=false`, `deckOverflow=false`
- interaction: reveal-before-advance ผ่าน; visible Prev/Next ผ่าน; Slide 100 reveal ครบแล้ว Next disabled
- exact mobile viewport: 360×640, 390×844, 412×915, 844×390 ผ่านทั้ง fit/nav/no-horizontal-overflow
- master source parity: 100/100 slides, reveal parity และ SVG element parity ผ่าน
- master full layout regression: Slides 1–100 ทุกหน้า ผ่านหลังแก้ QA harness ให้ไม่นับ `display:contents` zero-size box เป็น overflow
- master interaction regression เดิม (Slides 14/64) และใหม่ (83/89/91/100) ผ่าน
- master mobile regression: representative Slides 1/20/40/60/80/81/90/91/100 ผ่านทั้ง 4 viewport

## Direct handout verification
ตรวจไฟล์ `เอกสารประกอบการเรียนหน่วยที่ 2 พันธะเคมี.pdf` โดยตรงแล้ว (42 PDF pages):
- printed page 38 = PDF page 40: ระบุ nonpolar examples CH₄, BCl₃, CO₂ (รวมกฎ X₂) และ polar examples HCl, NH₃, H₂O, CH₃Cl
- printed page 39 = PDF page 41: แบบฝึกมี HF, BCl₃, SO₂, CH₄, CH₃Cl, NF₃, H₂O, NH₄⁺
- prototype ใช้ตัวอย่างแกนที่ตรงกับแผนย่อ 12 คาบ: HF, BCl₃, CH₄, CH₃Cl, NF₃, H₂O, NH₃, CO₂
- ไม่ใช้ SO₂ เป็นแกนเพราะต้องระวัง resonance/Lewis complexity; `TEACHING_PLAN.md` อนุญาตให้ให้ Lewis มาเมื่อจำเป็น
- ไม่ใช้ NH₄⁺ เป็นคะแนนแกน เพราะ `TEACHING_PLAN.md` ระบุ bonus/ไม่ใช้คะแนนได้
- ไม่ดึง PCl₅/SF₄/ClF₃/BrF₅/XeOF₄/ICl₄⁻ จากหน้าถัดไปกลับเข้าหลักสูตรย่อ เพราะเป็น advanced VSEPR ที่ถูกตัดออก

Release gate: PASSED สำหรับ local/master build + direct handout alignment; ก่อน push ต้อง final Git diff review และ production verification หลัง deploy

## Visual refinement record · 2026-09-04
หลัง user review ได้ยกระดับ Slides 81–100 ให้ใช้ molecular-geometry language ต่อเนื่องจากคาบ 7–8:
- CO2 / BCl3 / CH4 / CH3Cl ใช้ shape templates แบบ atom circle + solid/dash/wedge ตามความเหมาะสม
- NH3 / NF3 ใช้ pyramidal template เดียวกัน พร้อม lone-pair domain แบบ radial/tangent
- H2O ใช้ bent template พร้อม lone-pair domains สองคู่แบบ radial/tangent; ไม่วาด electron orbit
- Slides 89/98 รักษา reveal timing เดิม ไม่เปิด geometry ก่อน reasoning stage
- CH4/CH3Cl ใช้ tetrahedral directions เดียวกันเพื่อให้เห็นว่า shape เดียวกันแต่ substituent ต่างกัน

QA หลัง refinement: geometry standard, Slides 81–100 full layout, interaction, exact mobile 4 viewports, master 120 source/reveal/SVG parity, logical SVG geometry และ canonical PNG parity PASS
