// Custom projects use the same milestones, task links, backups, and local sync.
function customProjectForm(id) {
  const project=state.projects.find(p=>p.id===id);
  if(id && !project?.custom)return;
  modal(`<h2>${project?'Edit practical project':'Add a practical project'}</h2>
    <p>Plan something you want to build. Your project starts at 0% with five weighted milestones.</p>
    <label>Project name<input name="title" maxlength="120" required value="${esc(project?.title||'')}" placeholder="For example: School attendance app"></label>
    <label>What will you build?<textarea name="description" maxlength="2000" required placeholder="Who is it for, and what problem will it solve?">${esc(project?.description||'')}</textarea></label>
    <label>Estimated duration<input name="duration" maxlength="60" placeholder="For example: 3 weeks" value="${esc(project?.duration||'')}"></label>
    ${projectMediaFields(project)}
    <label>Details / essential features<textarea name="details" maxlength="5000">${esc(project?.details||'')}</textarea></label>
    <label>Rules / constraints<textarea name="rules" maxlength="5000">${esc(project?.rules||'')}</textarea></label>
    <label>Goals / definition of done<textarea name="goals" maxlength="5000">${esc(project?.goals||'')}</textarea></label>
    <label><input type="checkbox" name="focus" ${project?.id===state.focus?'checked':''}> Make this my focus project</label>
    <p>Milestones: scope 10%, design 20%, core features 40%, testing 20%, publish 10%. Link daily tasks to this project using Add task.</p>
    ${actions(project?'Save details':'Create project')}`, fd=>{
      const title=String(fd.get('title')||'').trim(),description=String(fd.get('description')||'').trim();
      if(!title||!description)return toast('Enter a project name and description.');
      const media=readProjectMedia(fd);if(!media)return;
      const fields={title,description,duration:String(fd.get('duration')||'').trim()||'At your pace',details:String(fd.get('details')||'').trim(),rules:String(fd.get('rules')||'').trim(),goals:String(fd.get('goals')||'').trim()};
      let saved=project;
      Object.assign(fields,media);
      if(saved)Object.assign(saved,fields);
      else { const nextId=String(Math.max(12,...state.projects.map(p=>Number(p.id)||0))+1);saved={id:nextId,...fields,custom:true,milestones:[false,false,false,false,false]};state.projects.push(saved); }
      if(fd.has('focus'))state.focus=saved.id;
      save();$('#dialog').close();view='projects';location.hash='projects';render();toast(project?'Project details updated.':'Project added. Add daily tasks to start building.');
    });
}
const projectFormWithGuides=projectForm;
projectForm=function(id){
  projectFormWithGuides(id);
  const p=state.projects.find(p=>p.id===id);if(!p?.custom)return;
  const brief=document.createElement('section');brief.className='project-guide';
  brief.innerHTML=[['Details',p.details],['Rules',p.rules],['Goals',p.goals]].filter(([,value])=>value).map(([name,value])=>`<h3>${name}</h3><p style="white-space:pre-wrap">${esc(value)}</p>`).join('');
  document.querySelector('#form .track').insertAdjacentElement('afterend',brief);
};
document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if('newProject' in button.dataset)customProjectForm();
  if(button.dataset.projectMedia)projectMediaForm(button.dataset.projectMedia);
  if(button.dataset.editProject){$('#dialog').close();customProjectForm(button.dataset.editProject);}
});

function projectMediaFields(project){return `<label>Live website URL<input name="siteUrl" type="url" placeholder="https://your-project.com" value="${esc(project?.siteUrl||'')}"></label><label>Project image URL<input name="imageUrl" type="url" placeholder="https://example.com/screenshot.jpg" value="${esc(project?.imageUrl||'')}"></label><p>Use a direct image link for your screenshot or cover. Both fields are optional.</p>`;}
function readProjectMedia(fd){const siteUrl=String(fd.get('siteUrl')||'').trim(),imageUrl=String(fd.get('imageUrl')||'').trim();if((siteUrl&&!safeProjectUrl(siteUrl))||(imageUrl&&!safeProjectUrl(imageUrl))){toast('Use a full http:// or https:// URL.');return null;}return {siteUrl,imageUrl};}
function projectMediaForm(id){const p=state.projects.find(p=>p.id===id);if(!p)return;modal(`<h2>Project image & website</h2><p>${esc(p.title)}</p>${projectMediaFields(p)}${actions('Save image & link')}`,fd=>{const media=readProjectMedia(fd);if(!media)return;Object.assign(p,media);save();$('#dialog').close();render();toast('Project image and website updated.');});}
// Replace broken remote images with a readable placeholder, without inline handlers.
document.addEventListener('error',event=>{const img=event.target;if(img.matches?.('.project-cover img')){const message=document.createElement('span');message.textContent='Image unavailable — update the image link';img.replaceWith(message);}},true);
