fetch('assets/data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear any previous content

    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      if (index >= 3) {
        card.classList.add('hidden'); // Hide projects after the first 3
      }

      const techList = project.tech.map(tech => `<span>${tech}</span>`).join('');

      card.innerHTML = `
        <div class="project-info">
          <h3>${project.title}</h3>
          <p class="project-date">${project.date}</p>
          <p>${project.description}</p>
          <div class="project-tech">${techList}</div>
          <a href="${project.link}" target="_blank" class="view-project-btn">View Project</a>
        </div>
      `;

      container.appendChild(card);
    });

    // Show More / Show Less button behavior
    const showMoreBtn = document.getElementById('show-more-btn');
    showMoreBtn.addEventListener('click', function () {
      const hiddenCards = document.querySelectorAll('.project-card.hidden');
      hiddenCards.forEach(card => {
        if (card.style.display === 'none' || card.style.display === '') {
          card.style.display = 'flex'; // Show the hidden project
        } else {
          card.style.display = 'none'; // Hide again
        }
      });

      if (showMoreBtn.textContent === 'Show More') {
        showMoreBtn.textContent = 'Show Less';
      } else {
        showMoreBtn.textContent = 'Show More';
      }
    });
  })
  .catch(error => {
    console.error('Error loading projects:', error);
  });
