/**
 * Salla Nova Theme - Product Card interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Wishlist toggle visual feedback ───────────────────────────────────────
  document.querySelectorAll('.product-card-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      if (!icon) return;
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      icon.style.color = icon.classList.contains('fas') ? '#ff6584' : '';
    });
  });

  // ─── Product card image hover preload ──────────────────────────────────────
  document.querySelectorAll('.product-card').forEach(card => {
    const img      = card.querySelector('.product-card-image img');
    const hoverSrc = img?.dataset.hoverSrc;
    if (!img || !hoverSrc) return;
    const original = img.src;
    card.addEventListener('mouseenter', () => { img.src = hoverSrc; });
    card.addEventListener('mouseleave', () => { img.src = original; });
  });

});

