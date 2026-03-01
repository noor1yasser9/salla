/**
 * Salla Nova Theme - Main JavaScript
 */

(function () {
  'use strict';

  // ─── Tabs ─────────────────────────────────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        const parent = btn.closest('.product-tabs') || document;
        parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = parent.querySelector(`#${tabId}`);
        if (target) target.classList.add('active');
      });
    });
  }

  // ─── Product Gallery ──────────────────────────────────────────────────────
  function initGallery() {
    document.querySelectorAll('.product-gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const imgSrc = thumb.querySelector('img')?.src;
        const main = document.querySelector('.product-gallery-main img');
        if (main && imgSrc) main.src = imgSrc;
        document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  // ─── Quantity Control ─────────────────────────────────────────────────────
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

  // ─── Sticky Header ────────────────────────────────────────────────────────
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ─── Mobile Menu ──────────────────────────────────────────────────────────
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggleBtn || !nav) return;
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
  }

  // ─── Search Toggle ────────────────────────────────────────────────────────
  function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.header-search-mobile');
    if (!searchToggle || !searchBar) return;
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      searchBar.querySelector('input')?.focus();
    });
  }

  // ─── Image Lazy Load ──────────────────────────────────────────────────────
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, { rootMargin: '200px' });
    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  }

  // ─── Toast Notifications ──────────────────────────────────────────────────
  window.showToast = function (message, type = 'success', duration = 3000) {
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span><button class="toast-close">&times;</button>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    const remove = () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); };
    setTimeout(remove, duration);
    toast.querySelector('.toast-close').addEventListener('click', remove);
  };
  function createToastContainer() {
    const div = document.createElement('div');
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  }

  // ─── Coupon Form ──────────────────────────────────────────────────────────
  function initCoupon() {
    const form = document.querySelector('.coupon-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const code = form.querySelector('input')?.value?.trim();
      if (!code) return;
      window.showToast('Coupon applied successfully!', 'success');
    });
  }

  // ─── Filter Sidebar (Products Listing) ───────────────────────────────────
  function initFilters() {
    const toggleBtn = document.querySelector('.filters-toggle');
    const sidebar = document.querySelector('.filters-sidebar');
    if (!toggleBtn || !sidebar) return;
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // ─── Init All ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initGallery();
    initQuantity();
    initStickyHeader();
    initMobileMenu();
    initSearch();
    initLazyImages();
    initCoupon();
    initFilters();
  });

})();

