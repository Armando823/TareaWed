const express = require('express');
const router = express.Router();

// Controllers
const contactController = require('../controllers/contactController');
const albumController = require('../controllers/albumController');

// ===============================
// 🧾 CONTACTOS
// ===============================
router.get('/contacts', contactController.getContacts);

router.post('/contacts/add', contactController.addContact);

// ===============================
// ⭐ FAVORITOS
// ===============================
router.get('/favorites', albumController.getFavorites);

router.post('/favorites/toggle', albumController.toggleFavorite);

// ===============================
// 🛡️ MANEJO DE RUTAS NO EXISTENTES (PRO)
// ===============================
router.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
  });
});

module.exports = router;