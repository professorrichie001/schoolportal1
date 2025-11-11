// Persist sidebar state and animate profile progress rings
document.addEventListener('DOMContentLoaded', function () {
  try {
  const navigation = document.querySelector('.navigation');
  const main = document.querySelector('.main');
  // Prefer the toggle button element (contains the icon) for a11y
  const toggleBtn = document.querySelector('.toggle');

    // Restore persisted sidebar state
    const navActive = localStorage.getItem('navActive');
    if (navActive === 'true') {
      navigation && navigation.classList.add('active');
      main && main.classList.add('active');
    }

    // Centralize toggle behavior: toggle classes, update aria, persist state,
    // and support keyboard activation (Enter / Space).
    if (toggleBtn) {
      function applyState(isActive) {
        if (navigation) {
          navigation.classList.toggle('active', isActive);
          // On mobile, we don't hide the navigation completely
          if (window.innerWidth <= 768) {
            navigation.style.visibility = 'visible';
          }
        }
        if (main) main.classList.toggle('active', isActive);
        try { toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false'); } catch (e) {}
        localStorage.setItem('navActive', isActive ? 'true' : 'false');
      }

      function onToggle(event) {
        event.preventDefault();
        const currently = navigation && navigation.classList.contains('active');
        const next = !currently;
        applyState(next);
      }

      toggleBtn.addEventListener('click', onToggle);

      // keyboard support
      toggleBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          onToggle(e);
        }
      });
    }

    // Animate progress rings
    function animateRing(el) {
      const valueEl = el.querySelector('.progress-value');
      // read target from CSS variable or data attribute
      let target = el.style.getPropertyValue('--progress') || el.dataset.progress || '0%';
      target = String(target).trim().replace('%', '');
      let tg = parseInt(target, 10) || 0;
      let current = 0;

      const step = Math.max(1, Math.ceil(tg / 30));

      function frame() {
        current += step;
        if (current > tg) current = tg;
        el.style.setProperty('--progress', current + '%');
        if (valueEl) valueEl.textContent = current + '%';
        if (current < tg) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    }

    const rings = document.querySelectorAll('.progress-ring');
    rings.forEach(r => animateRing(r));

    // If we restored a persisted state, reflect it on the toggle button aria-expanded
    try {
      const restored = localStorage.getItem('navActive');
      const isActive = restored === 'true';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    } catch (e) {
      // ignore storage access errors
    }
  } catch (err) {
    console.error('dashboard.js error:', err);
  }
});

// Optional: expose a small API for tests
window.__dashboard = { animateRing: null };
