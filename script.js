/* ============================================================
   BARBERIA — Interactividad global (script.js)
   - Header: estado al hacer scroll
   - Menu movil: cerrar al elegir un enlace
   - Galeria: filtros por categoria
   - Reserva: formulario -> enlace de WhatsApp
   - Fidelidad: simulador de sellos + modal del 10° corte gratis
   - Reveal de secciones al hacer scroll
   ============================================================ */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ------------------------------------------------------------
     CONFIGURACION
     Numero de WhatsApp en formato internacional, sin + ni espacios.
     ------------------------------------------------------------ */
  var WHATSAPP_NUMBER = '51900000000';

  function buildWhatsAppUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ------------------------------------------------------------
     1. HEADER: sombra al hacer scroll
     ------------------------------------------------------------ */
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------
     2. MENU MOVIL: cerrar al tocar cualquier enlace
     ------------------------------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');

  if (navToggle) {
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.checked = false;
      });
    });
  }

  /* ------------------------------------------------------------
     3. GALERIA: filtros por categoria
     ------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        var filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ------------------------------------------------------------
     4. RESERVA: armar el mensaje y abrir WhatsApp
     ------------------------------------------------------------ */
  var bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    var dateInput = document.getElementById('bk-date');

    // La fecha minima es hoy
    if (dateInput && !dateInput.min) {
      var today = new Date();
      var local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      dateInput.min = local.toISOString().split('T')[0];
    }

    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      var name = document.getElementById('bk-name').value.trim();
      var service = document.getElementById('bk-service').value;
      var dateValue = dateInput.value;
      var time = document.getElementById('bk-time').value;

      // Fecha en formato DD/MM/YYYY para un mensaje legible
      var dateParts = dateValue.split('-');
      var dateFormatted = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];

      var message = 'Hola, soy ' + name +
        '. Me gustaría reservar un turno para ' + service +
        ' el día ' + dateFormatted +
        ' a las ' + time + '.';

      window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
    });
  }

  /* ------------------------------------------------------------
     5. REVEAL al hacer scroll (respeta movimiento reducido)
     ------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('[data-reveal]');

  function showAll() {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  if ('IntersectionObserver' in window && revealEls.length &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    showAll();
  }

  /* ------------------------------------------------------------
     6. TARJETA DE FIDELIDAD INTERACTIVA (simulación de sellos)
     ------------------------------------------------------------ */
  var stamps = document.querySelectorAll('.stamp[data-stamp]');
  var stampCounter = document.getElementById('stamp-counter');
  var stampReset = document.getElementById('stamp-reset');
  var stampFree = document.getElementById('stamp-free');
  var loyaltyModal = document.getElementById('loyalty-modal');
  var loyaltyConfetti = document.getElementById('loyalty-confetti');
  var modalReset = document.getElementById('loyalty-modal-reset');
  var TOTAL_STAMPS = 9;
  var lastTrigger = null;

  function countStamps() {
    return document.querySelectorAll('.stamp[data-stamp].stamped').length;
  }

  function updateStampCounter() {
    var done = countStamps();
    if (stampCounter) {
      stampCounter.textContent = done + ' de ' + TOTAL_STAMPS + ' sellos';
      stampCounter.setAttribute('aria-live', done === TOTAL_STAMPS ? 'assertive' : 'polite');
    }
    return done;
  }

  function spawnConfetti(container) {
    var colors = ['#C1121F', '#1B3FE8', '#E63946', '#0F1D38', '#93C5FD'];
    container.innerHTML = '';
    for (var i = 0; i < 44; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      piece.style.animationDuration = (1.6 + Math.random() * 1.3) + 's';
      piece.style.width = (6 + Math.random() * 5) + 'px';
      piece.style.height = (9 + Math.random() * 6) + 'px';
      container.appendChild(piece);
    }
  }

  function openLoyaltyModal(trigger) {
    if (!loyaltyModal) return;
    lastTrigger = trigger || null;
    if (loyaltyConfetti) spawnConfetti(loyaltyConfetti);
    if (stampFree) stampFree.classList.add('celebrating');
    loyaltyModal.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('loyalty-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLoyaltyModal() {
    if (!loyaltyModal) return;
    loyaltyModal.hidden = true;
    document.body.style.overflow = '';
    if (stampFree) stampFree.classList.remove('celebrating');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  function resetStamps() {
    stamps.forEach(function (stamp) {
      stamp.classList.remove('stamped');
      stamp.setAttribute('aria-pressed', 'false');
    });
    updateStampCounter();
    if (loyaltyModal && !loyaltyModal.hidden) closeLoyaltyModal();
  }

  if (stamps.length) {
    stamps.forEach(function (stamp) {
      stamp.addEventListener('click', function () {
        var isStamped = stamp.classList.contains('stamped');
        stamp.classList.toggle('stamped', !isStamped);
        stamp.setAttribute('aria-pressed', isStamped ? 'false' : 'true');

        if (updateStampCounter() === TOTAL_STAMPS && !isStamped) {
          window.setTimeout(function () {
            openLoyaltyModal(stamp);
          }, 350);
        }
      });
    });

    if (stampReset) {
      stampReset.addEventListener('click', resetStamps);
    }

    if (loyaltyModal) {
      document.querySelectorAll('[data-modal-close]').forEach(function (el) {
        el.addEventListener('click', closeLoyaltyModal);
      });

      if (modalReset) {
        modalReset.addEventListener('click', resetStamps);
      }

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !loyaltyModal.hidden) {
          closeLoyaltyModal();
        }
      });
    }
  }
})();
