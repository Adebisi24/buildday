const {createServer}=require('./server.cjs');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'buildday-test-'));
 const {server,code}=createServer({directory});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${server.address().port}`;
 try{
 assert.equal((await fetch(base+'/api/state')).status,401);
 assert.equal((await fetch(base+'/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:'wrong'})})).status,401);
 const {token}=await(await fetch(base+'/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})})).json();
 const headers={'Content-Type':'application/json',Authorization:'Bearer '+token};
 const state={version:1,tasks:[],projects:Array.from({length:13},()=>({})),logs:[],leads:[],ready:[],notified:[],plannedDays:5};
 assert.equal((await fetch(base+'/api/state',{method:'PUT',headers,body:JSON.stringify({revision:0,state})})).status,200);
 assert.equal((await fetch(base+'/api/state',{method:'PUT',headers,body:JSON.stringify({revision:0,state})})).status,409);
 assert.equal((await(await fetch(base+'/api/state',{headers})).json()).revision,1);
 assert.equal((await fetch(base+'/api/state',{headers:{...headers,Origin:'http://untrusted.example'}})).status,403);
 assert.equal((await fetch(base+'/.local-data/pairing-code.txt')).status,404);
 assert.match(await(await fetch(base)).text(),/local-sync.js/);
 assert.equal(JSON.parse(fs.readFileSync(path.join(directory,'workspace.json'))).revision,1);
 const recovered=createServer({directory});recovered.server.close();assert.equal(recovered.code,code);
 console.log('PASS: pairing, unauthorized access, save/read, conflict protection, origin checks, file isolation, and disk persistence.');
 }finally{await new Promise(r=>server.close(r));fs.rmSync(directory,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1});

