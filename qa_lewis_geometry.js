const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_lewis_geometry_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
const near=(a,b,t=.01)=>Math.abs(a-b)<=t;
let failed=false;
for(const n of [51,54,55,56,57]){
 const url=`${harness}?target=${encodeURIComponent('prototype_05_06_v2.html')}&slide=${n}`;
 const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=3500','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});
 if(r.status!==0){console.log(n,'EDGE_FAIL',r.status);failed=true;continue}
 const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(!m){console.log(n,'NO_QA');failed=true;continue}
 let q;try{q=JSON.parse(decode(m[1]));}catch(e){console.log(n,'PARSE_FAIL',e.message);failed=true;continue}
 console.log(JSON.stringify(q));
 if(!q.viewBox||!q.bonds.length){failed=true;continue}
 if(n===51||n===57){
   if(q.bonds.length!==4||!q.bonds.every(b=>near(b.len,65))) failed=true;
   const c=q.atoms.find(a=>a.label==='C'),hs=q.atoms.filter(a=>a.label==='H');
   if(!c||hs.length!==4) failed=true;
   else {
    const left=hs.find(a=>a.x<c.x&&a.y===c.y),right=hs.find(a=>a.x>c.x&&a.y===c.y),top=hs.find(a=>a.y<c.y&&a.x===c.x),bottom=hs.find(a=>a.y>c.y&&a.x===c.x);
    if(!left||!right||!top||!bottom||!near(c.x-left.x,right.x-c.x)||!near(c.y-top.y,bottom.y-c.y)) failed=true;
   }
 }
 if(n===54){
   if(q.bonds.length!==1||!near(q.bonds[0].len,130)||q.dots.length!==6) failed=true;
   const f=q.atoms.find(a=>a.label==='F');if(!f) failed=true; else {
    const vertical=q.dots.filter(d=>Math.abs(d.cx-f.x)<=20),right=q.dots.filter(d=>d.cx>f.x+20);
    const top=vertical.filter(d=>d.cy<f.y-20),bottom=vertical.filter(d=>d.cy>f.y+20);
    const avg=(arr,k)=>arr.reduce((s,o)=>s+o[k],0)/arr.length;
    if(top.length!==2||bottom.length!==2||right.length!==2||!near(avg(top,'cx'),f.x)||!near(avg(bottom,'cx'),f.x)||!near(avg(right,'cy'),f.y)||!near(f.y-avg(top,'cy'),avg(bottom,'cy')-f.y)) failed=true;
   }
 }
 if(n===55){
   if(q.bonds.length!==2||!q.bonds.every(b=>near(b.len,65))||q.dots.length!==4) failed=true;
   const o=q.atoms.find(a=>a.label==='O');if(!o) failed=true;else {const top=q.dots.filter(d=>d.cy<o.y),bottom=q.dots.filter(d=>d.cy>o.y);const avg=(arr,k)=>arr.reduce((s,x)=>s+x[k],0)/arr.length;if(top.length!==2||bottom.length!==2||!near(avg(top,'cx'),o.x)||!near(avg(bottom,'cx'),o.x)||!near(o.y-avg(top,'cy'),avg(bottom,'cy')-o.y)) failed=true;}
 }
 if(n===56){
   if(q.bonds.length!==3||!q.bonds.every(b=>near(b.len,65))||q.dots.length!==2) failed=true;
   const nn=q.atoms.find(a=>a.label==='N');if(!nn) failed=true;else {const avgx=(q.dots[0].cx+q.dots[1].cx)/2;if(!near(avgx,nn.x)) failed=true;}
 }
}
if(failed){console.error('LEWIS SVG GEOMETRY QA FAILED');process.exit(1)}
console.log('LEWIS SVG GEOMETRY QA PASSED');
