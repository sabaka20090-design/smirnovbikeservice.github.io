const header = document.querySelector('[data-header]');
const revealItems = document.querySelectorAll('.reveal');
const faqItems = document.querySelectorAll('.faq-item');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

faqItems.forEach(item => {
  const summary = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!summary || !answer) return;

  summary.addEventListener('click', event => {
    event.preventDefault();

    if (item.dataset.animating === 'true') return;
    item.dataset.animating = 'true';

    if (item.classList.contains('is-open')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      requestAnimationFrame(() => {
        answer.style.maxHeight = '0px';
        item.classList.remove('is-open');
        summary.setAttribute('aria-expanded', 'false');
      });
    } else {
      answer.hidden = false;
      item.classList.add('is-open');
      summary.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      });
    }

    window.setTimeout(() => {
      if (!item.classList.contains('is-open')) {
        answer.hidden = true;
      } else {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
      item.dataset.animating = 'false';
    }, 340);
  });
});

window.addEventListener('load', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
