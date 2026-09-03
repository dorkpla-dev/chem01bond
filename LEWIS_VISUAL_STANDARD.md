# CHEM01 — Lewis Visual Standard v2

สถานะ: **LOCKED** สำหรับ Lewis molecular diagrams ตั้งแต่ Slide 51 เป็นต้นไป

อัปเดต: 2026-09-02

## เป้าหมาย
Lewis visual ทุกสไลด์ต้องถูกต้องทางเคมี อ่านง่ายสำหรับนักเรียนพื้นฐานอ่อน และมี geometry ที่วัดได้จริง ไม่พึ่งการกะตำแหน่งด้วย CSS หรือ glyph ของฟอนต์

## 1. Rendering primitive ที่ล็อก
- molecular Lewis diagram ใช้ **SVG coordinate system เดียวต่อหนึ่งภาพ**
- atom label, bond endpoint และ lone-pair dot ต้องมีพิกัด explicit ใน SVG
- single bond = SVG `<line>`
- lone pair = SVG `<circle>` 2 จุด ไม่ใช้ glyph `••` และไม่ใช้ CSS dot ที่แยกออกจาก coordinate system ของอะตอม
- bonding pair ไม่วาดเป็น dot ซ้ำกับ bond line ในชุดนี้
- สี bond และ lone pair ใช้ semantic covalent violet เดียวกัน
- ห้ามกลับไปใช้ `div`/pseudo-element/CSS line สำหรับ molecular Lewis diagram เว้นแต่มีเหตุผลใหม่และผ่าน QA เทียบเท่า SVG

## 2. Geometry rule
- atom center เป็น reference หลักของภาพ
- bond endpoint ต้องออกจาก/เข้าหาอะตอมอย่างสมมาตรตาม template
- **equivalent bonds ภายในโครงสร้างเดียวกันต้องมี measured length เท่ากัน** เว้นแต่มีเหตุผลทางการสอน/เคมีที่บันทึกไว้
- ไม่บังคับให้ visual bond length ของคนละโมเลกุลเท่ากัน เพราะ diagram ไม่ใช่ physical bond-length scale
- equivalent atoms ที่อยู่ซ้าย/ขวา หรือบน/ล่าง ต้องสมมาตรกับอะตอมกลาง
- lone pair ต้องใช้ pair center ที่อ้างอิงพิกัด atom center โดยตรง
- **orientation ของ lone pair ต้องสัมพันธ์กับตำแหน่งรอบอะตอม**: คู่ที่อยู่ซ้าย/ขวาของ atom ให้เรียงจุดแนวตั้งแบบ colon; คู่ที่อยู่บน/ล่างให้เรียงจุดแนวนอน
- side lone pair ต้องชิด atom พอให้สายตาอ่านเป็น Lewis symbol เดียวกัน เช่น `:N≡N:` หรือ `C≡N:` ไม่ใช่จุดลอย `••   N`
- ห้ามแก้ geometry แบบเฉพาะหน้าด้วย `top/right/transform` ที่ทำให้ reveal หรือ font metrics เปลี่ยนตำแหน่งได้

## 3. Templates ที่ล็อก
### HF
- H—F
- F lone pairs: top + right + bottom
- ทั้ง 3 คู่ anchor กับ F ใน SVG เดียวกัน

### H2O
- Lewis 2D: H—O—H
- O lone pairs: top + bottom
- H ซ้าย/ขวาสมมาตรกับ O
- ต้องย้ำว่า Lewis 2D ไม่ใช่ molecular shape 3D

### NH3
- N กลาง
- H: left + right + bottom
- lone pair: top
- H ซ้าย/ขวาสมมาตร และ N—H ทั้ง 3 เส้นยาวเท่ากันใน template

### CH4
- C กลาง
- H: left + right + top + bottom
- ไม่มี lone pair
- C—H ทั้ง 4 เส้นยาวเท่ากันใน template
- top/bottom และ left/right สมมาตรเป็นคู่

## 4. Reveal rule
Worked Lewis I (single-bond foundation) ใช้ลำดับ:
1. initial = atom / pattern เท่านั้น
2. reveal group `1` = bond skeleton + reasoning
3. reveal group `2` = lone pairs หรือข้อสรุปเรื่อง lone pair

Worked Lewis II (double/triple bond, คาบ 7) ใช้ลำดับ Think-before-Reveal:
1. initial = atoms + คำถามที่ยังไม่บอก bond order
2. reveal group `1` = bonding pattern / reasoning
3. reveal group `2` = bond skeleton หรือ multiple-bond answer
4. reveal group `3` = lone pairs + final check

ข้อบังคับ:
- reveal เปลี่ยน **visibility/opacity เท่านั้น**; ห้ามเปลี่ยน SVG coordinates, dimensions หรือ layout
- reveal engine ต้อง sort `data-reveal` แบบตัวเลข ห้ามอาศัย DOM order
- หัวข้อสไลด์ห้ามบอก lone-pair answer ก่อน reveal ถ้าสไลด์ตั้งใจให้คิดก่อน
- reveal ต้องไม่ทำให้ slide reflow, jump, scroll หรือ overflow

## 5. Geometry acceptance gate
ก่อนอนุมัติ Lewis molecular diagram ต้องผ่านทั้ง 2 ชั้น:

### A. Numerical geometry QA
ใช้ `qa_lewis_geometry.js`
- bond lengths ที่เทียบกันต้องเท่ากัน
- symmetry ต้องตรงตาม template
- lone-pair circle spacing ต้องสม่ำเสมอ
- atom / bond / dot ต้องอยู่ใน SVG viewBox

### B. Real-render visual QA
ต้องดูจาก browser render จริงที่ขนาด presentation ไม่ใช่อาศัยตัวเลขอย่างเดียว
- atom ทุกตัวปรากฏครบ ไม่มี clipping
- line เข้า/ออก atom ดูสมมาตรทางสายตา
- lone pair ไม่ชน atom/bond
- reveal ทุกขั้นไม่ทำให้ geometry กระโดด
- ข้อความ reasoning ไม่ดัน diagram หรือ layout

**Numerical PASS อย่างเดียวไม่ถือว่าอนุมัติ**

## 6. Chemistry QA
- H ใช้ duet
- F/Cl/Br/I ใน neutral single-bond examples: 1 bond + 3 lone pairs
- O: 2 bonds + 2 lone pairs
- N: 3 bonds + 1 lone pair
- C: 4 bonds + 0 lone pair ใน simple neutral examples
- double/triple bonds เริ่มคาบ 7 เท่านั้น
- Lewis 2D ไม่ใช้แทน molecular shape 3D

## 7. Final QA evidence · 2026-09-02
หลัง migration ใน `prototype_05_06_v2.html`:

### Automated geometry
`node qa_lewis_geometry.js` → exit code 0 / `LEWIS SVG GEOMETRY QA PASSED`
- Slide 51 CH4: C—H = `65, 65, 65, 65`
- Slide 54 HF: H—F = `130`; F lone-pair circles ใช้ spacing `16` ต่อคู่ใน SVG
- Slide 55 H2O: O—H = `65, 65`; symmetric
- Slide 56 NH3: N—H = `65, 65, 65`; left/right symmetry; lone pair centered above N
- Slide 57 CH4: C—H = `65, 65, 65, 65`; X/Y symmetry; no lone-pair dots

### Real Edge render
ตรวจ Slide 56 และ 57 ใน owner-local Microsoft Edge ที่ full presentation view:
- Slide 56 initial: H ซ้าย/ขวา/ล่างปรากฏครบ ไม่มี clipping
- Slide 56 reveal 1: N—H ทั้ง 3 เส้นแสดงโดยตำแหน่งอะตอมไม่ขยับ
- Slide 56 reveal 2: lone pair อยู่กึ่งกลางเหนือ N; layout คงที่
- Slide 57 initial: C + H ทั้ง 4 ตำแหน่งสมมาตร
- Slide 57 reveal 1: C—H ทั้ง 4 เส้นเท่ากันและไม่กระโดด
- Slide 57 final: ข้อสรุป `C มีพันธะครบ 4 → ไม่ต้องเติม lone pair`; ไม่มี lone pair ถูกวาด; layout คงที่

### Regression
- `node qa_check_05_06.js` → exit code 0
- `node qa_layout_05_06.js` → exit code 0; Slides 40–60 ทุกหน้า `outside=0`, `slideOverflow=false`, `deckOverflow=false`
- `node qa_render_05_06.js` → exit code 0; render PNG ใหม่สำเร็จที่ Slides 41, 50, 51, 52, 53, 54, 55, 56, 57, 60

## 8. Rule for future slides
คาบ 7 เป็นต้นไป หากมี Lewis ของ O2, N2, CO2, HCN, CH2O:
- ใช้ SVG coordinate system ตามมาตรฐานนี้
- double/triple bond เป็น multiple SVG lines ที่มี spacing คงที่และวัดได้
- equivalent multiple bonds ต้อง symmetric
- lone pairs ใช้ SVG circles
- ต้องเพิ่ม geometry assertions ให้ `qa_lewis_geometry.js` หรือ QA utility ของคาบนั้น
- ต้องผ่านทั้ง automated geometry + real-render visual gate ก่อนถือว่าเสร็จ
