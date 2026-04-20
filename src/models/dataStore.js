const profile = {
  name: 'María González',
  description: 'Desarrolladora web en formación. Me encanta crear interfaces limpias, trabajar con JavaScript y construir proyectos con Node, Express y EJS.',
  avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
};

const albums = [
  {
    id: 'album-1',
    title: 'Viajes creativos',
    description: 'Colección de momentos únicos en paisajes urbanos y naturales.',
    cover: 'https://picsum.photos/id/1018/400/250',
    images: [
      'https://picsum.photos/id/1018/400/250',
      'https://picsum.photos/id/1025/400/250',
      'https://picsum.photos/id/1035/400/250',
      'https://picsum.photos/id/1040/400/250',
      'https://picsum.photos/id/1043/400/250',
      'https://picsum.photos/id/1050/400/250',
    ],
    likes: 12,
    comments: 3,
    shares: 1,
    commentsList: [],
    commentsList: [],
  },
  {
    id: 'album-2',
    title: 'Cocina y colores',
    description: 'Fotos llenas de sabor, texturas y creatividad gastronómica.',
    cover: 'https://picsum.photos/id/1080/400/250',
    images: [
      'https://picsum.photos/id/1080/400/250',
      'https://picsum.photos/id/1084/400/250',
      'https://picsum.photos/id/1081/400/250',
      'https://picsum.photos/id/1079/400/250',
      'https://picsum.photos/id/1067/400/250',
      'https://picsum.photos/id/1060/400/250',
    ],
    likes: 24,
    comments: 5,
    shares: 2,
    commentsList: [],
  },
  {
    id: 'album-3',
    title: 'Ideas y diseño',
    description: 'Proyectos visuales con formas, luz y composición moderna.',
    cover: 'https://picsum.photos/id/1020/400/250',
    images: [
      'https://picsum.photos/id/1020/400/250',
      'https://picsum.photos/id/1021/400/250',
      'https://picsum.photos/id/1022/400/250',
      'https://picsum.photos/id/1023/400/250',
      'https://picsum.photos/id/1024/400/250',
      'https://picsum.photos/id/1026/400/250',
    ],
    likes: 18,
    comments: 4,
    shares: 3,
    commentsList: [],
  },
];

const contacts = [
  { id: 1, name: 'Ana Ruiz', phone: '555-1234', email: 'ana@example.com' },
  { id: 2, name: 'Carlos Mejía', phone: '555-5678', email: 'carlos@example.com' },
  { id: 3, name: 'Daniela Pérez', phone: '555-9012', email: 'daniela@example.com' },
  { id: 4, name: 'Luis Herrera', phone: '555-3456', email: 'luis@example.com' },
  { id: 5, name: 'Sofía Vega', phone: '555-7890', email: 'sofia@example.com' },
];

const favorites = [];

module.exports = { profile, albums, contacts, favorites };
