// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Eye movement animation
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDistance = rect.width / 4;
        const distance = Math.min(maxDistance, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY));
        
        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), 
                               calc(-50% + ${Math.sin(angle) * distance}px)`;
    });
});

// Typing effect
const typingEffect = () => {
    const texts = ['Software Engineer', 'Front end Developer', 'Back end Developer'];
    const typingText = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[textIndex];
        typingText.textContent = isDeleting 
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    };
    type();
};

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

// Back to top button
const backToTop = () => {
    const button = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        button.style.display = window.scrollY > 300 ? 'block' : 'none';
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