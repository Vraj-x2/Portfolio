fetch('assets/data/projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    const btn = document.getElementById('show-more-btn');
    if (!container || !btn) return;

    container.innerHTML = '';

    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      if (index >= 3) card.classList.add('hidden');

      card.innerHTML = `
        <div class="project-info">
          <h3>${project.title}</h3>
          <p class="project-date">${project.date}</p>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
          <a href="${project.link}" target="_blank" class="view-project-btn">View Project</a>
        </div>
      `;

      container.appendChild(card);
    });

    btn.addEventListener('click', () => {
      const hidden = container.querySelectorAll('.project-card.hidden');
      const expanded = btn.dataset.expanded === 'true';

      hidden.forEach(card => card.classList.toggle('hidden', expanded));
      btn.textContent = expanded ? 'Show More' : 'Show Less';
      btn.dataset.expanded = (!expanded).toString();
    });
  })
  .catch(err => console.error('Projects load failed:', err));
