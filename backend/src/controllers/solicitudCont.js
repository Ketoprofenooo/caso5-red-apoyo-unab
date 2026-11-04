import Solicitud from "../models/solicitud.js"
import Usuario from "../models/usuario.js"

// Campos que se devuelven de las personas. Nunca el password.
const DATOS_PERSONA = "nombre email perfil unidad"

// RNF1: el estudiante solo ve lo suyo; el profesional, lo asignado.
const puedeVer = (solicitud, usuario) => {
  if (["orientador", "admin"].includes(usuario.perfil)) return true

  if (usuario.perfil === "estudiante") {
    return String(solicitud.estudiante._id || solicitud.estudiante) === String(usuario._id)
  }

  if (usuario.perfil === "profesional") {
    return String(solicitud.profesionalAsignado?._id || solicitud.profesionalAsignado) === String(usuario._id)
  }

  if (usuario.perfil === "docente") {
    return String(solicitud.docenteDerivador?._id || solicitud.docenteDerivador) === String(usuario._id)
  }

  return false
}

// RF7: deja el mensaje para el estudiante
const notificar = (solicitud, mensaje) => {
  solicitud.notificaciones.push({ mensaje })
}

/* ---------- RF2: el estudiante crea su solicitud ---------- */
export const crearSolicitud = async (req, res, next) => {
  try {
    const { motivo, descripcion, urgenciaPercibida, contacto } = req.body

    const solicitud = new Solicitud({
      estudiante: req.usuario._id,
      origen: "directa",
      motivo,
      descripcion,
      urgenciaPercibida,
      contacto
    })

    notificar(solicitud, "Recibimos tu solicitud. Un orientador la revisara pronto.")
    await solicitud.save()

    res.status(201).json({
      mensaje: "Solicitud creada correctamente",
      solicitud
    })
  } catch (error) {
    next(error)
  }
}

/* ---------- RF3: el docente deriva a un estudiante ---------- */
export const derivarEstudiante = async (req, res, next) => {
  try {
    const { emailEstudiante, motivo, descripcion, urgenciaPercibida, contacto } = req.body

    const estudiante = await Usuario.findOne({
      email: emailEstudiante,
      perfil: "estudiante"
    })

    if (!estudiante) {
      return res.status(404).json({
        mensaje: "No existe un estudiante con ese correo institucional"
      })
    }

    const solicitud = new Solicitud({
      estudiante: estudiante._id,
      origen: "derivacion",
      docenteDerivador: req.usuario._id,
      motivo,
      descripcion,
      urgenciaPercibida,
      contacto
    })

    notificar(solicitud, "Un docente te derivo a la Red de Apoyo. Te contactaremos pronto.")
    await solicitud.save()

    res.status(201).json({
      mensaje: "Derivacion registrada correctamente",
      solicitud
    })
  } catch (error) {
    next(error)
  }
}

/* ---------- Listado con filtros ---------- */
export const listarSolicitudes = async (req, res, next) => {
  try {
    const { estado, tipo, urgencia, buscar } = req.query
    const filtro = {}

    // Cada perfil ve solo su porcion
    if (req.usuario.perfil === "estudiante") filtro.estudiante = req.usuario._id
    if (req.usuario.perfil === "profesional") filtro.profesionalAsignado = req.usuario._id
    if (req.usuario.perfil === "docente") filtro.docenteDerivador = req.usuario._id

    if (estado) filtro.estado = estado
    if (tipo) filtro.tipo = tipo
    if (urgencia) filtro.urgenciaPercibida = urgencia
    if (buscar) filtro.folio = new RegExp(buscar, "i")

    const solicitudes = await Solicitud.find(filtro)
      .populate("estudiante", DATOS_PERSONA)
      .populate("profesionalAsignado", DATOS_PERSONA)
      .populate("docenteDerivador", DATOS_PERSONA)
      .sort({ createdAt: -1 })

    res.status(200).json(solicitudes)
  } catch (error) {
    next(error)
  }
}

/* ---------- Una sola solicitud ---------- */
export const verSolicitud = async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id)
      .populate("estudiante", DATOS_PERSONA)
      .populate("profesionalAsignado", DATOS_PERSONA)
      .populate("docenteDerivador", DATOS_PERSONA)
      .populate("seguimientos.autor", DATOS_PERSONA)

    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" })
    }

    if (!puedeVer(solicitud, req.usuario)) {
      return res.status(403).json({ mensaje: "No tienes acceso a esta solicitud" })
    }

    // RNF1: las observaciones internas son del equipo, el estudiante no las ve
    if (req.usuario.perfil === "estudiante") {
      solicitud.seguimientos = solicitud.seguimientos.filter(
        s => s.tipoRegistro !== "observacion"
      )
    }

    res.status(200).json(solicitud)
  } catch (error) {
    next(error)
  }
}

/* ---------- RF4: clasificar ---------- */
export const clasificarSolicitud = async (req, res, next) => {
  try {
    const { tipo } = req.body

    const solicitud = await Solicitud.findById(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" })
    }

    solicitud.tipo = tipo
    if (solicitud.estado === "recibida") solicitud.estado = "clasificada"

    solicitud.seguimientos.push({
      tipoRegistro: "cambio_estado",
      detalle: `Clasificada como ${tipo}`,
      autor: req.usuario._id
    })

    notificar(solicitud, "Tu solicitud fue revisada y clasificada.")
    await solicitud.save()

    res.status(200).json({ mensaje: "Solicitud clasificada", solicitud })
  } catch (error) {
    next(error)
  }
}

/* ---------- RF5: asignar profesional ---------- */
export const asignarProfesional = async (req, res, next) => {
  try {
    const { profesionalId } = req.body

    const profesional = await Usuario.findById(profesionalId)
    if (!profesional || profesional.perfil !== "profesional") {
      return res.status(400).json({
        mensaje: "El usuario indicado no es un profesional habilitado"
      })
    }

    const solicitud = await Solicitud.findById(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" })
    }

    if (!solicitud.tipo) {
      return res.status(400).json({
        mensaje: "Primero hay que clasificar la solicitud"
      })
    }

    solicitud.profesionalAsignado = profesional._id
    solicitud.estado = "asignada"

    solicitud.seguimientos.push({
      tipoRegistro: "cambio_estado",
      detalle: `Asignada a ${profesional.nombre}`,
      autor: req.usuario._id
    })

    notificar(solicitud, "Tu solicitud fue asignada a un profesional de apoyo.")
    await solicitud.save()

    res.status(200).json({ mensaje: "Profesional asignado", solicitud })
  } catch (error) {
    next(error)
  }
}

/* ---------- RF6: registrar seguimiento o cita ---------- */
export const registrarSeguimiento = async (req, res, next) => {
  try {
    const { detalle, tipoRegistro, fecha } = req.body

    if (!detalle || detalle.trim() === "") {
      return res.status(400).json({ mensaje: "El detalle del seguimiento es obligatorio" })
    }

    const solicitud = await Solicitud.findById(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" })
    }

    // Un profesional solo escribe en los casos que tiene asignados
    if (req.usuario.perfil === "profesional" &&
        String(solicitud.profesionalAsignado) !== String(req.usuario._id)) {
      return res.status(403).json({ mensaje: "Esta solicitud no esta asignada a ti" })
    }

    solicitud.seguimientos.push({
      detalle,
      tipoRegistro: tipoRegistro || "observacion",
      fecha: fecha || Date.now(),
      autor: req.usuario._id
    })

    if (solicitud.estado === "asignada") solicitud.estado = "en_atencion"

    if (tipoRegistro === "cita") {
      notificar(solicitud, "Se agendo una cita para tu caso. Revisa tu correo.")
    }

    await solicitud.save()

    res.status(201).json({ mensaje: "Seguimiento registrado", solicitud })
  } catch (error) {
    next(error)
  }
}

/* ---------- RF7: notificaciones del estudiante ---------- */
export const misNotificaciones = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find({ estudiante: req.usuario._id })
      .select("folio estado notificaciones")

    const lista = solicitudes.flatMap(s =>
      s.notificaciones.map(n => ({
        folio: s.folio,
        estado: s.estado,
        mensaje: n.mensaje,
        fecha: n.fecha,
        leida: n.leida
      }))
    ).sort((a, b) => b.fecha - a.fecha)

    res.status(200).json(lista)
  } catch (error) {
    next(error)
  }
}

/* ---------- RF11: cerrar el caso ---------- */
export const cerrarSolicitud = async (req, res, next) => {
  try {
    const { motivo, derivacionRealizada } = req.body

    if (!motivo || motivo.trim() === "") {
      return res.status(400).json({ mensaje: "Indica el motivo de cierre" })
    }

    const solicitud = await Solicitud.findById(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" })
    }

    if (solicitud.estado === "cerrada") {
      return res.status(409).json({ mensaje: "Esta solicitud ya estaba cerrada" })
    }

    solicitud.estado = "cerrada"
    solicitud.cierre = {
      motivo,
      derivacionRealizada: derivacionRealizada || "",
      fecha: new Date(),
      cerradaPor: req.usuario._id
    }

    solicitud.seguimientos.push({
      tipoRegistro: "cambio_estado",
      detalle: `Caso cerrado: ${motivo}`,
      autor: req.usuario._id
    })

    notificar(solicitud, "Tu caso fue cerrado. Puedes abrir uno nuevo cuando lo necesites.")
    await solicitud.save()

    res.status(200).json({ mensaje: "Solicitud cerrada correctamente", solicitud })
  } catch (error) {
    next(error)
  }
}
