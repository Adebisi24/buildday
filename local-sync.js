// Served only by server.cjs. The hosted website remains browser-local.
(() => {
  let token=sessionStorage.getItem('buildday-pair')||'', revision=0, pending=null, writing=false, blocked=false, ready=false;
  const originalSave=save;
  const badge=document.querySelector('.saved');
  const localSettings=document.createElement('button');
  localSettings.className='icon-button';localSettings.textContent='⚙';localSettings.setAttribute('aria-label','Workspace settings');
  localSettings.onclick=()=>{settings();const paragraphs=document.querySelectorAll('#form p');paragraphs[0].textContent='Your workspace is saved on your computer and shared with paired devices. Export regularly to keep a backup.';};
  document.querySelector('.header-actions').append(localSettings);
  const status=text=>{badge.textContent=text;};
  const gate=document.createElement('div');
  gate.style.cssText='position:fixed;inset:0;background:#111115f5;z-index:100;display:grid;place-items:center;padding:24px';
  gate.innerHTML='<form style="max-width:390px;width:100%"><div class="eyebrow">BUILDDAY · LOCAL WORKSPACE</div><h1>Pair this device.</h1><p class="muted">Enter the pairing code from your computer. Both devices must use the same Wi-Fi.</p><label>Pairing code<input name="code" autocomplete="off" required></label><button class="primary" style="margin-top:20px">Connect to my workspace</button><p class="muted" role="status" id="pair-message"></p></form>';
  document.body.append(gate);
  const message=gate.querySelector('#pair-message');
  async function api(method, data){const r=await fetch('/api/state',{method,headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});if(!r.ok){const e=Error((await r.json()).error);e.status=r.status;throw e;}return r.json();}
  function localBackup(){try{localStorage.setItem('buildday-unsynced-backup',JSON.stringify(state));}catch{}}
  async function flush(){if(writing||!pending||blocked||!ready)return;writing=true;const snapshot=pending;pending=null;status('Saving to your computer…');try{const result=await api('PUT',{revision,state:snapshot});revision=result.revision;status('Synced with your computer');}catch(e){pending=pending||snapshot;blocked=true;localBackup();status('Not synced — export a backup');toast(e.status===409?'Another device saved changes. Export your changes, then reload to load the latest workspace.':'Connection lost. Export a backup before reloading, then reconnect to your computer.');}finally{writing=false;if(pending&&!blocked)flush();}}
  save=function(){if(!ready)return false;const ok=originalSave();pending=JSON.parse(JSON.stringify(state));flush();return ok;};
  async function connect(){status('Connecting…');const result=await api('GET');revision=result.revision;if(result.state){validate(result.state);state=result.state;originalSave();}else{state=fresh();const first=await api('PUT',{revision,state});revision=first.revision;originalSave();}ready=true;blocked=false;gate.remove();render();status('Synced with your computer');}
  gate.querySelector('form').onsubmit=async event=>{event.preventDefault();message.textContent='Connecting…';try{const r=await fetch('/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:new FormData(event.target).get('code').trim()})});const data=await r.json();if(!r.ok)throw Error(data.error);token=data.token;sessionStorage.setItem('buildday-pair',token);await connect();}catch(e){message.textContent=e.message;}};
  if(token)connect().catch(()=>{status('Pair this device');message.textContent='Enter your code to reconnect.';});
  setInterval(async()=>{if(!ready||writing||pending||blocked||document.querySelector('dialog[open]'))return;try{const result=await api('GET');if(result.revision!==revision){validate(result.state);revision=result.revision;state=result.state;originalSave();render();}status('Synced with your computer');}catch{status('Computer unreachable');}},5000);
  window.addEventListener('beforeunload',e=>{if(pending||writing){e.preventDefault();e.returnValue='';}});
})();
