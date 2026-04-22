const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const indexRoutes = require('./routes/index.routes');
const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🔥 Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // usa views/layouts/main.ejs

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});