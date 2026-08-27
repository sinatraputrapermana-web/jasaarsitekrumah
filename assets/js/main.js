/**
 * Jasa Arsitek Rumah — Main JavaScript
 * jasaarsitekrumah.web.id
 */

'use strict';

/* =========================================
   UTILITY
   ========================================= */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================
   NAVBAR
   ========================================= */
const navbar       = qs('#navbar');
const hamburgerBtn = qs('#hamburgerBtn');
const mobileMenu   = qs('#mobileMenu');
const mobileOverlay= qs('#mobileOverlay');

// Scroll state
let lastScroll = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// Active nav based on scroll position
function setActiveNav() {
  const sections = qsa('section[id]');
  const scrollY  = window.scrollY + 120;

  sections.forEach(sec => {
    const id    = sec.getAttribute('id');
    const top   = sec.offsetTop;
    const height = sec.offsetHeight;
    const link  = qs(`.nav-link-custom[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        qsa('.nav-link-custom').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });

// Hamburger / mobile menu
function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  hamburgerBtn.classList.add('active');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
});

mobileOverlay?.addEventListener('click', closeMobileMenu);

// Close menu on nav link click
qsa('.mobile-nav-link:not(.mobile-dropdown-toggle)').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Keyboard close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

// Mobile dropdown toggles
qsa('.mobile-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const list   = toggle.nextElementSibling;
    const isOpen = toggle.classList.contains('expanded');

    // Close all others
    qsa('.mobile-dropdown-toggle.expanded').forEach(t => {
      t.classList.remove('expanded');
      t.nextElementSibling?.classList.remove('show');
    });

    if (!isOpen) {
      toggle.classList.add('expanded');
      list?.classList.add('show');
    }
  });
});

// Desktop dropdown keyboard nav
qsa('.nav-dropdown').forEach(drop => {
  const trigger = qs('.nav-link-custom', drop);
  const menu    = qs('.dropdown-menu-custom', drop);

  trigger?.addEventListener('click', () => {
    const isShowing = menu.classList.contains('show');
    // Close all
    qsa('.dropdown-menu-custom.show').forEach(m => m.classList.remove('show'));
    if (!isShowing) menu.classList.add('show');
  });

  trigger?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menu.classList.toggle('show');
    }
    if (e.key === 'Escape') menu.classList.remove('show');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-dropdown')) {
    qsa('.dropdown-menu-custom.show').forEach(m => m.classList.remove('show'));
  }
});

/* =========================================
   SMOOTH SCROLL
   ========================================= */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = qs(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

/* =========================================
   SCROLL REVEAL
   ========================================= */
function initScrollReveal() {
  if (prefersReducedMotion) return;

  const revealEls = qsa('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

initScrollReveal();

/* =========================================
   COUNTER ANIMATION (Stats)
   ========================================= */
function animateCounter(el, target, duration = 2000) {
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const suffix  = el.dataset.suffix || '';
  const start   = 0;
  const steps   = 60;
  const stepMs  = duration / steps;
  let current   = start;
  let step      = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.round(start + (target - start) * (step / steps));
    el.textContent = current + suffix;
    if (step >= steps) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, stepMs);
}

function initCounters() {
  const counters = qsa('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.counter);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

initCounters();

/* =========================================
   FAQ ACCORDION
   ========================================= */
qsa('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item   = question.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    // Close all
    qsa('.faq-item.active').forEach(openItem => {
      openItem.classList.remove('active');
      openItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked
    if (!isOpen) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  // Keyboard accessibility
  question.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      question.click();
    }
  });
});

/* =========================================
   GALLERY FILTER
   ========================================= */
const filterBtns  = qsa('.filter-btn');
const galleryItems = qsa('.gallery-item[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter items
    galleryItems.forEach(item => {
      const cat = item.dataset.cat;
      if (filter === 'all' || cat === filter) {
        item.style.display = '';
        if (!prefersReducedMotion) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              item.style.opacity    = '1';
              item.style.transform  = 'scale(1)';
            });
          });
        }
      } else {
        if (!prefersReducedMotion) {
          item.style.transition = 'opacity 0.25s ease';
          item.style.opacity    = '0';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});

/* =========================================
   HEADER PARALLAX (subtle)
   ========================================= */
function initParallax() {
  if (prefersReducedMotion) return;
  const heroBg = qs('.hero-bg img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

initParallax();

/* =========================================
   TESTIMONIAL CAROUSEL (custom)
   ========================================= */
function initTestimonialCarousel() {
  const track  = qs('#testimonialTrack');
  const dots   = qsa('.testimonial-dot');
  const prevBtn = qs('#testimonialPrev');
  const nextBtn = qs('#testimonialNext');

  if (!track) return;

  const cards    = qsa('.testimonial-card-wrap', track);
  let current    = 0;
  let autoTimer;

  function goTo(idx) {
    if (idx < 0) idx = cards.length - 1;
    if (idx >= cards.length) idx = 0;
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      startAuto();
    }
  });

  if (!prefersReducedMotion) startAuto();
}

initTestimonialCarousel();

/* =========================================
   BACK TO TOP BUTTON
   ========================================= */
const backToTopBtn = qs('#backToTop');

function handleBackToTopScroll() {
  if (!backToTopBtn) return;
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

window.addEventListener('scroll', handleBackToTopScroll, { passive: true });
handleBackToTopScroll();

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
});

/* =========================================
   TABLE OF CONTENTS (TOC) TOGGLE
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocContent = document.getElementById('tocContent');

  if (tocToggle && tocContent) {
    tocToggle.addEventListener('click', () => {
      const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
      tocToggle.setAttribute('aria-expanded', !isExpanded);
      tocContent.classList.toggle('show');
    });
  }
});

/* =========================================
   SERVICES 3D DEPTH CAROUSEL
   ========================================= */
function initDepthCarousel() {
  const wrapper = document.querySelector('.depth-carousel-wrapper');
  if (!wrapper) return;

  const stage = wrapper.querySelector('.depth-carousel-stage');
  const cards = Array.from(wrapper.querySelectorAll('.depth-card'));
  const prevBtn = wrapper.querySelector('.depth-nav-btn.prev-btn');
  const nextBtn = wrapper.querySelector('.depth-nav-btn.next-btn');
  const dotsContainer = wrapper.querySelector('.depth-dots');
  const controls = wrapper.querySelector('.depth-carousel-controls');

  if (!cards.length) return;

  let activeIndex = 0;
  const total = cards.length;
  const cycleDuration = 3500; // 3.5 seconds
  let autoplayTimer = null;
  let isHovered = false;

  // Build controls inner & progress bar if not present
  let progressBar = wrapper.querySelector('.depth-progress-bar');
  let progressFill = wrapper.querySelector('.depth-progress-fill');
  if (!progressBar && controls) {
    progressBar = document.createElement('div');
    progressBar.className = 'depth-progress-bar';
    progressFill = document.createElement('div');
    progressFill.className = 'depth-progress-fill';
    progressBar.appendChild(progressFill);
    controls.appendChild(progressBar);
  }

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `depth-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Pilih layanan ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToIndex(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function resetProgressAnimation() {
    if (!progressFill) return;
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    void progressFill.offsetWidth; // Force reflow
    if (!isHovered) {
      progressFill.style.transition = `width ${cycleDuration}ms linear`;
      progressFill.style.width = '100%';
    }
  }

  function updateCards() {
    const isMobile = window.innerWidth <= 768;
    const xStep1 = isMobile ? 55 : 75;
    const xStep2 = isMobile ? 100 : 135;
    const zStep1 = isMobile ? -140 : -200;
    const zStep2 = isMobile ? -280 : -380;
    const rotStep = isMobile ? 22 : 30;

    cards.forEach((card, index) => {
      let offset = index - activeIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      card.classList.remove('is-active', 'is-left', 'is-right');

      if (offset === 0) {
        card.classList.add('is-active');
        card.style.transform = `translate3d(-50%, -50%, 0px) rotateY(0deg) scale(1)`;
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';
      } else if (offset === 1) {
        card.classList.add('is-right');
        card.style.transform = `translate3d(calc(-50% + ${xStep1}%), -50%, ${zStep1}px) rotateY(-${rotStep}deg) scale(0.88)`;
        card.style.opacity = '0.78';
        card.style.zIndex = '8';
        card.style.filter = 'blur(0.5px)';
        card.style.pointerEvents = 'auto';
      } else if (offset === -1) {
        card.classList.add('is-left');
        card.style.transform = `translate3d(calc(-50% - ${xStep1}%), -50%, ${zStep1}px) rotateY(${rotStep}deg) scale(0.88)`;
        card.style.opacity = '0.78';
        card.style.zIndex = '8';
        card.style.filter = 'blur(0.5px)';
        card.style.pointerEvents = 'auto';
      } else if (offset === 2) {
        card.classList.add('is-right');
        card.style.transform = `translate3d(calc(-50% + ${xStep2}%), -50%, ${zStep2}px) rotateY(-${rotStep + 10}deg) scale(0.76)`;
        card.style.opacity = '0.45';
        card.style.zIndex = '6';
        card.style.filter = 'blur(1.5px)';
        card.style.pointerEvents = 'auto';
      } else if (offset === -2) {
        card.classList.add('is-left');
        card.style.transform = `translate3d(calc(-50% - ${xStep2}%), -50%, ${zStep2}px) rotateY(${rotStep + 10}deg) scale(0.76)`;
        card.style.opacity = '0.45';
        card.style.zIndex = '6';
        card.style.filter = 'blur(1.5px)';
        card.style.pointerEvents = 'auto';
      } else {
        const dir = offset > 0 ? 1 : -1;
        card.style.transform = `translate3d(calc(-50% + ${dir * 180}%), -50%, -500px) rotateY(${dir * -45}deg) scale(0.6)`;
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.filter = 'blur(4px)';
        card.style.pointerEvents = 'none';
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.depth-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    resetProgressAnimation();
  }

  function goToIndex(index) {
    activeIndex = (index + total) % total;
    updateCards();
  }

  function nextSlide() {
    goToIndex(activeIndex + 1);
  }

  function prevSlide() {
    goToIndex(activeIndex - 1);
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (idx !== activeIndex) {
        e.preventDefault();
        goToIndex(idx);
        restartAutoplay();
      }
    });
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    restartAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  stage?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stage?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
      restartAutoplay();
    }
  }, { passive: true });

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    resetProgressAnimation();
    autoplayTimer = setInterval(() => {
      if (!isHovered && !document.hidden) {
        nextSlide();
      }
    }, cycleDuration);
  }

  function restartAutoplay() {
    startAutoplay();
  }

  wrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    if (progressFill) {
      const computedWidth = getComputedStyle(progressFill).width;
      progressFill.style.transition = 'none';
      progressFill.style.width = computedWidth;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    restartAutoplay();
  });

  window.addEventListener('resize', updateCards, { passive: true });

  updateCards();
  startAutoplay();
}

/* =========================================
   DRIFT WALL GALLERY FILTER & INTERACTIONS
   ========================================= */
function initDriftWallGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const driftCards = document.querySelectorAll('.drift-card');

  if (!filterBtns.length || !driftCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      driftCards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        const cats = cat.split(' ');
        if (filterValue === 'all' || cats.includes(filterValue) || cat === filterValue) {
          card.classList.remove('dimmed');
        } else {
          card.classList.add('dimmed');
        }
      });
    });
  });
}

/* =========================================
   PROCESS FANNED BOOK-DECK INTERACTION & RUNNING TRANSITION
   ========================================= */
function initProcessBookDeck() {
  const deck = document.querySelector('.process-book-deck');
  if (!deck) return;

  const cards = Array.from(deck.querySelectorAll('.process-book-card'));
  const dotsContainer = document.querySelector('.process-book-dots');
  if (!cards.length) return;

  let activeIndex = 0;
  const total = cards.length;
  let runningTimer = null;
  let isHovered = false;

  // Build dots if present
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `process-book-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Lihat langkah ${idx + 1}`);
      dot.addEventListener('click', () => {
        flipToStep(idx);
        restartRunning();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function flipToStep(idx) {
    cards.forEach(c => c.classList.remove('is-turning'));
    activeIndex = idx % total;

    const currentCard = cards[activeIndex];
    if (currentCard && !isHovered) {
      currentCard.classList.add('is-turning');
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.process-book-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }
  }

  function nextStep() {
    flipToStep((activeIndex + 1) % total);
  }

  function startRunning() {
    deck.classList.add('is-running');
    if (runningTimer) clearInterval(runningTimer);
    flipToStep(activeIndex);
    runningTimer = setInterval(() => {
      if (!isHovered && !document.hidden) {
        nextStep();
      }
    }, 3600);
  }

  function restartRunning() {
    startRunning();
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      flipToStep(idx);
      restartRunning();
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `translateY(-42px) scale(1.16) perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(0deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  deck.addEventListener('mouseenter', () => {
    isHovered = true;
    cards.forEach(c => c.classList.remove('is-turning'));
  });

  deck.addEventListener('mouseleave', () => {
    isHovered = false;
    restartRunning();
  });

  startRunning();
}

/* =========================================
   ABOUT IMAGE SLIDER (3s Interval)
   ========================================= */
function initAboutSlider() {
  const sliders = qsa('.about-image-wrap');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    const slides = qsa('.about-slide', slider);
    const dots   = qsa('.about-dot', slider);
    if (slides.length <= 1) return;

    let currentIdx = 0;
    let timer = null;
    let isHovered = false;

    function showSlide(index) {
      currentIdx = (index + slides.length) % slides.length;

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentIdx);
      });

      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentIdx);
      });
    }

    function nextSlide() {
      showSlide(currentIdx + 1);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => {
        if (!isHovered && !document.hidden) {
          nextSlide();
        }
      }, 3000);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(idx);
        startTimer();
      });
    });

    const card = slider.closest('.about-electric-card') || slider;
    card.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      startTimer();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    });

    startTimer();
  });
}

/* =========================================
   INIT ON DOM READY
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Init About Image Slider
  initAboutSlider();

  // Init Services 3D Depth Carousel
  initDepthCarousel();

  // Init Drift Wall Gallery
  initDriftWallGallery();

  // Init Process Fanned Book Deck
  initProcessBookDeck();

  // Open first FAQ by default
  const firstFaq = qs('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('active');
    const ans = firstFaq.querySelector('.faq-answer');
    if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
  }
});

