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

const academyWaitlistForm = document.querySelector('#academy-waitlist-form');
academyWaitlistForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(academyWaitlistForm);
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const topic = String(form.get('topic') || 'noch offen').trim();
  const subject = encodeURIComponent('Warteliste Happy Place Academy');
  const body = encodeURIComponent(
    `Hallo Happy Place,\n\nich möchte auf die Warteliste der Happy Place Academy.\n\nVorname: ${name}\nE-Mail: ${email}\nWunschthema: ${topic}\n\nIch möchte Informationen zur Konzept- und Testphase erhalten und kann diese Einwilligung jederzeit widerrufen.`
  );
  const status = document.querySelector('#academy-form-status');
  if (status) status.textContent = 'Deine vorbereitete E-Mail wird geöffnet. Bitte sende sie ab, um die Anmeldung abzuschließen.';
  window.location.href = `mailto:happyplacede96@gmail.com?subject=${subject}&body=${body}`;
});
