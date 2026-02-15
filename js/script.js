/* =============================================
   HOME HARVEST — Interactions
   Minimal vanilla JS — no framework dependencies
   ============================================= */

(function () {
  'use strict';

  // --- Intersection Observer for fade-in animations ---
  function initFadeAnimations() {
    var fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    if (!('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  // --- Back to top button ---
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile nav: close on backdrop click ---
  function initMobileNav() {
    var dialog = document.getElementById('mobile-nav');
    if (!dialog) return;

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  // Opens collapsed <details> sections before scrolling to target
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // If target is inside a closed <details>, open it first
        var details = target.closest('details:not([open])');
        if (details) {
          details.setAttribute('open', '');
        }

        var headerHeight = document.querySelector('.site-header').offsetHeight || 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // --- Active nav highlighting ---
  // On homepage: highlight based on scroll position (anchor-based nav)
  // On sub-pages: highlight based on current URL path
  function initActiveNav() {
    var navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    var currentPath = window.location.pathname;

    // Check if any nav link points to a page (not anchor)
    var hasPageLinks = false;
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) !== '#') {
        hasPageLinks = true;
      }
    });

    if (hasPageLinks) {
      // Multi-page mode: highlight by matching URL path
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && currentPath.indexOf(href) === 0 && href !== '/homeharvest/') {
          link.classList.add('nav-active');
        }
      });
    } else {
      // Single-page mode: highlight by scroll position (homepage anchor links)
      var sections = document.querySelectorAll('section[id]');
      if (!sections.length || !('IntersectionObserver' in window)) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('nav-active');
              } else {
                link.classList.remove('nav-active');
              }
            });
          }
        });
      }, {
        threshold: 0,
        rootMargin: '-20% 0px -60% 0px'
      });

      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  // --- Reading progress bar ---
  function initReadingProgress() {
    var bar = document.querySelector('.reading-progress-bar');
    if (!bar) return;

    var article = document.querySelector('.detail-article');
    if (!article) return;

    function updateProgress() {
      var articleTop = article.offsetTop;
      var articleHeight = article.offsetHeight;
      var scrollY = window.scrollY;
      var windowHeight = window.innerHeight;
      var progress = Math.min(Math.max((scrollY - articleTop) / (articleHeight - windowHeight), 0), 1);
      bar.style.width = (progress * 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- Table of contents active state highlighting ---
  function initTocHighlight() {
    var tocLinks = document.querySelectorAll('.page-toc a');
    if (!tocLinks.length) return;

    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (!id || id.charAt(0) !== '#') return;
      var el = document.getElementById(id.slice(1));
      if (el) headings.push(el);
    });

    if (!headings.length || !('IntersectionObserver' in window)) return;

    // Deduplicate TOC links by href (mobile + desktop versions)
    function setActive(id) {
      document.querySelectorAll('.page-toc a').forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('toc-active');
        } else {
          link.classList.remove('toc-active');
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute('id'));
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-20% 0px -70% 0px'
    });

    headings.forEach(function (h) { observer.observe(h); });
  }

  // --- Collapsible sections smooth animation ---
  function initCollapsibleSections() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Let native <details> handle it

    var allDetails = document.querySelectorAll('.collapsible-section');
    if (!allDetails.length) return;

    allDetails.forEach(function (el) {
      var summary = el.querySelector('summary');
      var content = el.querySelector('.section-content');
      if (!summary || !content) return;

      summary.addEventListener('click', function (e) {
        e.preventDefault();
        if (el.hasAttribute('open')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.overflow = 'hidden';
          requestAnimationFrame(function () {
            content.style.maxHeight = '0';
          });
          content.addEventListener('transitionend', function handler() {
            el.removeAttribute('open');
            content.style.maxHeight = '';
            content.style.overflow = '';
            content.removeEventListener('transitionend', handler);
          });
        } else {
          el.setAttribute('open', '');
          var height = content.scrollHeight;
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          requestAnimationFrame(function () {
            content.style.maxHeight = height + 'px';
          });
          content.addEventListener('transitionend', function handler() {
            content.style.maxHeight = '';
            content.style.overflow = '';
            content.removeEventListener('transitionend', handler);
          });
        }
      });
    });
  }

  // --- CMD-K Search ---
  function initSearch() {
    var dialog = document.getElementById('search-dialog');
    var closeBtn = document.getElementById('search-close');
    var openBtn = document.getElementById('search-open');
    var pagefindInitialized = false;

    function openSearch() {
      if (!dialog) return;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      if (!pagefindInitialized && typeof window.PagefindUI !== 'undefined') {
        new window.PagefindUI({
          element: '#search-container',
          showImages: false,
          showSubResults: false,
          resetStyles: false
        });
        pagefindInitialized = true;
      }
      setTimeout(function () {
        var input = dialog.querySelector('.pagefind-ui__search-input');
        if (input) input.focus();
      }, 100);
    }

    function closeSearch() {
      if (!dialog) return;
      dialog.close();
      document.documentElement.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    if (openBtn) openBtn.addEventListener('click', openSearch);

    if (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) closeSearch();
      });
    }

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (dialog && dialog.open) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    });

    window.__openSearch = openSearch;
  }

  // --- Initialize everything ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initBackToTop();
    initMobileNav();
    initSmoothScroll();
    initActiveNav();
    initReadingProgress();
    initTocHighlight();
    initCollapsibleSections();
    initSearch();
  });
})();
