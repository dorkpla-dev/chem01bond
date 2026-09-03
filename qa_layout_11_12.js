const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_layout_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
let failed=false;
for(let slide=101;slide<=120;slide++){
 const url=`${harness}?target=${encodeURIComponent('prototype_11_12_v2.html')}&slide=${slide}`;
 const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=1800','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});
 if(r.status!==0){console.log(slide,'EDGE_FAIL',r.status);failed=true;continue}
 const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(!m){console.log(slide,'NO_QA');failed=true;continue}
 let obj;try{obj=JSON.parse(decode(m[1]));}catch(e){console.log(slide,'PARSE_FAIL',e.message);failed=true;continue}
 const slideOverflow=obj.slideOverflow[0]>obj.slideOverflow[2]+1||obj.slideOverflow[1]>obj.slideOverflow[3]+1;
 const deckOverflow=obj.deckOverflow[0]>obj.deckOverflow[2]+1||obj.deckOverflow[1]>obj.deckOverflow[3]+1;
 console.log(slide,`outside=${obj.outsideCount}`,`slideOverflow=${slideOverflow}`,`deckOverflow=${deckOverflow}`);
 if(obj.outsideCount||slideOverflow||deckOverflow){failed=true;fs.writeFileSync(`qa_11_12_layout_slide${slide}.json`,JSON.stringify(obj,null,2));}
}
if(failed)process.exit(1);
