/**
 * Ticker Strip & Project Filtering System
 * Rohit Mandal — Portfolio
 */

export function initTickerFilter() {
  const tickerItems = document.querySelectorAll('.ticker-item');
  const cards = document.querySelectorAll('.project-card');
  const banner = document.getElementById('filter-banner');
  const bannerTag = document.getElementById('filter-banner-tag');
  const clearBtn = document.getElementById('filter-clear');
  const projectsSection = document.getElementById('projects');

  if (!tickerItems.length || !cards.length) return;

  let activeStack = null;

  function applyFilter(stack, sourceItem) {
    activeStack = stack;

    tickerItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.stack === stack);
    });

    const matchCount = Array.from(cards).filter((card) =>
      (card.dataset.stack || '').includes(stack)
    ).length;

    cards.forEach((card) => {
      const cardStack = card.dataset.stack || '';
      const matches = cardStack.includes(stack);
      card.classList.toggle('filtered-out', matchCount > 0 && !matches);
    });

    if (banner && bannerTag) {
      const label = sourceItem
        ? sourceItem.dataset.label || sourceItem.textContent.trim()
        : stack.toUpperCase();
      const bannerText = document.getElementById('filter-banner-text');

      if (matchCount === 0 && bannerText) {
        bannerText.innerHTML = `<strong>${label}</strong> is in the skillset, just not tagged on a public project yet. Here's everything else`;
      } else if (bannerText) {
        bannerText.innerHTML = `Showing projects using <strong>${label}</strong>`;
      }
      banner.classList.add('visible');
    }
  }

  function clearFilter() {
    activeStack = null;
    tickerItems.forEach((item) => item.classList.remove('active'));
    cards.forEach((card) => card.classList.remove('filtered-out'));
    if (banner) banner.classList.remove('visible');
  }

  tickerItems.forEach((item) => {
    item.addEventListener('click', () => {
      const stack = item.dataset.stack;
      if (!stack) return;

      if (activeStack === stack) {
        clearFilter();
      } else {
        applyFilter(stack, item);
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', clearFilter);
  }
}
