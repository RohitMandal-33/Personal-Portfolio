/* =============================================
   ROHIT MANDAL — PORTFOLIO
   app.js v3.0 — now with icons + interactions
   ============================================= */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────────────────────
     ICON LIBRARY — small inline SVGs, matched
     to tech names so tags render with an icon
     without hand-editing 40+ HTML spans.
  ────────────────────────────────────────── */
  const ICONS = {
    // languages
    kotlin: '<path d="m3 3 18 18M3 21 21 3"/>',
    dart: '<path d="M12 2 2 12l10 10 10-10z"/>',
    javascript: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 16v-6M15 16v-3a2 2 0 0 0-4 0"/>',
    python: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 15h.01"/>',
    // mobile
    'jetpack compose': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
    mvvm: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'android jetpack': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
    kmp: '<path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>',
    'android sdk': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
    flutter: '<path d="M12 2 2 12l10 10 10-10z"/>',
    // web
    'react.js': '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    'node.js': '<path d="M12 2 3 7v10l9 5 9-5V7z"/>',
    'rest apis': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    'html5 / css3': '<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>',
    'tailwind css': '<path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C16.62 7.15 15.49 6 12 6z"/><path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-1-2.11-2.15-4.6-2.15z"/>',
    'material ui': '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    // databases
    mysql: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    postgresql: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    mongodb: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    firebase: '<path d="m5 18 4-16 3 9 2-3 5 10z"/>',
    sqlite: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    room: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    // tools
    'git / github': '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M6 8.5v7M8.5 6H16a2 2 0 0 1 2 2v7.5"/>',
    'android studio': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
    postman: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2z"/>',
    docker: '<rect x="2" y="10" width="4" height="4"/><rect x="7" y="10" width="4" height="4"/><rect x="12" y="10" width="4" height="4"/><rect x="7" y="5" width="4" height="4"/><path d="M2 14c0 4 4 7 10 7s9-3 10-9c-2 1-4 1-5-1-1 2-3 2-4 1-2 2-6 2-11 2z"/>',
    jira: '<path d="M12 2 3 11l9 9 9-9z"/>',
    'vs code': '<path d="m17 3 4 3v12l-4 3-9-7 9-7Z"/><path d="m3 8 6-2 8 6-8 6-6-2v-2l4-2-4-2z"/>',
    // project stacks (extra terms)
    websockets: '<path d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0"/><circle cx="12" cy="12" r="1"/>',
    syncfusion: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    'mern stack': '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    stripe: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    jwt: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    flask: '<path d="M9 2h6M10 2v6l-6 12a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-12V2"/>',
    'alpha vantage': '<path d="M3 17l6-6 4 4 8-8"/>',
    tensorflow: '<path d="M12 2v20M6 6l12 4M6 14l12 4M2 10l4-2v8l-4-2z"/>',
    resnet50: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h8M6 8v8M18 8v8M8 18h8"/>',
    gradio: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    nltk: '<path d="M4 4h16v16H4zM8 8h8v8H8z"/>',
    'scikit-learn': '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',
  };

  const DEFAULT_ICON = '<circle cx="12" cy="12" r="9"/>';

  function iconSvg(name) {
    const key = name.trim().toLowerCase();
    const inner = ICONS[key] || DEFAULT_ICON;
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  }

  function injectTagIcons() {
    document.querySelectorAll('.stack-tag, .skill-tag').forEach(el => {
      if (el.dataset.iconed) return;
      const text = el.textContent.trim();
      el.innerHTML = iconSvg(text) + '<span>' + text + '</span>';
      el.dataset.iconed = 'true';
    });
  }

  /* ──────────────────────────────────────────
     TERMINAL INTRO
  ────────────────────────────────────────── */
  function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const lines = [
      { id: 'tl-0', text: 'rohit mandal' },
      { id: 'tl-1', text: 'android dev  /  flutter  /  react  /  python' },
      { id: 'tl-2', text: 'swift technology  ·  webminix  ·  grow more' },
      { id: 'tl-3', text: 'kathmandu, nepal' },
      { id: 'tl-4', text: 'ready.' },
    ];

    let lineIndex = 0;
    const CHAR_MS = 38;      // ms per character
    const LINE_GAP = 220;     // ms pause before next line starts
    const END_HOLD = 500;     // ms to hold after last line is done

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        // All done — wait, then slide the overlay up
        setTimeout(exitOverlay, END_HOLD);
        return;
      }

      const { id, text } = lines[lineIndex];
      const el = document.getElementById(id);
      const contentSpan = el.querySelector('.content');
      const cursorSpan = el.querySelector('.cursor');

      el.classList.add('visible');

      let charIdx = 0;
      const interval = setInterval(() => {
        contentSpan.textContent = text.slice(0, charIdx + 1);
        charIdx++;

        if (charIdx >= text.length) {
          clearInterval(interval);
          el.classList.add('done');       // hides cursor after typing
          lineIndex++;
          setTimeout(typeNextLine, LINE_GAP);
        }
      }, CHAR_MS);
    }

    function exitOverlay() {
      overlay.classList.add('exit');
      overlay.addEventListener('transitionend', () => {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        revealHero();
      }, { once: true });
    }

    // Start typing after a short settle delay
    setTimeout(typeNextLine, 320);
  }

  /* ──────────────────────────────────────────
     HERO STAGGER REVEAL
  ────────────────────────────────────────── */
  function revealHero() {
    const staggerTargets = [
      document.getElementById('hero-tag'),
      document.querySelector('.hero-name'),
      document.querySelector('.hero-statement'),
      document.querySelector('.hero-actions'),
      document.querySelector('.hero-socials'),
      document.getElementById('hero-image'),
    ].filter(Boolean);

    staggerTargets.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('hero-reveal');
      }, i * 85);
    });
  }

  /* ──────────────────────────────────────────
     HERO SPOTLIGHT — follows the cursor
  ────────────────────────────────────────── */
  function initHeroSpotlight() {
    if (reducedMotion) return;
    const hero = document.getElementById('home');
    if (!hero) return;

    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--spot-x', x + '%');
      hero.style.setProperty('--spot-y', y + '%');
      hero.classList.add('spotlight-on');
    });

    hero.addEventListener('pointerleave', () => {
      hero.classList.remove('spotlight-on');
    });
  }

  /* ──────────────────────────────────────────
     NAVIGATION
  ────────────────────────────────────────── */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Glassmorphism on scroll
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      updateActiveNav();
      toggleBackToTop();
      updateScrollProgress();
    }, { passive: true });

    // Mobile toggle
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ──────────────────────────────────────────
     ACTIVE NAV LINK (IntersectionObserver)
  ────────────────────────────────────────── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], .contact-section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 80;

    // When at (or near) the bottom of the page, force the last section active
    const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40;

    let current = '';
    if (nearBottom) {
      // Last section in DOM order
      current = sections[sections.length - 1]?.getAttribute('id') || '';
    } else {
      sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
          current = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ──────────────────────────────────────────
     SCROLL PROGRESS BAR
  ────────────────────────────────────────── */
  function updateScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }

  /* ──────────────────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
  ────────────────────────────────────────── */
  function initScrollReveal() {
    const revealOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    // Stagger project cards separately
    const cardOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -24px 0px',
    };
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          cardObserver.unobserve(entry.target);
        }
      });
    }, cardOptions);

    document.querySelectorAll('.reveal, .reveal-x').forEach(el => {
      revealObserver.observe(el);
    });

    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 60}ms`;
      cardObserver.observe(card);
    });
  }

  /* ──────────────────────────────────────────
     PROJECT CARDS — subtle tilt on hover
  ────────────────────────────────────────── */
  function initCardTilt() {
    if (reducedMotion) return;
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 5).toFixed(2);
        const rotateY = (x * 5).toFixed(2);
        card.style.transform = `translateY(-2px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────────────────
     TICKER — click a tech to filter projects
  ────────────────────────────────────────── */
  function initTickerFilter() {
    const tickerStrip = document.getElementById('ticker-strip');
    const tickerItems = document.querySelectorAll('.ticker-item');
    const cards = document.querySelectorAll('.project-card');
    const banner = document.getElementById('filter-banner');
    const bannerTag = document.getElementById('filter-banner-tag');
    const clearBtn = document.getElementById('filter-clear');
    const projectsSection = document.getElementById('projects');

    if (!tickerItems.length || !cards.length) return;

    let activeStack = null;

    function applyFilter(stack, sourceItem) {
      activeStack = stack;

      tickerItems.forEach(item => {
        item.classList.toggle('active', item.dataset.stack === stack);
      });

      const matchCount = Array.from(cards).filter(card =>
        (card.dataset.stack || '').includes(stack)
      ).length;

      cards.forEach(card => {
        const cardStack = (card.dataset.stack || '');
        const matches = cardStack.includes(stack);
        // If nothing matches this exact tag, don't dim everything —
        // it reads as broken rather than "no results".
        card.classList.toggle('filtered-out', matchCount > 0 && !matches);
      });

      if (banner && bannerTag) {
        const label = sourceItem ? sourceItem.textContent.trim() : stack.toUpperCase();
        const bannerText = document.getElementById('filter-banner-text');
        if (matchCount === 0 && bannerText) {
          bannerText.innerHTML = `<strong>${label}</strong> is in the skillset, just not tagged on a public project yet — here's everything else`;
        } else if (bannerText) {
          bannerText.innerHTML = `Showing projects using <strong>${label}</strong>`;
        }
        banner.classList.add('visible');
      }
    }

    function clearFilter() {
      activeStack = null;
      tickerItems.forEach(item => item.classList.remove('active'));
      cards.forEach(card => card.classList.remove('filtered-out'));
      if (banner) banner.classList.remove('visible');
    }

    tickerItems.forEach(item => {
      item.addEventListener('click', () => {
        const stack = item.dataset.stack;
        if (!stack) return;
        if (activeStack === stack) {
          clearFilter();
        } else {
          applyFilter(stack, item);
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', clearFilter);
    }
  }

  /* ──────────────────────────────────────────
     EXPERIENCE ACCORDION
  ────────────────────────────────────────── */
  function initExperienceAccordion() {
    const rows = document.querySelectorAll('.exp-role-row');

    rows.forEach(row => {
      const item = row.closest('.exp-item');

      function toggle() {
        const willExpand = !item.classList.contains('expanded');
        item.classList.toggle('expanded', willExpand);
        row.setAttribute('aria-expanded', String(willExpand));
      }

      row.addEventListener('click', toggle);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ──────────────────────────────────────────
     COPY EMAIL BUTTON
  ────────────────────────────────────────── */
  function initCopyEmail() {
    const btn = document.getElementById('copy-email-btn');
    if (!btn) return;
    const email = 'mandal123rohit@gmail.com';

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        // Fallback for browsers without Clipboard API access
        const temp = document.createElement('textarea');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Email copied');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copy email address');
      }, 2000);
    });
  }

  /* ──────────────────────────────────────────
     BACK TO TOP
  ────────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function toggleBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  /* ──────────────────────────────────────────
     EASTER EGG — type "moon" anywhere on the
     page to send the ticker to the moon 🚀
  ────────────────────────────────────────── */
  function initMoonEasterEgg() {
    const target = 'moon';
    let buffer = '';
    const tickerStrip = document.getElementById('ticker-strip');
    const toast = document.getElementById('egg-toast');
    let toastTimer = null;

    window.addEventListener('keydown', (e) => {
      // Ignore when typing in an input/textarea/contenteditable
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      if (e.key.length !== 1) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target) {
        buffer = '';
        document.body.classList.add('to-the-moon');
        if (tickerStrip) tickerStrip.classList.add('boosted');
        if (toast) {
          toast.classList.add('visible');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
        }
        setTimeout(() => {
          document.body.classList.remove('to-the-moon');
          if (tickerStrip) tickerStrip.classList.remove('boosted');
        }, 4000);
      }
    });
  }

  /* ──────────────────────────────────────────
     INIT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectTagIcons();
    initNavigation();
    initScrollReveal();
    initCardTilt();
    initTickerFilter();
    initExperienceAccordion();
    initCopyEmail();
    initHeroSpotlight();
    initMoonEasterEgg();
    initBackToTop();
    initTerminal();   // terminal runs last — it controls hero reveal
  });

})();