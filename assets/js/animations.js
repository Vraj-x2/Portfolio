// Section reveal animation
const initSectionObserver = () => {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));
};

// Avatar eye tracking (throttled)
const initEyeTracking = () => {
  const eyes = document.querySelectorAll('.eye');
  if (!eyes.length) return;

  let ticking = false;

  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        if (!pupil) return;

        const rect = eye.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.min(8, Math.hypot(dx, dy));

        pupil.style.transform = `translate(${dx / 10}px, ${dy / 10}px)`;
      });

      ticking = false;
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initSectionObserver();
  initEyeTracking();
});
