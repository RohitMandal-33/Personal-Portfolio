/**
 * Magnetic Button & Link Hover Physics
 * Inspired by VengenceUI Interactive Components & AnimMasterLib Mouse Effects
 * Rohit Mandal — Portfolio
 */

export function initMagneticButtons(reducedMotion = false) {
  if (reducedMotion) return;

  const targets = document.querySelectorAll(
    '.btn-primary, .btn-ghost, .social-link, .nav-brand, .back-to-top'
  );

  targets.forEach((el) => {
    const strength = el.classList.contains('social-link') || el.classList.contains('nav-brand') ? 12 : 20;

    el.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const pullX = (x / (rect.width / 2)) * (strength * 0.4);
      const pullY = (y / (rect.height / 2)) * (strength * 0.4);

      el.style.transform = `translate(${pullX.toFixed(2)}px, ${pullY.toFixed(2)}px)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.18s ease, background 0.18s ease';
      setTimeout(() => {
        el.style.transition = '';
      }, 350);
    });
  });
}
