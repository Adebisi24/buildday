const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const nodes=new Map();const node=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',style:{},addEventListener(){},showModal(){},close(){},insertAdjacentElement(){}});return nodes.get(s)};
let stored;const c=vm.createContext({document:{querySelector:node,createElement:()=>({}),addEventListener(){}},location:{hash:'#projects'},localStorage:{getItem(){return null},setItem(k,v){stored=v}},window:{addEventListener(){}},setTimeout(){},setInterval(){},clearTimeout(){},crypto:require('node:crypto').webcrypto,Date,Intl,Set,URL,console});
const run=s=>vm.runInContext(s,c);run(fs.readFileSync('dist/app.js','utf8'));run(fs.readFileSync('dist/custom-projects.js','utf8'));
let submit;run('modal=(html,callback)=>{document.querySelector("#form").innerHTML=html;globalThis.submitProject=callback}');
function send(fields){c.fields=fields;run('submitProject({get:k=>fields[k]||"",has:k=>!!fields[k]})')}
run('customProjectForm()');send({title:'  ',description:'test'});assert.equal(run('state.projects.length'),12);
send({title:'School app',description:'Attendance tracking',details:'Class list',goals:'Record attendance',focus:true});assert.equal(run('state.projects.length'),13);assert.equal(run('state.focus'),'13');assert.equal(run('pct(state.projects[12])'),0);
run('validate(JSON.parse(JSON.stringify(state)))');assert.equal(JSON.parse(stored).projects.length,13);assert.match(run('renderProjects()'),/13 practical projects/);assert.match(run('renderToday()'),/13 projects shipped/);
run('state.projects[12].milestones[0]=true; customProjectForm("13")');send({title:'Updated school app',description:'Attendance',rules:'No duplicates'});assert.equal(run('pct(state.projects[12])'),10);assert.equal(run('state.projects.length'),13);
run('projectForm("13"); taskForm()');assert.match(node('#form').innerHTML,/Updated school app/);
console.log('PASS: custom project creation, whitespace validation, edit preserving milestones, focus, task linking, backup validation, and dynamic totals.');
run('projectMediaForm("1")');send({siteUrl:'javascript:alert(1)',imageUrl:''});assert.equal(run('state.projects[0].siteUrl'),undefined);
send({siteUrl:'https://example.com',imageUrl:'https://example.com/cover.jpg'});assert.equal(run('state.projects[0].siteUrl'),'https://example.com');assert.match(run('renderProjects()'),/View website/);assert.match(run('projectCover(state.projects[0])'),/cover.jpg/);
assert.match(run('projectWebsiteIcon(state.projects[0])'),/target="_blank"/);
run('projectMediaForm("1")');send({siteUrl:'',imageUrl:''});assert.equal(run('state.projects[0].siteUrl'),'');assert.equal(run('projectCover(state.projects[0])'),'');assert.match(run('projectWebsiteIcon(state.projects[0])'),/Add website link/);
console.log('PASS: site/image links saved and removed, unsafe schemes rejected, preview rendering verified.');


