const { albums, contacts, favorites } = require('../models/dataStore');

function getFavorites(req, res) {
  res.json({ favorites });
}

function toggleFavorite(req, res) {
  const { itemType, itemId } = req.body || {};

  // Validación básica
  if (!itemType || !itemId) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  // Validar tipo permitido
  if (!['album', 'contact'].includes(itemType)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  const normalizedId = itemId.toString();
  let item = null;

  // Buscar elemento correctamente
  if (itemType === 'album') {
    item = albums.find(album => album.id.toString() === normalizedId);
  } else {
    item = contacts.find(contact => contact.id.toString() === normalizedId);
  }

  if (!item) {
    return res.status(404).json({ error: 'Elemento no encontrado' });
  }

  // Buscar si ya existe en favoritos
  const favoriteIndex = favorites.findIndex(
    fav => fav.type === itemType && fav.id === normalizedId
  );

  let isFavorite;

  if (favoriteIndex >= 0) {
    favorites.splice(favoriteIndex, 1);
    isFavorite = false;
  } else {
    favorites.push({
      type: itemType,
      id: normalizedId,
      title: item.title || item.name,
      subtitle: item.description || item.email,
      image: item.cover || null,
    });
    isFavorite = true;
  }

  res.json({
    favorites,
    isFavorite,
  });
}

module.exports = { getFavorites, toggleFavorite };
