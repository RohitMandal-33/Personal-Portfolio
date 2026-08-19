/**
 * Terminal Intro Overlay & Hero Staggered Reveal
 * Rohit Mandal — Portfolio
 */

export function revealHero() {
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

export function initTerminal(reducedMotion = false) {
  const overlay = document.getElementById('terminal-overlay');
  if (!overlay) {
    revealHero();
    return;
  }

  if (reducedMotion) {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    revealHero();
    return;
  }

  overlay.setAttribute('aria-hidden', 'false');

  const lines = [
    { id: 'tl-0', text: 'rohit mandal' },
    { id: 'tl-1', text: 'android dev  /  flutter  /  react  /  python' },
    { id: 'tl-2', text: 'swift technology  ·  webminix  ·  grow more' },
    { id: 'tl-3', text: 'kathmandu, nepal' },
    { id: 'tl-4', text: 'ready.' },
  ];

  let lineIndex = 0;
  const CHAR_MS = 12;      // fast ms per character
  const LINE_GAP = 60;     // snappy pause before next line
  const END_HOLD = 150;    // short hold after finish
  const INITIAL_DELAY = 60;// start typing quickly

  let currentInterval = null;
  let currentTimeout = null;
  let isExiting = false;

  function exitOverlay() {
    if (!overlay) return;
    overlay.classList.add('exit');
    overlay.addEventListener(
      'transitionend',
      () => {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        revealHero();
      },
      { once: true }
    );
  }

  function finishImmediately() {
    if (isExiting) return;
    isExiting = true;
    if (currentInterval) clearInterval(currentInterval);
    if (currentTimeout) clearTimeout(currentTimeout);

    lines.forEach(({ id, text }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const contentSpan = el.querySelector('.content');
      if (contentSpan) contentSpan.textContent = text;
      el.classList.add('visible', 'done');
    });

    exitOverlay();
  }

  function typeNextLine() {
    if (isExiting) return;
    if (lineIndex >= lines.length) {
      currentTimeout = setTimeout(exitOverlay, END_HOLD);
      return;
    }

    const { id, text } = lines[lineIndex];
    const el = document.getElementById(id);
    if (!el) {
      lineIndex++;
      typeNextLine();
      return;
    }
    const contentSpan = el.querySelector('.content');

    el.classList.add('visible');

    let charIdx = 0;
    currentInterval = setInterval(() => {
      if (isExiting) return;
      contentSpan.textContent = text.slice(0, charIdx + 1);
      charIdx++;

      if (charIdx >= text.length) {
        clearInterval(currentInterval);
        el.classList.add('done'); // hides cursor
        lineIndex++;
        currentTimeout = setTimeout(typeNextLine, LINE_GAP);
      }
    }, CHAR_MS);
  }

  // Allow user to click/tap overlay to skip immediately
  overlay.addEventListener('click', finishImmediately, { once: true });

  // Start typing sequence
  currentTimeout = setTimeout(typeNextLine, INITIAL_DELAY);
}
