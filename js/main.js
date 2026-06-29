'use strict';

// ===== HEADER SCROLL SHADOW =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close nav when clicking a regular link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// Mobile dropdown toggle
const dropdownBtn = nav.querySelector('.nav__link--btn');
if (dropdownBtn) {
  dropdownBtn.addEventListener('click', () => {
    const menu = dropdownBtn.closest('.nav__dropdown').querySelector('.nav__dropdown-menu');
    const open = menu.classList.toggle('open');
    dropdownBtn.setAttribute('aria-expanded', open);
    const chevron = dropdownBtn.querySelector('.nav__chevron');
    if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
  });
}

// ===== SMOOTH SCROLL (for older browsers) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 76; // header height + buffer
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.category-card, .product-card, .fb-post, .stat-box, .usp, .contact__info, .contact__form'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  observer.observe(el);
});

// ===== CONTACT FORM (demo) =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Skickar…';
    setTimeout(() => {
      formSuccess.hidden = false;
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Skicka meddelande';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--c-navy)' : '';
        link.style.fontWeight = link.getAttribute('href') === `#${id}` ? '700' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
