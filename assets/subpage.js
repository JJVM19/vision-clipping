/* Vision Clipping — shared subpage nav drawer (mobile). Uses absolute /-rooted paths so it works from /book/ and /cases/*.html alike. */
(() => {
  const navInner = document.querySelector('.nav-inner');
  if(!navInner) return;

  const burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.id = 'nav-burger';
  burger.setAttribute('aria-label','Open menu');
  burger.setAttribute('aria-expanded','false');
  burger.setAttribute('aria-controls','nav-drawer');
  burger.innerHTML = '<span></span><span></span><span></span>';
  navInner.appendChild(burger);

  const drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  drawer.id = 'nav-drawer';
  drawer.setAttribute('aria-hidden','true');
  drawer.innerHTML = `
    <div class="nav-drawer-backdrop" data-close></div>
    <div class="nav-drawer-panel" role="dialog" aria-label="Menu">
      <button class="nav-drawer-close" data-close aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <a class="nav-drawer-logo" href="/#Home"><img src="/assets/wordmark-dark.png" alt="Vision Clipping"></a>
      <nav class="nav-drawer-links">
        <a href="/#cases">Cases</a>
        <a href="/#process">Process</a>
        <a href="/#founders">Founders</a>
        <a href="/#why">Why Us</a>
        <a href="/#scale">How We Scale</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#calc">Calculator</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <a class="nav-drawer-cta" href="/book/">
        Book your strategy call
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h8M8 4l3 3-3 3"/></svg>
      </a>
    </div>
  `;
  document.body.appendChild(drawer);

  const open = () => {
    drawer.classList.add('open');
    document.body.classList.add('drawer-open');
    burger.setAttribute('aria-expanded','true');
    drawer.setAttribute('aria-hidden','false');
  };
  const close = () => {
    drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
    burger.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
  };
  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  drawer.addEventListener('click', e => { if(e.target.closest('[data-close]') || e.target.matches('a[href]')) close(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && drawer.classList.contains('open')) close(); });
})();
