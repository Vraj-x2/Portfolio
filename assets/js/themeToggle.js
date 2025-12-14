const themeToggle = () => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const body = document.body;
  const moon = btn.querySelector('.fa-moon');
  const sun = btn.querySelector('.fa-sun');

  const setTheme = isLight => {
    body.classList.toggle('light-theme', isLight);
    moon.style.display = isLight ? 'none' : 'block';
    sun.style.display = isLight ? 'block' : 'none';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

  setTheme(localStorage.getItem('theme') === 'light');
  btn.addEventListener('click', () =>
    setTheme(!body.classList.contains('light-theme'))
  );
};
