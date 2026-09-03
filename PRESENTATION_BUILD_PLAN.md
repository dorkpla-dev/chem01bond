# CHEM01 — Presentation Build Plan

สถานะ: แผนแม่สำหรับการออกแบบ prototype HTML และการสร้าง PowerPoint จริง
อ้างอิงหลัก:
- `TEACHING_PLAN.md`
- `SLIDE_PLAN_01_02.md`
- `เอกสารประกอบการเรียนหน่วยที่ 2 พันธะเคมี.pdf`
- OpenAI Slides skill (`/home/oai/skills/slides/SKILL.md`)

## 1) เป้าหมายของงาน
สร้างสื่อสอนหน่วยพันธะเคมีสำหรับนักเรียนพื้นฐานอ่อน ให้ใช้คู่กับชีทประกอบการเรียน โดยเน้น:
- เห็นภาพและขั้นตอนมากกว่าข้อความยาว
- ใช้ข้อมูลอ้างอิงได้ ไม่บังคับจำข้อมูลที่ไม่ใช่แกน
- ถามก่อนเฉลย และฝึกทันทีหลังสอน
- อ่านได้ชัดจากหลังห้อง
- สอดคล้องกับใบงานเก็บคะแนนและข้อสอบปลายภาค
- สามารถพัฒนา prototype HTML ไปเป็น PowerPoint (.pptx) ได้โดยไม่ต้องออกแบบใหม่ทั้งชุด

## 2) Workflow ที่ตกลงใช้
1. `TEACHING_PLAN.md` — ขอบเขตเนื้อหาและเวลา
2. `SLIDE_PLAN_XX_YY.md` — storyboard รายคาบ
3. `prototype.html` — ต้นแบบ visual + interaction แบบไฟล์เดียว
4. Browser QA — ตรวจ 16:9, overflow, readability, reveal และ keyboard navigation
5. ปรับ design system / slide patterns จนลงตัว
6. สร้าง `.pptx` จาก pattern เดียวกันด้วย Slides skill (PptxGenJS หรือ artifact tool ตามความเหมาะสม)
7. Render PPTX เป็นภาพและตรวจ QA อีกครั้งก่อนส่งใช้งาน

หลักสำคัญ: HTML เป็น design prototype ไม่ใช่ไฟล์สุดท้ายที่บังคับใช้สอน

## 3) Technical Architecture — HTML ไฟล์เดียว
ไฟล์เป้าหมายระยะแรก: `prototype_01_02.html`

ภายในไฟล์เดียวประกอบด้วย:
- `<style>`: design tokens + layouts + components
- `<main class="deck">`: ทุก slide
- `<section class="slide">`: 1 section = 1 slide
- `<script>`: navigation, reveal, slide counter, progress
- SVG/CSS shapes เป็นหลัก เพื่อให้คมชัดและแปลงแนวคิดไป PPTX ง่าย
- ไม่พึ่ง CDN หรือ external JS framework
- ถ้ามีภาพภายนอกจริงในภายหลัง ให้เก็บเป็น local asset ใน workspace ไม่ hotlink

### Keyboard interaction
- Arrow Right / PageDown: reveal ขั้นถัดไป ถ้า reveal หมดจึงไป slide ถัดไป
- Arrow Left / PageUp: ย้อน slide
- Space / Enter: reveal
- Home / End: หน้าแรก / หน้าสุดท้าย
- F: fullscreen (ถ้า browser อนุญาต)
- R: toggle reference panel (เฉพาะ prototype ถ้าจำเป็น)

### Reveal strategy
ทุก element ที่ต้องการเฉลยทีละขั้นใช้ `data-reveal` หรือ class เดียวกัน

กติกา:
- โจทย์และคำถามขึ้นก่อน
- คำตอบ/ลูกศร/คำอธิบายสำคัญ reveal ภายหลัง
- ไม่ใช้ animation ที่หวือหวา
- ใช้ fade/appear 150–250 ms เท่านั้น

เมื่อนำไป PowerPoint หาก animation support ไม่สะดวก ให้ใช้ duplicated build states หรือทำสไลด์เฉลยคู่แทน เพื่อรักษาจังหวะการสอน

## 4) Slide Canvas
อัตราส่วน: 16:9
ต้นแบบ CSS logical canvas: 1600 × 900 (หรือ scale ตาม viewport โดยรักษา aspect ratio)

Safe area:
- ซ้าย/ขวาอย่างน้อย 5% ของความกว้าง
- บนอย่างน้อย 5%
- ล่างอย่างน้อย 4%
- หลีกเลี่ยงข้อความหลักชิดขอบ

หลักการต่อหน้า:
- 1 slide = 1 ความคิดหลัก
- headline ไม่เกิน 2 บรรทัด
- body text เท่าที่จำเป็น
- ถ้ามีมากกว่า 6–7 bullet ให้แตก slide
- สูตรเคมีต้องมี subscript/superscript ที่ถูกต้อง

## 5) Visual Direction
แนวภาพรวม: “Science classroom — clear, calm, modern”
ไม่ทำให้ดูเป็น corporate deck และไม่ทำเป็นชีทข้อความ

### Background
- หลัก: off-white / very light neutral
- ใช้ dark slide เฉพาะ title / chapter transition บางหน้า
- หลีกเลี่ยงพื้นหลังลวดลายหนัก

### Color semantics
กำหนดสีแบบ semantic เพื่อช่วยจำ ไม่ใช่เพื่อประดับ:
- Ionic = น้ำเงิน
- Covalent = ม่วง
- Metallic = เทา/กราไฟต์
- Electron / negative charge = โทนฟ้าอมเขียวหรือ cyan ที่ชัด
- Positive ion = โทนอุ่นที่ต่างจาก negative อย่างชัดเจน
- Question / Think = amber
- Correct / key takeaway = green
- Warning / misconception = red เฉพาะจุด

หมายเหตุ: ต้องตรวจ contrast ให้ตัวหนังสืออ่านง่ายจาก projector และห้ามพึ่ง “สีอย่างเดียว” ในการแยกความหมาย ให้มี label/icon/shape ประกอบด้วย

## 6) Typography
Prototype HTML font stack:
`"Leelawadee UI", "Noto Sans Thai", Tahoma, sans-serif`

ก่อนทำ PPTX จริงต้องตรวจ font ที่มีบนเครื่องสอน และเลือกฟอนต์ไทยที่ฝัง/แสดงผลได้เสถียร

แนวขนาดบน logical 1600×900:
- Title slide: 64–76 px
- Slide title: 42–52 px
- Main prompt / equation: 42–58 px
- Body: 30–36 px
- Caption / source / sheet reference: 22–26 px

หลัก typography:
- ใช้ฟอนต์ไม่เกิน 2 families
- น้ำหนัก regular + semibold/bold เท่านั้น
- ไม่ใช้ตัวเอียงกับข้อความไทยยาว
- ไฮไลต์คำสำคัญด้วย weight/shape มากกว่าขีดเส้นใต้

## 7) Core Components
สร้าง component pattern ให้เหมือนกันทั้ง 12 คาบ

### A. Header / lesson marker
แสดง:
- คาบที่
- หัวข้อสั้น
- หน้าในชีท (มุมขวาบนหรือแถบเล็ก)

### B. Question Card
ใช้กับ Recall / Think / You do
- คำถามใหญ่
- choices/card ถ้ามี
- ไม่ขึ้นเฉลยพร้อมคำถาม

### C. Information Card
ใช้เมื่อ “ให้ดูข้อมูล” เช่น ตารางธาตุ/ประจุหมู่
- มี label `ดูข้อมูลได้` ชัดเจน
- ไม่สื่อว่าเป็นสิ่งที่ต้องท่อง

### D. Step Card
ใช้สอนกระบวนการ เช่น
Na → Na⁺ + e⁻
- ทีละขั้น
- reveal ลูกศรและคำอธิบาย
- ใช้ alignment เดิมเสมอ

### E. Compare Card
เช่น โลหะ vs อโลหะ, ionic vs covalent
- 2 หรือ 3 คอลัมน์
- visual hierarchy ชัด
- จำกัดข้อความต่อคอลัมน์

### F. We do
มี label `ทำพร้อมกัน`
- นักเรียนตอบก่อน
- ครู reveal ทีละขั้น

### G. You do
มี label `ลองทำเอง`
- Headline บอก “สิ่งที่ต้องคิด” มากกว่าคำสั่งเชิงกล เช่น `ดูชนิดธาตุ → เลือก I / C / M`
- ถ้าใช้ตัวย่อ ต้องมี legend บนหน้าเดียวกัน เช่น `I = ionic · C = covalent · M = metallic` เพื่อไม่เพิ่มภาระ working memory
- การ์ดโจทย์ต้องสูงพอดีกับเนื้อหา ไม่ยืดเต็มพื้นที่เพียงเพื่อเติมสไลด์ และจัดทั้ง grid ให้อยู่กึ่งกลางเชิงสายตา
- สูตร/ตัวเลือกเป็นองค์ประกอบหลัก ขนาดอ่านได้จากท้ายห้อง; answer area ต้องชัดแต่ไม่แย่งสายตา
- จำนวนโจทย์ต้องกระจายทักษะอย่างมีเหตุผล ไม่ใช้หลายข้อซ้ำ pattern เดียวโดยไม่จำเป็น
- Hint เป็น secondary scaffold: สั้น สีอ่อน และบอก “วิธีคิด” ไม่บอกคำตอบ
- Footer เป็น student-facing เท่านั้น เช่น `ทำให้ครบก่อน → เฉลยพร้อมกัน`; teacher-only instruction ย้ายเข้า teacher note
- timer cue ได้ แต่ไม่จำเป็นต้องมี timer จริง

**Approved pattern จาก slide 9 (คาบ 1):**
- 4 × 2 cards, 8 ข้อ
- mix ทักษะ: metallic 2 / ionic 3 / covalent 3
- ตัวอย่างที่ใช้: `N₂, Cu, BaCl₂, CO₂, Fe, AlCl₃, LiBr, CHCl₃`
- ใช้ reference/table ได้ตามเป้าหมายการสอน
- ไม่มี scroll, ไม่มีข้อความล้นการ์ด และไม่ใช้ card height เกินความจำเป็น

### H. Key Takeaway
สรุปท้าย concept 1 ประโยคหรือ 1 diagram
- ไม่เกิน 3 key points

### I. Exit Ticket
- 2–3 ข้อ
- ใช้ design เดิมทุกคาบ
- ไม่ต้องมีคำตอบบนหน้าเดียวกัน

## 8) Visual Language สำหรับเคมี
### Metal / nonmetal
ใช้ periodic table schematic ที่แบ่งพื้นที่เป็นโลหะ/อโลหะอย่างชัด ไม่เน้นรายละเอียดครบทุกช่องในครั้งแรก

### Electron transfer
ใช้ dot / small circle เป็น electron และลูกศรเคลื่อนย้าย
ต้องแยก “อะตอม” กับ “ไอออน” ด้วย label และ charge ไม่พึ่งสีอย่างเดียว

### Ionic attraction
ใช้ ion cards เช่น `Na⁺` และ `Cl⁻` พร้อมลูกศร/แรงดึงดูดเข้า หากต้องการอธิบาย ไม่ใช้ภาพอะตอมแบบผิดวิทยาศาสตร์จนทำให้เข้าใจว่า NaCl เป็นโมเลกุลเดี่ยวถาวร

### Chemical formula
- ใช้ Unicode subscript ถ้า render ได้ชัด หรือ HTML `<sub>`
- charge ใช้ `<sup>`
- ตัวอย่าง: MgCl₂, Al₂O₃, SO₄²⁻

### Lewis
วาดด้วย SVG/CSS หรือ text layout ที่กำหนดตำแหน่งแน่นอน
ไม่ใช้ภาพ raster ถ้าสร้าง vector ได้

### VSEPR
เมื่อถึงคาบ 9 เป็นต้นไป ใช้ schematic 3D แบบเรียบง่ายและ consistent ไม่ต้อง photorealistic

## 9) Instructional Rules สำหรับกลุ่มพื้นฐานอ่อน
ทุก slide ต้องตอบอย่างน้อยหนึ่งข้อ:
- เด็กต้อง “ดูอะไร”
- เด็กต้อง “คิดอะไร”
- เด็กต้อง “ทำอะไร”

กติกา:
1. ไม่สมมติว่าจำโลหะ/อโลหะได้ — ให้ตาราง/แผนที่ธาตุ
2. ไม่สมมติว่าจำ charge ได้ — ให้ reference ในช่วงฝึก
3. 1 ตัวอย่างใหม่ → อย่างน้อย 1 We do → 1 You do
4. หากมีขั้นเกิน 3 ขั้น ให้แสดงทีละขั้น
5. ใช้ตัวอย่างเดิมซ้ำเพื่อสร้าง schema เช่น NaCl, MgCl₂, H₂O, CO₂, CH₄
6. โจทย์ยากไม่ใช้เป็นตัวอย่างแรก
7. หลีกเลี่ยงศัพท์ใหม่หลายคำในหน้าเดียว
8. ทุกคาบมี retrieval จากคาบก่อน

## 10) Slide Types ที่จะสร้างเป็นแม่แบบจากคาบ 1–2
Prototype ต้องมีอย่างน้อย 8 หน้าแม่แบบต่อไปนี้:
1. Unit / Lesson title
2. Diagnostic / Recall question
3. Visual concept explanation
4. Reference / information slide
5. Compare / classification
6. We do with reveal
7. You do
8. Exit ticket

เมื่อ 8 pattern นี้ผ่าน QA แล้ว คาบ 3–12 จะสร้างด้วย pattern เดิมเป็นหลัก

## 11) Design ของคาบ 1–2 ที่ต้องพิสูจน์ใน Prototype
### คาบ 1
ต้องทดสอบว่า:
- periodic table region อ่านง่ายจากระยะไกล
- นักเรียนเข้าใจ logic `โลหะ + อโลหะ → ionic`
- classification cards ไม่ทำให้สับสนกับ bond vs intermolecular force
- slide ไม่บังคับจำ IE/EN

### คาบ 2
ต้องทดสอบว่า:
- electron loss/gain animation/reveal อ่านง่าย
- charge อยู่ตำแหน่งถูกต้อง
- เด็กเห็นว่า Mg²⁺ ต้องใช้ Cl⁻ 2 ตัวเพื่อให้ประจุรวมเป็นศูนย์
- มี visual transition จาก concept ไปสู่คาบ 3 เรื่องสูตรสารประกอบ

## 12) Speaker Notes / Teacher Cues
แม้ prototype HTML จะไม่จำเป็นต้องแสดง notes ต่อผู้เรียน แต่ storyboard ต้องแยก:
- `ON SLIDE` — สิ่งที่นักเรียนเห็น
- `TEACHER CUE` — สิ่งที่ครูพูด/ถาม
- `REVEAL` — สิ่งที่ขึ้นหลังนักเรียนตอบ
- `SHEET` — หน้าที่ให้เปิด

เมื่อทำ PPTX จริง ควรใส่ teacher cue ที่จำเป็นลง speaker notes ถ้าเครื่องมือที่เลือกสนับสนุนได้

## 13) Accessibility / Classroom Readability
ต้องผ่าน:
- สีข้อความกับพื้นหลัง contrast สูง
- ใช้ขนาดตัวหนังสือใหญ่
- ไม่ใส่ข้อมูลสำคัญไว้ด้วยสีเพียงอย่างเดียว
- หลีกเลี่ยง red/green discrimination เพียงอย่างเดียว
- ตัวเลือก A/B/C/D อยู่ตำแหน่งแน่นอน
- ไม่ใช้ emoji เป็นสัญลักษณ์หลัก เพราะหน้าตาอาจต่างระหว่างเครื่อง
- ใช้ SVG/simple icon แทนเมื่อทำจริง

## 14) QA Checklist — HTML
ก่อนถือว่า prototype ผ่าน ต้องตรวจ:
- [ ] 16:9 ไม่ยืด/บีบเมื่อ fullscreen
- [ ] `html`, `body`, deck และ slide ทุกระดับต้อง `overflow:hidden`; ห้ามพึ่ง scroll เพื่อดูเนื้อหา
- [ ] ไม่มี overflow ทั้ง 1600×900 และ viewport 1366×768
- [ ] card/grid ไม่สูงเกินเนื้อหาและไม่ทิ้งพื้นที่ว่างแบบเสียสมดุล
- [ ] font ไทยไม่ตัดวรรณยุกต์ และไม่มีคำ/ประโยคล้นการ์ด
- [ ] subscript/superscript ไม่ชนบรรทัด
- [ ] slide title ไม่เกิน 2 บรรทัด
- [ ] ไม่มี body text เล็กเกินไป
- [ ] keyboard next/back ใช้งานได้
- [ ] reveal ไม่ข้ามลำดับ
- [ ] refresh แล้วเริ่มหน้าแรกอย่างถูกต้อง
- [ ] fullscreen ยังอ่านได้
- [ ] projector-like contrast ผ่านการดูด้วยตา
- [ ] แต่ละ slide มี purpose ชัด

## 15) QA Checklist — PPTX ในอนาคต
ตาม Slides skill ต้องมีการ render และตรวจ presentation จริงหลังสร้างไฟล์
อย่างน้อยต้องตรวจ:
- [ ] layout ไม่ล้นสไลด์
- [ ] fonts ไม่ถูก substitute จน layout เพี้ยน
- [ ] chemical formulas ถูกต้อง
- [ ] image/vector ไม่แตก
- [ ] text boxes ไม่ชนกัน
- [ ] slide master / spacing consistent
- [ ] presenter mode เปิดได้จริง
- [ ] รูปทุกหน้ามีความคมชัดพอสำหรับ projector
- [ ] render เป็น montage เพื่อตรวจ visual consistency ทั้ง deck

## 16) Template / Slides Skill Usage
Slides skill อนุญาตให้สร้าง PPTX ผ่าน PptxGenJS หรือ artifact tool และมี:
- slide templates
- rendering tools
- testing tools
- layout helpers
- speaker notes support ใน artifact tool

แนวทางสำหรับ CHEM01:
- Prototype HTML: custom design system ของเราเอง
- PPTX: ไม่จำเป็นต้องยก template สำเร็จรูปมาทั้งชุด
- สามารถหยิบแนวความเรียบ/วิชาการจาก `Academic_02` เป็น reference ได้ แต่ต้องปรับให้สว่าง อ่านง่าย และเหมาะกับห้องเรียนมากกว่า presentation งานวิชาการ
- final PPTX ต้องใช้ pattern และสี semantic จาก prototype ไม่เปลี่ยน visual language กลางทาง

## 17) Asset Policy
ก่อนใช้ asset ให้ถามว่า asset นั้นช่วยการเรียนรู้จริงหรือไม่

Priority:
1. CSS/SVG diagram ที่สร้างเองสำหรับ concept
2. ตาราง/ไอคอน simple vector
3. ภาพจริงเฉพาะเมื่อช่วยเชื่อมชีวิตประจำวัน เช่น เกลือ เหล็ก น้ำ
4. หลีกเลี่ยง stock photo ตกแต่งที่ไม่มีหน้าที่

หากต้องสร้างภาพเฉพาะทางในภายหลัง สามารถใช้ image generation ได้ แต่ chemistry diagram ที่ต้องแม่นยำควรสร้างด้วย SVG/shape มากกว่า

## 18) File Structure ที่แนะนำใน Workspace
ระยะแรกคงเรียบง่าย:
- `TEACHING_PLAN.md`
- `PRESENTATION_BUILD_PLAN.md`
- `SLIDE_PLAN_01_02.md`
- `prototype_01_02.html`
- `เอกสารประกอบการเรียนหน่วยที่ 2 พันธะเคมี.pdf`

เมื่อขยายงาน:
- `SLIDE_PLAN_03_04.md`
- `SLIDE_PLAN_05_06.md`
- ...
- `assets/` (เฉพาะเมื่อมี asset จริงหลายไฟล์)
- `CHEM01_Bonding.pptx` (final)

ไม่สร้าง framework/project structure ที่ซับซ้อนโดยไม่จำเป็น

## 19) Definition of Done — Prototype 01–02
Prototype คาบ 1–2 ถือว่าผ่านเมื่อ:
1. มี slide ครบตาม `SLIDE_PLAN_01_02.md`
2. จบคาบ 1 ในเวลาประมาณ 50 นาทีตาม storyboard
3. จบคาบ 2 ในเวลาประมาณ 50 นาที
4. navigation + reveal ใช้งานจริง
5. visual system ใช้ซ้ำได้
6. อ่านง่ายบน 16:9 projector
7. ไม่มีเนื้อหานอก scope ที่ตกลงไว้
8. เปิดชีทควบคู่ได้โดยมี page cue ชัด
9. ครูไม่ต้องอ่าน paragraph จากสไลด์
10. พร้อมนำ pattern ไปใช้คาบ 3–12

## 20) ขั้นดำเนินการถัดไป
ลำดับการทำงานต่อจากแผนนี้:
1. สร้าง `prototype_01_02.html`
2. ใส่ Design System + 8 slide patterns ก่อน
3. เติมคาบ 1 ตาม storyboard
4. เติมคาบ 2 ตาม storyboard
5. เปิด preview ใน browser
6. QA ทีละ slide + fullscreen
7. ปรับ typography / spacing / color / reveal
8. เมื่อลงตัว อัปเดต `TEACHING_PLAN.md` ว่า visual system approved
9. จึงวาง storyboard คาบ 3–4 และขยายต่อ
