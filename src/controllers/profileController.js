const { profile, albums: dbAlbums, contacts, favorites } = require('../models/dataStore');

function renderSection(req, res, activeSection = 'inicio') {
  try {
    // ✅ Secciones válidas (coinciden con tu frontend)
    const validSections = ['inicio', 'perfil', 'albums', 'contactos', 'favoritos'];

    if (!validSections.includes(activeSection)) {
      activeSection = 'inicio';
    }

    // ✅ Fallback de álbumes (por si no hay datos)
    const albums = dbAlbums && dbAlbums.length > 0
      ? dbAlbums
      : [
          {
            id: 1,
            title: "Vacaciones",
            description: "Viaje a la playa",
            cover: "https://picsum.photos/400/300?1",
            images: [
              "https://picsum.photos/400/300?11",
              "https://picsum.photos/400/300?12"
            ],
            likes: 10,
            comments: 5,
            shares: 2
          },
          {
            id: 2,
            title: "Familia",
            description: "Momentos especiales",
            cover: "https://picsum.photos/400/300?2",
            images: [
              "https://picsum.photos/400/300?21",
              "https://picsum.photos/400/300?22"
            ],
            likes: 20,
            comments: 8,
            shares: 3
          }
        ];

    // ✅ Reconstruir favoritos correctamente
    const fullFavorites = (favorites || []).map(fav => {
      let item = null;

      if (fav.type === 'album') {
        item = albums.find(a => a.id.toString() === fav.id);
      } else if (fav.type === 'contact') {
        item = contacts?.find(c => c.id.toString() === fav.id);
      }

      if (!item) return null;

      return {
        type: fav.type,
        id: fav.id,
        title: item.title || item.name,
        subtitle: item.description || item.email,
        image: item.cover || null,
      };
    }).filter(Boolean);

    // ✅ Render final
    res.render('pages/index', {
      profile,
      albums,
      contacts,
      favorites: fullFavorites,
      activeSection,
      layout: 'layouts/main' // 🔥 importante para usar tu layout
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la página');
  }
}

module.exports = { renderSection };