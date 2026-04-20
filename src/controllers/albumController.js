const { albums, contacts, favorites } = require('../models/dataStore');

function getFavorites(req, res) {
  res.json({ favorites });
}

function toggleFavorite(req, res) {
  const { itemType, itemId } = req.body;

  if (!itemType || !itemId) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  const normalizedId = itemId.toString();
  let item = null;

  if (itemType === 'album') {
    item = albums.find((album) => album.id === normalizedId);
  } else if (itemType === 'contact') {
    item = contacts.find((contact) => contact.id.toString() === normalizedId);
  }

  if (!item) {
    return res.status(404).json({ error: 'Elemento no encontrado' });
  }

  const favoriteIndex = favorites.findIndex(
    (favorite) => favorite.type === itemType && favorite.id === normalizedId
  );

  if (favoriteIndex >= 0) {
    favorites.splice(favoriteIndex, 1);
  } else {
    favorites.push({
      type: itemType,
      id: normalizedId,
      title: item.title || item.name,
      subtitle: item.description || item.email,
      image: item.cover || null,
    });
  }

  res.json({
    favorites,
    isFavorite: favoriteIndex < 0,
  });
}

module.exports = { getFavorites, toggleFavorite };
