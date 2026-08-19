/**
 * Avatar Dock Engine
 * Morphs the hero photo into the navbar avatar on scroll with high-performance rAF.
 * Rohit Mandal — Portfolio
 */

export function initAvatarDock(reducedMotion = false) {
  const photo  = document.querySelector('.hero-photo');
  const wrap   = document.getElementById('hero-image');
  const dest   = document.getElementById('nav-avatar');
  const navbar = document.getElementById('navbar');
  const hero   = document.getElementById('home');

  if (!photo || !wrap || !dest || !navbar || !hero) return;

  /* ── Easings ── */
  const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ── Cached Layout Dimensions (prevents layout thrashing on scroll) ── */
  let destRect = null;
  let wrapDocX = 0, wrapDocY = 0, wrapW = 0, wrapH = 0;

  function cacheRects() {
    const wr = wrap.getBoundingClientRect();
    wrapDocX = wr.left + window.scrollX;
    wrapDocY = wr.top + window.scrollY;
    wrapW    = wr.width;
    wrapH    = wr.height;
    destRect = dest.getBoundingClientRect();
  }

  /* ── Flight State ── */
  let ticking   = false;
  let prevRaw   = -1;
  let hasLanded = false;

  function clearFlight() {
    photo.style.transform    = '';
    photo.style.borderRadius = '';
    photo.style.filter       = '';
    photo.style.boxShadow    = '';
    photo.classList.remove('is-flying', 'is-docked');
    wrap.classList.remove('is-docking');
    navbar.classList.remove('avatar-docked');
    hasLanded = false;
    prevRaw   = -1;
  }

  function update() {
    ticking = false;

    const range = Math.max(260, hero.offsetHeight * 0.48);
    const raw   = Math.min(1, Math.max(0, window.scrollY / range));

    /* Reduced-motion preference: instant dock, no flight */
    if (reducedMotion) {
      if (raw > 0.35) {
        photo.classList.add('is-docked');
        wrap.classList.add('is-docking');
        navbar.classList.add('avatar-docked');
        photo.style.transform = '';
      } else {
        clearFlight();
      }
      return;
    }

    if (raw <= 0.001) {
      clearFlight();
      return;
    }

    /* Lazy-cache layout on first scroll frame */
    if (!destRect) cacheRects();
    const dr = destRect;
    if (!dr || wrapW < 8 || dr.width < 8) return;

    const t = easeOutExpo(raw);

    /* Viewport-relative source center computed purely in math */
    const sCX = wrapDocX - window.scrollX + wrapW / 2;
    const sCY = wrapDocY - window.scrollY + wrapH / 2;
    const eCX = dr.left + dr.width / 2;
    const eCY = dr.top + dr.height / 2;

    /* Transform coordinates */
    const scaleX = lerp(1, dr.width / wrapW, t);
    const scaleY = lerp(1, dr.height / wrapH, t);
    const radius = lerp(12, Math.min(dr.width, dr.height) / 2, t);

    // Arc path: subtle upward trajectory during flight
    const arcY = Math.sin(raw * Math.PI) * -14;
    const dx   = (eCX - sCX) * t;
    const dy   = (eCY - sCY) * t + arcY;

    /* Mid-flight dynamic glow */
    const glow   = Math.sin(raw * Math.PI);
    const blur   = (glow * 0.9).toFixed(2);
    const bright = (1 + glow * 0.08).toFixed(3);
    const glowA  = (glow * 0.48).toFixed(3);
    const glowPx = Math.round(glow * 16);

    /* Apply styles */
    photo.classList.add('is-flying');
    wrap.classList.add('is-docking');
    photo.style.transform    = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
    photo.style.borderRadius = `${radius}px`;
    photo.style.filter       = `brightness(${bright}) blur(${blur}px)`;
    photo.style.boxShadow    = [
      `0 ${glowPx}px ${glowPx * 2}px -${Math.round(glowPx / 2)}px rgba(61,124,244,${glowA})`,
      `0 6px 24px -6px rgba(0,0,0,0.45)`,
    ].join(', ');

    /* Docking & Arrival ring pulse */
    if (t >= 0.96) {
      if (!hasLanded) {
        hasLanded = true;
        dest.classList.remove('avatar-arrived');
        void dest.offsetWidth; // force reflow
        dest.classList.add('avatar-arrived');
      }
      photo.classList.add('is-docked');
      navbar.classList.add('avatar-docked');
    } else {
      photo.classList.remove('is-docked');
      navbar.classList.remove('avatar-docked');
      if (prevRaw >= 0.96) hasLanded = false;
    }

    prevRaw = raw;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  /* Invalidate cached dimensions on screen resize */
  const ro = new ResizeObserver(() => {
    destRect = null;
    requestUpdate();
  });
  ro.observe(document.documentElement);

  window.addEventListener('scroll', requestUpdate, { passive: true });
  requestUpdate();

  return { update: requestUpdate, refresh: cacheRects };
}
