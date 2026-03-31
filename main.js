/* MDR Bygg & Montage – main.js */

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Intersection Observer – reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Auto-add reveal classes to sections
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
  observer.observe(el);
});

document.querySelectorAll('.strip__item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  observer.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
  observer.observe(el);
});

document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

document.querySelectorAll('.about__text > *').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 5)}`);
  observer.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#f56565';
      valid = false;
    }
  });

  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.textContent = 'Skickar...';
  submitBtn.disabled = true;

  // Simulate send (replace with real backend/formspree/emailjs)
  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Skicka förfrågan';
    submitBtn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 1200);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${entry.target.id}`) {
          a.style.color = 'var(--c-white)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
