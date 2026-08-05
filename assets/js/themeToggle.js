/* exported themeToggle */
// Theme toggle functionality
const themeToggle = () => {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeButton.querySelector('.fa-moon');
    const sunIcon = themeButton.querySelector('.fa-sun');

    const syncIcons = () => {
        const isLight = body.classList.contains('light-theme');
        moonIcon.style.display = isLight ? 'none' : 'block';
        sunIcon.style.display = isLight ? 'block' : 'none';
    };

    // Body class is set synchronously in <head> (see index.html) to avoid
    // a flash of the wrong theme; just sync the icons to match on load.
    syncIcons();

    themeButton.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
        syncIcons();
    });
};
