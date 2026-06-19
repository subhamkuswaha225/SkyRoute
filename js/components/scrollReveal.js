/* ============================================================
   SkyRoute Scroll Reveal
   Intersection Observer-based scroll animations
   ============================================================ */

class ScrollReveal {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.1;
    this.rootMargin = options.rootMargin || '0px 0px -50px 0px';
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optionally unobserve after reveal
          if (!entry.target.dataset.keepObserving) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: this.threshold,
      rootMargin: this.rootMargin
    });
  }

  observe() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach(el => {
      if (!el.classList.contains('revealed')) {
        this.observer.observe(el);
      }
    });
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Global instance
window.scrollReveal = new ScrollReveal();

// Toast notification helper
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  document.body.appendChild(toast);

  // Trigger show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-hide
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}
