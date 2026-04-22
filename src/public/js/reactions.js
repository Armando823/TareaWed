// 🎯 CONFIG
const SELECTORS = {
  like: '.btn-like',
  comment: '.btn-comment',
  share: '.btn-share'
};

// 🔢 ACTUALIZAR CONTADOR
function updateCounter(container, selector, increment = 1) {
  const el = container.querySelector(selector);
  if (!el) return;

  let count = Number(el.dataset.count || el.textContent || 0);
  count += increment;

  el.dataset.count = count;
  el.textContent = count;

  el.classList.add('counter-update');
  setTimeout(() => el.classList.remove('counter-update'), 300);
}

// 🎬 ANIMACIÓN BOTÓN
function animate(button) {
  button.classList.add('btn-clicked');
  setTimeout(() => button.classList.remove('btn-clicked'), 150);
}

// 💥 EFECTO FLOTANTE
function createFloatingIcon(button, icon) {
  const el = document.createElement('div');
  el.className = 'reaction-feedback';
  el.textContent = icon;

  const rect = button.getBoundingClientRect();

  el.style.left = rect.left + rect.width / 2 + 'px';
  el.style.top = rect.top + 'px';

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 800);
}

// 🔁 HANDLER CENTRAL (EVENT DELEGATION PRO)
function handleClick(e) {
  const button = e.target.closest('.btn-like, .btn-comment, .btn-share');
  if (!button) return;

  if (button.disabled) return;
  button.disabled = true;
  setTimeout(() => (button.disabled = false), 400);

  const card = button.closest('.card-body');
  if (!card) return;

  animate(button);

  if (button.matches(SELECTORS.like)) {
    updateCounter(card, '.like-count');
    createFloatingIcon(button, '👍');
  }

  if (button.matches(SELECTORS.comment)) {
    updateCounter(card, '.comment-count');
    createFloatingIcon(button, '💬');
  }

  if (button.matches(SELECTORS.share)) {
    updateCounter(card, '.share-count');
    createFloatingIcon(button, '🔗');

    const post = button.closest('.card');
    post?.classList.add('share-animation');
    setTimeout(() => post?.classList.remove('share-animation'), 600);
  }
}

// 🎯 INIT
function initReactions() {
  document.addEventListener('click', handleClick);
}

// 🚀 START
document.addEventListener('DOMContentLoaded', initReactions);