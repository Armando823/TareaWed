function cargarContactos(){
  fetch('/api/contactos')
    .then(res => res.json())
    .then(data => {
      let lista = document.getElementById("lista");
      lista.innerHTML = "";
      data.forEach(c => {
        lista.innerHTML += `<li>${c}</li>`;
      });
    });
}