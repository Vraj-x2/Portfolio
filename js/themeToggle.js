// Theme toggle functionality
const themeToggle = () => {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeButton.querySelector('.fa-moon');
    const sunIcon = themeButton.querySelector('.fa-sun');

    themeButton.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        moonIcon.style.display = body.classList.contains('light-theme') ? 'none' : 'block';
        sunIcon.style.display = body.classList.contains('light-theme') ? 'block' : 'none';
    });
};
