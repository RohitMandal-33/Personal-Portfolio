/**
 * Hero Reveal Orchestrator
 * Rohit Mandal — Portfolio
 */

export function revealHero() {
  document.querySelectorAll('#hero-tag, .hero-name, .hero-statement, .hero-actions, .hero-socials, #hero-image').forEach((el) => {
    el.classList.add('hero-reveal');
  });
}

export function initTerminal() {
  revealHero();
}
