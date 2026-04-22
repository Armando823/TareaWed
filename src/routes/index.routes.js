const express = require('express');
const router = express.Router();
const { renderSection } = require('../controllers/profileController');

// ===============================
// 📄 CONFIGURACIÓN DE RUTAS (PRO)
// ===============================
const routes = [
  { path: '/', section: 'inicio' },
  { path: '/perfil', section: 'perfil' },
  { path: '/albums', section: 'albums' },
  { path: '/contactos', section: 'contactos' },
  { path: '/favoritos', section: 'favoritos' },
];

// ===============================
// 🔁 GENERACIÓN DINÁMICA DE RUTAS
// ===============================
routes.forEach(({ path, section }) => {
  router.get(path, (req, res) => {
    renderSection(req, res, section);
  });
});

// ===============================
// 🛡️ 404 PAGE (PRO)
// ===============================
router.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Página no encontrada',
  });
});

module.exports = router;