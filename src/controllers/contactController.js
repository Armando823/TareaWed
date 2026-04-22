const { contacts } = require('../models/dataStore');

function getContacts(req, res) {
  try {
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
}

function addContact(req, res) {
  try {
    const { name, email, phone } = req.body || {};

    // Validación básica
    if (!name || !email || !phone) {
      return res.status(400).json({
        error: 'Nombre, email y teléfono son obligatorios.'
      });
    }

    // Validación simple de email
    if (!email.includes('@')) {
      return res.status(400).json({
        error: 'Email inválido.'
      });
    }

    // Generar ID consistente (string)
    const newId = contacts.length
      ? Math.max(...contacts.map(c => Number(c.id))) + 1
      : 1;

    const newContact = {
      id: newId.toString(), // 🔥 importante
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    contacts.push(newContact);

    res.status(201).json({
      message: 'Contacto creado correctamente',
      contact: newContact,
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al crear contacto'
    });
  }
}

module.exports = { getContacts, addContact };