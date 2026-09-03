const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_interaction_11_12_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
function run(slide,keys){const url=`${harness}?slide=${slide}&keys=${encodeURIComponent(keys.join(','))}`;const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=3000','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(r.status!==0||!m)throw new Error(`harness failed slide ${slide}`);return JSON.parse(decode(m[1]));}
const g=s=>s.revealedGroups.join(',');
const cases=[];
let x=run(101,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'101 three reveals then advance',pass:x.states.length===5&&x.states[0].slide===101&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&x.states[4].slide===102,data:x});
x=run(106,['ArrowRight']);
cases.push({name:'106 no answers immediate advance',pass:x.states.length===2&&x.states[0].slide===106&&x.states[0].revealedElements===0&&x.states[1].slide===107,data:x});
x=run(118,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'118 delayed answers all four then advance',pass:x.states.length===6&&g(x.states[1])==='1'&&g(x.states[2])==='1,2'&&g(x.states[3])==='1,2,3'&&g(x.states[4])==='1,2,3,4'&&x.states[5].slide===119,data:x});
x=run(120,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'120 final reveal stays intact after extra next',pass:x.states.length===7&&x.states.slice(1,6).every((s,i)=>g(s)===Array.from({length:i+1},(_,j)=>j+1).join(','))&&x.states[5].slide===120&&x.states[5].nextDisabled===true&&x.states[6].slide===120&&g(x.states[6])==='1,2,3,4,5',data:x});
x=run(101,['Space','Escape']);
cases.push({name:'space reveal escape reset',pass:x.states[1].slide===101&&g(x.states[1])==='1'&&g(x.states[2])==='',data:x});
console.log(JSON.stringify(cases,null,2));
if(cases.some(c=>!c.pass))process.exit(1);
