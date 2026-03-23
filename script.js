/* ========================================
   WanderBharat — script.js
   ======================================== */

'use strict';

// ============================================================
// PRELOADER
// ============================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1400);
});

// ============================================================
// HEADER — Sticky + scroll class
// ============================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================================
// HAMBURGER — Mobile nav
// ============================================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav when a link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => (s.style.cssText = ''));
  });
});

// ============================================================
// HERO SLIDER
// ============================================================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.slide);
    goToSlide(idx);
    resetAutoSlide();
  });
});

startAutoSlide();

// ============================================================
// ACTIVE NAV LINK on scroll
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 20;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});

// ============================================================
// SEARCH TABS
// ============================================================
const stabs = document.querySelectorAll('.stab');

stabs.forEach(tab => {
  tab.addEventListener('click', () => {
    stabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ============================================================
// TESTIMONIALS CAROUSEL
// ============================================================
const track = document.getElementById('testimonialsTrack');
const cards = track ? Array.from(track.children) : [];
let testiPage = 0;
const cardsPerPage = window.innerWidth < 768 ? 1 : 2;
let totalPages = Math.ceil(cards.length / cardsPerPage);

function getCardsPerPage() {
  return window.innerWidth < 768 ? 1 : 2;
}

function updateTestimonialsLayout() {
  const cpp = getCardsPerPage();
  totalPages = Math.ceil(cards.length / cpp);
  track.style.gridTemplateColumns = `repeat(${cpp}, 1fr)`;

  cards.forEach((card, i) => {
    const page = Math.floor(i / cpp);
    card.style.display = (page === testiPage) ? 'block' : 'none';
  });
}

document.getElementById('testiPrev')?.addEventListener('click', () => {
  testiPage = (testiPage - 1 + totalPages) % totalPages;
  updateTestimonialsLayout();
});

document.getElementById('testiNext')?.addEventListener('click', () => {
  testiPage = (testiPage + 1) % totalPages;
  updateTestimonialsLayout();
});

window.addEventListener('resize', () => {
  testiPage = 0;
  updateTestimonialsLayout();
});

updateTestimonialsLayout();

// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// NEWSLETTER
// ============================================================
function handleNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = '⚠️ Please enter a valid email address.';
    msg.style.color = 'rgba(255,220,180,0.9)';
    return;
  }

  msg.textContent = '🎉 Thank you for subscribing! Get ready to Wander Bharat!';
  msg.style.color = 'rgba(255,255,255,0.95)';
  emailInput.value = '';

  setTimeout(() => {
    msg.textContent = '';
  }, 5000);
}

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-check"></i> Enquiry Sent!';
    btn.style.background = 'linear-gradient(135deg, #2C6E49 0%, #4A9970 100%)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  }, 1600);
});

// ============================================================
// SCROLL REVEAL — Intersection Observer
// ============================================================
const revealElements = document.querySelectorAll(
  '.tour-card, .blog-card, .dest-card, .testimonial-card, .strip-item, .about-grid, .contact-grid'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(36px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ============================================================
// COUNTER ANIMATION — Stats
// ============================================================
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const duration = 1600;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat strong');
        statNumbers.forEach(num => {
          const raw = num.textContent.replace(/[^0-9]/g, '');
          const suffix = num.textContent.replace(/[0-9]/g, '').trim();
          animateCounter(num, parseInt(raw), suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================================================
// DESTINATION CARD — Tilt effect on mouse move
// ============================================================
document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================================================
// TOUR CARD — Tilt effect
// ============================================================
document.querySelectorAll('.tour-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================================================
// HEADER HIDE ON SCROLL DOWN / SHOW ON SCROLL UP
// ============================================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// Add transition to header transform
header.style.transition = 'transform 0.4s ease, background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease';

// ============================================================
// SEARCH BUTTON FEEDBACK
// ============================================================
const searchBtn = document.querySelector('.search-btn');
searchBtn?.addEventListener('click', () => {
  const originalText = searchBtn.innerHTML;
  searchBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Searching...';
  setTimeout(() => {
    searchBtn.innerHTML = originalText;
  }, 1800);
});

console.log('🪷 WanderBharat — Discover the Soul of India');