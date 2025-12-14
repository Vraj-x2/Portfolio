const contactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) throw new Error();
      status.textContent = 'Message sent successfully!';
      status.className = 'form-success';
      form.reset();
    } catch {
      status.textContent = 'Failed to send message.';
      status.className = 'form-error';
    }
  });
};
