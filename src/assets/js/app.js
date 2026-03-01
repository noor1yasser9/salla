/**
 * Salla Nova Theme - Main JS Entry Point
 */

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId  = btn.dataset.tab;
      const parent = btn.closest('.product-tabs') || document;
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = parent.querySelector(`#${tabId}`);
      if (target) target.classList.add('active');
    });
  });
}

// ─── Quantity Control ─────────────────────────────────────────────────────────
function initQuantity() {
  document.querySelectorAll('.quantity-control').forEach(ctrl => {
    const input = ctrl.querySelector('.quantity-input');
    ctrl.querySelector('.qty-minus')?.addEventListener('click', () => {
      const val = parseInt(input.value, 10);
      if (val > 1) input.value = val - 1;
    });
    ctrl.querySelector('.qty-plus')?.addEventListener('click', () => {
      const val = parseInt(input.value, 10);
      const max = parseInt(input.max, 10) || 999;
      if (val < max) input.value = val + 1;
    });
  });
}

// ─── Sticky Header ────────────────────────────────────────────────────────────
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggleBtns = document.querySelectorAll('.mobile-menu-toggle');
  const nav        = document.querySelector('.mobile-nav');
  const overlay    = document.querySelector('.mobile-nav-overlay');
  if (!nav) return;
  const close = () => { nav.classList.remove('open'); document.body.classList.remove('menu-open'); };
  toggleBtns.forEach(btn => btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  }));
  overlay?.addEventListener('click', close);
}

// ─── Mobile Search Toggle ─────────────────────────────────────────────────────
function initSearch() {
  const toggle  = document.querySelector('.search-toggle');
  const searchBar = document.querySelector('.header-search-mobile');
  if (!toggle || !searchBar) return;
  toggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    searchBar.querySelector('input')?.focus();
  });
}

// ─── Product Gallery ──────────────────────────────────────────────────────────
function initGallery() {
  document.querySelectorAll('.product-gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src  = thumb.querySelector('img')?.src;
      const main = document.querySelector('#main-product-image');
      if (main && src) main.src = src;
      document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ─── Lazy Images ──────────────────────────────────────────────────────────────
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
      observer.unobserve(img);
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// ─── Toast ────────────────────────────────────────────────────────────────────
window.showToast = function (message, type = 'success', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span><button class="toast-close">&times;</button>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  const remove = () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); };
  setTimeout(remove, duration);
  toast.querySelector('.toast-close').addEventListener('click', remove);
};

// ─── Coupon ───────────────────────────────────────────────────────────────────
function initCoupon() {
  const form = document.querySelector('.coupon-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const code = form.querySelector('input')?.value?.trim();
    if (code) window.showToast('تم تطبيق الكوبون بنجاح!', 'success');
  });
}

// ─── Filters Sidebar ──────────────────────────────────────────────────────────
function initFilters() {
  const btn  = document.querySelector('.filters-toggle');
  const side = document.querySelector('.filters-sidebar');
  if (!btn || !side) return;
  btn.addEventListener('click', () => side.classList.toggle('open'));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initQuantity();
  initStickyHeader();
  initMobileMenu();
  initSearch();
  initGallery();
  initLazyImages();
  initCoupon();
  initFilters();
});

