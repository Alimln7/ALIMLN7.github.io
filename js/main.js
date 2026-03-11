/* ═══════════════════════════════════════════════════════════════
   Ali Mayladan — Portfolio
   Vanilla JS — Zero Dependencies
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     CONSTANTS & UTILITIES
     ────────────────────────────────────────────────────────────── */

  const NAV_HEIGHT = 72;
  const SCROLL_THRESHOLD = 50;

  /** Easing: easeOutCubic — fast start, slow end */
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /** RAF-based scroll throttle flag */
  let scrollTicking = false;

  /** Passive listener option (feature-detect once) */
  const passiveSupported = (() => {
    let supported = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() { supported = true; return true; }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) { /* ignore */ }
    return supported;
  })();
  const passiveOpt = passiveSupported ? { passive: true } : false;


  /* ──────────────────────────────────────────────────────────────
     1. SCROLL PROGRESS BAR
     ────────────────────────────────────────────────────────────── */

  const initScrollProgress = () => {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    Object.assign(bar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      width: '0%',
      background: 'linear-gradient(90deg, #00d4ff, #7b2ff7)',
      zIndex: '9999',
      pointerEvents: 'none',
      transition: 'width 0.1s linear'
    });
    document.body.prepend(bar);
    return bar;
  };

  const scrollProgressBar = initScrollProgress();

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      scrollProgressBar.style.width = '0%';
      return;
    }
    const pct = Math.min((scrollTop / docHeight) * 100, 100);
    scrollProgressBar.style.width = pct + '%';
  };


  /* ──────────────────────────────────────────────────────────────
     2. NAVIGATION SYSTEM
     ────────────────────────────────────────────────────────────── */

  const navbar = document.getElementById('navbar');
  const navHamburger = document.getElementById('navHamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // --- Sticky nav background ---
  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  // --- Hamburger toggle ---
  const toggleMobileMenu = () => {
    if (!navHamburger || !navMenu) return;
    const isOpen = document.body.classList.toggle('nav-open');
    navHamburger.classList.toggle('active', isOpen);
    navHamburger.setAttribute('aria-expanded', String(isOpen));
  };

  const closeMobileMenu = () => {
    document.body.classList.remove('nav-open');
    if (navHamburger) {
      navHamburger.classList.remove('active');
      navHamburger.setAttribute('aria-expanded', 'false');
    }
  };

  if (navHamburger) {
    navHamburger.addEventListener('click', toggleMobileMenu);
  }

  // --- Nav link click: close menu + smooth scroll ---
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();

      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- Logo click: scroll to top ---
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Hero CTA and any other anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Skip nav links (already handled) and empty hrefs
    if (anchor.classList.contains('nav-link') || anchor.classList.contains('nav-logo')) return;
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return; // let logo handler deal with it
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- Scroll spy with IntersectionObserver ---
  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isMatch);
          });
        }
      });
    },
    {
      rootMargin: `-${NAV_HEIGHT + 1}px 0px -40% 0px`,
      threshold: 0.3
    }
  );

  sections.forEach((section) => scrollSpyObserver.observe(section));


  /* ──────────────────────────────────────────────────────────────
     3. SCROLL REVEAL ANIMATIONS
     ────────────────────────────────────────────────────────────── */

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Stagger children in grids: skill-categories, project-cards, stat-cards
          const parent = el.parentElement;
          if (parent && (
            parent.classList.contains('skills-grid') ||
            parent.classList.contains('projects-grid') ||
            parent.classList.contains('stats-grid')
          )) {
            const siblings = Array.from(parent.querySelectorAll('.reveal'));
            const index = siblings.indexOf(el);
            if (index > 0) {
              el.style.transitionDelay = `${index * 0.08}s`;
            }
          }

          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────────
     4. ANIMATED STAT COUNTERS
     ────────────────────────────────────────────────────────────── */

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target) || target <= 0) return;

    const duration = 2000; // ms
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the .stat-number inside (or the entry itself)
          const card = entry.target;
          const numEl = card.querySelector('.stat-number[data-target]') || card;
          if (numEl.dataset.target) {
            animateCounter(numEl);
          }
          observer.unobserve(card);
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  // Observe each stat-card for counter trigger
  document.querySelectorAll('.stat-card').forEach((card) => {
    statObserver.observe(card);
  });


  /* ──────────────────────────────────────────────────────────────
     5. PROJECT MODAL / SCREENSHOT GALLERY
     ────────────────────────────────────────────────────────────── */

  const modal = document.getElementById('projectModal');
  const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;
  const modalClose = modal ? modal.querySelector('.modal-close') : null;
  const galleryImage = modal ? modal.querySelector('.gallery-image') : null;
  const galleryImageContainer = modal ? modal.querySelector('.gallery-image-container') : null;
  const galleryDots = modal ? modal.querySelector('.gallery-dots') : null;
  const galleryPrev = modal ? modal.querySelector('.gallery-prev') : null;
  const galleryNext = modal ? modal.querySelector('.gallery-next') : null;
  const modalTitle = modal ? modal.querySelector('.modal-title') : null;
  const modalDescription = modal ? modal.querySelector('.modal-description') : null;
  const modalTech = modal ? modal.querySelector('.modal-tech') : null;

  let currentImages = [];
  let currentImageIndex = 0;
  let isTransitioning = false;

  // Touch / swipe state
  let touchStartX = 0;
  let touchStartY = 0;

  const PLACEHOLDER_SRC = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">' +
    '<rect fill="#1a1a2e" width="800" height="450"/>' +
    '<text fill="#555" font-family="sans-serif" font-size="24" text-anchor="middle" x="400" y="225">Screenshot Coming Soon</text>' +
    '</svg>'
  );

  /**
   * Open the modal for a given project card
   */
  const openModal = (card) => {
    if (!modal) return;

    // Parse images from data attribute
    const imagesAttr = card.dataset.images || '';
    currentImages = imagesAttr
      ? imagesAttr.split(',').map((f) => f.trim()).filter(Boolean)
      : [];
    currentImageIndex = 0;

    // Extract info from card
    const title = card.querySelector('.project-title');
    const description = card.querySelector('.project-description');
    const techContainer = card.querySelector('.project-tech');

    if (modalTitle) modalTitle.textContent = title ? title.textContent : '';
    if (modalDescription) modalDescription.textContent = description ? description.textContent : '';
    if (modalTech) modalTech.innerHTML = techContainer ? techContainer.innerHTML : '';

    // Build gallery dots
    if (galleryDots) {
      galleryDots.innerHTML = '';
      if (currentImages.length > 1) {
        currentImages.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `View image ${i + 1}`);
          dot.addEventListener('click', () => goToImage(i));
          galleryDots.appendChild(dot);
        });
      }
    }

    // Show / hide prev/next buttons based on image count
    if (galleryPrev) galleryPrev.style.display = currentImages.length > 1 ? '' : 'none';
    if (galleryNext) galleryNext.style.display = currentImages.length > 1 ? '' : 'none';

    // Load first image
    setGalleryImage(0, false);

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  };

  /**
   * Close the modal
   */
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  /**
   * Set gallery image by index, with optional fade transition
   */
  const setGalleryImage = (index, animate = true) => {
    if (!galleryImage || currentImages.length === 0) {
      if (galleryImage) galleryImage.src = PLACEHOLDER_SRC;
      return;
    }

    // Clamp / wrap index
    index = ((index % currentImages.length) + currentImages.length) % currentImages.length;
    currentImageIndex = index;

    const src = 'assets/projects/' + currentImages[index];

    if (animate && !isTransitioning) {
      isTransitioning = true;
      galleryImage.style.opacity = '0';

      setTimeout(() => {
        galleryImage.src = src;
        galleryImage.alt = currentImages[index];
        galleryImage.onerror = () => { galleryImage.src = PLACEHOLDER_SRC; };
        galleryImage.style.opacity = '1';
        isTransitioning = false;
      }, 200);
    } else if (!animate) {
      galleryImage.src = src;
      galleryImage.alt = currentImages[index];
      galleryImage.onerror = () => { galleryImage.src = PLACEHOLDER_SRC; };
      galleryImage.style.opacity = '1';
    }

    // Update dots
    if (galleryDots) {
      const dots = galleryDots.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  };

  const goToImage = (index) => setGalleryImage(index, true);
  const nextImage = () => setGalleryImage(currentImageIndex + 1, true);
  const prevImage = () => setGalleryImage(currentImageIndex - 1, true);

  // --- Event delegation for project cards ---
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.addEventListener('click', (e) => {
      // Check if clicked on overlay or view-btn
      const viewBtn = e.target.closest('.project-view-btn');
      const overlay = e.target.closest('.project-overlay');
      if (viewBtn || overlay) {
        const card = e.target.closest('.project-card');
        if (card && card.dataset.images) {
          openModal(card);
        }
      }
    });
  }

  // --- Modal navigation buttons ---
  if (galleryPrev) galleryPrev.addEventListener('click', prevImage);
  if (galleryNext) galleryNext.addEventListener('click', nextImage);

  // --- Close modal ---
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // --- Keyboard navigation ---
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  });

  // --- Touch / swipe support ---
  if (galleryImageContainer) {
    galleryImageContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, passiveOpt);

    galleryImageContainer.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      // Only trigger swipe if horizontal movement is dominant
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }, passiveOpt);
  }


  /* ──────────────────────────────────────────────────────────────
     6. CONTACT FORM ENHANCEMENT
     ────────────────────────────────────────────────────────────── */

  const contactForm = document.querySelector('.contact-form');
  const formInputs = document.querySelectorAll('.form-input');

  // --- Focus / blur animations ---
  formInputs.forEach((input) => {
    const group = input.closest('.form-group');
    if (!group) return;

    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      group.classList.remove('focused');
      if (input.value.trim() !== '') {
        group.classList.add('has-value');
      } else {
        group.classList.remove('has-value');
      }
    });

    // Set initial state if pre-filled (e.g., browser autofill)
    if (input.value.trim() !== '') {
      group.classList.add('has-value');
    }
  });

  // --- Form submit handler ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const action = contactForm.getAttribute('action') || '';
      const isPlaceholder = action.includes('placeholder') || action === '#' || action === '';

      if (isPlaceholder) {
        e.preventDefault();

        // Show success message
        const submitBtn = contactForm.querySelector('.btn-submit');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Message Sent!';
          submitBtn.classList.add('btn-success');
          submitBtn.disabled = true;

          // Reset after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.disabled = false;
            contactForm.reset();

            // Clear has-value classes
            formInputs.forEach((input) => {
              const group = input.closest('.form-group');
              if (group) group.classList.remove('has-value');
            });
          }, 3000);
        }
      }

      // If it's a real Formspree endpoint, let the form submit naturally.
      // Add a subtle button animation either way.
      const submitBtn = contactForm.querySelector('.btn-submit');
      if (submitBtn) {
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          submitBtn.style.transform = '';
        }, 150);
      }
    });
  }


  /* ──────────────────────────────────────────────────────────────
     7. UNIFIED SCROLL HANDLER (throttled via rAF)
     ────────────────────────────────────────────────────────────── */

  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      updateNavbar();
      updateScrollProgress();
      scrollTicking = false;
    });
  };

  window.addEventListener('scroll', onScroll, passiveOpt);

  // Fire once immediately for initial state
  updateNavbar();
  updateScrollProgress();


  /* ──────────────────────────────────────────────────────────────
     8. HERO PARALLAX (subtle — optional, performance-safe)
     ────────────────────────────────────────────────────────────── */

  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    const updateParallax = () => {
      if (window.scrollY > heroHeight) return; // no work when past hero
      const offset = window.scrollY * 0.3;
      heroContent.style.transform = `translateY(${offset}px)`;
      heroContent.style.opacity = Math.max(1 - window.scrollY / (heroHeight * 0.8), 0);
    };

    // Piggyback on the scroll handler
    const originalOnScroll = onScroll;
    window.removeEventListener('scroll', originalOnScroll, passiveOpt);

    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;

      requestAnimationFrame(() => {
        updateNavbar();
        updateScrollProgress();
        updateParallax();
        scrollTicking = false;
      });
    }, passiveOpt);

    // Initial call
    updateParallax();
  }


  /* ──────────────────────────────────────────────────────────────
     9. CLOSE MOBILE NAV ON OUTSIDE CLICK
     ────────────────────────────────────────────────────────────── */

  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('nav-open')) return;
    const isInsideMenu = e.target.closest('#navMenu');
    const isHamburger = e.target.closest('#navHamburger');
    if (!isInsideMenu && !isHamburger) {
      closeMobileMenu();
    }
  });


  /* ──────────────────────────────────────────────────────────────
     10. CLEANUP ON PAGE UNLOAD
     ────────────────────────────────────────────────────────────── */

  window.addEventListener('beforeunload', () => {
    // Disconnect all observers to free resources
    scrollSpyObserver.disconnect();
    revealObserver.disconnect();
    statObserver.disconnect();
  });


  /* ──────────────────────────────────────────────────────────────
     11. GALLERY IMAGE TRANSITION STYLE (injected once)
     ────────────────────────────────────────────────────────────── */

  if (galleryImage) {
    galleryImage.style.transition = 'opacity 0.2s ease';
  }


  /* ──────────────────────────────────────────────────────────────
     12. ACCESSIBILITY: Respect prefers-reduced-motion
     ────────────────────────────────────────────────────────────── */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Instantly reveal all elements without animation
    revealElements.forEach((el) => {
      el.classList.add('revealed');
      el.style.transitionDelay = '0s';
      el.style.transitionDuration = '0s';
    });

    // Instantly set stat counters to final value
    statNumbers.forEach((el) => {
      el.textContent = el.dataset.target;
    });

    // Disable hero parallax
    if (heroContent) {
      heroContent.style.transform = '';
      heroContent.style.opacity = '';
    }
  }

});
