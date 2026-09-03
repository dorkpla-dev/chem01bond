const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_interaction_09_10_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
function run(slide,keys){const url=`${harness}?target=${encodeURIComponent('prototype_09_10_v2.html')}&slide=${slide}&keys=${encodeURIComponent(keys.join(','))}`;const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=3000','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(r.status!==0||!m)throw new Error(`harness failed slide ${slide}`);return JSON.parse(decode(m[1]));}
const g=s=>s.revealedGroups.join(',');
const cases=[];
let x=run(81,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'81 shape recalls reveal by group then advance',pass:x.states.length===6&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&g(x.states[4])==='1,2,3,4'&&x.states[5].slide===82,data:x});
x=run(87,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'87 geometry then dipoles then net polarity',pass:x.states.length===5&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&x.states[4].slide===88,data:x});
x=run(89,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'89 answer geometry remains hidden until each reveal',pass:x.states.length===6&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&g(x.states[4])==='1,2,3,4'&&x.states[5].slide===90,data:x});
x=run(98,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'98 NF3 geometry joins AXE reveal without adding a stage',pass:x.states.length===6&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&g(x.states[4])==='1,2,3,4'&&x.states[5].slide===99,data:x});
x=run(100,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'100 final reveal stays intact after extra next',pass:x.states.length===6&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&g(x.states[4])==='1,2,3,4'&&x.states[4].nextDisabled===true&&x.states[5].slide===100&&g(x.states[5])==='1,2,3,4',data:x});
x=run(81,['Space','Escape']);
cases.push({name:'space reveal escape reset',pass:g(x.states[1])==='1'&&g(x.states[2])==='',data:x});
console.log(JSON.stringify(cases,null,2));
if(cases.some(c=>!c.pass))process.exit(1);
