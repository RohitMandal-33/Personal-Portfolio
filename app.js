// Portfolio Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initParticles();
    initTiltEffect();
    initContactForm();
    initScrollProgress();
    initEnhancedAnimations();
    initBackToTop();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const typingText = document.getElementById('typing-text');
    const words = ['Full-Stack Developer', 'Mobile App Developer', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.section-title, .about-content, .skill-category, .timeline-item, .contact-wrapper');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Handle project cards separately to work with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Particle system
function initParticles() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.color = Math.random() > 0.5 ? '#00f2ff' : '#7000ff';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.5;
            ctx.fill();
        }
    }

    function init() {
        resize();
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

// Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        // Only apply tilt effect after animation completes
        const checkAnimationComplete = () => {
            const hasAnimateIn = card.classList.contains('animate-in');
            if (!hasAnimateIn) {
                // Wait for animation to start
                const observer = new MutationObserver(() => {
                    if (card.classList.contains('animate-in')) {
                        observer.disconnect();
                        // Wait for animation to complete before enabling tilt
                        setTimeout(() => {
                            enableTilt(card);
                        }, 600); // Match animation duration
                    }
                });
                observer.observe(card, { attributes: true, attributeFilter: ['class'] });
            } else {
                // Animation already complete, enable tilt immediately
                enableTilt(card);
            }
        };

        const enableTilt = (cardElement) => {
            cardElement.addEventListener('mousemove', handleTilt);
            cardElement.addEventListener('mouseleave', resetTilt);
        };

        const handleTilt = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            // Use CSS custom properties to avoid overriding animation
            card.style.setProperty('--tilt-rotate-x', `${rotateX}deg`);
            card.style.setProperty('--tilt-rotate-y', `${rotateY}deg`);
        };

        const resetTilt = () => {
            card.style.setProperty('--tilt-rotate-x', '0deg');
            card.style.setProperty('--tilt-rotate-y', '0deg');
        };

        // Initialize tilt effect check
        checkAnimationComplete();
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Construct mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
        const mailtoLink = `mailto:mandal123rohit@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`; // body is already partially encoded with %0A but encodeURIComponent is safer for user input if we did it fully, but for simple newlines %0A works well. Let's use encodeURIComponent for the variable parts.

        // Better encoding:
        const finalMailto = `mailto:mandal123rohit@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Opening Mail Client...';

        setTimeout(() => {
            window.location.href = finalMailto;

            btn.innerHTML = '<i class="fas fa-check"></i> Opened!';
            btn.style.background = '#00f2ff';
            btn.style.color = '#000';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }, 500);
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Enhanced Animations
function initEnhancedAnimations() {
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // Add counter animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const isNumber = /^\d+/.test(text);
                
                if (isNumber) {
                    const finalNumber = parseInt(text);
                    let current = 0;
                    const increment = finalNumber / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                        }
                    }, 30);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-tag, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}