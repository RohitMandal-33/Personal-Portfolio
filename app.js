/* =============================================
   ROHIT MANDAL — PORTFOLIO
   app.js v2.0
   ============================================= */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     TERMINAL INTRO
  ────────────────────────────────────────── */
  function initTerminal() {
    const overlay   = document.getElementById('terminal-overlay');
    const lines     = [
      { id: 'tl-0', text: 'rohit mandal' },
      { id: 'tl-1', text: 'android dev  /  flutter  /  react  /  python' },
      { id: 'tl-2', text: 'swift technology  ·  webminix  ·  grow more' },
      { id: 'tl-3', text: 'kathmandu, nepal' },
      { id: 'tl-4', text: 'ready.' },
    ];

    let lineIndex   = 0;
    const CHAR_MS   = 38;      // ms per character
    const LINE_GAP  = 220;     // ms pause before next line starts
    const END_HOLD  = 500;     // ms to hold after last line is done

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        // All done — wait, then slide the overlay up
        setTimeout(exitOverlay, END_HOLD);
        return;
      }

      const { id, text } = lines[lineIndex];
      const el            = document.getElementById(id);
      const contentSpan   = el.querySelector('.content');
      const cursorSpan    = el.querySelector('.cursor');

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
     NAVIGATION
  ────────────────────────────────────────── */
  function initNavigation() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

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
    const sections  = document.querySelectorAll('section[id], .contact-section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
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
    const bar     = document.getElementById('scroll-progress');
    if (!bar) return;
    const total   = document.documentElement.scrollHeight - window.innerHeight;
    const pct     = total > 0 ? (window.scrollY / total) * 100 : 0;
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
     INIT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initBackToTop();
    initTerminal();   // terminal runs last — it controls hero reveal
  });

})();