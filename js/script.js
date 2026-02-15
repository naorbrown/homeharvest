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
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var headerHeight = document.querySelector('.site-header').offsetHeight || 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

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

  // --- Initialize everything ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initBackToTop();
    initMobileNav();
    initSmoothScroll();
    initActiveNav();
  });
})();
