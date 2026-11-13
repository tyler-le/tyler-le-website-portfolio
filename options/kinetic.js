(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [...document.querySelectorAll('.scroll-scene')];
  const nav = [...document.querySelectorAll('.site-header nav a')];
  const sections = nav.map(link => document.querySelector(link.getAttribute('href')));
  const clamp = value => Math.max(0, Math.min(1, value));
  let queued = false;
  function update() {
    queued = false;
    const height = window.innerHeight;
    root.style.setProperty('--scroll', clamp(window.scrollY / Math.max(1, root.scrollHeight - height)));
    if (!reduced.matches) scenes.forEach(scene => {
      const distance = Math.max(1, scene.offsetHeight - height);
      const amount = clamp(-scene.getBoundingClientRect().top / distance);
      root.style.setProperty(`--${scene.classList.contains('hero') ? 'hero' : scene.id}`, amount.toFixed(4));
    });
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top < height * .55) active = section; });
    nav.forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestUpdate() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  reduced.addEventListener('change', requestUpdate);
  document.querySelector('.hero').addEventListener('pointermove', event => {
    if (!reduced.matches && event.pointerType === 'mouse') root.style.setProperty('--px', ((event.clientX / innerWidth - .5) * 2).toFixed(3));
  });
  document.querySelector('.hero').addEventListener('pointerleave', () => root.style.setProperty('--px', 0));
  document.querySelectorAll('details[data-story]').forEach(details => {
    const key = details.dataset.story;
    const story = window.portfolioStories && window.portfolioStories[key];
    if (story && window.renderPortfolioStory) details.querySelector('.story-body').innerHTML = window.renderPortfolioStory(key);
    else details.querySelector('.story-body').innerHTML = '<p>Read more about this role in my resume.</p><a class="resume-link" href="../files/Tyler_Le_Resume.pdf" target="_blank" rel="noopener">Download resume (PDF) ↗</a>';
    details.addEventListener('toggle', requestUpdate);
  });
  update();
})();
