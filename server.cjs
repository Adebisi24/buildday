// Local-only BuildDay server. No dependencies and no cloud services.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

function createServer({ directory = path.join(__dirname, '.local-data'), port = 4187 } = {}) {
  fs.mkdirSync(directory, { recursive: true });
  const secretPath = path.join(directory, 'pairing-code.txt');
  const code = fs.existsSync(secretPath) ? fs.readFileSync(secretPath, 'utf8').trim() : crypto.randomBytes(8).toString('hex');
  fs.writeFileSync(secretPath, code, { mode: 0o600 });
  const statePath = path.join(directory, 'workspace.json');
  let stored = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : { revision: 0, state: null };
  const sessions = new Set(), attempts = new Map();
  const addresses = Object.values(os.networkInterfaces()).flat().filter(x => x.family === 'IPv4' && !x.internal).map(x => x.address);
  const currentHosts = () => new Set(['localhost', '127.0.0.1', ...Object.values(os.networkInterfaces()).flat().filter(x => x.family === 'IPv4' && !x.internal).map(x => x.address)]);
  const send = (res, status, data) => { res.writeHead(status, { 'Content-Type':'application/json', 'Cache-Control':'no-store' }); res.end(JSON.stringify(data)); };
  const server = http.createServer(async (req, res) => {
    try {
      const host = new URL('http://' + req.headers.host).hostname;
      if (!currentHosts().has(host)) return send(res, 403, {error:'Unknown host'});
      if (req.headers.origin && req.headers.origin !== 'http://' + req.headers.host) return send(res, 403, {error:'Cross-origin requests are not allowed'});
      const url = new URL(req.url, 'http://' + req.headers.host);
      const body = async () => { let data=''; for await (const chunk of req) {data+=chunk;if(Buffer.byteLength(data)>5e6)throw Error('Request too large');}return JSON.parse(data); };
      if (url.pathname === '/api/pair' && req.method === 'POST') {
        const ip=req.socket.remoteAddress, entry=attempts.get(ip)||{count:0,until:0};
        if(entry.until>Date.now())return send(res,429,{error:'Too many attempts. Try again in one minute.'});
        const input=await body();
        if(typeof input.code!=='string'||input.code!==code){entry.count++;if(entry.count>=5){entry.until=Date.now()+60000;entry.count=0;}attempts.set(ip,entry);return send(res,401,{error:'Incorrect pairing code'});}
        attempts.delete(ip); const token=crypto.randomBytes(32).toString('hex');sessions.add(token);return send(res,200,{token});
      }
      if (url.pathname.startsWith('/api/')) {
        if(!sessions.has((req.headers.authorization||'').replace(/^Bearer /,'')))return send(res,401,{error:'Pair this device first'});
        if(url.pathname==='/api/state' && req.method==='GET')return send(res,200,stored);
        if(url.pathname==='/api/state' && req.method==='PUT') {
          const input=await body(), s=input.state;
          if(input.revision!==stored.revision)return send(res,409,{error:'Another device saved changes. Reload to load them.'});
          if(!s||s.version!==1||!['tasks','projects','logs','leads','ready','notified'].every(k=>Array.isArray(s[k]))||s.projects.length<1||!Number.isInteger(s.plannedDays)||s.plannedDays<1||s.plannedDays>7)return send(res,400,{error:'Invalid workspace'});
          const next={revision:stored.revision+1,state:s};
          fs.writeFileSync(statePath+'.tmp',JSON.stringify(next,null,2));
          fs.renameSync(statePath+'.tmp',statePath);stored=next;return send(res,200,{revision:stored.revision});
        }
        return send(res,404,{error:'Not found'});
      }
      if(req.method!=='GET')return send(res,405,{error:'Method not allowed'});
      const files={'/':'index.html','/index.html':'index.html','/favicon.svg':'favicon.svg','/favicon.ico':'favicon.svg','/app.js':'app.js','/project-guides.js':'project-guides.js','/custom-projects.js':'custom-projects.js','/style.css':'style.css','/local-sync.js':'../local-sync.js'};
      if(!files[url.pathname])return send(res,404,{error:'Not found'});
      let contents=fs.readFileSync(path.join(__dirname,'dist',files[url.pathname]),'utf8');
      if(url.pathname==='/'||url.pathname==='/index.html')contents=contents.replace('</body>','<script src="/local-sync.js"></script></body>');
      res.writeHead(200,{'Content-Type':(/\.(svg|ico)$/.test(url.pathname))?'image/svg+xml':url.pathname.endsWith('.js')?'application/javascript':url.pathname.endsWith('.css')?'text/css':'text/html','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(contents);
    } catch(error) { if(!res.headersSent)send(res,400,{error:'Unable to process request'});else res.end(); }
  });
  return {server,code,addresses};
}
if(require.main===module){const port=Number(process.argv[2] || process.env.PORT)||4187;const {server,code,addresses}=createServer({port});server.listen(port,'0.0.0.0',()=>{console.log(`BuildDay: http://localhost:${port}`);addresses.forEach(a=>console.log(`Phone: http://${a}:${port}`));console.log(`Pairing code: ${code}`);});}
module.exports={createServer};



