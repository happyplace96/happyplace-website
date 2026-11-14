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

const personalGrowthQuiz = document.querySelector('#personal-growth-quiz');

if (personalGrowthQuiz) {
  const products = [
    {
      id: 'tiny-habits',
      title: 'Die Tiny Habits®-Methode',
      author: 'BJ Fogg',
      fit: 'Für einen sehr kleinen, sofort umsetzbaren Einstieg',
      pros: ['setzt bewusst bei winzigen Schritten an', 'starker Praxisfokus', 'gut bei hoher Einstiegshürde'],
      cons: ['ausführlicher als eine reine Kurzanleitung', 'der spielerische Ansatz passt nicht zu jedem'],
      link: 'https://www.amazon.de/dp/3442718694?tag=happyplaced01-21',
      weights: { habits: 4, start: 5, practice: 4, short: 3, guided: 3, consistency: 2 }
    },
    {
      id: 'one-percent',
      title: 'Die 1%-Methode',
      author: 'James Clear',
      fit: 'Für ein verständliches Gesamtsystem rund um Gewohnheiten',
      pros: ['verbindet mehrere Gewohnheitshebel', 'viele konkrete Beispiele', 'gut für systematisches Vorgehen'],
      cons: ['mehr Leseaufwand', 'hilft nur, wenn du die Ideen anschließend selbst testest'],
      link: 'https://www.amazon.de/dp/3442178584?tag=happyplaced01-21',
      weights: { habits: 5, consistency: 5, read: 3, medium: 3, flexible: 3, deep: 2 }
    },
    {
      id: 'bullet-journal',
      title: 'Die Bullet-Journal-Methode',
      author: 'Ryder Carroll',
      fit: 'Für Menschen, die Gedanken und Aufgaben analog ordnen möchten',
      pros: ['flexibles System statt vorgegebenem Kalender', 'verbindet Planung und Reflexion', 'mit einfachem Notizbuch nutzbar'],
      cons: ['benötigt eigene Einrichtung', 'weniger passend, wenn du ungern von Hand schreibst'],
      link: 'https://www.amazon.de/dp/349963340X?tag=happyplaced01-21',
      weights: { planning: 5, overwhelm: 5, write: 5, medium: 3, flexible: 5, reflection: 2 }
    },
    {
      id: 'six-minute',
      title: 'Das 6-Minuten-Tagebuch',
      author: 'Dominik Spenst',
      fit: 'Für eine kurze, geführte Schreib- und Reflexionsroutine',
      pros: ['klar vorgegebene Fragen', 'geringer täglicher Zeitaufwand', 'kein eigenes Seitensystem nötig'],
      cons: ['weniger flexibel', 'kein umfassendes Produktivitäts- oder Gewohnheitssystem'],
      link: 'https://www.amazon.de/dp/3499005190?tag=happyplaced01-21',
      weights: { reflection: 5, write: 5, short: 5, guided: 5, consistency: 2 }
    },
    {
      id: 'deep-work',
      title: 'Konzentriert arbeiten (Deep Work)',
      author: 'Cal Newport',
      fit: 'Für längere konzentrierte Arbeitsphasen mit weniger Ablenkung',
      pros: ['klarer Fokus auf anspruchsvolle Arbeit', 'hilft beim Hinterfragen digitaler Ablenkungen', 'gut für Wissensarbeit'],
      cons: ['kein schneller Tagesplan', 'die Methode verlangt bewusst geschützte Zeit'],
      link: 'https://www.amazon.de/dp/3868816577?tag=happyplaced01-21',
      weights: { focus: 5, distraction: 5, read: 4, deep: 5, flexible: 2 }
    }
  ];

  const steps = [...personalGrowthQuiz.querySelectorAll('.quiz-step')];
  const nextButton = document.querySelector('#quiz-next');
  const backButton = document.querySelector('#quiz-back');
  const restartButton = document.querySelector('#quiz-restart');
  const error = document.querySelector('#quiz-error');
  const results = document.querySelector('#quiz-results');
  const progress = document.querySelector('.quiz-progress');
  const progressBar = progress?.querySelector('span');
  const stepLabel = document.querySelector('#quiz-step-label');
  let currentStep = 0;

  const showStep = (index) => {
    currentStep = index;
    steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
    backButton.hidden = index === 0;
    nextButton.textContent = index === steps.length - 1 ? 'Ergebnis anzeigen' : 'Weiter';
    stepLabel.textContent = `Frage ${index + 1} von ${steps.length}`;
    progress?.setAttribute('aria-valuenow', String(index + 1));
    if (progressBar) progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
    error.textContent = '';
    steps[index].querySelector('legend')?.focus?.();
  };

  const resultCard = (product, rank, primary = false) => `
    <article class="quiz-result-card${primary ? ' is-primary' : ''}">
      <p class="eyebrow">${primary ? `Empfehlung ${rank}` : `Alternative ${rank - 2}`}</p>
      <h3>${product.title}</h3>
      <p class="quiz-author">${product.author}</p>
      <p><strong>Passt besonders:</strong> ${product.fit}</p>
      <div class="quiz-pro-con"><div><strong>Vorteile</strong><ul>${product.pros.map((item) => `<li>${item}</li>`).join('')}</ul></div><div><strong>Nachteile</strong><ul>${product.cons.map((item) => `<li>${item}</li>`).join('')}</ul></div></div>
      <p class="affiliate-inline"><strong>Werbung/Affiliate-Link:</strong> Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht.</p>
      <a class="button ${primary ? 'primary' : 'secondary'}" href="${product.link}" target="_blank" rel="sponsored noopener">Bei Amazon prüfen</a>
    </article>`;

  const calculateResults = () => {
    const answers = [...new FormData(personalGrowthQuiz).values()];
    return products
      .map((product) => ({ ...product, score: answers.reduce((sum, answer) => sum + (product.weights[answer] || 0), 0) }))
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'de'));
  };

  const renderResults = () => {
    const ranked = calculateResults();
    document.querySelector('#quiz-summary').textContent = `Deine Antworten sprechen zuerst für „${ranked[0].title}“ und „${ranked[1].title}“. Prüfe trotzdem die Nachteile: Der beste Treffer ist der, dessen Methode du im Alltag tatsächlich anwenden möchtest.`;
    document.querySelector('#quiz-primary-results').innerHTML = ranked.slice(0, 2).map((product, index) => resultCard(product, index + 1, true)).join('');
    document.querySelector('#quiz-other-results').innerHTML = ranked.slice(2).map((product, index) => resultCard(product, index + 3)).join('');
    personalGrowthQuiz.closest('.quiz-shell').hidden = true;
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  nextButton?.addEventListener('click', () => {
    const selected = steps[currentStep].querySelector('input[type="radio"]:checked');
    if (!selected) {
      error.textContent = 'Bitte wähle eine Antwort aus.';
      return;
    }
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
    else renderResults();
  });

  backButton?.addEventListener('click', () => showStep(Math.max(0, currentStep - 1)));
  restartButton?.addEventListener('click', () => {
    personalGrowthQuiz.reset();
    results.hidden = true;
    personalGrowthQuiz.closest('.quiz-shell').hidden = false;
    showStep(0);
    document.querySelector('.quiz-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  showStep(0);
}
