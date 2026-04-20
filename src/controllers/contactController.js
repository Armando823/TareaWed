const { contacts } = require('../models/dataStore');

function getContacts(req, res) {
  res.json({ contacts });
}

function addContact(req, res) {
  const { name, email, phone } = req.body || {};
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Nombre, email y teléfono son obligatorios.' });
  }

  const newContact = {
    id: contacts.length ? Math.max(...contacts.map((c) => Number(c.id))) + 1 : 1,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };

  contacts.push(newContact);
  res.status(201).json({ contact: newContact });
}

module.exports = { getContacts, addContact };