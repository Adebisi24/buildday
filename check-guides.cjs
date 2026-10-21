const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const listeners={};const nodes=new Map();const node=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',value:'2026-10-18',style:{},classList:{add(){},remove(){}},showModal(){},close(){},insertAdjacentElement(where,el){this.inserted=el},addEventListener(){}});return nodes.get(s)};
const context=vm.createContext({document:{querySelector:node,createElement:()=>({innerHTML:'',querySelector:()=>({focus(){}})}),addEventListener(type,fn){(listeners[type]??=[]).push(fn)}},location:{hash:'#projects'},localStorage:{getItem(){return null},setItem(){}},window:{addEventListener(){}},setTimeout(){},setInterval(){},clearTimeout(){},crypto:require('node:crypto').webcrypto,console,Date,Intl,Set});
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);vm.runInContext(fs.readFileSync('dist/project-guides.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('Object.keys(PROJECT_GUIDES).length'),12);
for(let id=1;id<=12;id++){run(`projectForm('${id}')`);const html=node('#form .track').inserted.innerHTML;assert.match(html,/Research sources/);assert.match(html,/https:\/\//);assert.equal(run(`PROJECT_GUIDES['${id}'].plan.length`),10);assert.ok(run(`PROJECT_GUIDES['${id}'].acceptance.length`)>=4);}
const add=()=>listeners.click.at(-1)({target:{closest:()=>({dataset:{guideTasks:'1'}})}});
add();assert.equal(run('state.tasks.length'),10);add();assert.equal(run('state.tasks.length'),10);assert.equal(run('state.tasks[0].date'),'2026-10-18');assert.equal(run('state.tasks[9].date'),'2026-10-27');assert.equal(run('pct(state.projects[0])'),0);
console.log('PASS: all 12 guides render, each has sources and 10 build tasks; schedule dates, duplicate protection, and unchanged milestone progress verified.');

