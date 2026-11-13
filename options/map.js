(() => {
  const locations = {
    about: {story:'about', label:'Meet Tyler', next:'coursera', nextLabel:'Read about Coursera'},
    amazon: {story:'scale', label:'Amazon · Jun 2024–Jan 2026', next:'coursera', nextLabel:'Read about Coursera'},
    coursera: {story:'platforms', label:'Coursera · Jan 2026–Present', next:'google', nextLabel:'View incoming Google role'},
    'coursera-services': {story:'trust', label:'Coursera · Jan 2026–Present', next:'google', nextLabel:'View incoming Google role'},
    google: {story:'next', label:'Google · Joining December 2026', next:'project', nextLabel:'View the personal project'},
    project: {story:'project', label:'Personal project', next:'contact', nextLabel:'Contact Tyler'},
    contact: {story:'contact', label:'Contact', next:'about', nextLabel:'About Tyler'}
  };
  const content = document.getElementById('story-content');
  const reader = document.getElementById('story');
  const nodes = [...document.querySelectorAll('[data-story]')];
  const switcher = document.getElementById('story-switcher');
  function showStory() {
    const hash = location.hash.slice(1);
    if(hash === 'map-top' || hash === 'story') return;
    const key = Object.hasOwn(locations, hash) ? hash : 'about';
    const selected = locations[key];
    content.innerHTML = window.renderPortfolioStory(selected.story);
    document.getElementById('location-label').textContent = selected.label;
    const nodeKey = key === 'coursera-services' ? 'coursera' : key;
    nodes.forEach(node => {
      if(node.dataset.story === nodeKey) node.setAttribute('aria-current','page');
      else node.removeAttribute('aria-current');
    });
    switcher.hidden = nodeKey !== 'coursera';
    switcher.querySelectorAll('a').forEach(link => {
      if(link.dataset.detail === selected.story) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    const next = document.getElementById('continue-link');
    next.href = '#' + selected.next;
    next.innerHTML = selected.nextLabel + ' <span aria-hidden="true">→</span>';
    const connection = document.querySelector('.selected-connection');
    const paths = {
      amazon:'M360 335 Q220 330 140 220',
      coursera:'M360 335 Q505 313 560 175',
      google:'M560 175 C680 172 739 255 670 340',
      project:'M360 335 Q455 470 570 500',
      contact:'M360 335 Q220 440 245 545'
    };
    connection.style.opacity = paths[nodeKey] ? '1' : '0';
    if(paths[nodeKey]) connection.setAttribute('d',paths[nodeKey]);
    content.classList.remove('story-enter');
    void content.offsetWidth;
    content.classList.add('story-enter');
    document.title = selected.label + ' — Tyler Le';
  }
  // On small screens, choosing a destination brings its story into reading range.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if(!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const key = link.getAttribute('href').slice(1);
    if(!Object.hasOwn(locations,key)) return;
    const same = location.hash === '#' + key;
    if(same) showStory();
    if(matchMedia('(max-width:760px)').matches) {
      requestAnimationFrame(() => {
        reader.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
        reader.focus({preventScroll:true});
      });
    }
  });
  window.addEventListener('hashchange',showStory);
  showStory();
})();
