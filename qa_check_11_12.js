const fs=require('fs');
const s=fs.readFileSync('prototype_11_12_v2.html','utf8');
const sections=[...s.matchAll(/<section class="slide[^\"]*"[\s\S]*?<\/section>/g)].map(m=>m[0]);
const nums=sections.map(sec=>{const m=sec.match(/<div class="footer">[\s\S]*?<span>(\d+)<\/span>\s*<\/div>/);return m?Number(m[1]):null});
const required=[
 '10 คะแนน','Lewis 4 คะแนน','Shape + Polarity 6 คะแนน','Calibration','HCl',
 'HF','BCl<sub>3</sub>','CH<sub>4</sub>','CH<sub>3</sub>Cl','NF<sub>3</sub>','H<sub>2</sub>O',
 'NaCl','CO<sub>2</sub>','Mg<sup>2+</sup>','CaO','N<sub>2</sub>O<sub>4</sub>',
 'dinitrogen tetroxide','trigonal pyramidal','BCl₃ nonpolar · H₂O polar'
];
const forbiddenGlobal=['Born–Haber','Born-Haber','Hess','net ionic','lattice-energy calculation','PCl<sub>5</sub>','SF<sub>4</sub>','ClF<sub>3</sub>','BrF<sub>5</sub>','XeOF<sub>4</sub>'];
const scoreSlides=sections.slice(5,10).join('\n'); // Slides 106–110
const leakedAnswers=[
 /HF\s+(?:=|→|is)?\s*polar/i,
 /BCl<sub>3<\/sub>[^<]{0,40}nonpolar/i,
 /CH<sub>4<\/sub>[^<]{0,40}nonpolar/i,
 /CH<sub>3<\/sub>Cl[^<]{0,40}polar/i,
 /NF<sub>3<\/sub>[^<]{0,40}polar/i,
 /H<sub>2<\/sub>O[^<]{0,40}polar/i
].map(r=>({pattern:String(r),found:r.test(scoreSlides)}));
const result={
 sections:sections.length,first:nums[0],last:nums.at(-1),
 contiguous:nums.length===20&&nums.every((n,i)=>n===101+i),
 batchAll:sections.every(sec=>sec.includes('data-batch="11-12"')),
 wheelPrevent:s.includes("addEventListener('wheel'"),touchPrevent:s.includes("addEventListener('touchmove'"),
 mobileVisualViewport:s.includes('window.visualViewport')&&s.includes('Math.min(width/1600,height/900)'),
 required:Object.fromEntries(required.map(x=>[x,s.includes(x)])),
 forbidden:Object.fromEntries(forbiddenGlobal.map(x=>[x,s.includes(x)])),
 scoreAnswerLeaks:leakedAnswers,
 slide120Last:sections.at(-1)?.includes('<span>120</span>')||false
};
console.log(JSON.stringify(result,null,2));
const fail=sections.length!==20||!result.contiguous||!result.batchAll||!result.wheelPrevent||!result.touchPrevent||!result.mobileVisualViewport||required.some(x=>!s.includes(x))||forbiddenGlobal.some(x=>s.includes(x))||leakedAnswers.some(x=>x.found)||!result.slide120Last;
if(fail)process.exit(1);
