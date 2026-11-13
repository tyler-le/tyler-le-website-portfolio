(() => {
  const entries = [
    {key:'about',label:'About Tyler'},
    {key:'platforms',label:'Coursera · Platforms'},
    {key:'trust',label:'Coursera · Backend'},
    {key:'scale',label:'Amazon'},
    {key:'project',label:'Personal project'},
    {key:'journey',label:'Work history'},
    {key:'next',label:'Joining Google'},
    {key:'contact',label:'Contact'}
  ];
  const companions = {
    about: '<figure class="portrait-wrap"><img src="../images/about-image.jpg" alt="Tyler Le" width="500" height="600"><figcaption>Tyler Le<span>Software Engineer</span></figcaption></figure><div class="side-note"><p>Coursera, currently.<br>Google, December 2026.<small>Computer Science · UC San Diego</small></p></div>',
    platforms:'<div><p class="companion-title">Current role</p><h3 class="company-name">Coursera</h3><p class="company-role">Software Engineer<br>January 2026–present</p><div class="leaf-inset"><h3>Platform<br>engineering</h3><p>GraphQL APIs<br>Shared infrastructure<br>Developer experience</p></div></div><p class="companion-caption">See the resume for technical details.</p>',
    trust:'<div><p class="companion-title">Current role</p><h3 class="company-name">Coursera</h3><p class="company-role">Software Engineer<br>January 2026–present</p><div class="leaf-inset"><h3>Backend<br>services</h3><p>Subscriptions<br>Transactions<br>Distributed systems</p></div></div><p class="companion-caption">See the resume for technical details.</p>',
    scale:'<div><p class="companion-title">Previous role</p><h3 class="company-name">Amazon</h3><p class="company-role">Software Development Engineer<br>June 2024–January 2026</p><div class="leaf-inset"><h3>Distributed<br>systems</h3><p>Interactive video advertising<br>Product recommendation pipelines<br>Backend performance</p></div></div><p class="companion-caption">Also an engineering intern in summer 2023.</p>',
    project:'<div><p class="companion-title">Reddit Video Compilation Bot</p><ol class="project-path"><li>Reddit media<span>Source material</span></li><li>Video processing<span>Backend pipeline</span></li><li>Publishing<span>Compilation output</span></li></ol></div><p class="companion-caption">Personal project · Python</p>',
    journey:'<div><p class="companion-title">Education</p><h3 class="company-name">UC San<br>Diego</h3><p class="company-role">Computer Science</p><div class="leaf-inset"><h3>Teaching<br>experience</h3><p>Instructional Assistant, 2022–2023.<br>Data structures and algorithms.</p></div></div><p class="companion-caption">Full work history and details are in the resume.</p>',
    next:'<div><p class="companion-title">Incoming role</p><h3 class="company-name">Google</h3><p class="company-role">Software Engineer<br>Joining December 2026</p><div class="leaf-inset"><h3>AI<br>Observability</h3><p>Role begins December 2026.</p></div></div><p class="companion-caption">Currently a Software Engineer at Coursera.</p>',
    contact:'<div><p class="companion-title">Email</p><h3 class="company-name">Contact</h3><p class="contact-address"><a href="mailto:le.tyler.h@gmail.com">le.tyler.h@gmail.com</a></p><div class="leaf-inset"><h3>Elsewhere</h3><p><a href="https://github.com/tyler-le" target="_blank" rel="noopener">GitHub</a><br><a href="https://linkedin.com/in/le-tyler" target="_blank" rel="noopener">LinkedIn</a></p></div></div><p class="companion-caption">Resume available as a PDF.</p>'
  };
  const content = document.getElementById('story-content');
  const folio = document.getElementById('reading');
  let current = '';
  let turnTimer;
  function render(focus = false) {
    const key = location.hash.slice(1);
    const index = entries.findIndex(entry => entry.key === key);
    const position = index < 0 ? 0 : index;
    const entry = entries[position];
    if (current === entry.key) return;
    current = entry.key;
    content.innerHTML = window.renderPortfolioStory(entry.key);
    content.querySelector('.story-portrait')?.remove();
    const heading = content.querySelector('h2');
    heading.tabIndex = -1;
    document.getElementById('companion').innerHTML = companions[entry.key];
    document.getElementById('running-title').textContent = entry.label;
    document.getElementById('page-position').textContent = `Page ${position + 1} of ${entries.length}`;
    document.querySelectorAll('[data-entry]').forEach(link => {
      if (link.dataset.entry === entry.key) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    const previous = entries[(position - 1 + entries.length) % entries.length];
    const next = entries[(position + 1) % entries.length];
    document.getElementById('previous').href = `#${previous.key}`;
    document.getElementById('next').href = `#${next.key}`;
    document.getElementById('previous-label').textContent = previous.label;
    document.getElementById('next-label').textContent = next.label;
    document.title = `${entry.label} — Tyler Le’s portfolio`;
    clearTimeout(turnTimer);
    folio.classList.remove('is-turning');
    if (focus) {
      void folio.offsetWidth;
      folio.classList.add('is-turning');
      turnTimer = setTimeout(() => folio.classList.remove('is-turning'),450);
      heading.focus({preventScroll:true});
      if (matchMedia('(max-width:800px)').matches) folio.scrollIntoView({block:'start',behavior:'auto'});
      else window.scrollTo({top:0,behavior:'auto'});
    }
  }
  window.addEventListener('hashchange',() => render(true));
  render();
})();
