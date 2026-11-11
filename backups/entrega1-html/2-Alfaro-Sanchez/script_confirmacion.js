var datosGuardados = localStorage.getItem("confirmacionData");

if (datosGuardados) {
  var datos = JSON.parse(datosGuardados);

  document.getElementById("numeroFolio").textContent = datos.folio;
  document.getElementById("fechaIngreso").textContent = datos.fecha;
  document.getElementById("tipoSolicitud").textContent = datos.tipo;
  document.getElementById("prioridadInicial").textContent = datos.prioridad;
  document.getElementById("estadoActual").textContent = datos.estado;
}
