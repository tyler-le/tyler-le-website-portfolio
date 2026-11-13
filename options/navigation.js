const menu = document.querySelector('#nav-menu');
const toggle = document.querySelector('#hamburger');
function closeMenu(){menu.classList.remove('active');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.classList.toggle('active',open);toggle.classList.toggle('active',open)});
document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle.focus()}});
