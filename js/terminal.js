/**
 * Hero Reveal Orchestrator (compatibility module)
 * Rohit Mandal — Portfolio
 */

export function revealHero() {
  document.querySelectorAll('#hero-tag, .hero-name, .hero-statement, .hero-actions, .hero-socials, #hero-image').forEach((el) => {
    el.classList.add('hero-reveal');
  });
}

export function initTerminal() {
  // GSAP motion orchestrator in motion.js manages hero entrance
}
