var contenedor = document.getElementById("contenedorSolicitudes");
var listaSolicitudes = JSON.parse(localStorage.getItem("listaSolicitudes") || "[]");

if (listaSolicitudes.length === 0) {
  var mensajeVacio = document.createElement("div");
  mensajeVacio.className = "solicitud-vacia";
  mensajeVacio.textContent = "Todavia no tienes solicitudes registradas.";
  contenedor.appendChild(mensajeVacio);
} else {
  for (var i = listaSolicitudes.length - 1; i >= 0; i--) {
    var solicitud = listaSolicitudes[i];

    var tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-solicitud";

    var encabezado = document.createElement("div");
    encabezado.className = "tarjeta-solicitud-encabezado";

    var folio = document.createElement("span");
    folio.className = "tarjeta-solicitud-folio";
    folio.textContent = solicitud.folio;

    var estado = document.createElement("span");
    estado.className = "insignia-estado";
    estado.textContent = solicitud.estado;

    encabezado.appendChild(folio);
    encabezado.appendChild(estado);

    var rejilla = document.createElement("div");
    rejilla.className = "rejilla-datos-solicitud";

    var campos = [
      { etiqueta: "Tipo de solicitud", valor: solicitud.tipo },
      { etiqueta: "Fecha de ingreso", valor: solicitud.fecha },
      { etiqueta: "Prioridad", valor: solicitud.prioridad },
      { etiqueta: "Estado", valor: solicitud.estado }
    ];

    for (var j = 0; j < campos.length; j++) {
      var dato = document.createElement("div");
      dato.className = "dato-solicitud";

      var etiqueta = document.createElement("div");
      etiqueta.className = "dato-solicitud-etiqueta";
      etiqueta.textContent = campos[j].etiqueta;

      var valor = document.createElement("div");
      valor.className = "dato-solicitud-valor";
      valor.textContent = campos[j].valor;

      dato.appendChild(etiqueta);
      dato.appendChild(valor);
      rejilla.appendChild(dato);
    }

    tarjeta.appendChild(encabezado);
    tarjeta.appendChild(rejilla);
    contenedor.appendChild(tarjeta);
  }
}
