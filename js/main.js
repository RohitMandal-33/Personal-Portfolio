/**
 * Main Application Orchestrator (ES Module)
 * Rohit Mandal — Portfolio
 */

import { injectTagIcons } from './icons.js';
import { initTerminal } from './terminal.js';
import { initAvatarDock } from './avatar-dock.js';
import { initNavigation } from './navigation.js';
import { initTickerFilter } from './ticker.js';
import {
  initScrollReveal,
  initCardTilt,
  initExperienceAccordion,
  initCopyEmail,
  initHeroSpotlight,
  initBackToTop,
  initMoonEasterEgg,
} from './ui-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  injectTagIcons();
  initNavigation();
  initScrollReveal();
  initCardTilt(reducedMotion);
  initTickerFilter();
  initExperienceAccordion();
  initCopyEmail();
  initHeroSpotlight(reducedMotion);
  initAvatarDock(reducedMotion);
  initMoonEasterEgg();
  initBackToTop();
  initTerminal(reducedMotion); // Controls hero reveal sequence
});
