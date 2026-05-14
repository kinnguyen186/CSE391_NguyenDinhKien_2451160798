// Portfolio Filter
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio-item');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.textContent.toLowerCase();

    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    items.forEach((item) => {
      if (
        filter === 'all' ||
        item.dataset.category === filter
      ) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Contact Form
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  alert('Message sent successfully!');
  form.reset();
});