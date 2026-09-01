/* ============================================================
   María Paz García Hernandez — Portafolio profesional
   Interacciones: navbar, menú móvil, scroll reveal,
   validación de formulario, volver arriba.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initNavbarScroll();
    initMobileMenuAutoClose();
    initActiveNavLink();
    initScrollReveal();
    initFormValidation();
    initBackToTop();
    initCurrentYear();
  });

  /**
   * Añade sombra/compactación a la navbar al hacer scroll.
   */
  function initNavbarScroll() {
    var navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    function toggleScrolled() {
      if (window.scrollY > 40) {
        navbar.classList.add('lp-navbar-scrolled');
      } else {
        navbar.classList.remove('lp-navbar-scrolled');
      }
    }

    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });
  }

  /**
   * Cierra el menú hamburguesa al seleccionar un enlace (mobile).
   */
  function initMobileMenuAutoClose() {
    var navbarMenu = document.getElementById('navbarMenu');
    if (!navbarMenu) return;

    var links = navbarMenu.querySelectorAll('.nav-link, .btn');

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarMenu.classList.contains('show') && window.bootstrap) {
          var collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navbarMenu);
          collapseInstance.hide();
        }
      });
    });
  }

  /**
   * Resalta el enlace de navegación correspondiente a la sección visible.
   */
  function initActiveNavLink() {
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.lp-navbar .nav-link');
    if (!sections.length || !navLinks.length) return;

    var map = {};
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        map[href.substring(1)] = link;
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var link = map[id];
          if (!link) return;

          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /**
   * Revela elementos con la clase .lp-reveal al entrar en el viewport.
   */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.lp-reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('lp-in-view'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('lp-in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /**
   * Validación frontend del formulario de contacto (Bootstrap + custom).
   */
  function initFormValidation() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var successMessage = document.getElementById('formSuccess');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      form.classList.add('was-validated');

      // Simulación de envío exitoso (sin backend conectado).
      if (successMessage) {
        successMessage.classList.remove('d-none');
        successMessage.setAttribute('tabindex', '-1');
        successMessage.focus();
      }

      form.reset();
      form.classList.remove('was-validated');
    });

    // Oculta el mensaje de éxito si el usuario vuelve a editar el formulario.
    form.addEventListener('input', function () {
      if (successMessage && !successMessage.classList.contains('d-none')) {
        successMessage.classList.add('d-none');
      }
    });
  }

  /**
   * Muestra/oculta el botón "volver arriba" según el scroll.
   */
  function initBackToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;

    function toggleVisibility() {
      if (window.scrollY > 500) {
        button.classList.add('lp-visible');
      } else {
        button.classList.remove('lp-visible');
      }
    }

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Inserta el año actual en el footer.
   */
  function initCurrentYear() {
    var yearEl = document.getElementById('currentYear');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }
})();
