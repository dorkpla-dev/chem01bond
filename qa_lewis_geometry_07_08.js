const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_lewis_geometry_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
const near=(a,b,t=.02)=>Math.abs(a-b)<=t,avg=(a,k)=>a.reduce((s,x)=>s+x[k],0)/a.length;
let failed=false;
for(const n of [63,64,65,66,67]){
 const url=`${harness}?target=${encodeURIComponent('prototype_07_08_v2.html')}&slide=${n}`;
 const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=3500','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});
 if(r.status!==0){console.log(n,'EDGE_FAIL',r.status);failed=true;continue}
 const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(!m){console.log(n,'NO_QA');failed=true;continue}
 let q;try{q=JSON.parse(decode(m[1]));}catch(e){console.log(n,'PARSE_FAIL',e.message);failed=true;continue}
 console.log(JSON.stringify(q));
 if(q.atoms.some(a=>!near(a.inkCx,a.x,.2)||!near(a.inkCy,a.y,.2))){console.error('OPTICAL_ATOM_CENTER_FAIL',n,q.atoms);failed=true;}
 const atom=(label)=>q.atoms.filter(a=>a.label===label);
 if(n===63){
  const os=atom('O');
  if(os.length!==2||q.bonds.length!==2||!q.bonds.every(b=>near(b.len,70))||q.dots.length!==8)failed=true;
  if(q.bonds.length===2&&(!near(q.bonds[0].y1,152)||!near(q.bonds[1].y1,168)))failed=true;
  for(const o of os){const ds=q.dots.filter(d=>Math.abs(d.cx-o.x)<=12);const top=ds.filter(d=>d.cy<o.y),bot=ds.filter(d=>d.cy>o.y);if(ds.length!==4||top.length!==2||bot.length!==2||!near(avg(top,'cx'),o.x)||!near(avg(bot,'cx'),o.x)||!near(o.y-avg(top,'cy'),avg(bot,'cy')-o.y))failed=true;}
 }
 if(n===64){
  const ns=atom('N');
  if(ns.length!==2||q.bonds.length!==3||!q.bonds.every(b=>near(b.len,70))||q.dots.length!==4)failed=true;
  if(q.bonds.length===3&&q.bonds.map(b=>b.y1).join(',')!=='150,160,170')failed=true;
  if(ns.length===2){const lpL=q.dots.filter(d=>d.cx<ns[0].x),lpR=q.dots.filter(d=>d.cx>ns[1].x);if(lpL.length!==2||lpR.length!==2||!near(avg(lpL,'cy'),ns[0].y)||!near(avg(lpR,'cy'),ns[1].y)||!near(ns[0].x-avg(lpL,'cx'),avg(lpR,'cx')-ns[1].x))failed=true;}
 }
 if(n===65){
  const os=atom('O'),cs=atom('C');
  if(os.length!==2||cs.length!==1||q.bonds.length!==4||!q.bonds.every(b=>near(b.len,65))||q.dots.length!==8)failed=true;
  if(q.bonds.length===4){const ys=q.bonds.map(b=>b.y1);if(ys.join(',')!=='152,168,152,168')failed=true;}
  for(const o of os){const ds=q.dots.filter(d=>Math.abs(d.cx-o.x)<=12);if(ds.length!==4)failed=true;}
 }
 if(n===66){
  const h=atom('H'),c=atom('C'),nn=atom('N');
  if(h.length!==1||c.length!==1||nn.length!==1||q.bonds.length!==4||!q.bonds.every(b=>near(b.len,65))||q.dots.length!==2)failed=true;
  if(q.bonds.length===4&&q.bonds.slice(1).map(b=>b.y1).join(',')!=='150,160,170')failed=true;
  if(nn.length===1&&(!near(avg(q.dots,'cy'),nn[0].y)||!(avg(q.dots,'cx')>nn[0].x)))failed=true;
 }
 if(n===67){
  const hs=atom('H'),c=atom('C'),os=atom('O');
  if(hs.length!==2||c.length!==1||os.length!==1||q.bonds.length!==4||q.dots.length!==4)failed=true;
  if(q.bonds.length===4){if(!near(q.bonds[0].len,q.bonds[1].len)||!near(q.bonds[2].len,65)||!near(q.bonds[3].len,65))failed=true;}
  if(os.length===1){const top=q.dots.filter(d=>d.cy<os[0].y),bot=q.dots.filter(d=>d.cy>os[0].y);if(top.length!==2||bot.length!==2||!near(avg(top,'cx'),os[0].x)||!near(avg(bot,'cx'),os[0].x))failed=true;}
  if(hs.length===2&&c.length===1){if(!near(c[0].y-hs[0].y,hs[1].y-c[0].y)||!near(hs[0].x,hs[1].x))failed=true;}
 }
}
if(failed){console.error('LEWIS MULTIBOND SVG GEOMETRY QA FAILED');process.exit(1)}
console.log('LEWIS MULTIBOND SVG GEOMETRY QA PASSED');
