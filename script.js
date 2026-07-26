const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product-card');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    products.forEach((product) => {
      const categories = product.dataset.category.split(' ');
      product.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

document.querySelectorAll('.footer-links').forEach((footerLinks) => {
  if (!footerLinks.querySelector('a[href*="#buch"]')) {
    const booksLink = document.createElement('a');
    booksLink.href = 'index.html#buch';
    booksLink.textContent = 'Bücher';
    footerLinks.prepend(booksLink);
  }
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
