const express = require('express');
const router = express.Router();
const { getContacts, addContact } = require('../controllers/contactController');
const { getFavorites, toggleFavorite } = require('../controllers/albumController');

router.get('/contacts', getContacts);
router.post('/contacts/add', addContact);
router.get('/favorites', getFavorites);
router.post('/favorites/toggle', toggleFavorite);

module.exports = router;
