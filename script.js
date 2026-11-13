(() => {
  const roles = [
    {company:'Google', title:'Google', role:'Software Engineer · AI Observability', date:'Dec 2026 – Present', short:'Dec 2026 – Present', description:'Understanding how AI systems behave.', key:'next', color:'#f7f8fa', accent:'#b4c8ff', ink:'#24282e', ambient:'#151820', brand:'google'},
    {company:'Coursera', title:'Coursera', role:'Software Engineer', date:'Jan 2026 – Dec 2026', short:'Jan 2026 – Dec 2026', description:'Subscriptions. Coupons. Commerce.', key:'platforms', color:'#0056d2', accent:'#a6caff', ink:'#ffffff', ambient:'#10182a', brand:'coursera'},
    {company:'Amazon', title:'Amazon', role:'Software Development Engineer', date:'Jun 2024 – Jan 2026', short:'Jun 2024 – Jan 2026', description:'Video advertising. Data at scale.', key:'scale', color:'#232f3e', accent:'#ffad42', ink:'#ffffff', ambient:'#131820', brand:'amazon'},
    {company:'Internships', title:'Internships', role:'Software engineering', date:'Jun 2021 – Sep 2023', short:'Amazon · GA · Cardea', description:'Smart homes. Aircraft. Lab instruments.', key:'internships', color:'#d2cdc3', accent:'#d2cdc3', ink:'#32312d', ambient:'#1a1917', brand:'internships'},
    {company:'UC San Diego', title:'Computer Science', role:'Education', date:'Sep 2021 – Dec 2023', short:'Education', description:'B.S. at UC San Diego.', key:'education', color:'#182b49', accent:'#ffcd00', ink:'#ffffff', ambient:'#111925', brand:'ucsd'},
    {company:'Clarity Networth', title:'Clarity Networth', role:'Personal project', date:'', short:'Personal project', description:'Net worth. Cash flow. One place.', key:'project', color:'#d5e6c6', accent:'#badb9f', ink:'#294c27', ambient:'#151d13', image:'images/clarity-networth-demo.png', brand:'clarity'}
  ];
  const world=document.querySelector('#gallery-world'), viewport=document.querySelector('#gallery-viewport'), index=document.querySelector('#experience-index'), camera=document.querySelector('#gallery-camera');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=0, down=null, pointerFrame=0, pendingX=0, pendingY=0;
  roles.forEach((role,i)=>{
    const panel=document.createElement('article');
    panel.className='experience-panel'+(role.image?' project-panel':'')+(role.profile?' profile-panel':'');panel.style.setProperty('--tile',role.color);panel.style.setProperty('--tile-ink',role.ink);panel.style.setProperty('--brand-accent',role.accent);panel.dataset.index=i;panel.dataset.brand=role.brand;panel.dataset.flipped='false';panel.setAttribute('aria-label',`${role.company}, ${role.role}, ${role.date}`);
    const title=role.title;
    const logos={google:'google-logo.png',coursera:'coursera-logo-white.svg',amazon:'amazon-logo.png',ucsd:'ucsd-logo-white.svg'};
    const logo=logos[role.brand]?`<img class="company-logo company-logo-${role.brand}" src="images/${logos[role.brand]}" alt="${role.company} logo">`:role.brand==='internships'?'<div class="internship-marks" aria-label="Amazon, General Atomics, Cardea Bio"><img src="images/amazon-logo.png" alt="Amazon"><img src="images/general-atomics-logo.svg" alt="General Atomics"><span>Cardea Bio</span></div>':'';
    const preview=logos[role.brand]?`<img class="preview-logo preview-logo-${role.brand}" src="images/${logos[role.brand]}" alt="${role.company}">`:role.profile?'<img class="preview-avatar" src="images/about-image.jpg" alt="Tyler Le">':role.key==='project'?'<img class="preview-icon" src="images/clarity-icon.svg" alt="Clarity">':'<span>Internships</span>';
    panel.dataset.storyKey=role.key;
    panel.innerHTML=`<div class="panel-flipper"><i class="card-edge card-edge-right" aria-hidden="true"></i><i class="card-edge card-edge-left" aria-hidden="true"></i><i class="card-edge card-edge-bottom" aria-hidden="true"></i><i class="card-edge card-edge-top" aria-hidden="true"></i><div class="panel-face panel-front panel-content"><div class="panel-meta"><span>${role.role}</span><span>${role.date}</span></div><h2 class="panel-title">${title}</h2><p class="panel-description">${role.description}</p><button class="panel-flip" type="button" aria-label="Flip ${role.company} card to read its overview"><span class="flip-desktop">${role.profile?'About me':'Click to flip'}</span><span class="flip-touch">${role.profile?'About me':'Tap to flip'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9a7 7 0 1 0 0 7M19 4v5h-5"/></svg></button>${role.image?`<figure class="project-preview"><img src="${role.image}" alt="Clarity Networth dashboard showing sanitized demo accounts and net worth"><figcaption>Demo data</figcaption></figure><div class="project-tabs" role="group" aria-label="Clarity product preview"><button type="button" data-preview="networth" aria-pressed="true">Net worth</button><button type="button" data-preview="cashflow" aria-pressed="false">Cash flow</button><button type="button" data-preview="investments" aria-pressed="false">Investments</button></div>`:logo}${role.profile?'<img class="profile-photo" src="images/about-image.jpg" alt="Tyler Le"><button class="profile-project" type="button" data-card-project>View personal project ↗</button>':''}<div class="preview-brand" aria-hidden="true">${preview}</div>${role.brand==='clarity'?'<img class="clarity-brand-icon" src="images/clarity-icon.svg" alt="">':''}</div><div class="panel-face panel-back panel-content" aria-hidden="true"><div class="back-heading"><h2>${role.company}</h2><button class="flip-back" type="button" aria-label="Flip ${role.company} card back to front">Flip back <span aria-hidden="true">↶</span></button></div><p class="back-role">${role.role}</p><div class="back-overview">${cardBackMarkup(role.key)}</div><a class="back-resume" href="files/Tyler_Le_Resume.pdf" target="_blank" rel="noopener">Resume <span aria-hidden="true">↗</span></a></div></div>`;
    panel.addEventListener('click',e=>{
      if(viewport.dataset.dragged==='true')return;
      if(active!==i){select(i);return;}
      if(e.target.closest('[data-card-project]')){select(roles.findIndex(item=>item.key==='project'));return;}
      if(e.target.closest('[data-preview]')){const button=e.target.closest('[data-preview]');const files={networth:'clarity-networth-demo.png',cashflow:'clarity-cash-flow-demo.png',investments:'clarity-investments-demo.png'};panel.querySelector('.project-preview img').src='images/'+files[button.dataset.preview];panel.querySelector('.project-preview img').alt='Clarity '+button.textContent+' screen using demo data';panel.querySelectorAll('[data-preview]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));return;}
      if(e.target.closest('.flip-back')){flip(panel,false,e.detail===0);return;}
      if((!e.target.closest('a,button')&&!window.getSelection()?.toString())||e.target.closest('.panel-flip'))flip(panel,panel.dataset.flipped!=='true',e.detail===0||!!e.target.closest('button'));
    });
    world.append(panel);setBackLink(panel,role.key);
    const button=document.createElement('button');button.className='index-item';button.type='button';button.dataset.role=i;button.innerHTML=`<strong>${role.key==='project'?'Personal Project':role.company}</strong><span>${role.short}</span>`;button.addEventListener('click',()=>select(i));index.append(button);
  });
  const panels=[...world.children], buttons=[...index.children];
  const picker=document.querySelector('#experience-picker');roles.forEach((role,i)=>{const option=document.createElement('option');option.value=i;option.textContent=role.key==='project'?'Personal Project':role.company;picker.append(option)});picker.addEventListener('change',()=>select(Number(picker.value)));
  function flip(panel,flipped,moveFocus=false){
    if(!flipped)restoreBack(panel);
    panel.dataset.flipped=String(flipped);
    const isActive=panel.dataset.active==='true';
    panel.querySelector('.panel-front').setAttribute('aria-hidden',String(flipped||!isActive));
    panel.querySelector('.panel-back').setAttribute('aria-hidden',String(!flipped||!isActive));
    panel.querySelector('.panel-flip').tabIndex=isActive&&!flipped?0:-1;
    panel.querySelector('.flip-back').tabIndex=isActive&&flipped?0:-1;
    panel.querySelectorAll('.panel-front [data-preview],.panel-front [data-card-project]').forEach(button=>button.tabIndex=isActive&&!flipped?0:-1);
    panel.querySelectorAll('.panel-back a').forEach(link=>link.tabIndex=isActive&&flipped?0:-1);
    panel.querySelector('.back-overview').tabIndex=isActive&&flipped?0:-1;
    if(moveFocus)panel.querySelector(flipped?'.flip-back':'.panel-flip').focus({preventScroll:true});
  }
  function cardBackMarkup(key){
    const copy={
      next:['AI observability and data pipelines.','A focus on collecting and interpreting signals that help teams understand AI system behavior.'],
      platforms:['Built backend services for subscriptions and coupons, coordinating reservations, purchases, and fulfillment.','Focused on consistent state, safe retries, account provisioning, and entitlements across services.'],
      scale:['Built backend systems for interactive video advertising, from ad creation to serving.','Built Kotlin and Kinesis pipelines for product recommendations, and worked on caching and data-processing reliability.'],
      education:['B.S. in Computer Science, graduating in December 2023 with a 3.93 GPA.','Also worked as an Instructional Assistant, helping students with data structures and algorithms in C++.'],
      project:['A personal finance app for tracking net worth, cash flow, investments, and retirement goals.','Combines connected and manual accounts in a responsive web app, with an overview first and details on demand.'],
      about:['I’m a Software Engineer at Google in AI Observability. Previously, I worked on backend systems at Coursera and Amazon.','B.S. in Computer Science from UC San Diego. I also build Clarity Networth.'],
      contact:['You can reach me by email, or find me on GitHub and LinkedIn.']
    };
    if(key==='internships')return '<div class="internship-summary"><p><strong>Amazon</strong><time>Jun 2023 – Sep 2023</time><span>Backend services for Alexa notifications.</span></p><p><strong>General Atomics</strong><time>Jun 2022 – Aug 2022</time><span>Flight-control software in C and C++.</span></p><p><strong>Cardea Bio</strong><time>Jun 2021 – Sep 2021</time><span>Backend software for robotic lab instruments.</span></p></div>';
    const image=key==='about'?'<img class="story-portrait" src="images/about-image.jpg" alt="Tyler Le">':'';
    const links=key==='contact'?'<div class="story-contact"><a href="mailto:le.tyler.h@gmail.com">Email ↗</a><a href="https://github.com/tyler-le" target="_blank" rel="noopener">GitHub ↗</a><a href="https://linkedin.com/in/le-tyler" target="_blank" rel="noopener">LinkedIn ↗</a></div>':'';
    return image+'<div class="card-summary">'+(copy[key]||[]).map(text=>`<p>${text}</p>`).join('')+'</div>'+links;
  }
  function setBackLink(panel,key){const link=panel.querySelector('.back-resume');if(key==='project'){link.href='https://github.com/tyler-le/clarity-networth';link.target='_blank';link.innerHTML='View on GitHub <span aria-hidden="true">↗</span>';}else{link.href='files/Tyler_Le_Resume.pdf';link.target='_blank';link.innerHTML='Resume <span aria-hidden="true">↗</span>';}}
  function restoreBack(panel){
    const role=roles[Number(panel.dataset.index)];
    panel.dataset.storyKey=role.key;delete panel.dataset.customStory;setBackLink(panel,role.key);
    panel.querySelector('.back-heading h2').textContent=role.company;
    panel.querySelector('.back-role').textContent=role.role;
    panel.querySelector('.back-overview').innerHTML=cardBackMarkup(role.key);
    panel.querySelector('.back-overview').scrollTop=0;
  }
  function showStory(key){
    if(active!==0)select(0);
    const panel=panels[active], story={about:{subtitle:'Tyler Le · Software Engineer'},contact:{subtitle:'Email, GitHub, and LinkedIn'}}[key];
    if(!story)return;
    panel.dataset.storyKey=key;panel.dataset.customStory=key;setBackLink(panel,key);
    panel.querySelector('.back-heading h2').textContent=key==='about'?'About me':'Contact';
    panel.querySelector('.back-role').textContent=story.subtitle;
    const overview=panel.querySelector('.back-overview');overview.innerHTML=cardBackMarkup(key);overview.scrollTop=0;
    flip(panel,true,true);
  }
  function select(next){
    active=Math.max(0,Math.min(roles.length-1,next));const role=roles[active];
    viewport.closest('.exhibition').dataset.intro=String(active===0);
    document.querySelector('.portfolio-intro').inert=active!==0;
    document.documentElement.style.setProperty('--accent',role.accent);document.documentElement.style.setProperty('--bg',role.ambient);
    const width=viewport.clientWidth;viewport.style.setProperty('--card-width',`${width<520?width*.83:Math.min(width*.64,1160)}px`);const spacing=width<520?width*.59:width<800?width*.65:Math.min(width*.49,900);
    panels.forEach((panel,i)=>{const offset=i-active;const distance=Math.abs(offset);panel.style.transform=`translate3d(${offset*spacing}px,${distance*18}px,${distance===0?65:-distance*(width<520?320:520)}px) rotateY(${offset===0?-6:offset>0?-38:38}deg)`;panel.style.opacity='1';panel.style.visibility=distance>2?'hidden':'visible';panel.style.pointerEvents=distance>2?'none':'auto';panel.dataset.active=String(i===active);panel.dataset.side=i>active?'next':'previous';panel.setAttribute('aria-hidden',String(i!==active));flip(panel,false,false);});
    buttons.forEach((button,i)=>button.setAttribute('aria-current',String(i===active)));
    document.querySelector('#previous-role').disabled=active===0;document.querySelector('#next-role').disabled=active===roles.length-1;
    picker.value=String(active);document.querySelector('#position').textContent=`${active+1} / ${roles.length}`;document.querySelector('#stage-context').textContent=`${role.company} · ${role.role}`;
    const target=buttons[active];if(target.offsetLeft<index.scrollLeft||target.offsetLeft+target.offsetWidth>index.scrollLeft+index.clientWidth)index.scrollTo({left:Math.max(0,target.offsetLeft-index.clientWidth/2+target.offsetWidth/2),behavior:reduced.matches?'auto':'smooth'});
  }
  document.querySelector('#previous-role').addEventListener('click',()=>select(active-1));document.querySelector('#next-role').addEventListener('click',()=>select(active+1));
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')||e.altKey||e.metaKey||e.ctrlKey)return;if(e.key==='Escape'&&panels[active].dataset.flipped==='true'){flip(panels[active],false,true);return;}if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1));}if(e.key==='Home'&&document.activeElement===viewport){e.preventDefault();select(0);}if(e.key==='End'&&document.activeElement===viewport){e.preventDefault();select(roles.length-1);}});
  document.querySelectorAll('[data-gallery-story]').forEach(button=>button.addEventListener('click',()=>select(roles.findIndex(role=>role.key===button.dataset.galleryStory))));
  document.querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>showStory(button.dataset.story)));
  viewport.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('.gallery-dock,a,button,.panel-back'))return;down={x:e.clientX,y:e.clientY};viewport.dataset.dragged='false';});
  viewport.addEventListener('pointermove',e=>{
    const bounds=viewport.getBoundingClientRect();pendingX=(e.clientX-bounds.left)/bounds.width-.5;pendingY=(e.clientY-bounds.top)/bounds.height-.5;
    if(down&&Math.abs(e.clientX-down.x)>12)viewport.dataset.dragged='true';
    if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!reduced.matches)camera.style.transform=`translate3d(${pendingX*22}px,${pendingY*-10}px,10px) rotateY(${pendingX*8}deg) rotateX(${-pendingY*5}deg)`;});
  });
  window.addEventListener('pointerup',e=>{if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;down=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.25)select(active+(dx<0?1:-1));setTimeout(()=>viewport.dataset.dragged='false',0);});
  viewport.addEventListener('pointercancel',()=>{down=null;viewport.dataset.dragged='false';});viewport.addEventListener('pointerleave',()=>{camera.style.transform='';});
  let resizeFrame;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>select(active));});
  // CSS3D painted faces do not have consistent hit regions in every browser.
  // Resolve clicks on exposed neighbors from their projected screen bounds.
  viewport.addEventListener('click',event=>{
    if(event.target.closest('.experience-panel,.gallery-dock')||viewport.dataset.dragged==='true')return;
    const candidates=panels.map((panel,i)=>({panel,i,distance:Math.abs(i-active)})).filter(item=>item.i!==active&&item.distance<=2).sort((a,b)=>a.distance-b.distance);
    for(const item of candidates){const box=item.panel.getBoundingClientRect();if(event.clientX>=box.left&&event.clientX<=box.right&&event.clientY>=box.top&&event.clientY<=box.bottom){select(item.i);break;}}
  });
  const lightRoot=document.documentElement;
  let lightFrame;
  window.addEventListener('pointermove',event=>{cancelAnimationFrame(lightFrame);const x=event.clientX,y=event.clientY;lightFrame=requestAnimationFrame(()=>{lightRoot.style.setProperty('--light-x',`${x}px`);lightRoot.style.setProperty('--light-y',`${y}px`);lightRoot.style.setProperty('--light-presence','1')})},{passive:true});
  document.addEventListener('mouseleave',()=>lightRoot.style.setProperty('--light-presence','0'));
  window.addEventListener('blur',()=>lightRoot.style.setProperty('--light-presence','0'));
  select(0);
})();
