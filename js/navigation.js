/**
 * Navigation, Scroll Spy & Progress Indicator
 * Rohit Mandal — Portfolio
 */

export function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  bar.style.width = pct + '%';
}

export function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], .contact-section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 80;
  const nearBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40;

  let current = '';
  if (nearBottom) {
    current = sections[sections.length - 1]?.getAttribute('id') || '';
  } else {
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

export function initNavigation() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  if (!navbar) return;

  // Navbar glassmorphism, active link & progress on scroll
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
    updateScrollProgress();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
