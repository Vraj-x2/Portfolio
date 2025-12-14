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

// Rotating dynamic stat on hero
document.addEventListener('DOMContentLoaded', () => {
    const numberEl = document.getElementById('stat-dynamic-number');
    const labelEl = document.getElementById('stat-dynamic-label');
    if (!numberEl || !labelEl) return;

    const variants = [
        { number: 'Cloud+', label: 'Docker / AWS basics' },
        { number: 'API', label: 'REST & GraphQL' },
        { number: 'Security', label: 'JWT / Spring Security' },
        { number: 'Perf', label: 'Caching / async' },
        { number: 'Testing', label: 'JUnit / Postman' },
        { number: 'CI/CD', label: 'GitHub Actions' },
        { number: 'Data', label: 'MySQL / Postgres' },
        { number: 'Frontend', label: 'React / Vite' },
        { number: 'Patterns', label: 'Clean architecture' },
        { number: 'Realtime', label: 'WebSocket / SSE' },
        { number: 'AI', label: 'Gemini integrations' },
        { number: 'Docs', label: 'OpenAPI / Swagger' },
        { number: 'Monitoring', label: 'Metrics & logs' },
        { number: 'Microservices', label: 'Gateway / discovery' },
        { number: 'Deploy', label: 'Docker compose' }
    ];

    let idx = 0;
    const rotate = () => {
        numberEl.classList.add('stat-fade');
        labelEl.classList.add('stat-fade');

        setTimeout(() => {
            const next = variants[idx % variants.length];
            numberEl.textContent = next.number;
            labelEl.textContent = next.label;
            idx += 1;
            numberEl.classList.remove('stat-fade');
            labelEl.classList.remove('stat-fade');
        }, 450);
    };

    rotate();
    setInterval(rotate, 4200);
});
