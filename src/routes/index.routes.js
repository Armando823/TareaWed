const express = require('express');
const router = express.Router();
const { renderSection } = require('../controllers/profileController');

router.get('/', (req, res) => renderSection(req, res, 'inicio'));
router.get('/perfil', (req, res) => renderSection(req, res, 'perfil'));
router.get('/albums', (req, res) => renderSection(req, res, 'albums'));
router.get('/contactos', (req, res) => renderSection(req, res, 'contactos'));
router.get('/favoritos', (req, res) => renderSection(req, res, 'favoritos'));

module.exports = router;
