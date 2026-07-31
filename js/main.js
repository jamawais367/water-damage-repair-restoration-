/**
 * Grand Terrace Water Damage Restoration
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initSmoothScroll();
  initContactForm();
  initExternalLinks();
});

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    var isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked
  var navLinks = nav.querySelectorAll('a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Smooth scroll with offset for sticky header
 */
function initSmoothScroll() {
  var header = document.querySelector('.site-header');
  var headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = this.getAttribute('href');

      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Contact form handler
 */
function initContactForm() {
  var form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.querySelector('#name');
    var phone = form.querySelector('#phone');

    if (name && !name.value.trim()) {
      alert('Please enter your name.');
      name.focus();
      return;
    }

    if (phone && !phone.value.trim()) {
      alert('Please enter your phone number.');
      phone.focus();
      return;
    }

    alert('Thank you! We will contact you shortly.');
    form.reset();
  });
}

/**
 * Force subpages and external links to open in a new tab
 */
function initExternalLinks() {
  var links = document.querySelectorAll('a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;

    // Skip smooth scroll/same-page links, phone links, and email links
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      return;
    }

    // Set link target to open in a new tab
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

