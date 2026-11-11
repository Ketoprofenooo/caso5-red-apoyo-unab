var campoDescripcion = document.getElementById("descripcion");
var contadorDescripcion = document.getElementById("contadorDescripcion");

campoDescripcion.addEventListener("input", function () {
  contadorDescripcion.textContent = campoDescripcion.value.length;
});

document.getElementById("formEstudiante").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var motivo = document.querySelector('input[name="motivo"]:checked');
  var descripcion = campoDescripcion.value.trim();
  var urgencia = document.querySelector('input[name="urgencia"]:checked');
  var modalidad = document.querySelector('input[name="modalidad"]:checked');
  var contacto = document.getElementById("contactoEstudiante").value.trim();
  var consentimiento = document.getElementById("consentimiento").checked;

  if (!motivo) {
    alert("Selecciona un motivo de consulta.");
    return;
  }

  if (descripcion.length < 10) {
    alert("La descripcion debe tener al menos 10 caracteres.");
    return;
  }

  if (!urgencia) {
    alert("Selecciona el nivel de urgencia percibida.");
    return;
  }

  if (!modalidad) {
    alert("Selecciona una modalidad de atencion.");
    return;
  }

  if (contacto.length === 0) {
    alert("Ingresa un telefono de contacto.");
    return;
  }

  if (!consentimiento) {
    alert("Debes aceptar el consentimiento informado.");
    return;
  }

  var numero = Math.floor(Math.random() * 900000) + 100000;
  var folio = "FOLIO-2026-" + numero + "-SM";
  var fecha = new Date().toLocaleDateString("es-CL");

  var datosConfirmacion = {
    folio: folio,
    fecha: fecha,
    tipo: "Solicitud de Estudiante",
    prioridad: urgencia.value,
    estado: "En revision"
  };

  localStorage.setItem("confirmacionData", JSON.stringify(datosConfirmacion));

  var listaSolicitudes = JSON.parse(localStorage.getItem("listaSolicitudes") || "[]");
  listaSolicitudes.push(datosConfirmacion);
  localStorage.setItem("listaSolicitudes", JSON.stringify(listaSolicitudes));

  window.location.href = "confirmacion.html";
});
