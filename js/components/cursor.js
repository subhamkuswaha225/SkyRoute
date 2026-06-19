/* ============================================================
   SkyRoute Custom Cursor
   Fluid anti-gravity cursor animation
   ============================================================ */

function initCustomCursor() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.classList.add('custom-cursor-dot');
  cursorDot.id = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Smooth follow with anti-gravity lag
  function animateCursor() {
    // Ring - slower follow (anti-gravity feel)
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.12;
    cursorY += dy * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Dot - faster follow
    const ddx = mouseX - dotX;
    const ddy = mouseY - dotY;
    dotX += ddx * 0.5;
    dotY += ddy * 0.5;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.classList.contains('flight-card') ||
      target.classList.contains('dest-card') ||
      target.classList.contains('hotel-card') ||
      target.classList.contains('btn') ||
      target.classList.contains('search-btn') ||
      target.classList.contains('filter-option') ||
      target.classList.contains('sort-option') ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('.flight-card') ||
      target.closest('.dest-card') ||
      target.closest('.hotel-card')
    ) {
      cursor.classList.add('active');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.classList.contains('flight-card') ||
      target.classList.contains('dest-card') ||
      target.classList.contains('hotel-card') ||
      target.classList.contains('btn') ||
      target.classList.contains('search-btn') ||
      target.classList.contains('filter-option') ||
      target.classList.contains('sort-option') ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('.flight-card') ||
      target.closest('.dest-card') ||
      target.closest('.hotel-card')
    ) {
      cursor.classList.remove('active');
    }
  }, { passive: true });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    cursorDot.style.opacity = '1';
  });
}
