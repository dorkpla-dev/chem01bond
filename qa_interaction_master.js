const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_interaction_master_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
function run(slide,keys){const url=`${harness}?slide=${slide}&keys=${encodeURIComponent(keys.join(','))}`;const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=3000','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(r.status!==0||!m)throw new Error(`interaction harness failed slide ${slide}`);return JSON.parse(decode(m[1]));}
const groups=s=>s.revealedGroups.join(',');
const cases=[];
let x=run(14,['ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide14 reveal then advance',pass:x.states.length===4&&x.states[0].slide===14&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&x.states[3].slide===15,data:x});
x=run(64,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide64 three-stage Lewis then advance',pass:x.states.length===5&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&x.states[4].slide===65,data:x});
x=run(87,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide87 shape then bond dipoles then net polarity',pass:x.states.length===5&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&x.states[4].slide===88,data:x});
x=run(89,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide89 answer geometry reveals one molecule at a time',pass:x.states.length===6&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&groups(x.states[4])==='1,2,3,4'&&x.states[5].slide===90,data:x});
x=run(98,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide98 NF3 geometry shares existing AXE reveal stage',pass:x.states.length===6&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&groups(x.states[4])==='1,2,3,4'&&x.states[5].slide===99,data:x});
x=run(101,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide101 worksheet contract reveals then advance',pass:x.states.length===5&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&x.states[4].slide===102,data:x});
x=run(106,['ArrowRight']);
cases.push({name:'slide106 graded work has no reveal',pass:x.states.length===2&&x.states[0].slide===106&&x.states[0].revealedElements===0&&x.states[1].slide===107,data:x});
x=run(118,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide118 delayed answer sequence',pass:x.states.length===6&&groups(x.states[1])==='1'&&groups(x.states[2])==='1,2'&&groups(x.states[3])==='1,2,3'&&groups(x.states[4])==='1,2,3,4'&&x.states[5].slide===119,data:x});
x=run(120,['ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide120 final boundary preserves revealed state',pass:x.states.length===7&&groups(x.states[5])==='1,2,3,4,5'&&x.states[5].slide===120&&x.states[5].nextDisabled===true&&x.states[6].slide===120&&groups(x.states[6])==='1,2,3,4,5'&&x.states[6].nextDisabled===true,data:x});
x=run(14,['Space','Escape']);
cases.push({name:'space reveal and escape reset',pass:x.states.length===3&&groups(x.states[1])==='1'&&groups(x.states[2])==='',data:x});
console.log(JSON.stringify(cases,null,2));
if(cases.some(c=>!c.pass))process.exit(1);
