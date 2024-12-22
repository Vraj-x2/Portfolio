// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer to detect when a section is in view and add class for animation
const sections = document.querySelectorAll('section');

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, { root: null, threshold: 0.5 });
sections.forEach(section => observer.observe(section));

// Testimonial Carousel Logic
let currentTestimonialIndex = 0;
const testimonials = [
    '"Vraj is an exceptional developer with a strong understanding of both front-end and back-end technologies. Highly recommended!"',
    '"Working with Vraj was a great experience. His problem-solving skills are top-notch, and he delivers results on time."'
];

const testimonialText = document.querySelector('.testimonial-card p');
const testimonialCite = document.querySelector('.testimonial-card cite');

document.querySelector('.next').addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
});

function updateTestimonial() {
    testimonialText.textContent = testimonials[currentTestimonialIndex];
    testimonialCite.textContent = `- Client Name ${currentTestimonialIndex + 1}`;
}

document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDistance = rect.width / 4; // Limit movement to 1/4 of eye width
        const distance = Math.min(maxDistance, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY));

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentIndex = 0;
 
    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
 
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length; // Loop back to start
        showTestimonial(currentIndex);
    });
 
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; // Loop back to end
        showTestimonial(currentIndex);
    });
 
    showTestimonial(currentIndex); // Show first testimonial initially
 });


document.addEventListener('DOMContentLoaded', function() {
    const texts = ['Software Engineer', 'Front end Developer', 'Back end Developer'];
    const typingText = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1500); // Wait before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Wait before typing next text
        } else {
            setTimeout(type, isDeleting ? 50 : 100); // Delete faster than type
        }
    }

    type(); // Start the typing effect
});
    