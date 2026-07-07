/* ==========================================================================
   Frog Labs LLC — main.js
   Vanilla JavaScript only. Loaded with `defer` on every page.
   ========================================================================== */
(function () {
  'use strict';

  // Flag JS availability so CSS can gate scroll-reveal styles (no-JS users
  // simply see all content, fully visible).
  document.documentElement.classList.add('js');

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Sticky header: add a glass background once the page is scrolled.
     ------------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ------------------------------------------------------------------------
     Mobile navigation toggle.
     ------------------------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navMenu.classList.toggle('open', open);
    if (header) header.classList.toggle('nav-open', open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu when a link inside it is activated.
    navMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    // Close on Escape and return focus to the toggle button.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Scroll-reveal: fade elements in as they enter the viewport.
     ------------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll('.reveal');

  if (revealTargets.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately.
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------------
     FAQ accordions: allow only one <details> open per group.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.faq').forEach(function (group) {
    group.addEventListener('toggle', function (event) {
      var opened = event.target;
      if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
      group.querySelectorAll('details[open]').forEach(function (other) {
        if (other !== opened) other.open = false;
      });
    }, true);
  });

  /* ------------------------------------------------------------------------
     Contact form: front-end only. Validates input, then hands the message
     to the visitor's own email client via a prefilled mailto: link.
     ------------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');

  if (form) {
    var successPanel = document.getElementById('form-success');

    var setError = function (field, message) {
      var input = form.elements[field];
      var errorEl = document.getElementById(field + '-error');
      if (!input || !errorEl) return;
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var topic = form.elements.topic.value;
      var message = form.elements.message.value.trim();
      var valid = true;

      setError('name', '');
      setError('email', '');
      setError('message', '');

      if (!name) {
        setError('name', 'Please enter your name.');
        valid = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Please enter a valid email address.');
        valid = false;
      }
      if (message.length < 10) {
        setError('message', 'Please tell us a little more (at least 10 characters).');
        valid = false;
      }

      if (!valid) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Build the prefilled email.
      var subject = '[' + topic + '] Message from ' + name;
      var body = message + '\n\n— ' + name + ' (' + email + ')';
      var mailto = 'mailto:contact@froglabsllc.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (successPanel) {
        successPanel.classList.add('visible');
        successPanel.focus();
      }

      // Open the visitor's email client with everything filled in.
      window.location.href = mailto;
    });
  }

  /* ------------------------------------------------------------------------
     Footer year: keep the copyright current.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------------
     Page transitions: brief fade-out when navigating to another page on
     this site. Skipped for new tabs, downloads, anchors, and reduced motion.
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion) {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href') || '';
      var isInternalPage = /\.html(#.*)?$/.test(href) && !/^https?:/i.test(href);

      if (!isInternalPage) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(function () {
        window.location.href = href;
      }, 160);
    });

    // If the page is restored from the back/forward cache, undo the fade.
    window.addEventListener('pageshow', function () {
      document.body.classList.remove('page-leaving');
    });
  }
})();
