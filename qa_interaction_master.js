const fs=require('fs'),cp=require('child_process'),path=require('path'),{pathToFileURL}=require('url');
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if(!edge){console.error('Edge not found');process.exit(2)}
const harness=pathToFileURL(path.resolve('qa_interaction_master_harness.html')).href;
function decode(s){return s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'");}
function run(slide,keys){
 const url=`${harness}?slide=${slide}&keys=${encodeURIComponent(keys.join(','))}`;
 const r=cp.spawnSync(edge,['--headless=new','--disable-gpu','--allow-file-access-from-files','--window-size=1600,900','--virtual-time-budget=2500','--dump-dom',url],{encoding:'utf8',maxBuffer:5e6});
 const m=r.stdout.match(/<pre id="out">([\s\S]*?)<\/pre>/);if(r.status!==0||!m)throw new Error(`interaction harness failed slide ${slide}`);
 return JSON.parse(decode(m[1]));
}
function groups(state){return state.revealedGroups.join(',')}
const cases=[];
const a=run(14,['ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide14 reveal then advance',pass:a.states.length===4&&a.states[0].slide===14&&groups(a.states[0])===''&&a.states[1].slide===14&&groups(a.states[1])==='1'&&a.states[2].slide===14&&groups(a.states[2])==='1,2'&&a.states[3].slide===15&&groups(a.states[3])==='',data:a});
const b=run(64,['ArrowRight','ArrowRight','ArrowRight','ArrowRight']);
cases.push({name:'slide64 three-stage Lewis reveal then advance',pass:b.states.length===5&&b.states[0].slide===64&&groups(b.states[1])==='1'&&groups(b.states[2])==='1,2'&&groups(b.states[3])==='1,2,3'&&b.states[4].slide===65&&groups(b.states[4])==='',data:b});
const c=run(14,['Space','Escape']);
cases.push({name:'space reveal and escape reset',pass:c.states.length===3&&c.states[1].slide===14&&groups(c.states[1])==='1'&&c.states[2].slide===14&&groups(c.states[2])==='',data:c});
console.log(JSON.stringify(cases,null,2));
if(cases.some(c=>!c.pass))process.exit(1);
