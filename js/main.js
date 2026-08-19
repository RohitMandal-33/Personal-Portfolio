/**
 * Main Application Orchestrator (ES Module)
 * Rohit Mandal — Portfolio
 */

import { injectTagIcons } from './icons.js';
import { initTerminal } from './terminal.js';
import { initAvatarDock } from './avatar-dock.js';
import { initNavigation } from './navigation.js';
import { initTickerFilter } from './ticker.js';
import { initParticles } from './particles.js';
import { initMagneticButtons } from './magnetic.js';
import { initStatsCounter } from './counter.js';
import { initMotion } from './motion.js';
import {
  initExperienceAccordion,
  initCopyEmail,
  initHeroSpotlight,
  initHeroParallax,
  initBackToTop,
  initMoonEasterEgg,
} from './ui-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  injectTagIcons();
  initNavigation();
  initTickerFilter();
  initExperienceAccordion();
  initCopyEmail();
  initHeroSpotlight(reducedMotion);
  initHeroParallax(reducedMotion);
  initParticles(reducedMotion);
  initMagneticButtons(reducedMotion);
  initStatsCounter();
  initAvatarDock(reducedMotion);
  initMoonEasterEgg();
  initBackToTop();
  initTerminal(reducedMotion);
  initMotion(reducedMotion);
});
