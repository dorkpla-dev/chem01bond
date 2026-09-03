const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_mobile_11_12_harness.html')).href;
const viewports=[[360,640],[390,844],[412,915],[844,390]],slides=[101,106,110,111,114,118,120];
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
let failed=false;
for(const [w,h] of viewports){for(const slide of slides){const url=`${harness}?w=${w}&h=${h}&slide=${slide}`;const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,1000','--virtual-time-budget=1800','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(r.status!==0||!m){console.log(w,h,slide,'HARNESS_FAIL');failed=true;continue}const o=JSON.parse(decode(m[1]));const pass=o.fit&&o.nav&&o.horiz&&o.viewport[0]===w&&o.viewport[1]===h;console.log(`${w}x${h}`,slide,`fit=${o.fit}`,`nav=${o.nav}`,`horiz=${o.horiz}`,`viewport=${o.viewport.join('x')}`);if(!pass)failed=true;}}
if(failed)process.exit(1);
