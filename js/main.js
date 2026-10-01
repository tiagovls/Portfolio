/* ====================================================
   MAIN JS — Tiago Vilas Portfolio
==================================================== */

// ── NAVBAR scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mob-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── HAMBURGER menu
if (hamburger && mobMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = hamburger.classList.toggle('open');
    mobMenu.classList.toggle('open', isOpen);
    // Lock body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // Always show navbar background when menu is open
    if (isOpen) navbar.classList.add('scrolled');
    else if (window.scrollY <= 40) navbar.classList.remove('scrolled');
  });

  // Close on link click
  mobMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (window.scrollY <= 40) navbar.classList.remove('scrolled');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobMenu.classList.contains('open') &&
        !mobMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (window.scrollY <= 40) navbar.classList.remove('scrolled');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (window.scrollY <= 40) navbar.classList.remove('scrolled');
    }
  });
}

// ── REVEAL on scroll (Intersection Observer)
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── HERO parallax on scroll
const heroBg = document.querySelector('.hero-bg-gradient');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ── ACTIVE NAV LINK on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ── Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
