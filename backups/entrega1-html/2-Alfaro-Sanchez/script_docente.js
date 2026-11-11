var campoMotivoDerivacion = document.getElementById("motivoDerivacion");
var contadorMotivo = document.getElementById("contadorMotivo");

campoMotivoDerivacion.addEventListener("input", function () {
  contadorMotivo.textContent = campoMotivoDerivacion.value.length;
});

document.getElementById("formDocente").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nombreEstudiante = document.getElementById("nombreEstudianteDerivado").value.trim();
  var rutEstudiante = document.getElementById("rutEstudiante").value.trim();
  var cursoEstudiante = document.getElementById("cursoEstudiante").value.trim();
  var motivoDerivacion = campoMotivoDerivacion.value.trim();
  var urgenciaDocente = document.querySelector('input[name="urgenciaDocente"]:checked');
  var dialogoPrevio = document.querySelector('input[name="dialogoPrevio"]:checked');
  var nombreDocente = document.getElementById("nombreDocente").value.trim();
  var departamentoDocente = document.getElementById("departamentoDocente").value.trim();
  var contactoDocente = document.getElementById("contactoDocente").value.trim();

  if (nombreEstudiante.length === 0 || rutEstudiante.length === 0 || cursoEstudiante.length === 0) {
    alert("Completa todos los datos del estudiante.");
    return;
  }

  if (motivoDerivacion.length < 10) {
    alert("La descripcion objetiva debe tener al menos 10 caracteres.");
    return;
  }

  if (!urgenciaDocente) {
    alert("Selecciona la prioridad estimada.");
    return;
  }

  if (!dialogoPrevio) {
    alert("Indica si conversaste previamente con el estudiante.");
    return;
  }

  if (nombreDocente.length === 0 || departamentoDocente.length === 0 || contactoDocente.length === 0) {
    alert("Completa todos los datos del docente derivador.");
    return;
  }

  var numero = Math.floor(Math.random() * 900000) + 100000;
  var folio = "FOLIO-2026-" + numero + "-DD";
  var fecha = new Date().toLocaleDateString("es-CL");

  var datosConfirmacion = {
    folio: folio,
    fecha: fecha,
    tipo: "Derivacion Docente",
    prioridad: urgenciaDocente.value,
    estado: "En revision"
  };

  localStorage.setItem("confirmacionData", JSON.stringify(datosConfirmacion));

  var listaSolicitudes = JSON.parse(localStorage.getItem("listaSolicitudes") || "[]");
  listaSolicitudes.push(datosConfirmacion);
  localStorage.setItem("listaSolicitudes", JSON.stringify(listaSolicitudes));

  window.location.href = "confirmacion.html";
});
