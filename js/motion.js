/**
 * Premium Motion System — GSAP + ScrollTrigger + Lenis (with Instant Native Fallback)
 * Rohit Mandal — Portfolio
 *
 * GPU-accelerated, prefers-reduced-motion aware.
 * All animations use transform/opacity only.
 */

let lenisInstance = null;

/* ── Fallback Native IntersectionObserver Reveal ── */
function initNativeScrollReveals() {
  const revealOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0, 0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const targets = document.querySelectorAll(
    '.reveal, .reveal-x, .project-card, .exp-item, .stat-card, .skill-group, .contact-inner'
  );

  targets.forEach((el, idx) => {
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.opacity = '0';
    if (el.classList.contains('reveal-x')) {
      el.style.transform = 'translateX(-20px)';
    } else {
      el.style.transform = 'translateY(24px)';
    }
    observer.observe(el);
  });
}

/* ── Fallback Native 3D Card Tilt ── */
function initNativeCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--card-mouse-x', `${x.toFixed(1)}px`);
      card.style.setProperty('--card-mouse-y', `${y.toFixed(1)}px`);

      const normX = x / rect.width - 0.5;
      const normY = y / rect.height - 0.5;
      const rotateX = (-normY * 5).toFixed(2);
      const rotateY = (normX * 5).toFixed(2);

      card.style.transform = `scale(1.02) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'scale(1) perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ── Fallback Native Hero Entrance ── */
function initNativeHeroEntrance() {
  const heroElements = [
    '#hero-tag',
    '.hero-name',
    '.hero-role-pill',
    '.hero-statement',
    '.hero-actions',
    '.hero-socials',
    '#hero-image',
  ];

  heroElements.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60 + i * 80);
  });
}

/* ── Reduced Motion Fallback ── */
function handleReducedMotion() {
  const allAnimated = [
    '#hero-tag',
    '.hero-name',
    '.hero-role-pill',
    '.hero-statement',
    '.hero-actions',
    '.hero-socials',
    '#hero-image',
    '.reveal',
    '.reveal-x',
    '.project-card',
    '.exp-item',
    '.stat-card',
    '.skill-group',
    '.contact-inner',
  ];

  allAnimated.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
}

/* ── Primary Orchestration with Dynamic ESM Import ── */
export async function initMotion(reducedMotion = false) {
  if (reducedMotion) {
    handleReducedMotion();
    return;
  }

  try {
    // Dynamic import with timeout fallback
    const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm'),
      import('https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger/+esm'),
      import('https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm'),
    ]);

    const gsap = gsapModule.default || gsapModule;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
    const Lenis = lenisModule.default || lenisModule;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Lenis Smooth Scroll
      if (Lenis) {
        lenisInstance = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }

      // 2. Hero Stagger Entrance
      const heroElements = [
        '#hero-tag',
        '.hero-name',
        '.hero-role-pill',
        '.hero-statement',
        '.hero-actions',
        '.hero-socials',
        '#hero-image',
      ];

      gsap.set(heroElements, { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.08, defaults: { duration: 0.45, ease: 'power3.out' } });
      heroElements.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0 }, i === 0 ? 0 : '>-0.32');
      });

      // 3. Aurora Motion
      const blobs = document.querySelectorAll('.hero-aurora .aurora-blob');
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => `${(Math.random() - 0.5) * 80}px`,
          y: () => `${(Math.random() - 0.5) * 60}px`,
          scale: () => 0.85 + Math.random() * 0.35,
          duration: 18 + i * 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 2,
        });
      });

      // 4. Scroll-Triggered Reveals
      gsap.utils.toArray('.section-header.reveal, .reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: 25,
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      gsap.utils.toArray('.reveal-x').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          x: -20,
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      const projectCards = gsap.utils.toArray('.project-card');
      if (projectCards.length) {
        gsap.from(projectCards, {
          scrollTrigger: { trigger: '.projects-grid', start: 'top 85%', once: true },
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      const expItems = gsap.utils.toArray('.exp-item');
      if (expItems.length) {
        gsap.from(expItems, {
          scrollTrigger: { trigger: '.experience-list', start: 'top 85%', once: true },
          opacity: 0,
          y: 25,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power3.out',
        });
      }

      const statCards = gsap.utils.toArray('.stat-card');
      if (statCards.length) {
        gsap.from(statCards, {
          scrollTrigger: { trigger: '.skills-stats', start: 'top 85%', once: true },
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
        });
      }

      const skillGroups = gsap.utils.toArray('.skill-group');
      if (skillGroups.length) {
        gsap.from(skillGroups, {
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', once: true },
          opacity: 0,
          y: 25,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      const contactInner = document.querySelector('.contact-inner');
      if (contactInner) {
        gsap.from(contactInner, {
          scrollTrigger: { trigger: contactInner, start: 'top 85%', once: true },
          opacity: 0,
          y: 30,
          duration: 0.55,
          ease: 'power3.out',
        });
      }

      // 5. 3D Card Tilt with GSAP
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        card.addEventListener('pointerenter', (e) => {
          if (e.pointerType === 'touch') return;
          gsap.to(card, { scale: 1.02, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        });

        card.addEventListener('pointermove', (e) => {
          if (e.pointerType === 'touch') return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--card-mouse-x', `${x.toFixed(1)}px`);
          card.style.setProperty('--card-mouse-y', `${y.toFixed(1)}px`);

          const normX = x / rect.width - 0.5;
          const normY = y / rect.height - 0.5;
          gsap.to(card, {
            rotateX: -normY * 5,
            rotateY: normX * 5,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
            transformPerspective: 900,
          });
        });

        card.addEventListener('pointerleave', () => {
          gsap.to(card, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      });

      return;
    }
  } catch (err) {
    console.warn('GSAP/Lenis CDN unavailable, falling back to native animations:', err);
  }

  // Graceful native fallback
  initNativeHeroEntrance();
  initNativeScrollReveals();
  initNativeCardTilt();
}

export function getLenis() {
  return lenisInstance;
}
