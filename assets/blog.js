/* Vision Clipping — blog language dropdown + first-visit language banner.
   Data-driven: reads the page's own <link rel="alternate" hreflang> tags. */
(function () {
  var LN = { en: 'English', nl: 'Nederlands', fr: 'Français', tr: 'Türkçe' };
  var LB = {
    nl: 'Bekijk deze pagina in het Nederlands', fr: 'Voir cette page en français',
    tr: 'Bu sayfayı Türkçe görüntüle', en: 'View this page in English'
  };
  var cur = (document.documentElement.lang || 'en').slice(0, 2);
  var alts = {};
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (l) {
    var h = l.getAttribute('hreflang');
    if (h && h !== 'x-default') alts[h] = l.getAttribute('href').replace(/^https?:\/\/[^/]+/, '');
  });

  var dd = document.querySelector('.langdd');
  if (dd && Object.keys(alts).length > 1) {
    var order = ['en', 'nl', 'fr', 'tr'].filter(function (l) { return alts[l]; });
    var items = order.map(function (l) {
      return '<a href="' + alts[l] + '"' + (l === cur ? ' class="on"' : '') + '>' + (LN[l] || l) + '</a>';
    }).join('');
    var globe = '<svg class="gl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9s1.3-6.6 3.8-9z"/></svg>';
    var chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
    dd.innerHTML = '<button class="langdd-btn" aria-haspopup="true" aria-expanded="false">' + globe +
      '<span>' + (LN[cur] || cur) + '</span>' + chev + '</button><div class="langdd-menu" role="menu">' + items + '</div>';
    var btn = dd.querySelector('.langdd-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function () { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dd.classList.remove('open'); });
  }

  try {
    if (!localStorage.getItem('vc_lang_dismiss')) {
      var pref = (navigator.language || 'en').slice(0, 2);
      if (pref !== cur && alts[pref]) {
        var b = document.createElement('div');
        b.id = 'vcbanner';
        b.innerHTML = '<span>' + (LB[pref] || '') + '</span> <a href="' + alts[pref] + '">' + (LN[pref] || pref) + ' &rarr;</a>';
        var x = document.createElement('button');
        x.setAttribute('aria-label', 'Dismiss');
        x.textContent = '✕';
        x.onclick = function () { b.style.display = 'none'; localStorage.setItem('vc_lang_dismiss', '1'); };
        b.appendChild(x);
        document.body.appendChild(b);
        b.style.display = 'flex';
      }
    }
  } catch (e) {}
})();
