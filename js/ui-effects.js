/**
 * Interactive UI Effects & Micro-Interactions
 * Rohit Mandal — Portfolio
 */

export function initScrollReveal() {
  const revealOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const cardOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -24px 0px',
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardOptions);

  document.querySelectorAll('.reveal, .reveal-x').forEach((el) => {
    revealObserver.observe(el);
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
    cardObserver.observe(card);
  });
}

export function initCardTilt(reducedMotion = false) {
  if (reducedMotion) return;
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
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

export function initExperienceAccordion() {
  const rows = document.querySelectorAll('.exp-role-row');

  rows.forEach((row) => {
    const item = row.closest('.exp-item');
    if (!item) return;

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

export function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;
  const email = 'mandal123rohit@gmail.com';

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
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

export function initHeroSpotlight(reducedMotion = false) {
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

export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true }
  );
}

export function initMoonEasterEgg() {
  const target = 'moon';
  let buffer = '';
  const tickerStrip = document.getElementById('ticker-strip');
  const toast = document.getElementById('egg-toast');
  let toastTimer = null;

  window.addEventListener('keydown', (e) => {
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
