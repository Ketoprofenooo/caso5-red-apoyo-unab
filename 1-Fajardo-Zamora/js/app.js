/* ============================================================
   Red de Apoyo y Salud Mental Universitaria
   Home institucional (RF1 - CU1)
   José Fajardo Zamora

   Lo que hace este archivo:
   1. Arma las tarjetas de perfiles con map()
   2. Cambia entre las pestañas Entrar y Crear cuenta
   3. Valida los dos formularios
   4. Simula la sesión con localStorage
   5. Escribe el año en el pie
   ============================================================ */


/* ---------- 1. Datos de los perfiles y sus páginas ---------- */
// Cada perfil apunta a la página del integrante que la hizo.
const perfiles = [
  {
    nombre: "Estudiante",
    texto: "Crea su solicitud de apoyo, revisa en qué va y se inscribe en los talleres.",
    pagina: "Solicitud de apoyo",
    integrante: "Alfaro Sánchez",
    destino: "2-Alfaro-Sanchez/solicitud_estudiante.html"
  },
  {
    nombre: "Docente derivador",
    texto: "Deriva a un estudiante con el formulario responsable, sin entrar a su ficha.",
    pagina: "Derivación docente",
    integrante: "Alfaro Sánchez",
    destino: "2-Alfaro-Sanchez/derivacion_docente.html"
  },
  {
    nombre: "Consejero / Orientador",
    texto: "Clasifica lo que llega y se lo asigna al profesional que corresponde.",
    pagina: "Bandeja del orientador",
    integrante: "Briones Osorio",
    destino: "3-Briones-Osorio/index.html"
  },
  {
    nombre: "Profesional de apoyo",
    texto: "Registra citas, estados y observaciones de los casos que tiene asignados.",
    pagina: "Ficha de seguimiento",
    integrante: "Méndez Muñoz",
    destino: "4-Mendez-Munoz/index.html"
  },
  {
    nombre: "Administrador de bienestar",
    texto: "Mantenedores, talleres y reportes agregados, sin datos de personas.",
    pagina: "Talleres y reportes",
    integrante: "Mena Navea",
    destino: "5-Mena-Navea/index.html"
  }
];


/* ---------- 2. Pintar las tarjetas con map() ---------- */
const listaPerfiles = document.querySelector("#listaPerfiles");

listaPerfiles.innerHTML = perfiles
  .map((p) => `
    <li class="tarjeta">
      <h3>${p.nombre}</h3>
      <p>${p.texto}</p>
      <p class="tarjeta__pie">
        <a href="${p.destino}">Ir a ${p.pagina}</a><br>
        Página de ${p.integrante}
      </p>
    </li>`)
  .join("");


/* ---------- 3. Pestañas Entrar / Crear cuenta ---------- */
const tabIngreso = document.querySelector("#tabIngreso");
const tabRegistro = document.querySelector("#tabRegistro");
const formIngreso = document.querySelector("#formIngreso");
const formRegistro = document.querySelector("#formRegistro");
const resultado = document.querySelector("#resultado");

function mostrarPestana(cual) {
  // Si cual es "ingreso" se ve el login; si no, se ve el registro.
  tabIngreso.classList.toggle("activo", cual === "ingreso");
  tabRegistro.classList.toggle("activo", cual !== "ingreso");

  formIngreso.classList.toggle("oculto", cual !== "ingreso");
  formRegistro.classList.toggle("oculto", cual === "ingreso");
  resultado.classList.add("oculto");
}

tabIngreso.addEventListener("click", () => mostrarPestana("ingreso"));
tabRegistro.addEventListener("click", () => mostrarPestana("registro"));


/* ---------- 4. Validaciones ---------- */
// Escribe el mensaje de error debajo del campo.
// Si el mensaje viene vacío, el campo está bien.
function avisar(idError, mensaje) {
  document.querySelector(idError).textContent = mensaje;
  return mensaje === "";
}

const correoValido = (correo) => correo.includes("@") && correo.includes(".");
const claveValida = (clave) => clave.length >= 8 && /[0-9]/.test(clave);

// --- formulario de ingreso ---
formIngreso.addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = document.querySelector("#ingresoCorreo").value.trim();
  const clave = document.querySelector("#ingresoClave").value;
  const perfil = document.querySelector("#ingresoPerfil").value;

  const okCorreo = avisar("#errorIngresoCorreo",
    correo === "" ? "Falta tu correo institucional."
    : !correoValido(correo) ? "Revisa el formato: nombre@universidad.cl"
    : "");

  const okClave = avisar("#errorIngresoClave",
    clave === "" ? "Falta la contraseña." : "");

  const okPerfil = avisar("#errorIngresoPerfil",
    perfil === "" ? "Elige con qué perfil entras." : "");

  if (!okCorreo || !okClave || !okPerfil) return;

  mostrarResultado("Sesión iniciada", perfil, [
    "Correo: " + correo,
    "Perfil: " + perfil,
    "Entraste a las: " + new Date().toLocaleString("es-CL")
  ], "");
});

// --- formulario de registro ---
formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#registroNombre").value.trim();
  const correo = document.querySelector("#registroCorreo").value.trim();
  const perfil = document.querySelector("#registroPerfil").value;
  const unidad = document.querySelector("#registroUnidad").value.trim();
  const clave = document.querySelector("#registroClave").value;
  const clave2 = document.querySelector("#registroClave2").value;
  const pauta = document.querySelector("#registroPauta").checked;

  const okNombre = avisar("#errorRegistroNombre",
    nombre.length < 3 ? "Escribe tu nombre completo." : "");

  const okCorreo = avisar("#errorRegistroCorreo",
    correo === "" ? "Falta tu correo institucional."
    : !correoValido(correo) ? "Revisa el formato: nombre@universidad.cl"
    : "");

  const okPerfil = avisar("#errorRegistroPerfil",
    perfil === "" ? "Elige tu perfil institucional." : "");

  const okUnidad = avisar("#errorRegistroUnidad",
    unidad === "" ? "Indica tu carrera o unidad." : "");

  const okClave = avisar("#errorRegistroClave",
    !claveValida(clave) ? "Necesita 8 caracteres como mínimo y al menos un número." : "");

  const okClave2 = avisar("#errorRegistroClave2",
    clave2 !== clave ? "Las dos contraseñas no son iguales." : "");

  const okPauta = avisar("#errorRegistroPauta",
    !pauta ? "Tienes que aceptar la pauta de uso responsable." : "");

  if (!okNombre || !okCorreo || !okPerfil || !okUnidad || !okClave || !okClave2 || !okPauta) return;

  mostrarResultado("Cuenta creada", perfil, [
    "Nombre: " + nombre,
    "Correo: " + correo,
    "Perfil solicitado: " + perfil,
    "Carrera o unidad: " + unidad
  ], "Bienestar tiene que validar tu perfil antes del primer ingreso.");
});


/* ---------- 5. Sesión simulada ---------- */
const MINUTOS = 20;

const enlacePanel = document.querySelector("#enlacePanel");

function mostrarResultado(titulo, perfil, datos, pie) {
  document.querySelector("#resultadoTitulo").textContent = titulo;

  document.querySelector("#resultadoDatos").innerHTML = datos
    .map((d) => `<li>${d}</li>`)
    .join("");

  document.querySelector("#resultadoPie").textContent = pie === ""
    ? `La sesión se cierra sola a los ${MINUTOS} minutos sin actividad.`
    : pie;

  // Busco en el arreglo el perfil que eligió, para ofrecerle su pantalla.
  const elegido = perfiles.find((p) => p.nombre === perfil);

  if (elegido && pie === "") {
    enlacePanel.href = elegido.destino;
    enlacePanel.textContent = "Ir a " + elegido.pagina;
    enlacePanel.classList.remove("oculto");
  } else {
    enlacePanel.classList.add("oculto");
  }

  formIngreso.classList.add("oculto");
  formRegistro.classList.add("oculto");
  resultado.classList.remove("oculto");

  guardarSesion(perfil);

  formIngreso.reset();
  formRegistro.reset();
}

// localStorage puede fallar según el navegador, por eso va con try/catch.
function guardarSesion(perfil) {
  try {
    const sesion = { perfil: perfil, inicio: Date.now() };
    localStorage.setItem("sesionRedApoyo", JSON.stringify(sesion));
  } catch (error) {
    console.warn("No se pudo guardar la sesión", error);
  }
}

function borrarSesion() {
  try {
    localStorage.removeItem("sesionRedApoyo");
  } catch (error) {
    console.warn("No se pudo borrar la sesión", error);
  }
}

document.querySelector("#botonSalir").addEventListener("click", () => {
  borrarSesion();
  mostrarPestana("ingreso");
});

// Al abrir la página se bota la sesión vencida (RNF3).
try {
  const guardada = JSON.parse(localStorage.getItem("sesionRedApoyo"));

  if (guardada && (Date.now() - guardada.inicio) / 60000 > MINUTOS) {
    borrarSesion();
  }
} catch (error) {
  console.warn("No se pudo leer la sesión", error);
}


/* ---------- 6. Año del pie ---------- */
document.querySelector("#anio").textContent = new Date().getFullYear();
