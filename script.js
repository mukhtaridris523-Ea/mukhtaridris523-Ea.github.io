/* ============================================
   MUKHTAR IDRIS — PORTFOLIO SCRIPTS
   Features: Scroll reveal, Sticky nav,
             Mobile menu, Highlight card index
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: add .scrolled class on scroll ── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load in case page is refreshed mid-scroll


  /* ── 2. MOBILE NAV TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      // prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for very old browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }


  /* ── 4. HIGHLIGHT CARDS: set CSS --i for staggered animation ── */
  document.querySelectorAll('.highlight-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
  });


  /* ── 5. SMOOTH ACTIVE NAV LINK HIGHLIGHT on scroll ── */
  const sections   = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const activateLink = (id) => {
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  };

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activateLink(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(s => sectionObserver.observe(s));
  }


  /* ── 6. TOOL PILLS: subtle entrance animation ── */
  const toolsGrid = document.querySelector('.tools-grid');

  if (toolsGrid) {
    const pillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const pills = entry.target.querySelectorAll('.tool-pill');
            pills.forEach((pill, i) => {
              pill.style.transitionDelay = `${i * 60}ms`;
              pill.style.opacity = '1';
              pill.style.transform = 'translateY(0)';
            });
            pillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Set initial state
    toolsGrid.querySelectorAll('.tool-pill').forEach(pill => {
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(16px)';
      pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease';
    });

    pillObserver.observe(toolsGrid);
  }

});
