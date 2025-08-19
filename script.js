// Blur do fundo ao rolar/clicar
(function () {
  const bg = document.getElementById('bg');
  const SCROLL_THRESHOLD = 120; // px

  function updateBlurOnScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      bg.classList.add('blur');
    } else {
      bg.classList.remove('blur');
    }
  }

  updateBlurOnScroll();
  window.addEventListener('scroll', updateBlurOnScroll, { passive: true });

  const links = document.querySelectorAll('[data-scroll]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      bg.classList.add('blur');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// Animações de entrada
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  items.forEach(el => observer.observe(el));
})();
