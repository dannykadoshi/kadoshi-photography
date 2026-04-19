/* ============================================================
   KADOSHI PHOTOGRAPHY — Main JS
   ============================================================ */

'use strict';

// --- Theme Toggle (syncs desktop + mobile buttons) ---
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const body = document.body;
  const KEY  = 'kadoshi-theme';

  function apply(theme) {
    if (theme === 'light') body.classList.add('light');
    else body.classList.remove('light');
  }

  apply(localStorage.getItem(KEY) || 'dark');

  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      localStorage.setItem(KEY, isLight ? 'light' : 'dark');
    });
  }
})();

// --- Custom Cursor ---
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0,  ringY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .gallery-item, .filter-btn, .service-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();


// --- Navbar: scroll behaviour + mobile toggle ---
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = links.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


// --- Scroll Reveal ---
(function initReveal() {
  const selectors = '.reveal-up, .reveal-left, .reveal-right, .reveal-item';
  const items = document.querySelectorAll(selectors);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || el.dataset.index * 80 || 0, 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));

  // Hero reveals on load
  document.querySelectorAll('.hero .reveal-up').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('revealed'), delay);
  });
})();


// --- Animated Counters ---
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1800;
      const start  = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target + (el.dataset.target === '100' ? '%' : '+');
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();


// --- Gallery Filter ---
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach((item, i) => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.classList.remove('hidden');
          item.style.transitionDelay = (i * 40) + 'ms';
          setTimeout(() => item.classList.add('revealed'), 10);
        } else {
          item.classList.add('hidden');
          item.classList.remove('revealed');
          item.style.transitionDelay = '0ms';
        }
      });
    });
  });
})();


// --- Lightbox ---
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const content  = document.getElementById('lightboxContent');
  const info     = document.getElementById('lightboxInfo');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn  = document.getElementById('lightboxPrev');
  const nextBtn  = document.getElementById('lightboxNext');

  let items   = [];
  let current = 0;

  function getVisibleItems() {
    return [...document.querySelectorAll('.gallery-item:not(.hidden)')];
  }

  function open(index) {
    items = getVisibleItems();
    current = index;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function render() {
    const item = items[current];
    if (!item) return;

    const img  = item.querySelector('img');
    const cat  = item.querySelector('.gallery-cat')?.textContent  || '';
    const name = item.querySelector('.gallery-name')?.textContent || '';

    content.innerHTML = '';
    info.innerHTML    = '';

    if (img) {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt;
      clone.className = 'lightbox-img';
      content.appendChild(clone);
    }

    const story = item.dataset.story || '';
    info.innerHTML = `
      <p class="gallery-cat">${cat}</p>
      <h3 class="gallery-name">${name}</h3>
      ${story ? `<p class="gallery-story">${story}</p>` : ''}
    `;

    prevBtn.style.display = items.length > 1 ? '' : 'none';
    nextBtn.style.display = items.length > 1 ? '' : 'none';
  }

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      const idx = visible.indexOf(item);
      if (idx >= 0) open(idx);
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    render();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    render();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  { current = (current - 1 + items.length) % items.length; render(); }
    if (e.key === 'ArrowRight') { current = (current + 1) % items.length; render(); }
  });
})();


// --- Contact Form (Formspree) ---
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // If no real Formspree ID yet, show a demo success message instead of 404ing
  const action = form.getAttribute('action') || '';
  const isDemo = action.includes('YOUR_FORM_ID');

  form.addEventListener('submit', async e => {
    if (isDemo) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.style.background = '#4caf50';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
      return;
    }

    // Real Formspree submission
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#4caf50';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Error — try again';
        btn.style.background = '#e53935';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.style.background = '#e53935';
      btn.disabled = false;
    }
  });
})();


// --- Scroll to Top ---
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// --- Service Worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/kadoshi-photography/sw.js');
  });
}


// --- Smooth anchor scroll with offset ---
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
