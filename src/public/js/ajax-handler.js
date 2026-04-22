// ===============================
// 🧠 UTILIDADES
// ===============================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===============================
// 💬 COMENTARIOS
// ===============================
function submitAlbumComment(textarea) {
  if (!textarea) return;

  const albumId = textarea.dataset.albumId;
  const text = textarea.value.trim();

  if (!text) {
    showToast('Escribe un comentario antes de publicar.', 'warning');
    return;
  }

  const list = textarea.closest('.album-comment-panel')?.querySelector('.album-comment-list');
  if (!list) return;

  const comment = document.createElement('div');
  comment.className = 'comment-item d-flex gap-2 mb-2';

  comment.innerHTML = `
    <span class="comment-dot"></span>
    <div>
      <p><strong>Tú</strong> ${text}</p>
      <small class="text-muted">Ahora</small>
    </div>
  `;

  list.prepend(comment);
  textarea.value = '';

  updateAlbumCount(albumId, 'comment');
  showToast('Comentario publicado', 'success');
}

// ===============================
// 👍 ACCIONES DE ÁLBUM
// ===============================
function initializeAlbumButtons() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    handleAlbumAction(button, action);
  });
}

// ===============================
// 🔍 BUSCADOR PRO
// ===============================
function initializeSearch() {
  const input = $('input[type="search"]');
  if (!input) return;

  input.addEventListener('input', debounce(() => handleSearch(input.value), 300));
}

function handleSearch(query) {
  query = query.toLowerCase();

  filterElements('#contactsBody tr', query);
  filterElements('.album-card', query);
  filterElements('#favoritesList .card', query);
}

function filterElements(selector, query) {
  const elements = $$(selector);
  let visible = 0;

  elements.forEach(el => {
    const text = el.textContent.toLowerCase();
    const match = text.includes(query);
    el.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  showSearchResult(visible);
}

function showSearchResult(count) {
  let div = $('#search-results');

  if (!div) {
    div = document.createElement('div');
    div.id = 'search-results';
    div.className = 'alert mt-3';
    $('main')?.prepend(div);
  }

  div.textContent = count === 0
    ? '❌ No se encontraron resultados'
    : `✅ ${count} resultados encontrados`;

  div.className = count === 0
    ? 'alert alert-warning'
    : 'alert alert-success';
}

// ===============================
// ⏱️ DEBOUNCE
// ===============================
function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// ===============================
// ⌨️ ATAJOS PRO
// ===============================
function initKeyboard() {
  document.addEventListener('keydown', (e) => {

    // Ctrl + K (buscar)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = $('input[type="search"]');
      input?.focus();
    }

    // ESC (limpiar)
    if (e.key === 'Escape') {
      const input = $('input[type="search"]');
      if (input) {
        input.value = '';
        handleSearch('');
      }
    }
  });
}

// ===============================
// 🔄 AUTO REFRESH
// ===============================
function autoRefresh() {
  setInterval(() => {
    $('#contactsBody') && fetchContacts();
    $('#favoritesList') && fetchFavorites();
  }, 30000);
}

// ===============================
// 🚀 INIT APP
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  initializeAlbumButtons();
  initializeSearch();
  initKeyboard();
  autoRefresh();

  fetchFavorites();

  $('#loadContactsButton')?.addEventListener('click', fetchContacts);
  $('#addContactButton')?.addEventListener('click', addContact);

  showToast('Sistema listo 🚀', 'success');
});