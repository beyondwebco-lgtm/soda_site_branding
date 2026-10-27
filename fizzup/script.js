/**
 * FIZZUP — Modern Craft Soda Landing Page
 * Vanilla JavaScript (No external libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Navigation Sticky & Active Link Tracking
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Toggle sticky navbar style
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ------------------------------------------------------------------------
  // 2. Mobile Menu Toggle
  // ------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  const openMobileMenu = () => {
    navMenu.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileBackdrop.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. Hero Parallax on Mouse Movement (Desktop only & respects reduced-motion)
  // ------------------------------------------------------------------------
  const heroSection = document.getElementById('home');
  const heroCan = document.getElementById('heroCan');
  const heroVisual = document.getElementById('heroVisual');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && heroCan && !prefersReducedMotion && window.innerWidth > 992) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = x * 26; // max parallax tilt px
      targetY = y * 20;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const animateParallax = () => {
      // Linear interpolation for ultra-smooth buttery lag
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (heroCan) {
        heroCan.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentX * 0.25}deg)`;
      }

      requestAnimationFrame(animateParallax);
    };

    requestAnimationFrame(animateParallax);
  }

  // ------------------------------------------------------------------------
  // 4. Scroll-Triggered Reveal Animations (Intersection Observer)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // once revealed, keep visible
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------------
  // 5. Flavour Data & Interactive Modal
  // ------------------------------------------------------------------------
  const flavourData = {
    orange: {
      name: 'Orange Blast',
      badge: 'Signature Flavour',
      color: '#FF6B35',
      imgSrc: 'assets/images/can-orange-blast.svg',
      desc: 'Bursting with juicy, sun-drenched Valencia oranges, mandarin zest, and our signature micro-bubble fizz. Crisp, tangy, and unapologetically bold.',
      notes: 'Valencia Orange • Mandarin Oil • Wild Honeycomb',
      specs: {
        fizz: '9.5 / 10',
        calories: '25 kcal',
        juice: '15% Real Fruit'
      },
      ingredients: 'Sparkling spring water, fresh cold-pressed orange juice, mandarin extract, citric acid, organic agave nectar, natural flavours.'
    },
    berry: {
      name: 'Berry Rush',
      badge: 'Fan Favorite',
      color: '#FF5C8A',
      imgSrc: 'assets/images/can-berry-rush.svg',
      desc: 'An electric blend of freshly crushed raspberries, sun-ripened blackberries, and a delicate touch of floral hibiscus for deep magenta refreshment.',
      notes: 'Raspberry • Ripe Blackberry • Hibiscus Flower',
      specs: {
        fizz: '9.0 / 10',
        calories: '30 kcal',
        juice: '18% Real Fruit'
      },
      ingredients: 'Sparkling spring water, crushed raspberry puree, blackberry juice, brewed hibiscus tea, organic cane sugar, lemon juice.'
    },
    lime: {
      name: 'Lime Twist',
      badge: 'Fresh Drop',
      color: '#B8F36B',
      imgSrc: 'assets/images/can-lime-twist.svg',
      desc: 'The ultimate thirst-quencher. Squeezed Florida Key limes combined with crushed garden mint and a razor-sharp bubble pop that resets your palate.',
      notes: 'Key Lime • Crushed Spearmint • Citrus Peel',
      specs: {
        fizz: '10 / 10',
        calories: '20 kcal',
        juice: '12% Real Fruit'
      },
      ingredients: 'Sparkling spring water, Key lime juice extract, spearmint leaf essence, organic lime peel oils, natural mineral electrolytes.'
    }
  };

  const flavourModal = document.getElementById('flavourModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalButtons = document.querySelectorAll('.open-flavour-modal');
  const flavourQuickLinks = document.querySelectorAll('.flavour-quick-link');

  const openFlavourModal = (flavourKey) => {
    const data = flavourData[flavourKey];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-flavor-header">
        <img src="${data.imgSrc}" alt="${data.name} Can" class="modal-flavor-img">
        <div>
          <span class="modal-flavor-subtitle" style="color: ${data.color};">${data.badge}</span>
          <h3 class="modal-flavor-title" id="modalTitle">${data.name}</h3>
          <p style="font-size: 0.95rem; font-weight: 600; color: #444; margin-top: 4px;">
            <strong>Aroma Notes:</strong> ${data.notes}
          </p>
        </div>
      </div>

      <p style="font-size: 1.05rem; line-height: 1.6; color: #333; margin-bottom: 20px;">
        ${data.desc}
      </p>

      <div class="modal-spec-grid">
        <div class="modal-spec-item">
          <span class="modal-spec-label">Fizz Level</span>
          <span class="modal-spec-val" style="color: ${data.color};">${data.specs.fizz}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">Energy</span>
          <span class="modal-spec-val">${data.specs.calories}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">Real Juice</span>
          <span class="modal-spec-val">${data.specs.juice}</span>
        </div>
      </div>

      <div style="background-color: #fff; padding: 16px; border-radius: 12px; border: 1.5px solid rgba(24,24,24,0.1); margin-bottom: 24px;">
        <h5 style="font-family: var(--font-heading); font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
          Clean Ingredients
        </h5>
        <p style="font-size: 0.85rem; color: #666; line-height: 1.5;">
          ${data.ingredients}
        </p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
        <a href="https://wa.me/918019082307?text=Hi%20FIZZUP!%20I'd%20like%20to%20order%20the%20${encodeURIComponent(data.name)}%20craft%20soda." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 12px 20px; font-size: 0.95rem;">
          <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.26 2.13 7.42L2 30l6.77-2.08C10.84 29.17 13.34 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.34 0-4.55-.71-6.4-1.93l-.46-.3-4.22 1.3 1.32-4.11-.3-.48C4.66 20.08 4 18.09 4 16 4 9.38 9.38 4 16 4s12 5.38 12 12-5.38 11.5-12 11.5zm6.57-8.63c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.96-1.79-2.14-2-2.5-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.06.76.87.28 1.66.24 2.29.15.7-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z"/>
          </svg>
          <span>Order via WhatsApp</span>
        </a>
        <a href="#contact" class="btn btn-primary" onclick="document.getElementById('flavourModal').classList.remove('open'); document.body.style.overflow = '';">
          Inquire Stock
        </a>
      </div>
    `;

    flavourModal.classList.add('open');
    flavourModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Play subtle fizz effect
    playFizzSound();
  };

  const closeFlavourModal = () => {
    flavourModal.classList.remove('open');
    flavourModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      openFlavourModal(target);
    });
  });

  flavourQuickLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      openFlavourModal(target);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeFlavourModal);
  }

  if (flavourModal) {
    flavourModal.addEventListener('click', (e) => {
      if (e.target === flavourModal) {
        closeFlavourModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && flavourModal.classList.contains('open')) {
        closeFlavourModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Interactive Contact Message Form
  // ------------------------------------------------------------------------
  const openQuickFormBtn = document.getElementById('openQuickFormBtn');
  const quickContactForm = document.getElementById('quickContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (openQuickFormBtn && quickContactForm) {
    openQuickFormBtn.addEventListener('click', () => {
      const isHidden = quickContactForm.style.display === 'none';
      quickContactForm.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) {
        document.getElementById('contactName').focus();
        openQuickFormBtn.textContent = 'Hide Form';
      } else {
        openQuickFormBtn.textContent = 'Quick Message';
      }
    });

    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();

      // Show animated success feedback
      formFeedback.textContent = `🫧 Bubbles sent, ${name}! We'll reply within 24 hours.`;
      formFeedback.className = 'form-feedback success';
      quickContactForm.reset();

      playFizzSound();

      setTimeout(() => {
        formFeedback.textContent = '';
      }, 5000);
    });
  }

  // ------------------------------------------------------------------------
  // 7. Web Audio API — Carbonated Fizz Sound Synthesis (Zero External Files!)
  // ------------------------------------------------------------------------
  let audioCtx = null;

  const playFizzSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtx) {
        audioCtx = new AudioContext();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Generate a short crackle / fizzy soda bubble burst
      const bufferSize = audioCtx.sampleRate * 0.45; // 450ms sound
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise with exponential envelope
      for (let i = 0; i < bufferSize; i++) {
        // High frequency fizzy crackle
        const white = Math.random() * 2 - 1;
        const decay = Math.exp(-i / (audioCtx.sampleRate * 0.12));
        data[i] = white * decay * (Math.random() > 0.4 ? 0.35 : 0.05);
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to make it sound like crisp effervescent bubbles
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3800, audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (err) {
      // Audio autoplay policy or not supported - silently ignore
    }
  };

  const fizzSoundBtn = document.getElementById('fizzSoundBtn');
  if (fizzSoundBtn) {
    fizzSoundBtn.addEventListener('click', () => {
      playFizzSound();

      // Fun button micro-animation
      fizzSoundBtn.style.transform = 'scale(1.25) rotate(5deg)';
      setTimeout(() => {
        fizzSoundBtn.style.transform = '';
      }, 200);
    });
  }
});
