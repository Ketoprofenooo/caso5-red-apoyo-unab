import { Router } from "express"
import { verificarToken } from "../middlewares/auth.js"
import { permitir } from "../middlewares/roles.js"
import { registrar } from "../middlewares/bitacora.js"
import { validarTaller, validarMaestro } from "../validar/validadores.js"
import {
  listarTalleres,
  crearTaller,
  actualizarTaller,
  eliminarTaller,
  inscribirTaller,
  cancelarInscripcion
} from "../controllers/tallerCont.js"
import {
  listarMaestros,
  crearMaestro,
  actualizarMaestro,
  eliminarMaestro,
  listarUsuarios,
  cambiarEstadoUsuario,
  listarProfesionales,
  reporteAgregado,
  listarBitacora
} from "../controllers/adminCont.js"

const router = Router()

// --- RF8: TALLERES PREVENTIVOS ---
router.get("/talleres", listarTalleres)
router.post(
  "/talleres",
  verificarToken,
  registrar("taller"),
  permitir("admin", "orientador"),
  validarTaller,
  crearTaller
)
router.put(
  "/talleres/:id",
  verificarToken,
  registrar("taller"),
  permitir("admin", "orientador"),
  actualizarTaller
)
router.delete(
  "/talleres/:id",
  verificarToken,
  registrar("taller"),
  permitir("admin", "orientador"),
  eliminarTaller
)
router.post(
  "/talleres/:id/inscribir",
  verificarToken,
  registrar("taller"),
  inscribirTaller
)
router.delete(
  "/talleres/:id/inscribir",
  verificarToken,
  registrar("taller"),
  cancelarInscripcion
)

// --- RF5 / RF9: PROFESIONALES, MANTENEDORES Y USUARIOS ---
router.get(
  "/profesionales",
  verificarToken,
  permitir("orientador", "admin"),
  listarProfesionales
)

router.get("/maestros", verificarToken, listarMaestros)
router.post(
  "/maestros",
  verificarToken,
  registrar("maestro"),
  permitir("admin"),
  validarMaestro,
  crearMaestro
)
router.put(
  "/maestros/:id",
  verificarToken,
  registrar("maestro"),
  permitir("admin"),
  actualizarMaestro
)
router.delete(
  "/maestros/:id",
  verificarToken,
  registrar("maestro"),
  permitir("admin"),
  eliminarMaestro
)

router.get(
  "/usuarios",
  verificarToken,
  registrar("usuario"),
  permitir("admin"),
  listarUsuarios
)
router.put(
  "/usuarios/:id",
  verificarToken,
  registrar("usuario"),
  permitir("admin"),
  cambiarEstadoUsuario
)

// --- RF10: REPORTES AGREGADOS (RNF6) ---
router.get(
  "/reportes",
  verificarToken,
  registrar("reporte"),
  permitir("admin", "orientador"),
  reporteAgregado
)

// --- RF12: BITÁCORA DE ACCESOS ---
router.get(
  "/bitacora",
  verificarToken,
  permitir("admin"),
  listarBitacora
)

export default router