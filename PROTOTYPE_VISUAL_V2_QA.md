# CHEM01 — Prototype Visual v2 Design Gate

Master visual file: `prototype_visual_v2.html`
สถานะ: **VISUAL GATE PASSED — APPROVED FOR MIGRATION TO FULL PERIODS 1–2 DECK**
ตรวจจากภาพ render จริง: Edge fullscreen 1920×1080, logical canvas 1600×900 (16:9), 2026-09-01
หมายเหตุ: `visual_direction_v2.html` ถูกยกเลิกและลบออกแล้วเพื่อไม่ให้สับสน

## เกณฑ์ตัดสิน
ตรวจทุก archetype ด้วย 5 แกน
1. Typography — ภาษาไทยนุ่ม อ่านไกล ไม่แข็งแบบ system UI
2. Composition — เป็น presentation ไม่ใช่ dashboard / worksheet UI
3. Space — ใช้พื้นที่อย่างมีจังหวะ ไม่ยัดและไม่ปล่อยว่างโดยไร้หน้าที่
4. Teaching flow — สายตาเดินตามสิ่งที่เด็กต้องคิด/ทำ
5. Semantic color — สีมีความหมายและใช้แบบประหยัด

## ระบบที่ล็อกหลัง QA
- Primary family: `Prompt` (ยืนยันว่าติดตั้งจริงบนเครื่อง), fallback `Leelawadee UI`, `Segoe UI`
- ใช้ Light / Regular / Medium / SemiBold; หลีกเลี่ยง Black/ExtraBold
- logical canvas 1600×900, scale ทั้งผืนตาม viewport, `overflow:hidden`, ปิด wheel scrolling
- neutral field 80–90%; semantic accent 10–20%
- Ionic = blue, Covalent = violet, Metallic = graphite
- Element metal = teal, nonmetal = amber, metalloid = gray/dashed
- Positive ion = warm red-brown, negative ion/electron = teal-cyan
- ใช้ whitespace / hairline / typography มากกว่า card, pill, shadow
- metadata/footer ต้องสงบกว่าสาระหลักชัดเจน
- reveal ต้องไม่ทำให้ layout reflow

## Slide 01 — Hook — PASS
**จุดแข็งหลัง render**
- focal point เดียวชัดเจน; display text นำสายตาได้ดี
- dark opening slide แยกจากหน้าสอนโดยไม่ดูเป็น template สำเร็จรูป
- ฝั่งเกลือ/น้ำ/ทองแดงอ่านง่ายและไม่เป็น navigation UI
- whitespace มีหน้าที่และช่วยสร้างจังหวะเปิดหน่วย

**QA**
- ไม่มี clipping / overflow / scroll
- Prompt แสดงผลไทยได้ดี
- footer ไม่แย่งสายตา

## Slide 02 — Periodic table as map — PASS
**จุดแข็งหลัง render**
- ตารางทำหน้าที่เป็นเครื่องมือ ไม่เหมือนหน้า reference ที่ต้องท่อง
- metal / nonmetal / metalloid แยกด้วยทั้งสีและ label/pattern
- legend สมดุลกับตารางและไม่กลายเป็น side-panel UI

**QA**
- symbol อ่านได้จากระยะฉาย
- H ระบุเป็นอโลหะชัด
- metadata เบาพอ
- ไม่มี overflow / scroll

## Slide 03 — 3 bond rules — PASS
**จุดแข็งหลัง render**
- open-row composition เป็น presentation-first
- สายตาเดินซ้าย → ขวา: ชนิดธาตุ → ผลลัพธ์
- สี semantic ปรากฏเฉพาะชื่อพันธะ จึงช่วยจำโดยไม่ตกแต่งเกินจำเป็น

**Reveal QA**
- ตรวจทั้งก่อน reveal และ reveal ครบ 3 ขั้น
- ทุก reveal อยู่ตำแหน่งเดิม ไม่ดัน layout
- arrow น้ำหนักรองจากเนื้อหาแล้ว
- ไม่มี overflow / scroll

## Slide 04 — We do — PASS
**จุดแข็งหลัง render**
- สูตรเป็น focal point; เหตุผลเป็นชั้นรอง
- 2×3 rhythm เหมาะกับการพูดวิธีคิดซ้ำ
- answer ใช้ข้อความสี ไม่ใช้ badge/card

**จุดที่แก้จาก feedback**
- เพิ่มช่องไฟระหว่าง reasoning กับ answer reveal
- `.case .bond` ใช้ margin-top 18px, block result, font ~21px
- reasoning line-height ผ่อนขึ้นเพื่อสร้าง Think → Answer separation

**Reveal QA**
- ตรวจ initial, first reveal และ reveal ครบ 6 ข้อ
- answer ไม่ชิดเหตุผลแล้ว
- ไม่มี clipping / reflow / scroll

## Slide 05 — You do — PASS
**จุดแข็งหลัง render**
- ไม่มี 8 cards ใหญ่; grid เปิดโล่ง 4×2 เหมาะกับ projector
- formula 58–60px เด่นและมี answer baseline ชัด
- legend I/C/M ลด working-memory burden
- เฉลยทั้ง 8 ข้อ scan ได้เร็วด้วย semantic color

**Reveal QA**
- initial state อ่านโจทย์ชัด ไม่เห็นเหตุผลล่วงหน้า
- กด reveal ครั้งเดียวแสดงคำตอบทั้ง 8 หลังเวลาทำงาน
- เฉลยไม่แน่น/ชนกันที่ 16:9
- ไม่มี overflow / scroll

## Slide 06 — Polyatomic ions reference — PASS
**จุดแข็งหลัง render**
- preview อยู่ในจังหวะถูกต้อง: รู้จักในคาบ 2, ใช้จริงคาบ 3
- ซ้ายอธิบาย concept “ทั้งกลุ่มเป็นหนึ่งหน่วย”; ขวาเป็น reference 6 กลุ่ม
- สูตรและประจุเด่นกว่าชื่อ; NH4+ ใช้ positive color, anions ใช้ negative color
- ตัวอย่าง Ca(NO3)2 และ Al(OH)3 สร้างสะพานไปคาบ 3 โดยไม่สอนเต็ม
- ข้อความ `Reference — ไม่บังคับท่องทั้งหมด` ลดแรงกดดันการจำ

**Minor note (ไม่ block)**
- ชื่ออังกฤษ/ไทยมี density สูงที่สุดใน 6 หน้า; ใน deck เต็มให้คงภาษาไทยเป็น primary และอังกฤษเป็น caption รอง ไม่เพิ่มข้อมูลมากกว่านี้

**QA**
- charge/subscript/superscript ชัด ไม่มี collision
- balance ซ้าย–ขวาดี
- ไม่มี overflow / scroll

## Final gate decision
`prototype_visual_v2.html` **ผ่าน Visual Gate v2** และเป็น visual source of truth สำหรับสร้าง `prototype_01_02_v2.html`

ข้อห้ามเมื่อ migrate:
- ห้ามย้อนกลับไปใช้ dashboard/card-heavy language
- ห้ามลด font เพียงเพื่อยัดข้อมูล; ถ้าแน่นให้ลดเนื้อหาหรือแยกสไลด์
- ห้าม scroll
- ห้ามใช้สีโดยไม่มี semantic meaning
- ทุก answer slide ต้องมี Think → Reveal spacing และไม่ reflow

ขั้นถัดไป: migrate เนื้อหา `SLIDE_PLAN_01_02.md` เป็น deck คาบ 1–2 เต็ม แล้วทำ slide-by-slide visual + teaching QA ทุกหน้าอีกครั้ง
