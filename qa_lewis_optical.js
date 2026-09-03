const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_lewis_optical_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
let failed=false;
for(const n of [54,55,56]){
 const url=`${harness}?target=${encodeURIComponent('prototype_05_06_v2.html')}&slide=${n}`;
 const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=4000','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});
 if(r.status!==0){console.log(n,'EDGE_FAIL',r.status);failed=true;continue}
 const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(!m){console.log(n,'NO_QA');failed=true;continue}
 let obj;try{obj=JSON.parse(decode(m[1]));}catch(e){console.log(n,'PARSE_FAIL',e.message);failed=true;continue}
 console.log(JSON.stringify(obj));
 for(const x of obj.optical){if(Math.abs(x.error)>0.6)failed=true;}
 const expected=[[ ],[1],[1,2]];
 for(let i=0;i<expected.length;i++){if(JSON.stringify(obj.reveal[i]?.groups)!==JSON.stringify(expected[i]))failed=true;}
}
if(failed)process.exit(1);
