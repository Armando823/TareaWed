const { profile, albums, favorites } = require('../models/dataStore');

function renderSection(req, res, activeSection) {
  res.render('pages/index', {
    profile,
    albums,
    favorites,
    activeSection,
  });
}

module.exports = { renderSection };
