(() => {
  const mount = () => {
    const gallery = document.querySelector('main .exhibition');
    if (!gallery || document.getElementById('clarity-showcase')) return;
    const features = [
      { name: 'Net worth', title: 'Net worth over time', copy: 'Track assets and money owed, review net worth history, and see what changed.', image: '../images/clarity-networth-demo.png', alt: 'Clarity Net Worth screen with demo account totals, a net worth history chart, and financial goals.' },
      { name: 'Cash flow', title: 'Income and spending', copy: 'Review income, spending categories, and transactions, with transfers and card payments handled separately.', image: '../images/clarity-cash-flow-demo.png', alt: 'Clarity Cash Flow screen showing demo income, spending, and transaction information.' },
      { name: 'Investments', title: 'Accounts and holdings', copy: 'View investment accounts, holdings, and allocation alongside the rest of your finances.', image: '../images/clarity-investments-demo.png', alt: 'Clarity Investments screen showing demo portfolio performance and investment holdings.' }
    ];
    gallery.insertAdjacentHTML('afterend', `
      <section class="clarity-showcase" id="clarity-showcase" aria-labelledby="clarity-title">
        <div class="clarity-showcase__inner">
          <div class="clarity-showcase__intro">
            <img class="clarity-showcase__icon" src="../images/clarity-icon.svg" width="64" height="64" alt="Clarity app icon">
            <h2 id="clarity-title">Clarity<br>Networth<span aria-hidden="true">.</span></h2>
            <p class="clarity-showcase__description">I built a personal finance app that brings net worth, cash flow, investments, and retirement planning together.</p>
            <a class="clarity-showcase__source" href="https://github.com/tyler-le/clarity-networth" target="_blank" rel="noopener">View on GitHub <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>
          </div>
          <div class="clarity-showcase__product">
            <div class="clarity-showcase__tabs" role="group" aria-label="Explore Clarity features">
              ${features.map((feature, i) => `<button type="button" aria-pressed="${i === 0}" aria-controls="clarity-feature-copy clarity-preview" data-clarity-feature="${i}">${feature.name}</button>`).join('')}
            </div>
            <div class="clarity-showcase__feature" id="clarity-feature-copy" aria-live="polite" aria-atomic="true"><h3>${features[0].title}</h3><p>${features[0].copy}</p></div>
            <figure class="clarity-showcase__capture">
              <div class="clarity-showcase__preview-meta"><span id="clarity-screen-name">Net worth</span><span>Demo data</span></div>
              <div class="clarity-showcase__screen" id="clarity-preview" tabindex="0" role="region" aria-label="Net worth product screenshot. Scroll to explore."><img src="${features[0].image}" alt="${features[0].alt}" width="1170" height="3795" loading="lazy" decoding="async"></div>
              <figcaption>Actual app capture <span>Scroll to explore the screen</span></figcaption>
            </figure>
          </div>
          <div class="clarity-showcase__foundation"><p>Connected and<br>manual accounts.</p><div><span>Plaid integration & manual accounts</span><span>Node.js / Express / PostgreSQL</span><span>Installable progressive web app</span></div></div>
        </div>
      </section>`);
    const section = document.getElementById('clarity-showcase');
    const screen = section.querySelector('.clarity-showcase__screen');
    const screenshot = screen.querySelector('img');
    let selection = 0;
    features.slice(1).forEach(feature => { const preload = new Image(); preload.src = feature.image; });
    section.querySelectorAll('[data-clarity-feature]').forEach(button => {
      button.addEventListener('click', () => {
        const next = Number(button.dataset.clarityFeature);
        if (next === selection) return;
        selection = next;
        const feature = features[next];
        section.querySelectorAll('[data-clarity-feature]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        section.querySelector('.clarity-showcase__feature h3').textContent = feature.title;
        section.querySelector('.clarity-showcase__feature p').textContent = feature.copy;
        section.querySelector('#clarity-screen-name').textContent = feature.name;
        screen.setAttribute('aria-label', `${feature.name} product screenshot. Scroll to explore.`);
        screenshot.src = feature.image;
        screenshot.alt = feature.alt;
        screenshot.height = [3795, 4380, 4986][next];
        screen.scrollTop = 0;
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
