const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// RUTAS
app.get("/", (req, res) => res.render("index"));
app.get("/perfil", (req, res) => res.render("perfil"));
app.get("/album", (req, res) => res.render("album"));
app.get("/contactos", (req, res) => res.render("contactos"));
app.get("/favoritos", (req, res) => res.render("favoritos"));

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});