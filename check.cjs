const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const node = s => { if (!nodes.has(s)) nodes.set(s, { innerHTML: '', textContent: '', style: {}, addEventListener() {}, showModal() {}, close() {} }); return nodes.get(s); };
const context = vm.createContext({ document: { querySelector: node, addEventListener() {} }, location: {hash:'#today'}, localStorage: {getItem(){return null},setItem(){}}, window:{addEventListener(){}},setTimeout(){},setInterval(){},clearTimeout(){},console,crypto:require('node:crypto').webcrypto,Intl,Date,Set,Blob,URL });
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
const run = code => vm.runInContext(code,context);
assert.match(node('#app').innerHTML,/Make today count/);
for (const screen of ['today','projects','activity','clients']) {run(`view='${screen}';render()`);assert.ok(node('#app').innerHTML.length>300);assert.ok(!node('#app').innerHTML.includes("'+"));}
assert.equal(run('pct(state.projects[0])'),0);
assert.equal(run('state.projects[0].milestones=[true,true,false,false,false];pct(state.projects[0])'),30);
run(`state.tasks.push({id:'test',title:'Build feature',date:today(),time:'',category:'Work',priority:'High',repeat:'daily',days:[],project:'1',completed:[]})`);
assert.equal(run('daily().length'),1);
run(`state.tasks[0].completed.push({date:today(),at:today()})`);
assert.equal(run('daily().filter(isDone).length'),1);
assert.equal(run('activeDates().has(today())'),true);
run(`state.tasks[0].repeat='weekdays';state.tasks[0].days=[(new Date().getDay()+1)%7]`);
assert.equal(run('daily().length'),0);
run(`state.tasks[0].days=[new Date().getDay()]`);
assert.equal(run('daily().length'),1);
assert.equal(run(`esc('<script>"&')`),'&lt;script&gt;&quot;&amp;');
assert.equal(run(`validate(JSON.parse(JSON.stringify(state)));true`),true);
assert.throws(()=>run(`validate({version:1})`));
for (const code of [`taskForm()`,`taskForm('test')`,`projectForm('1')`,`logForm()`,`leadForm()`,`settings()`]) {run(code);assert.ok(node('#form').innerHTML.includes('submit'));}
console.log('PASS: four screens, task forms, recurrence, completion, activity, milestone weights, escaping, and backup validation.');

