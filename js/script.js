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
      // Fallback: show all elements immediately
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

  // --- Active nav link highlighting ---
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--color-dark-text)';
              link.style.backgroundColor = 'rgba(36, 40, 36, 0.5)';
            } else {
              link.style.color = '';
              link.style.backgroundColor = '';
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

  // --- Initialize everything ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initBackToTop();
    initMobileNav();
    initSmoothScroll();
    initActiveNav();
  });
})();
