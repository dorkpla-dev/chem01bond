const fs = require('fs');

const sourceDefs = [
  ['prototype_01_02_v2.html',1,20,'01-02'],
  ['prototype_03_04_v2.html',21,40,'03-04'],
  ['prototype_05_06_v2.html',41,60,'05-06'],
  ['prototype_07_08_v2.html',61,80,'07-08'],
  ['prototype_09_10_v2.html',81,100,'09-10'],
  ['prototype_11_12_v2.html',101,120,'11-12']
];
const total = sourceDefs.at(-1)[2];

function sectionsOf(html){
  return [...html.matchAll(/<section class="slide[^\"]*"[\s\S]*?<\/section>/g)].map(m=>m[0]);
}
function normalizeActive(sec){
  return sec
    .replace(/\sdata-batch="[^"]+"/g,'')
    .replace(/class="([^"]*)"/,(_,cls)=>`class="${cls.split(/\s+/).filter(x=>x&&x!=='active').join(' ')}"`);
}
function revealSig(sec){
  const groups=[...sec.matchAll(/data-reveal="([^"]+)"/g)].map(m=>m[1]);
  const counts={}; for(const g of groups)counts[g]=(counts[g]||0)+1;
  return {total:groups.length,groups:counts};
}
function tagCount(sec,tag){return (sec.match(new RegExp(`<${tag}\\b`,'g'))||[]).length;}

const masterHtml = fs.readFileSync('index.html','utf8');
const master = sectionsOf(masterHtml);
const source = sourceDefs.flatMap(([file])=>sectionsOf(fs.readFileSync(file,'utf8')));
const activeCount = master.filter(s=>/class="slide[^\"]*\bactive\b/.test(s)).length;
const footerNums = master.map(s=>{
  const m=s.match(/<div class="footer">[\s\S]*?<span>(\d+)<\/span>\s*<\/div>/);
  return m?Number(m[1]):null;
});
const expected=Array.from({length:total},(_,i)=>i+1);
const parityMismatches=[],revealMismatches=[],svgMismatches=[];
for(let i=0;i<total;i++){
  const a=source[i]||'',b=master[i]||'';
  if(normalizeActive(a)!==normalizeActive(b)) parityMismatches.push(i+1);
  if(JSON.stringify(revealSig(a))!==JSON.stringify(revealSig(b))) revealMismatches.push(i+1);
  const sa={svg:tagCount(a,'svg'),line:tagCount(a,'line'),circle:tagCount(a,'circle'),path:tagCount(a,'path'),polygon:tagCount(a,'polygon')};
  const sb={svg:tagCount(b,'svg'),line:tagCount(b,'line'),circle:tagCount(b,'circle'),path:tagCount(b,'path'),polygon:tagCount(b,'polygon')};
  if(JSON.stringify(sa)!==JSON.stringify(sb)) svgMismatches.push({slide:i+1,source:sa,master:sb});
}
const batchCounts=Object.fromEntries(sourceDefs.map(([,a,b,batch])=>[batch,master.filter(sec=>sec.includes(`data-batch="${batch}"`)).length]));
const required={
  slidesTotal:master.length===total&&source.length===total,
  oneActive:activeCount===1,
  contiguousFooterNumbers:footerNums.length===total&&footerNums.every((n,i)=>n===expected[i]),
  exactSectionParityAll:parityMismatches.length===0,
  revealParityAll:revealMismatches.length===0,
  chemistrySvgParityAll:svgMismatches.length===0,
  batchTagsAll:sourceDefs.every(([,a,b,batch])=>batchCounts[batch]===b-a+1),
  slidesRemainDirectDeckChildren:!masterHtml.includes('class="batch batch-'),
  scopedCss:sourceDefs.every(([,a,b,batch])=>masterHtml.includes(`.slide[data-batch="${batch}"]`)),
  mobileVisualViewportFit:masterHtml.includes('window.visualViewport')&&masterHtml.includes('Math.min(width / 1600, height / 900)')&&masterHtml.includes("'--deck-x'")&&masterHtml.includes("'--deck-y'"),
  visibleNavigation:masterHtml.includes('id="prevSlide"')&&masterHtml.includes('id="nextSlide"')&&masterHtml.includes("prevButton.addEventListener('click'")&&masterHtml.includes("nextButton.addEventListener('click'"),
  rightArrowRevealBeforeAdvance:masterHtml.includes("['ArrowRight','PageDown',' ','Enter'].includes(e.key)")&&masterHtml.includes('if (!revealNext() && index < slides.length - 1) show(index + 1)'),
  finalSlideBoundaryGuard:masterHtml.includes('index < slides.length - 1'),
  escapeResetsReveal:masterHtml.includes("e.key === 'Escape'")&&masterHtml.includes('resetReveal(slides[index])'),
  wheelPrevent:masterHtml.includes("addEventListener('wheel', e => e.preventDefault()"),
  touchPrevent:masterHtml.includes("addEventListener('touchmove', e => e.preventDefault()"),
  hashNav:masterHtml.includes("'#s=' + (index + 1)"),
  queryNav:masterHtml.includes("new URLSearchParams(location.search).get('slide')"),
  source01:masterHtml.includes('CHEM01 · คาบ 1'),
  source08:masterHtml.includes('CHEM01 · คาบ 8'),
  source09:masterHtml.includes('CHEM01 · คาบ 9'),
  source10:masterHtml.includes('CHEM01 · คาบ 10'),
  source11:masterHtml.includes('CHEM01 · คาบ 11'),
  source12:masterHtml.includes('CHEM01 · คาบ 12'),
  title1to12:masterHtml.includes('คาบ 1–12')
};
console.log(JSON.stringify({slides:master.length,activeCount,firstFooter:footerNums[0],lastFooter:footerNums.at(-1),batchCounts,parityMismatches,revealMismatches,svgMismatches,required},null,2));
if(Object.values(required).some(v=>!v))process.exit(1);
