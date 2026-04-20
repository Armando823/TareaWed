// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.querySelector('.toast-container') || createToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="close" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, duration);

  return toast;
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// Enhanced error handling
function handleAjaxError(error, context) {
  console.error(`Error in ${context}:`, error);
  showToast(`Error al ${context}. Inténtalo de nuevo.`, 'error');
}

// Loading state management
function setLoadingState(button, loading) {
  if (loading) {
    button.classList.add('loading');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

function renderContacts(contacts) {
  const body = document.getElementById('contactsBody');
  if (!body) return;

  if (contacts.length === 0) {
    body.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay contactos disponibles.</td></tr>';
    return;
  }

  const favoriteContacts = window.initialFavorites || [];

  body.innerHTML = contacts
    .map((contact) => {
      const isFavorite = favoriteContacts.some(
        (favorite) => favorite.type === 'contact' && favorite.id.toString() === contact.id.toString()
      );
      return `
        <tr class="contact-item">
          <td><strong>${contact.name}</strong></td>
          <td>${contact.phone}</td>
          <td>${contact.email}</td>
          <td>
            <button type="button" class="btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}"
                    onclick="toggleFavorite('contact', '${contact.id}', this)">
              <i class="bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}"></i>
              ${isFavorite ? 'Quitar' : 'Agregar'}
            </button>
          </td>
        </tr>
      `;
    })
    .join('');
}

function renderFavorites(favorites) {
  const container = document.getElementById('favoritesList');
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info border-0 bg-light">
          <i class="bi bi-info-circle me-2"></i>
          No hay favoritos aún. Agrega álbumes o contactos para verlos aquí.
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = favorites
    .map(
      (favorite) => `
        <div class="col-md-6 mb-3">
          <div class="card shadow-sm h-100">
            ${favorite.image ? `<img src="${favorite.image}" class="card-img-top" alt="${favorite.title}" style="height: 150px; object-fit: cover;" />` : ''}
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">${favorite.title}</h6>
              <p class="card-text text-muted small flex-grow-1">${favorite.subtitle}</p>
              <span class="badge bg-warning text-dark align-self-start">
                <i class="bi bi-star-fill me-1"></i>${favorite.type}
              </span>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function fetchContacts() {
  const body = document.getElementById('contactsBody');
  if (body) {
    body.innerHTML = '<tr><td colspan="4" class="text-center"><div class="spinner"></div>Cargando contactos...</td></tr>';
  }

  fetch('/api/contacts')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderContacts(data.contacts || []);
      showToast('Contactos cargados correctamente', 'success', 2000);
    })
    .catch((error) => {
      handleAjaxError(error, 'cargar contactos');
      if (body) {
        body.innerHTML = '<tr><td colspan="4" class="text-danger text-center">Error al cargar los contactos.</td></tr>';
      }
    });
}

function addContact() {
  const nameInput = document.getElementById('newContactName');
  const emailInput = document.getElementById('newContactEmail');
  const phoneInput = document.getElementById('newContactPhone');
  const addButton = document.getElementById('addContactButton');

  if (!nameInput || !emailInput || !phoneInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    showToast('Completa nombre, email y teléfono para agregar un amigo.', 'warning');
    return;
  }

  setLoadingState(addButton, true);

  fetch('/api/contacts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone }),
  })
    .then((response) => {
      setLoadingState(addButton, false);
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || 'Error al agregar el contacto');
        });
      }
      return response.json();
    })
    .then((data) => {
      showToast(`Amigo ${data.contact.name} agregado correctamente`, 'success');
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      fetchContacts();
    })
    .catch((error) => {
      setLoadingState(addButton, false);
      handleAjaxError(error, 'agregar contacto');
    });
}

function fetchFavorites() {
  fetch('/api/favorites')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderFavorites(data.favorites || []);
      window.initialFavorites = data.favorites || [];
    })
    .catch((error) => {
      handleAjaxError(error, 'cargar favoritos');
    });
}

function toggleFavorite(itemType, itemId, button) {
  setLoadingState(button, true);

  fetch('/api/favorites/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemType, itemId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      setLoadingState(button, false);

      // Update button appearance
      const isFavorite = data.isFavorite;
      button.className = `btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`;
      button.innerHTML = `<i class="bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}"></i> ${isFavorite ? 'Quitar' : 'Agregar'}`;

      // Show success message
      const itemName = itemType === 'contact' ? 'contacto' : 'álbum';
      showToast(`${itemName} ${isFavorite ? 'agregado a' : 'removido de'} favoritos`, 'success');

      // Refresh favorites list if we're on the favorites page
      if (window.location.pathname === '/favoritos') {
        fetchFavorites();
      }
    })
    .catch((error) => {
      setLoadingState(button, false);
      handleAjaxError(error, 'actualizar favoritos');
    });
}

function updateAlbumCount(albumId, type, delta = 1) {
  const cardBody = document.querySelector(`[data-album-id="${albumId}"]`)?.closest('.card-body');
  if (!cardBody) return;

  const countElement = cardBody.querySelector(`.album-${type}-count`);
  if (!countElement) return;

  const count = parseInt(countElement.textContent, 10) || 0;
  countElement.textContent = Math.max(0, count + delta);
}

function handleAlbumAction(button, action, imageIndex) {
  const albumId = button.dataset.albumId;
  if (!albumId) return;

  if (action === 'like') {
    const isLiked = button.dataset.liked === 'true';
    const delta = isLiked ? -1 : 1;
    button.dataset.liked = String(!isLiked);

    if (!isLiked) {
      button.classList.remove('btn-light');
      button.classList.add('btn-success');
      if (button.classList.contains('btn-like-image')) {
        button.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i>';
      } else {
        button.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> Me gusta';
      }
      showToast('Te gusta esta imagen/álbum', 'success');
    } else {
      button.classList.remove('btn-success');
      button.classList.add('btn-light');
      if (button.classList.contains('btn-like-image')) {
        button.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
      } else {
        button.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Me gusta';
      }
      showToast('Ya no te gusta esta foto', 'info');
    }

    updateAlbumCount(albumId, 'like', delta);
  } else if (action === 'comment') {
    const commentText = prompt('Escribe tu comentario:');
    if (!commentText) {
      return;
    }
    updateAlbumCount(albumId, 'comment');
    showToast('Comentario publicado', 'success');
  } else if (action === 'share') {
    const shareText = `Mira este álbum: ${window.location.origin}${window.location.pathname}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => {
        updateAlbumCount(albumId, 'share');
        showToast('Enlace copiado para compartir', 'success');
      }).catch(() => {
        updateAlbumCount(albumId, 'share');
        showToast('Comparte este álbum con tu amigo', 'success');
      });
    } else {
      updateAlbumCount(albumId, 'share');
      showToast('Comparte este álbum con tu amigo', 'success');
    }
  }
}

function submitAlbumComment(textarea) {
  if (!textarea) return;
  const albumId = textarea.dataset.albumId;
  const commentText = textarea.value.trim();
  if (!commentText) {
    showToast('Escribe un comentario antes de publicar.', 'warning');
    return;
  }

  const commentList = textarea.closest('.album-comment-panel')?.querySelector('.album-comment-list');
  if (!commentList) return;

  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item d-flex gap-2 mb-2 align-items-start';
  commentItem.innerHTML = `
    <span class="comment-dot mt-1"></span>
    <div>
      <p class="mb-1"><strong>Tú</strong> ${commentText}</p>
      <small class="text-muted">Ahora mismo</small>
    </div>
  `;

  commentList.prepend(commentItem);
  textarea.value = '';
  updateAlbumCount(albumId, 'comment');
  showToast('Comentario publicado', 'success');
}

function initializeAlbumButtons() {
  const albumButtons = document.querySelectorAll('.btn-like, .btn-comment, .btn-share, .btn-like-image, .btn-comment-image, .btn-share-image');
  albumButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isLike = button.classList.contains('btn-like') || button.classList.contains('btn-like-image');
      const isComment = button.classList.contains('btn-comment') || button.classList.contains('btn-comment-image');
      const isShare = button.classList.contains('btn-share') || button.classList.contains('btn-share-image');
      const action = isLike ? 'like' : isComment ? 'comment' : isShare ? 'share' : null;
      if (action) {
        handleAlbumAction(button, action);
      }
    });
  });
}

window.toggleFavorite = toggleFavorite;

// Search functionality
function initializeSearch() {
  const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="buscar"], input[placeholder*="Buscar"]');

  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(handleSearch, 300));
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(e);
      }
    });
  });
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const currentPath = window.location.pathname;

  if (currentPath === '/contactos') {
    filterContacts(query);
  } else if (currentPath === '/albums') {
    filterAlbums(query);
  } else if (currentPath === '/favoritos') {
    filterFavorites(query);
  }
}

function filterContacts(query) {
  const rows = document.querySelectorAll('#contactsBody tr');
  let visibleCount = 0;

  rows.forEach(row => {
    if (row.cells.length < 3) return; // Skip loading/error rows

    const name = row.cells[0].textContent.toLowerCase();
    const phone = row.cells[1].textContent.toLowerCase();
    const email = row.cells[2].textContent.toLowerCase();

    const matches = name.includes(query) || phone.includes(query) || email.includes(query);
    row.style.display = matches ? '' : 'none';

    if (matches) visibleCount++;
  });

  updateSearchResults(visibleCount, 'contactos');
}

function filterAlbums(query) {
  const albums = document.querySelectorAll('.album-card');
  let visibleCount = 0;

  albums.forEach(album => {
    const title = album.querySelector('.card-title, h5, h6')?.textContent.toLowerCase() || '';
    const description = album.querySelector('.card-text, p')?.textContent.toLowerCase() || '';

    const matches = title.includes(query) || description.includes(query);
    album.style.display = matches ? '' : 'none';

    if (matches) visibleCount++;
  });

  updateSearchResults(visibleCount, 'álbumes');
}

function filterFavorites(query) {
  const favorites = document.querySelectorAll('#favoritesList .card');
  let visibleCount = 0;

  favorites.forEach(favorite => {
    const title = favorite.querySelector('.card-title, h5, h6')?.textContent.toLowerCase() || '';
    const subtitle = favorite.querySelector('.card-text, p')?.textContent.toLowerCase() || '';

    const matches = title.includes(query) || subtitle.includes(query);
    favorite.style.display = matches ? '' : 'none';

    if (matches) visibleCount++;
  });

  updateSearchResults(visibleCount, 'favoritos');
}

function updateSearchResults(count, type) {
  let resultsDiv = document.getElementById('search-results');
  if (!resultsDiv) {
    resultsDiv = document.createElement('div');
    resultsDiv.id = 'search-results';
    resultsDiv.className = 'alert alert-info mt-3';
    resultsDiv.style.cssText = 'position: sticky; top: 80px; z-index: 100;';

    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(resultsDiv, main.firstChild);
    }
  }

  if (count === 0) {
    resultsDiv.innerHTML = `<i class="bi bi-search me-2"></i>No se encontraron ${type} que coincidan con tu búsqueda.`;
    resultsDiv.className = 'alert alert-warning mt-3';
  } else {
    resultsDiv.innerHTML = `<i class="bi bi-check-circle me-2"></i>Se encontraron ${count} ${type}.`;
    resultsDiv.className = 'alert alert-success mt-3';
  }

  // Hide results message after 3 seconds if no search is active
  setTimeout(() => {
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="buscar"]');
    if (searchInput && !searchInput.value.trim()) {
      resultsDiv.style.display = 'none';
    }
  }, 3000);
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="buscar"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="buscar"]');
      if (searchInput && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        handleSearch({ target: searchInput });
      }
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize search functionality
  initializeSearch();
  initializeKeyboardNavigation();

  // Auto-refresh data every 30 seconds
  setInterval(() => {
    if (document.getElementById('contactsBody')) {
      fetchContacts();
    }
    if (document.getElementById('favoritesList')) {
      fetchFavorites();
    }
  }, 30000);

  // Load initial data
  const loadButton = document.getElementById('loadContactsButton');
  if (loadButton) {
    loadButton.addEventListener('click', fetchContacts);
  }

  const addButton = document.getElementById('addContactButton');
  if (addButton) {
    addButton.addEventListener('click', addContact);
  }

  initializeAlbumButtons();
  fetchFavorites();

  // Show welcome message
  setTimeout(() => {
    showToast('¡Bienvenido! Usa Ctrl+K para buscar rápidamente.', 'info', 4000);
  }, 1000);
});
