/**
 * Salla Nova - Home Page JS
 * Handles featured products tabs on the home page
 */

function initFeaturedTabs() {
  document.querySelectorAll('.tab-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const componentId = btn.dataset.componentId;
      const target      = btn.dataset.target;
      const wrapper     = document.getElementById(componentId);
      if (!wrapper) return;

      // Update tab buttons
      wrapper.querySelectorAll('.tab-trigger').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Hide all tabs
      wrapper.querySelectorAll('.tabs-wrapper > div').forEach(tab => {
        tab.classList.remove('is-active', 'opacity-100', 'translate-y-0');
        tab.classList.add('opacity-0', 'translate-y-3');
      });

      // Show active tab with animation
      const activeTab = wrapper.querySelector(`#${target}`);
      if (activeTab) {
        activeTab.classList.add('is-active');
        setTimeout(() => {
          activeTab.classList.remove('opacity-0', 'translate-y-3');
          activeTab.classList.add('opacity-100', 'translate-y-0');
        }, 100);
      }
    });
  });

  document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
}

document.addEventListener('DOMContentLoaded', initFeaturedTabs);

