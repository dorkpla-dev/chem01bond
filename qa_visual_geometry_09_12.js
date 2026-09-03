const fs=require('fs');
const h09=fs.readFileSync('prototype_09_10_v2.html','utf8');
const h11=fs.readFileSync('prototype_11_12_v2.html','utf8');
function sections(html){return [...html.matchAll(/<section class="slide[^\"]*"[\s\S]*?<\/section>/g)].map(m=>m[0]);}
const s09=sections(h09),s11=sections(h11);
function sec(n){return n<=100?s09[n-81]:s11[n-101];}
function count(n,re){return (sec(n).match(re)||[]).length;}
function firstShape(n,index=0){const a=[...sec(n).matchAll(/<svg class="shape-svg[^\"]*"[\s\S]*?<\/svg>/g)].map(m=>m[0]);return a[index]||'';}
function geometrySignature(svg){
 const parts=[];
 for(const m of svg.matchAll(/<(line|circle|path) class="(sbond|sdash|satom|swedge)"([^>]*)\/?>(?:<\/\1>)?/g)){
  const attrs=m[3].replace(/\s+/g,' ').trim();parts.push(`${m[1]}:${m[2]}:${attrs}`);
 }
 return parts.join('|');
}
const checks={
 slide81ThreeShapes:count(81,/<svg class="shape-svg/g)===3,
 slide81RadialLpDomains:count(81,/class="lp-domain"/g)===3,
 slide82TwoShapes:count(82,/<svg class="shape-svg/g)===2,
 slide82H2OTwoLpDomains:count(82,/class="lp-domain"/g)===2,
 slide86GeometryDipoles:count(86,/<svg class="shape-svg/g)===1&&count(86,/class="dipole-arrow"/g)===2,
 slide87BentTwoLpAndNet:count(87,/class="lp-domain"/g)===2&&count(87,/class="dipole-arrow"/g)===2&&count(87,/class="net-arrow"/g)===1,
 slide88SixGeometryCards:count(88,/<svg class="shape-svg/g)===6,
 slide89GeometryOnlyInsideRevealAnswers:count(89,/<div class="a" data-reveal="\d+"><svg class="shape-svg/g)===4,
 ch4Ch3ClSameTetrahedralTemplate:geometrySignature(firstShape(94))===geometrySignature(firstShape(95)),
 slide97TwoShapes:count(97,/<svg class="shape-svg/g)===2,
 nh3Nf3SamePyramidalTemplate:geometrySignature(firstShape(97,0))===geometrySignature(firstShape(98,0)),
 slide98GeometryRevealsAfterAXE:sec(98).includes('guided-geometry" data-reveal="2"')&&count(98,/class="lp-domain"/g)===1,
 slide105FiveGenericShapes:count(105,/<svg class="shape-svg/g)===5&&count(105,/class="lp-domain"/g)===3,
 scoredWorksetsNoShapeGraphics:[106,107,108].every(n=>count(n,/<svg class="shape-svg/g)===0),
 slide109GenericLibrary:count(109,/<svg class="shape-svg/g)===5&&count(109,/class="lp-domain"/g)===3,
 slide112TwoGenericIcons:count(112,/<svg class="shape-svg/g)===2,
 miniMockQuestionsNoShapeGraphics:[114,115,116,117].every(n=>count(n,/<svg class="shape-svg/g)===0),
 slide119AnswerVisuals:count(119,/<svg class="shape-svg/g)===4&&count(119,/class="lp-domain"/g)===5,
 slide120GenericIcons:count(120,/<svg class="shape-svg/g)===2,
 tangentialWaterLpStandard:(h09.match(/rotate\(-35 79 43\)/g)||[]).length>=3&&(h09.match(/rotate\(35 141 43\)/g)||[]).length>=3&&h09.includes('rotate(-35 101 49)')&&h09.includes('rotate(35 179 49)')&&(h11.match(/rotate\(-35 79 43\)/g)||[]).length>=4&&(h11.match(/rotate\(35 141 43\)/g)||[]).length>=4,
 tangentialPyramidalLpStandard:(h09.match(/rotate\(12 110 29\)/g)||[]).length>=4&&(h11.match(/rotate\(12 110 29\)/g)||[]).length>=4,
 noOrbitCircleMarkup:!h09.includes('class="electron-orbit"')&&!h11.includes('class="electron-orbit"')
};
console.log(JSON.stringify(checks,null,2));
if(Object.values(checks).some(v=>!v))process.exit(1);
