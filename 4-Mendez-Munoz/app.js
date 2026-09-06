// FORMULARIO DE CIERRE

const formulario = document.getElementById("formularioCierre");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const motivo = document.getElementById("motivo").value;
    const derivacion = document.getElementById("derivacion").value;

    const mensaje = document.getElementById("mensajeFormulario");

    if (motivo === "" || derivacion === "") {

        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "#b42318";

        return;
    }

    document.getElementById("resultadoMotivo").textContent =
        "Motivo de cierre: " + motivo;

    document.getElementById("resultadoDerivacion").textContent =
        "Derivación realizada: " + derivacion;

    mensaje.textContent = "El cierre del caso fue registrado correctamente.";
    mensaje.style.color = "#0f766e";

});


// CONTROL DE OBSERVACIONES SEGÚN EL PERFIL

const rol = document.getElementById("rol");
const observaciones = document.getElementById("observaciones");
const mensajePrivacidad = document.getElementById("mensajePrivacidad");

rol.addEventListener("change", function() {

    if (rol.value === "profesional") {

        observaciones.style.display = "block";

        mensajePrivacidad.textContent =
            "Las observaciones son visibles para el profesional autorizado.";

        mensajePrivacidad.style.color = "#0f766e";

    } else {

        observaciones.style.display = "none";

        mensajePrivacidad.textContent =
            "Las observaciones de seguimiento están restringidas para este perfil.";

        mensajePrivacidad.style.color = "#b42318";
    }

});