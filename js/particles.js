/**
 * Floating Interactive Particles Background (Canvas)
 * Inspired by VengenceUI Interactive Particles
 * Rohit Mandal — Portfolio
 */

export function initParticles(reducedMotion = false) {
  if (reducedMotion) return;

  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

  const particles = [];
  const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000), 55);

  const mouse = {
    x: -9999,
    y: -9999,
    radius: 120,
  };

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.4 ? '192, 138, 46' : '179, 58, 58';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse repulsion / interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 2.5;
        this.y -= Math.sin(angle) * force * 2.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Connect close particles with subtle lines
  function connect() {
    const maxDist = 95;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.strokeStyle = `rgba(192, 138, 46, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  let animId = null;
  let isVisible = true;

  function animate() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();

    animId = requestAnimationFrame(animate);
  }

  // Resize handler with debounce
  function handleResize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', handleResize, { passive: true });

  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener(
      'pointermove',
      (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      },
      { passive: true }
    );

    heroSection.addEventListener('pointerleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Pause when hero is out of view for performance
    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animate();
      }
    });
    obs.observe(heroSection);
  }

  animate();
}
