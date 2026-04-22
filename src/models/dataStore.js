const profile = {
  id: 'user-1',
  name: 'María González',
  description: 'Desarrolladora web en formación. Me encanta crear interfaces limpias y trabajar con Node.',
  avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
};

// 🟦 Publicaciones tipo Facebook
const posts = [
  {
    id: 'post-1',
    user: {
      id: 'user-1',
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    },
    content: 'Disfrutando de un hermoso paisaje 🌄✨',
    images: [
      'https://picsum.photos/id/1018/600/400',
      'https://picsum.photos/id/1025/600/400',
    ],
    createdAt: new Date().toISOString(),

    reactions: {
      like: 10,
      love: 5,
      haha: 2,
      wow: 1,
      sad: 0,
      angry: 0,
    },

    comments: [
      {
        id: 'c1',
        user: 'Ana Ruiz',
        text: '¡Qué bonito lugar! 😍',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'c2',
        user: 'Carlos Mejía',
        text: 'Se ve increíble 🔥',
        createdAt: new Date().toISOString(),
      },
    ],

    shares: 2,
  },

  {
    id: 'post-2',
    user: {
      id: 'user-1',
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    },
    content: 'Hoy cociné algo especial 🍝😋',
    images: [
      'https://picsum.photos/id/1080/600/400',
    ],
    createdAt: new Date().toISOString(),

    reactions: {
      like: 20,
      love: 12,
      haha: 1,
      wow: 3,
      sad: 0,
      angry: 0,
    },

    comments: [
      {
        id: 'c3',
        user: 'Sofía Vega',
        text: '¡Se ve delicioso!',
        createdAt: new Date().toISOString(),
      },
    ],

    shares: 1,
  },
];

// 👥 Contactos
const contacts = [
  { id: '1', name: 'Ana Ruiz', phone: '555-1234', email: 'ana@example.com' },
  { id: '2', name: 'Carlos Mejía', phone: '555-5678', email: 'carlos@example.com' },
  { id: '3', name: 'Daniela Pérez', phone: '555-9012', email: 'daniela@example.com' },
];

// ⭐ Favoritos (pueden ser posts o contactos)
const favorites = [];

module.exports = { profile, posts, albums, contacts, favorites };