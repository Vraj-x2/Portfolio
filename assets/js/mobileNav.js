// Mobile navigation toggle
const mobileNav = () => {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    const setOpen = (isOpen) => {
        links.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    };

    toggle.addEventListener('click', () => {
        setOpen(!links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });
};

document.addEventListener('DOMContentLoaded', mobileNav);
