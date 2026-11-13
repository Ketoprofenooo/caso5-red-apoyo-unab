import { Router } from "express"

import { registro, login, perfil, editarPerfil } from "../controllers/autCont.js"

import {
  crearSolicitud,
  editarSolicitud,
  derivarEstudiante,
  listarSolicitudes,
  verSolicitud,
  clasificarSolicitud,
  asignarProfesional,
  registrarSeguimiento,
  misNotificaciones,
  cerrarSolicitud
} from "../controllers/solicitudCont.js"

import {
  crearTaller,
  listarTalleres,
  verTaller,
  actualizarTaller,
  eliminarTaller,
  inscribirse,
  anularInscripcion
} from "../controllers/tallerCont.js"

import {
  crearMaestro,
  listarMaestros,
  actualizarMaestro,
  eliminarMaestro,
  listarUsuarios,
  listarProfesionales,
  cambiarPerfil,
  reporteAgregado,
  listarBitacora
} from "../controllers/adminCont.js"

import { verificarToken } from "../middlewares/auth.js"
import { permitir } from "../middlewares/roles.js"
import { registrar } from "../middlewares/bitacora.js"

import {
  validarRegistro,
  validarLogin,
  validarEdicionPerfil,
  validarSolicitud,
  validarClasificacion,
  validarTaller
} from "../validar/validadores.js"

const router = Router()

/* ================= RF1 - Autenticacion ================= */
router.post("/auth/registro", validarRegistro, registro)
router.post("/auth/login", validarLogin, login)
router.get("/auth/perfil", verificarToken, perfil)
router.put("/auth/perfil", verificarToken, validarEdicionPerfil, editarPerfil)

/* ================= Solicitudes =================
   Todo lo de aqui abajo exige sesion iniciada     */
router.use("/solicitudes", verificarToken, registrar("solicitud"))

// RF2
router.post(
  "/solicitudes",
  permitir("estudiante"),
  validarSolicitud,
  crearSolicitud
)

// RF3
router.post(
  "/solicitudes/derivacion",
  permitir("docente"),
  validarSolicitud,
  derivarEstudiante
)

// Listado filtrado segun el perfil
router.get("/solicitudes", listarSolicitudes)

// RF7 - va antes de /:id para que no lo capture como id
router.get("/solicitudes/notificaciones", permitir("estudiante"), misNotificaciones)

router.get("/solicitudes/:id", verSolicitud)

// RF2 - el estudiante corrige su solicitud mientras sigue "recibida"
router.put(
  "/solicitudes/:id",
  permitir("estudiante"),
  validarSolicitud,
  editarSolicitud
)

// RF4
router.put(
  "/solicitudes/:id/clasificar",
  permitir("orientador", "admin"),
  validarClasificacion,
  clasificarSolicitud
)

// RF5
router.put(
  "/solicitudes/:id/asignar",
  permitir("orientador", "admin"),
  asignarProfesional
)

// RF6
router.post(
  "/solicitudes/:id/seguimiento",
  permitir("profesional", "orientador", "admin"),
  registrarSeguimiento
)

// RF11
router.put(
  "/solicitudes/:id/cerrar",
  permitir("profesional", "orientador", "admin"),
  cerrarSolicitud
)

// RF5 - lista de profesionales para el selector de la bandeja
router.get(
  "/profesionales",
  verificarToken,
  permitir("orientador", "admin"),
  listarProfesionales
)

/* ================= RF8 - Talleres ================= */
router.use("/talleres", verificarToken)

router.get("/talleres", listarTalleres)
router.get("/talleres/:id", verTaller)

router.post("/talleres", permitir("admin", "profesional"), validarTaller, crearTaller)
router.put("/talleres/:id", permitir("admin", "profesional"), actualizarTaller)
router.delete("/talleres/:id", permitir("admin"), eliminarTaller)

router.post("/talleres/:id/inscripcion", permitir("estudiante"), inscribirse)
router.delete("/talleres/:id/inscripcion", permitir("estudiante"), anularInscripcion)

/* ================= RF9 - Mantenedores ================= */
router.use("/maestros", verificarToken, permitir("admin"))

router.get("/maestros", listarMaestros)
router.post("/maestros", crearMaestro)
router.put("/maestros/:id", actualizarMaestro)
router.delete("/maestros/:id", eliminarMaestro)

/* ================= RF9 - Usuarios ================= */
router.use("/usuarios", verificarToken, permitir("admin"), registrar("usuario"))

router.get("/usuarios", listarUsuarios)
router.put("/usuarios/:id", cambiarPerfil)

/* ================= RF10 - Reportes ================= */
router.get(
  "/reportes/agregado",
  verificarToken,
  permitir("admin", "orientador"),
  reporteAgregado
)

/* ================= RF12 - Bitacora ================= */
router.get(
  "/bitacora",
  verificarToken,
  permitir("admin"),
  listarBitacora
)

export default router
