(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // External http(s) links: always open in a new tab (same-site / relative / # / mailto / tel unchanged)
  (function normalizeExternalLinks() {
    var originHost = window.location.hostname;
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || !href.trim()) return;
      var trimmed = href.trim();
      if (trimmed.charAt(0) === '#' || trimmed.charAt(0) === '?') return;
      if (trimmed.indexOf('/') === 0 && trimmed.indexOf('//') !== 0) return;
      if (/^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) return;
      if (/^javascript:/i.test(trimmed)) return;
      var url;
      try {
        url = new URL(trimmed, window.location.href);
      } catch (e) {
        return;
      }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      if (url.hostname === originHost) return;
      a.setAttribute('target', '_blank');
      var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer');
      a.setAttribute('rel', rel.join(' '));
    });
  })();

  // Smooth anchor scroll with sticky-header offset
  function getHeaderOffset() {
    var header = document.querySelector('.header');
    return header ? header.offsetHeight : 0;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      var targetEl = document.querySelector(targetId);
      if (!targetEl) {
        return;
      }

      event.preventDefault();
      var offset = getHeaderOffset() + 8;
      var targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  // Section/card entry animations — homepage / LP mirror layout (body.home-reveal-animate)
  /* Exclude .hero: transform/opacity reveal creates a stacking context that hides .hero-bg.
     Exclude .stats-thin and .unique-points: transform-based reveal causes 1px white hairlines between full-bleed sections.
     Exclude .projects-gallery-section: it contains position:fixed lightbox; any ancestor transform breaks fixed positioning. */
  var revealTargets = [];
  if (document.body && document.body.classList.contains('home-reveal-animate')) {
    revealTargets = Array.prototype.slice.call(
      document.querySelectorAll(
        'main > section:not(.hero, .stats-thin, .unique-points, .projects-gallery-section), footer > section, .service-card, .result-item, .testimonial, .team-card, .faq-item'
      )
    );
  }

  if (revealTargets.length) {
    revealTargets.forEach(function (el, index) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = Math.min((index % 8) * 60, 300) + 'ms';
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) {
        el.classList.add('is-visible');
        el.style.transitionDelay = '0ms';
      });
    } else {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      revealTargets.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var mobileBreakpoint = window.matchMedia('(max-width: 1120px)');

  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');

    function closeMobileNav() {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-label', 'Open menu');
      navToggle.setAttribute('aria-expanded', 'false');
      nav.querySelectorAll('[data-nav-dropdown]').forEach(function (dd) {
        dd.classList.remove('is-open');
        var t = dd.querySelector('.nav-dropdown-toggle');
        if (t) {
          t.setAttribute('aria-expanded', 'false');
        }
      });
    }

    navToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      var isOpen = nav.classList.contains('is-open');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Mobile: tap Services / About to expand submenus (desktop uses hover)
    nav.querySelectorAll('[data-nav-dropdown]').forEach(function (dropdown) {
      var toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function (e) {
        if (!mobileBreakpoint.matches) {
          return;
        }
        e.stopPropagation();
        var opening = !dropdown.classList.contains('is-open');
        nav.querySelectorAll('[data-nav-dropdown]').forEach(function (other) {
          if (other !== dropdown) {
            other.classList.remove('is-open');
            var ot = other.querySelector('.nav-dropdown-toggle');
            if (ot) ot.setAttribute('aria-expanded', 'false');
          }
        });
        dropdown.classList.toggle('is-open', opening);
        toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
      });
    });

    // Close nav when a link is clicked (for anchor links)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileNav();
      });
    });

    // Close mobile nav when switching to desktop layout
    function handleViewportChange() {
      if (!mobileBreakpoint.matches) {
        closeMobileNav();
      }
    }

    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener('change', handleViewportChange);
    } else if (mobileBreakpoint.addListener) {
      mobileBreakpoint.addListener(handleViewportChange);
    }

    // Escape key closes the open mobile nav
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  // Projects carousel controls
  var projectsCarousel = document.getElementById('projects-carousel');
  var prevBtn = document.getElementById('projects-prev');
  var nextBtn = document.getElementById('projects-next');

  if (projectsCarousel && prevBtn && nextBtn) {
    var slides = Array.prototype.slice.call(projectsCarousel.querySelectorAll('.project-slide'));
    var activeIndex = 0;
    var dragStartX = null;
    var dragDeltaX = 0;
    var didDrag = false;
    var suppressNextClick = false;

    function applySliderState() {
      slides.forEach(function (slide) {
        slide.classList.remove('project-prev', 'project-active', 'project-next');
      });

      var prevIndex = (activeIndex - 1 + slides.length) % slides.length;
      var nextIndex = (activeIndex + 1) % slides.length;

      slides[prevIndex].classList.add('project-prev');
      slides[activeIndex].classList.add('project-active');
      slides[nextIndex].classList.add('project-next');
    }

    prevBtn.addEventListener('click', function () {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
      applySliderState();
    });

    nextBtn.addEventListener('click', function () {
      activeIndex = (activeIndex + 1) % slides.length;
      applySliderState();
    });

    projectsCarousel.addEventListener('click', function (event) {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }

      var clickedSlide = event.target.closest('.project-slide');
      if (clickedSlide && clickedSlide.classList.contains('project-prev')) {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        applySliderState();
        return;
      }

      if (clickedSlide && clickedSlide.classList.contains('project-next')) {
        activeIndex = (activeIndex + 1) % slides.length;
        applySliderState();
        return;
      }

      // Fallback: click left/right side of carousel to move
      var rect = projectsCarousel.getBoundingClientRect();
      var clickX = event.clientX - rect.left;
      var centerX = rect.width / 2;
      var deadZone = rect.width * 0.18;

      if (clickX < centerX - deadZone) {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        applySliderState();
      } else if (clickX > centerX + deadZone) {
        activeIndex = (activeIndex + 1) % slides.length;
        applySliderState();
      }
    });

    function handleDragStart(clientX) {
      dragStartX = clientX;
      dragDeltaX = 0;
      didDrag = false;
    }

    function handleDragMove(clientX) {
      if (dragStartX === null) {
        return;
      }
      dragDeltaX = clientX - dragStartX;
      if (Math.abs(dragDeltaX) > 30) {
        didDrag = true;
      }
    }

    function handleDragEnd() {
      if (dragStartX === null) {
        return;
      }

      var swipeThreshold = 45;
      if (dragDeltaX <= -swipeThreshold) {
        activeIndex = (activeIndex + 1) % slides.length;
        applySliderState();
        suppressNextClick = true;
      } else if (dragDeltaX >= swipeThreshold) {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        applySliderState();
        suppressNextClick = true;
      }

      dragStartX = null;
      dragDeltaX = 0;
      setTimeout(function () {
        didDrag = false;
      }, 0);
    }

    projectsCarousel.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('dragstart', function (event) {
        event.preventDefault();
      });
    });

    projectsCarousel.addEventListener('pointerdown', function (event) {
      handleDragStart(event.clientX);
      if (projectsCarousel.setPointerCapture) {
        projectsCarousel.setPointerCapture(event.pointerId);
      }
    });

    projectsCarousel.addEventListener('pointermove', function (event) {
      handleDragMove(event.clientX);
    });

    projectsCarousel.addEventListener('pointerup', function () {
      handleDragEnd();
    });

    projectsCarousel.addEventListener('pointercancel', function () {
      handleDragEnd();
    });

    applySliderState();
  }

  // Reviews carousel (LP pages) — pages of 4 testimonials
  var reviewsCarousel = document.getElementById('reviews-carousel');
  if (reviewsCarousel) {
    var reviewPages = Array.prototype.slice.call(
      reviewsCarousel.querySelectorAll('.reviews-carousel-page')
    );
    var reviewPrev = document.getElementById('reviews-prev');
    var reviewNext = document.getElementById('reviews-next');
    var reviewDots = Array.prototype.slice.call(
      reviewsCarousel.querySelectorAll('.reviews-carousel-dot')
    );
    var reviewPageIndex = 0;

    function setReviewPage(nextIndex) {
      if (!reviewPages.length) return;
      reviewPageIndex = (nextIndex + reviewPages.length) % reviewPages.length;
      reviewPages.forEach(function (page, i) {
        var active = i === reviewPageIndex;
        page.classList.toggle('is-active', active);
        page.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      reviewDots.forEach(function (dot, i) {
        var active = i === reviewPageIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    if (reviewPrev) {
      reviewPrev.addEventListener('click', function () {
        setReviewPage(reviewPageIndex - 1);
      });
    }
    if (reviewNext) {
      reviewNext.addEventListener('click', function () {
        setReviewPage(reviewPageIndex + 1);
      });
    }
    reviewDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var page = parseInt(dot.getAttribute('data-page') || '0', 10);
        if (!isNaN(page)) setReviewPage(page);
      });
    });
  }

  // FAQ accordion — JS max-height animation (reliable every toggle; native <details> fights CSS height)
  var faqRoot = document.querySelector('[data-faq-accordion]');
  if (faqRoot) {
    var faqItems = Array.prototype.slice.call(faqRoot.querySelectorAll('.faq-item'));

    function faqOuter(item) {
      return item.querySelector('.faq-answer-outer');
    }
    function faqInner(item) {
      return item.querySelector('.faq-answer');
    }
    function faqBtn(item) {
      return item.querySelector('.faq-summary');
    }

    function faqOpen(item) {
      var outer = faqOuter(item);
      var inner = faqInner(item);
      var btn = faqBtn(item);
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      outer.setAttribute('aria-hidden', 'false');

      if (prefersReducedMotion) {
        outer.style.maxHeight = 'none';
        return;
      }

      outer.style.maxHeight = '0px';
      void outer.offsetHeight;
      outer.style.maxHeight = inner.scrollHeight + 'px';

      outer.addEventListener(
        'transitionend',
        function faqOpenEnd(e) {
          if (e.propertyName !== 'max-height') return;
          if (!item.classList.contains('is-open')) return;
          outer.style.maxHeight = 'none';
          outer.removeEventListener('transitionend', faqOpenEnd);
        },
        { once: true }
      );
    }

    function faqClose(item) {
      var outer = faqOuter(item);
      var inner = faqInner(item);
      var btn = faqBtn(item);

      if (!item.classList.contains('is-open')) {
        outer.style.maxHeight = '0px';
        return;
      }

      if (prefersReducedMotion) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        outer.setAttribute('aria-hidden', 'true');
        outer.style.maxHeight = '0px';
        return;
      }

      var h = inner.scrollHeight;
      outer.style.maxHeight = h + 'px';
      void outer.offsetHeight;
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      outer.setAttribute('aria-hidden', 'true');
      requestAnimationFrame(function () {
        outer.style.maxHeight = '0px';
      });
    }

    faqItems.forEach(function (item) {
      faqOuter(item).style.maxHeight = '0px';
    });

    faqItems.forEach(function (item) {
      faqBtn(item).addEventListener('click', function () {
        if (item.classList.contains('is-open')) {
          faqClose(item);
          return;
        }
        faqItems.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            faqClose(other);
          }
        });
        faqOpen(item);
      });
    });

    var faqResizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(faqResizeTimer);
      faqResizeTimer = setTimeout(function () {
        faqItems.forEach(function (item) {
          if (!item.classList.contains('is-open')) return;
          var outer = faqOuter(item);
          var inner = faqInner(item);
          if (outer.style.maxHeight === 'none') {
            outer.style.maxHeight = inner.scrollHeight + 'px';
            void outer.offsetHeight;
            outer.style.maxHeight = 'none';
          }
        });
      }, 150);
    });
  }

  // Hero typed service text: phrases from #homepage-typed-phrases (Sanity → Astro JSON)
  var typedEl = document.getElementById('hero-typed-text');
  var phrases = [];
  var typedCfg = document.getElementById('homepage-typed-phrases');
  var typedFallback =
    typedCfg && typedCfg.getAttribute('data-fallback-phrase')
      ? String(typedCfg.getAttribute('data-fallback-phrase')).trim()
      : '';
  if (typedCfg && typedCfg.textContent) {
    try {
      var parsedPhrases = JSON.parse(typedCfg.textContent);
      if (Array.isArray(parsedPhrases) && parsedPhrases.length) {
        phrases = parsedPhrases;
      }
    } catch (e) { /* ignore invalid JSON */ }
  }
  if (typedEl && !prefersReducedMotion && phrases.length) {
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function runTypeCycle() {
      var currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        charIndex += 1;
        typedEl.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(runTypeCycle, 900);
          return;
        }
      } else {
        charIndex -= 1;
        typedEl.textContent = currentPhrase.slice(0, Math.max(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(runTypeCycle, 220);
          return;
        }
      }

      setTimeout(runTypeCycle, isDeleting ? 40 : 85);
    }

    runTypeCycle();
  } else if (typedEl) {
    typedEl.textContent = phrases[0] || typedFallback || '';
  }

  /** Lead-form phone only (not sitewide NAP): US 10-digit / +1 → NNN-NNN-NNNN. */
  function formatUsPhoneDashes(value) {
    var d = String(value || '').replace(/\D/g, '');
    if (d.length === 11 && d.charAt(0) === '1') {
      d = d.slice(1);
    }
    if (d.length === 10) {
      return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
    }
    return String(value || '').trim();
  }

  /** As user types / pastes: US digits only, max 10 → NNN-NNN-NNNN (partial while typing). */
  function formatPhoneInputLive(el) {
    var d = el.value.replace(/\D/g, '');
    if (d.length >= 11 && d.charAt(0) === '1') {
      d = d.slice(1);
    }
    d = d.slice(0, 10);
    var out = '';
    if (d.length <= 3) {
      out = d;
    } else if (d.length <= 6) {
      out = d.slice(0, 3) + '-' + d.slice(3);
    } else {
      out = d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
    }
    el.value = out;
  }

  // Lead forms → POST /api/lead (Zapier on server)
  var formsCfgEl = document.getElementById('site-forms-config');
  var leadForms = Array.prototype.slice.call(document.querySelectorAll('form[data-lead-form]'));

  function readFormsConfig() {
    var defaults = { submitPath: '/api/lead', recaptchaSiteKey: '', mapboxToken: '' };
    if (!formsCfgEl || !formsCfgEl.textContent) {
      return defaults;
    }
    try {
      var parsed = JSON.parse(formsCfgEl.textContent);
      if (parsed && typeof parsed === 'object') {
        return {
          submitPath: typeof parsed.submitPath === 'string' && parsed.submitPath ? parsed.submitPath : defaults.submitPath,
          recaptchaSiteKey: typeof parsed.recaptchaSiteKey === 'string' ? parsed.recaptchaSiteKey : '',
          mapboxToken: typeof parsed.mapboxToken === 'string' ? parsed.mapboxToken : ''
        };
      }
    } catch (e) {
      /* keep defaults */
    }
    return defaults;
  }

  function setStatus(form, message, kind) {
    var el = form.querySelector('[data-lead-form-status]');
    if (!el) return;
    el.textContent = message || '';
    el.classList.remove('is-error', 'is-success');
    if (kind === 'error') el.classList.add('is-error');
    if (kind === 'success') el.classList.add('is-success');
  }

  function parseDocumentCookies() {
    var out = {};
    var raw = String(document.cookie || '');
    if (!raw) return out;
    raw.split(';').forEach(function (part) {
      var seg = String(part || '').trim();
      if (!seg) return;
      var eq = seg.indexOf('=');
      if (eq <= 0) return;
      var key = decodeURIComponent(seg.slice(0, eq).trim());
      var val = decodeURIComponent(seg.slice(eq + 1).trim());
      out[key] = val;
    });
    return out;
  }

  var ATTR_TTL_DAYS = 90;
  var ATTR_TTL_MS = ATTR_TTL_DAYS * 24 * 60 * 60 * 1000;
  var ATTR_COOKIE_PREFIX = 'sgt_';
  var ATTR_LS_KEY = 'sgt_attribution_v1';
  var ATTR_CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'];
  var ATTR_UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_id',
    'utm_content',
    'utm_term'
  ];
  var ATTR_LONG_KEYS = ['first_page', 'landing_page', 'signup_page', 'referrer', 'captured_at'];
  var ATTR_HIDDEN_FIELDS = ATTR_CLICK_KEYS.concat(ATTR_UTM_KEYS).concat(ATTR_LONG_KEYS);

  function isTrackingDebugEnabled() {
    try {
      var qs = new URLSearchParams(window.location.search || '');
      if (qs.get('tracking_debug') === '1') {
        try {
          window.sessionStorage.setItem('sgt_tracking_debug', '1');
        } catch (e) {
          /* ignore */
        }
        return true;
      }
      try {
        return window.sessionStorage.getItem('sgt_tracking_debug') === '1';
      } catch (e2) {
        return false;
      }
    } catch (e3) {
      return false;
    }
  }

  var trackingDebug = isTrackingDebugEnabled();

  function trackingDebugLog() {
    if (!trackingDebug || !window.console) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[tracking_debug]');
    if (typeof console.log === 'function') console.log.apply(console, args);
  }

  function setCookie(name, value, days) {
    if (!name) return;
    var maxAge = Math.max(0, Math.floor(Number(days || ATTR_TTL_DAYS) * 24 * 60 * 60));
    var secure =
      typeof window.location.protocol === 'string' && window.location.protocol === 'https:'
        ? '; secure'
        : '';
    document.cookie =
      encodeURIComponent(name) +
      '=' +
      encodeURIComponent(String(value || '')) +
      '; path=/; max-age=' +
      String(maxAge) +
      '; samesite=lax' +
      secure;
  }

  function getCookie(name) {
    var all = parseDocumentCookies();
    return all[name] || '';
  }

  function readAttrCookie(key) {
    return getCookie(ATTR_COOKIE_PREFIX + key).trim();
  }

  function emptyAttribution() {
    return {
      gclid: '',
      gbraid: '',
      wbraid: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_id: '',
      utm_content: '',
      utm_term: '',
      first_page: '',
      landing_page: '',
      signup_page: '',
      referrer: '',
      captured_at: ''
    };
  }

  function readLocalStorageBlob() {
    try {
      var raw = window.localStorage.getItem(ATTR_LS_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (parsed.expiresAt && Date.now() > Number(parsed.expiresAt)) {
        window.localStorage.removeItem(ATTR_LS_KEY);
        return null;
      }
      return parsed.values && typeof parsed.values === 'object' ? parsed.values : parsed;
    } catch (e) {
      return null;
    }
  }

  function writeLocalStorageBlob(values) {
    try {
      window.localStorage.setItem(
        ATTR_LS_KEY,
        JSON.stringify({
          expiresAt: Date.now() + ATTR_TTL_MS,
          values: values
        })
      );
    } catch (e) {
      /* private mode / quota */
    }
  }

  function fieldMaxLen(key) {
    return ATTR_LONG_KEYS.indexOf(key) !== -1 ? 2000 : 500;
  }

  function writeAttrCookie(key, value) {
    var trimmed = String(value || '').trim();
    if (!trimmed) return;
    setCookie(ATTR_COOKIE_PREFIX + key, trimmed.slice(0, fieldMaxLen(key)), ATTR_TTL_DAYS);
  }

  function readStoredValue(key) {
    var fromCookie = readAttrCookie(key);
    if (fromCookie) return fromCookie.slice(0, fieldMaxLen(key));
    var blob = readLocalStorageBlob();
    if (blob && blob[key]) return String(blob[key]).trim().slice(0, fieldMaxLen(key));
    return '';
  }

  function persistAttribution(values) {
    Object.keys(values || {}).forEach(function (key) {
      if (values[key]) writeAttrCookie(key, values[key]);
    });
    writeLocalStorageBlob(values);
    try {
      window.__sgtAttribution = values;
    } catch (e) {
      /* ignore */
    }
  }

  /**
   * Shared Google Ads attribution utility.
   * Captures click IDs + UTMs from the URL, first landing URL + timestamp + referrer,
   * and persists 90 days in first-party cookies + localStorage.
   * Never overwrites a stored click ID with empty; a new non-empty click ID replaces the old one.
   * Never invents a gclid.
   */
  function captureAndGetAttribution() {
    var qs = new URLSearchParams(window.location.search || '');
    var out = emptyAttribution();
    var newClickId = false;

    ATTR_CLICK_KEYS.concat(ATTR_UTM_KEYS).forEach(function (key) {
      var fromQuery = (qs.get(key) || '').trim();
      var stored = readStoredValue(key);
      if (fromQuery) {
        out[key] = fromQuery.slice(0, 500);
        if (ATTR_CLICK_KEYS.indexOf(key) !== -1 && fromQuery !== stored) {
          newClickId = true;
        }
        return;
      }
      if (stored) {
        out[key] = stored.slice(0, 500);
      }
    });

    var storedLanding =
      readStoredValue('landing_page') ||
      readStoredValue('signup_page') ||
      readStoredValue('first_landing_url') ||
      readStoredValue('first_page') ||
      readStoredValue('first_landing_path');
    var storedReferrer = readStoredValue('referrer') || readStoredValue('first_referrer');
    var storedCapturedAt = readStoredValue('captured_at');

    if (!storedLanding) {
      try {
        var href = typeof window.location.href === 'string' ? window.location.href : '';
        var full = href.slice(0, 2000);
        out.landing_page = full;
        out.signup_page = full;
        out.first_page = full;
        writeAttrCookie('first_landing_url', full);
        writeAttrCookie('first_landing_path', full);
      } catch (e) {
        /* ignore */
      }
    } else {
      var landing = storedLanding.slice(0, 2000);
      out.landing_page = landing;
      out.signup_page = (readStoredValue('signup_page') || landing).slice(0, 2000);
      out.first_page = landing;
    }

    if (!storedReferrer) {
      try {
        var ref = typeof document.referrer === 'string' ? document.referrer : '';
        out.referrer = ref.slice(0, 2000);
        writeAttrCookie('first_referrer', out.referrer);
      } catch (e2) {
        /* ignore */
      }
    } else {
      out.referrer = storedReferrer.slice(0, 2000);
    }

    if (!storedCapturedAt || newClickId) {
      out.captured_at = new Date().toISOString();
    } else {
      out.captured_at = storedCapturedAt.slice(0, 2000);
    }

    persistAttribution(out);
    return out;
  }

  /** @deprecated Use captureAndGetAttribution — kept as thin alias for clarity at call sites. */
  function getPersistedUtmParams() {
    var a = captureAndGetAttribution();
    return {
      utm_source: a.utm_source,
      utm_medium: a.utm_medium,
      utm_campaign: a.utm_campaign,
      utm_term: a.utm_term,
      utm_id: a.utm_id,
      utm_content: a.utm_content
    };
  }

  function getPersistedFirstTouch() {
    var a = captureAndGetAttribution();
    return {
      first_landing_url: a.landing_page || readStoredValue('first_landing_url'),
      first_landing_path: a.first_page || readStoredValue('first_landing_path'),
      first_referrer: a.referrer || readStoredValue('first_referrer'),
      first_page: a.first_page,
      landing_page: a.landing_page,
      signup_page: a.signup_page,
      captured_at: a.captured_at,
      referrer: a.referrer
    };
  }

  function ensureAttributionHiddenFields(form) {
    if (!form) return;
    ATTR_HIDDEN_FIELDS.forEach(function (name) {
      var existing = form.querySelector('input[type="hidden"][name="' + name + '"]');
      if (existing) return;
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = '';
      form.appendChild(input);
    });
  }

  function populateAttributionHiddenFields(form, attribution) {
    if (!form || !attribution) return false;
    ensureAttributionHiddenFields(form);
    var ok = true;
    ATTR_HIDDEN_FIELDS.forEach(function (name) {
      var input = form.querySelector('input[name="' + name + '"]');
      if (!input) {
        ok = false;
        return;
      }
      input.value = attribution[name] != null ? String(attribution[name]) : '';
    });
    return ok;
  }

  function fillExistingAttributionInputs(root, attribution) {
    if (!root || !attribution) return;
    ATTR_HIDDEN_FIELDS.forEach(function (name) {
      var nodes = root.querySelectorAll('input[name="' + name + '"]');
      Array.prototype.forEach.call(nodes, function (input) {
        input.value = attribution[name] != null ? String(attribution[name]) : '';
      });
    });
  }

  function populateAllLeadForms(attribution) {
    var attr = attribution || captureAndGetAttribution();
    document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
      populateAttributionHiddenFields(form, attr);
    });
    document.querySelectorAll('form').forEach(function (form) {
      if (form.hasAttribute('data-lead-form')) return;
      fillExistingAttributionInputs(form, attr);
    });
    passAttributionToCallRail(attr);
    return attr;
  }

  /**
   * CallRail DNI reads gclid from the landing URL when swap.js loads on first visit.
   * Call-only leads are out of scope unless CallRail's own session captured the click ID.
   * We expose stored values on window.__sgtAttribution; CallRail does not document a
   * supported custom-field API on this swap.js snippet, so we do not invent a GCLID for calls.
   */
  function passAttributionToCallRail(attribution) {
    try {
      window.__sgtAttribution = attribution;
      if (window.CallTrk && typeof window.CallTrk.swap === 'function' && attribution && attribution.gclid) {
        window.CallTrk.swap();
      }
    } catch (e) {
      /* ignore */
    }
  }

  function runTrackingDebugReport(attribution) {
    if (!trackingDebug || !window.console) return;
    var qs = new URLSearchParams(window.location.search || '');
    var callrailScript = !!document.querySelector('script[src*="cdn.callrail.com"]');
    var telLinks = Array.prototype.slice.call(document.querySelectorAll('a[href^="tel:"]'));
    var phoneTexts = [];
    telLinks.forEach(function (a) {
      phoneTexts.push({
        href: a.getAttribute('href') || '',
        text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40)
      });
    });
    var originalPhoneFound = telLinks.length > 0;

    trackingDebugLog('Current URL:', typeof window.location.href === 'string' ? window.location.href : '');
    trackingDebugLog('Current query parameters:', window.location.search || '');
    trackingDebugLog('GCLID found in URL:', (qs.get('gclid') || '') || '(none)');
    trackingDebugLog('GBRAID found in URL:', (qs.get('gbraid') || '') || '(none)');
    trackingDebugLog('WBRAID found in URL:', (qs.get('wbraid') || '') || '(none)');
    trackingDebugLog('Stored attribution values:', attribution);
    trackingDebugLog('Original landing page (landing_page):', attribution.landing_page || '(empty)');
    trackingDebugLog('First capture timestamp (captured_at):', attribution.captured_at || '(empty)');
    trackingDebugLog('Original referrer:', attribution.referrer || '(empty)');
    trackingDebugLog('CallRail script loaded:', callrailScript ? 'yes' : 'no');
    trackingDebugLog('Original phone number found:', originalPhoneFound ? 'yes' : 'no');
    trackingDebugLog('Phone numbers / tel: links (post-load snapshot):', phoneTexts);

    // Re-check after CallRail has had time to swap
    window.setTimeout(function () {
      var after = Array.prototype.slice.call(document.querySelectorAll('a[href^="tel:"]')).map(function (a) {
        return {
          href: a.getAttribute('href') || '',
          text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40)
        };
      });
      trackingDebugLog('Phone number after CallRail runs (~2.5s):', after);
    }, 2500);
  }

  // Persist attribution on every page load (even pages without forms).
  var persistedAttribution = captureAndGetAttribution();
  populateAllLeadForms(persistedAttribution);
  if (trackingDebug) {
    runTrackingDebugReport(persistedAttribution);
  }

  function onClientRouteChange() {
    populateAllLeadForms(captureAndGetAttribution());
  }
  window.addEventListener('popstate', onClientRouteChange);
  window.addEventListener('hashchange', onClientRouteChange);

  function setFieldLabelText(input, text) {
    if (!input || !input.id) return;
    var label = document.querySelector('label[for="' + input.id + '"]');
    if (!label) return;
    var firstNode = null;
    for (var i = 0; i < label.childNodes.length; i += 1) {
      if (label.childNodes[i] && label.childNodes[i].nodeType === 3) {
        firstNode = label.childNodes[i];
        break;
      }
    }
    var normalized = text + ' ';
    if (firstNode) {
      firstNode.nodeValue = normalized;
    } else {
      label.insertBefore(document.createTextNode(normalized), label.firstChild || null);
    }
  }

  function buildFieldLabel(id, text, requiredMark) {
    var label = document.createElement('label');
    label.setAttribute('for', id);
    label.appendChild(document.createTextNode(text + ' '));
    if (requiredMark) {
      var mark = document.createElement('span');
      mark.className = 'required-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = requiredMark;
      label.appendChild(mark);
    }
    return label;
  }

  function makeAddressFieldFullWidth(input) {
    if (!input || !input.parentElement) return;
    var wrap = input.parentElement;
    if (wrap.classList.contains('hero-form-field')) wrap.classList.add('hero-form-field-full');
    if (wrap.classList.contains('contact-form-field')) wrap.classList.add('contact-form-field-full');
  }

  function createSessionToken() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'mbx-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function setupMapboxAddressAutofill(input, accessToken) {
    if (!input || !accessToken) return;
    input.setAttribute('autocomplete', 'street-address');
    input.setAttribute('spellcheck', 'false');

    var suggestTimer = null;
    var options = [];
    var activeIdx = -1;
    var wrap = input.closest('.hero-form-field, .contact-form-field') || input.parentElement;
    if (wrap) wrap.style.position = 'relative';
    var menu = document.createElement('div');
    menu.className = 'address-lookup-menu';
    menu.style.position = 'absolute';
    menu.style.left = '0';
    menu.style.right = '0';
    menu.style.top = 'calc(100% + 4px)';
    menu.style.background = '#fff';
    menu.style.border = '1px solid #d9d9d9';
    menu.style.borderRadius = '8px';
    menu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
    menu.style.zIndex = '25';
    menu.style.maxHeight = '220px';
    menu.style.overflowY = 'auto';
    menu.style.display = 'none';
    if (wrap) wrap.appendChild(menu);

    function closeMenu() {
      menu.style.display = 'none';
      menu.innerHTML = '';
      options = [];
      activeIdx = -1;
    }

    function renderMenu() {
      menu.innerHTML = '';
      if (!options.length) {
        closeMenu();
        return;
      }
      options.forEach(function (label, idx) {
        var row = document.createElement('button');
        row.type = 'button';
        row.style.display = 'block';
        row.style.width = '100%';
        row.style.textAlign = 'left';
        row.style.padding = '10px 12px';
        row.style.border = '0';
        row.style.borderBottom = idx < options.length - 1 ? '1px solid #efefef' : '0';
        row.style.background = idx === activeIdx ? '#f7f7f7' : '#fff';
        row.style.cursor = 'pointer';
        row.textContent = label;
        row.addEventListener('mousedown', function (e) {
          e.preventDefault();
          input.value = label;
          closeMenu();
        });
        menu.appendChild(row);
      });
      menu.style.display = 'block';
    }

    function runFallbackSuggest(query) {
      var fallbackUrl =
        'https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=us&limit=5&q=' +
        encodeURIComponent(query);
      return fetch(fallbackUrl, { headers: { Accept: 'application/json' } })
        .then(function (res) { return res.ok ? res.json() : []; })
        .then(function (rows) {
          if (!Array.isArray(rows)) return [];
          return rows
            .map(function (r) { return (r && r.display_name) ? String(r.display_name).trim() : ''; })
            .filter(Boolean)
            .slice(0, 5);
        })
        .catch(function () { return []; });
    }

    function runSuggest(query) {
      var url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(query) +
        '.json?autocomplete=true&country=US&types=address&limit=5&language=en' +
        '&access_token=' +
        encodeURIComponent(accessToken);

      fetch(url)
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (data) {
          var labels = [];
          if (data && Array.isArray(data.features)) {
            labels = data.features
              .map(function (item) { return item && item.place_name ? String(item.place_name).trim() : ''; })
              .filter(Boolean)
              .slice(0, 5);
          }
          if (labels.length) return labels;
          return runFallbackSuggest(query);
        })
        .then(function (labels) {
          options = Array.isArray(labels) ? labels : [];
          activeIdx = -1;
          renderMenu();
        })
        .catch(function () {
          runFallbackSuggest(query).then(function (labels) {
            options = Array.isArray(labels) ? labels : [];
            activeIdx = -1;
            renderMenu();
          });
        });
    }

    input.addEventListener('input', function () {
      var q = String(input.value || '').trim();
      if (q.length < 3) {
        closeMenu();
        return;
      }
      if (suggestTimer) clearTimeout(suggestTimer);
      suggestTimer = setTimeout(function () { runSuggest(q); }, 220);
    });
    input.addEventListener('keydown', function (e) {
      if (!options.length || menu.style.display === 'none') return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % options.length;
        renderMenu();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = (activeIdx - 1 + options.length) % options.length;
        renderMenu();
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && options[activeIdx]) {
          e.preventDefault();
          input.value = options[activeIdx];
          closeMenu();
        }
      } else if (e.key === 'Escape') {
        closeMenu();
      }
    });
    input.addEventListener('blur', function () {
      setTimeout(closeMenu, 120);
    });
  }

  var cfg = readFormsConfig();
  var endpoint = cfg.submitPath.indexOf('/') === 0 ? cfg.submitPath : '/' + cfg.submitPath;
  var recaptchaSiteKey = cfg.recaptchaSiteKey || '';
  var mapboxToken = cfg.mapboxToken || '';

  function bindLeadForm(form) {
    if (!form || form.getAttribute('data-sgt-lead-bound') === '1') return;
    form.setAttribute('data-sgt-lead-bound', '1');
      var nameInput = form.querySelector('input[name="name"]');
      if (nameInput && !form.querySelector('input[name="firstName"]')) {
        var nameFieldWrap = nameInput.closest('.hero-form-field, .contact-form-field');
        var requiredMarkText = '*';
        if (nameFieldWrap) {
          var existingMark = nameFieldWrap.querySelector('.required-mark');
          if (existingMark && existingMark.textContent) requiredMarkText = existingMark.textContent.trim();
        }
        var firstId = (nameInput.id ? nameInput.id + '-first' : 'lead-first-name');
        var lastId = (nameInput.id ? nameInput.id + '-last' : 'lead-last-name');

        nameInput.removeAttribute('name');
        nameInput.removeAttribute('id');
        nameInput.removeAttribute('required');
        if (nameFieldWrap) nameFieldWrap.remove();

        var firstWrap = document.createElement('div');
        var lastWrap = document.createElement('div');
        firstWrap.className = 'hero-form-field contact-form-field';
        lastWrap.className = 'hero-form-field contact-form-field';

        var firstInput = document.createElement('input');
        firstInput.id = firstId;
        firstInput.name = 'firstName';
        firstInput.type = 'text';
        firstInput.required = true;
        firstInput.autocomplete = 'given-name';

        var lastInput = document.createElement('input');
        lastInput.id = lastId;
        lastInput.name = 'lastName';
        lastInput.type = 'text';
        lastInput.required = true;
        lastInput.autocomplete = 'family-name';

        firstWrap.appendChild(buildFieldLabel(firstId, 'First name', requiredMarkText));
        firstWrap.appendChild(firstInput);
        lastWrap.appendChild(buildFieldLabel(lastId, 'Last Name', requiredMarkText));
        lastWrap.appendChild(lastInput);

        var emailWrap = form.querySelector('input[name="email"]');
        emailWrap = emailWrap ? emailWrap.closest('.hero-form-field, .contact-form-field') : null;
        if (emailWrap && emailWrap.parentElement) {
          emailWrap.parentElement.insertBefore(lastWrap, emailWrap);
          emailWrap.parentElement.insertBefore(firstWrap, lastWrap);
        }
      }

      var phoneInput = form.querySelector('input[name="phone"]');
      if (phoneInput) {
        phoneInput.setAttribute('maxlength', '12');
        phoneInput.setAttribute('autocomplete', 'tel');
        phoneInput.addEventListener('input', function () {
          formatPhoneInputLive(phoneInput);
        });
        phoneInput.addEventListener('blur', function () {
          formatPhoneInputLive(phoneInput);
        });
      }

      var locationInput = form.querySelector('input[name="location"]');
      if (locationInput) {
        locationInput.setAttribute('name', 'address');
        locationInput.setAttribute('id', locationInput.id || (form.getAttribute('data-lead-form') || 'lead') + '-address');
        locationInput.removeAttribute('required');
        setFieldLabelText(locationInput, 'Address');
        makeAddressFieldFullWidth(locationInput);
        setupMapboxAddressAutofill(locationInput, mapboxToken);
      }

      ensureAttributionHiddenFields(form);

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.classList.add('is-busy');

        setStatus(form, 'Sending…', null);

        var attribution = captureAndGetAttribution();
        var fieldsPopulated = populateAttributionHiddenFields(form, attribution);

        var fd = new FormData(form);
        var firstTouch = getPersistedFirstTouch();
        var payload = {
          gclid: attribution.gclid || '',
          gbraid: attribution.gbraid || '',
          wbraid: attribution.wbraid || '',
          utm_source: attribution.utm_source || '',
          utm_medium: attribution.utm_medium || '',
          utm_campaign: attribution.utm_campaign || '',
          utm_id: attribution.utm_id || '',
          utm_content: attribution.utm_content || '',
          utm_term: attribution.utm_term || '',
          first_page: attribution.first_page || attribution.landing_page || '',
          landing_page: attribution.landing_page || '',
          signup_page: attribution.signup_page || attribution.landing_page || '',
          captured_at: attribution.captured_at || '',
          referrer: attribution.referrer || '',
          // Legacy aliases still accepted by /api/lead + existing Zapier paths
          first_landing_url: firstTouch.first_landing_url || '',
          first_landing_path: firstTouch.first_landing_path || attribution.first_page || '',
          first_referrer: firstTouch.first_referrer || attribution.referrer || '',
          formSource: form.getAttribute('data-lead-form') || 'unknown',
          name: ((fd.get('firstName') || '').toString().trim() + ' ' + (fd.get('lastName') || '').toString().trim()).trim(),
          firstName: (fd.get('firstName') || '').toString().trim(),
          lastName: (fd.get('lastName') || '').toString().trim(),
          email: (fd.get('email') || '').toString().trim(),
          phone: formatUsPhoneDashes((fd.get('phone') || '').toString()),
          address: (fd.get('address') || '').toString().trim(),
          location: (fd.get('address') || '').toString().trim(),
          message: (fd.get('message') || '').toString().trim(),
          website: (fd.get('website') || '').toString().trim(),
          smsMarketingConsent: fd.get('smsMarketingConsent') === 'yes',
          pageUrl: typeof window.location.href === 'string' ? window.location.href : ''
        };

        if (trackingDebug && window.console) {
          trackingDebugLog('Form fields populated:', fieldsPopulated ? 'yes' : 'no');
          trackingDebugLog('Exact form attribution payload:');
          if (typeof console.table === 'function') {
            console.table({
              gclid: payload.gclid,
              gbraid: payload.gbraid,
              wbraid: payload.wbraid,
              utm_source: payload.utm_source,
              utm_medium: payload.utm_medium,
              utm_campaign: payload.utm_campaign,
              utm_id: payload.utm_id,
              utm_content: payload.utm_content,
              utm_term: payload.utm_term,
              landing_page: payload.landing_page,
              signup_page: payload.signup_page,
              captured_at: payload.captured_at,
              first_page: payload.first_page,
              referrer: payload.referrer
            });
          } else {
            trackingDebugLog({
              gclid: payload.gclid,
              gbraid: payload.gbraid,
              wbraid: payload.wbraid,
              utm_source: payload.utm_source,
              utm_medium: payload.utm_medium,
              utm_campaign: payload.utm_campaign,
              utm_id: payload.utm_id,
              utm_content: payload.utm_content,
              utm_term: payload.utm_term,
              landing_page: payload.landing_page,
              signup_page: payload.signup_page,
              captured_at: payload.captured_at,
              first_page: payload.first_page,
              referrer: payload.referrer
            });
          }
          trackingDebugLog('API attribution payload (non-PII fields):', {
            gclid: payload.gclid,
            gbraid: payload.gbraid,
            wbraid: payload.wbraid,
            utm_source: payload.utm_source,
            utm_medium: payload.utm_medium,
            utm_campaign: payload.utm_campaign,
            utm_id: payload.utm_id,
            utm_content: payload.utm_content,
            utm_term: payload.utm_term,
            landing_page: payload.landing_page,
            signup_page: payload.signup_page,
            captured_at: payload.captured_at,
            first_page: payload.first_page,
            referrer: payload.referrer,
            formSource: payload.formSource,
            pageUrl: payload.pageUrl
          });
        }

        var runSend = function () {
          fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload)
          })
            .then(function (res) {
              return res.text().then(function (text) {
                var data = {};
                try {
                  data = text ? JSON.parse(text) : {};
                } catch (e) {
                  data = { error: 'bad_response', parseError: true };
                }
                return { ok: res.ok, status: res.status, data: data || {} };
              });
            })
            .then(function (result) {
              if (submitBtn) submitBtn.classList.remove('is-busy');
              if (result.ok && result.data && result.data.ok) {
                setStatus(form, 'Thanks — we received your message and will be in touch soon.', 'success');
                form.reset();
                window.location.assign('/thank-you/');
                return;
              }
              var err = (result.data && result.data.error) || 'submit_failed';
              var zst = result.data && result.data.zapierStatus;
              var msg =
                err === 'server_misconfigured'
                  ? 'This form is not configured yet. Please call us instead.'
                  : err === 'recaptcha_misconfigured'
                    ? 'This form is missing security configuration. Please call us instead.'
                    : err === 'recaptcha_missing' || err === 'recaptcha_failed'
                      ? 'Security check failed. Please refresh the page and try again.'
                      : err === 'recaptcha_low_score'
                        ? 'We could not verify this submission. Please try again or call us.'
                        : err === 'recaptcha_action_mismatch'
                          ? 'Security check mismatch. Please refresh and try again.'
                          : err === 'recaptcha_unreachable'
                            ? 'Could not verify security. Please try again in a moment.'
                            : err === 'missing_fields'
                              ? 'Please fill in all required fields.'
                              : err === 'sms_consent_required'
                                ? 'Please confirm SMS consent to submit this form.'
                                : err === 'invalid_email'
                                  ? 'Please enter a valid email address.'
                                  : err === 'upstream_unreachable'
                                    ? 'Could not reach the form service. Please try again or call us.'
                                    : err === 'upstream_error'
                                      ? 'The form service rejected the submission (code ' +
                                        (zst || result.status || '?') +
                                        '). Check the Zapier webhook URL in Vercel, or call us.'
                                      : err === 'bad_response' || result.status === 404
                                        ? 'Form endpoint not found (404). Redeploy the site or check Vercel Root Directory / api folder.'
                                        : 'Something went wrong. Please try again or call us.';
              setStatus(form, msg, 'error');
            })
            .catch(function () {
              if (submitBtn) submitBtn.classList.remove('is-busy');
              setStatus(form, 'Network error. Please check your connection and try again.', 'error');
            });
        };

        var startSend = function () {
          if (!recaptchaSiteKey) {
            runSend();
            return;
          }
          if (typeof window.grecaptcha === 'undefined' || !window.grecaptcha.execute) {
            if (submitBtn) submitBtn.classList.remove('is-busy');
            setStatus(form, 'Security check failed to load. Please refresh the page and try again.', 'error');
            return;
          }
          window.grecaptcha.ready(function () {
            window.grecaptcha
              .execute(recaptchaSiteKey, { action: 'lead_form' })
              .then(function (token) {
                payload.recaptchaToken = token;
                runSend();
              })
              .catch(function () {
                if (submitBtn) submitBtn.classList.remove('is-busy');
                setStatus(form, 'Security check failed. Please try again.', 'error');
              });
          });
        };

        startSend();
      });

      populateAttributionHiddenFields(form, captureAndGetAttribution());
  }

  function bindAllLeadForms() {
    document.querySelectorAll('form[data-lead-form]').forEach(bindLeadForm);
  }

  bindAllLeadForms();

  if (typeof MutationObserver === 'function' && document.documentElement) {
    var attrObserver = new MutationObserver(function () {
      bindAllLeadForms();
    });
    attrObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
