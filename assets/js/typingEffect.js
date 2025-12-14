const typingEffect = () => {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const texts = [
    'Full Stack Java Developer',
    'Spring Boot & React Engineer',
    'Software Engineering Graduate'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = texts[textIndex];
    el.textContent = deleting
      ? current.slice(0, --charIndex)
      : current.slice(0, ++charIndex);

    if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1200);
    } else if (deleting && charIndex === 0) {
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, deleting ? 60 : 100);
    }
  };

  type();
};

document.addEventListener('DOMContentLoaded', () => {
  typingEffect();
  themeToggle();
  contactForm();
});
