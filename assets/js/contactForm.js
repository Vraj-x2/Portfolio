// Back to top button
const backToTop = () => {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        button.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Contact form handling
const contactForm = () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = 'Message sent successfully!';
                status.style.color = '#4CAF50';
                form.reset();
            } else {
                throw await response.json();
            }
        } catch (error) {
            status.textContent = 'Oops! There was a problem sending your message.';
            status.style.color = '#ff4444';
        }
    });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    typingEffect();
    themeToggle();
    backToTop();
    contactForm();
});
