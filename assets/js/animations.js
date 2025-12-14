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
                               calc(-50% + ${Math.sin(angle) * distance}px))`;
    });
});

document.getElementById('show-more-btn').addEventListener('click', function() {
    var moreProjects = document.getElementById('more-projects');
    if (moreProjects.style.display === 'none' || moreProjects.style.display === '') {
        moreProjects.style.display = 'grid';
        this.textContent = 'Show Less';
    } else {
        moreProjects.style.display = 'none';
        this.textContent = 'Show More';
    }
});

const showMoreBtn = document.getElementById('show-more-btn');
const moreProjects = document.getElementById('more-projects');

showMoreBtn.addEventListener('click', function() {
    if (moreProjects.classList.contains('show')) {
        moreProjects.classList.remove('show');
        this.textContent = 'Show More';
    } else {
        moreProjects.classList.add('show');
        this.textContent = 'Show Less';
    }
});
