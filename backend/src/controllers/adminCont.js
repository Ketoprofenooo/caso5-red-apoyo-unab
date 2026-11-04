import Maestro from "../models/maestro.js"
import Usuario from "../models/usuario.js"
import Solicitud from "../models/solicitud.js"
import Bitacora from "../models/bitacora.js"

/* =========================================================
   RF9 - Mantenedores: tipos de solicitud, sedes y unidades
   ========================================================= */
export const crearMaestro = async (req, res, next) => {
  try {
    const { categoria, nombre, descripcion } = req.body

    if (!categoria || !nombre) {
      return res.status(400).json({ mensaje: "Categoria y nombre son obligatorios" })
    }

    const registro = await Maestro.create({ categoria, nombre, descripcion })
    res.status(201).json({ mensaje: "Registro creado", registro })
  } catch (error) {
    next(error)
  }
}

export const listarMaestros = async (req, res, next) => {
  try {
    const filtro = { activo: true }
    if (req.query.categoria) filtro.categoria = req.query.categoria

    const registros = await Maestro.find(filtro).sort({ categoria: 1, nombre: 1 })
    res.status(200).json(registros)
  } catch (error) {
    next(error)
  }
}

export const actualizarMaestro = async (req, res, next) => {
  try {
    const registro = await Maestro.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true
    })

    if (!registro) return res.status(404).json({ mensaje: "Registro no encontrado" })

    res.status(200).json({ mensaje: "Registro actualizado", registro })
  } catch (error) {
    next(error)
  }
}

export const eliminarMaestro = async (req, res, next) => {
  try {
    const registro = await Maestro.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" }
    )

    if (!registro) return res.status(404).json({ mensaje: "Registro no encontrado" })

    res.status(200).json({ mensaje: "Registro desactivado", registro })
  } catch (error) {
    next(error)
  }
}

/* =========================================================
   RF5 - Lista de profesionales para que el orientador asigne
   Solo nombre y unidad: el orientador no necesita mas (RNF1)
   ========================================================= */
export const listarProfesionales = async (req, res, next) => {
  try {
    const profesionales = await Usuario.find({ perfil: "profesional", activo: true })
      .select("nombre unidad")
      .sort({ nombre: 1 })

    res.status(200).json(profesionales)
  } catch (error) {
    next(error)
  }
}

/* =========================================================
   RF9 - Administracion de usuarios y perfiles
   ========================================================= */
export const listarUsuarios = async (req, res, next) => {
  try {
    const filtro = {}
    if (req.query.perfil) filtro.perfil = req.query.perfil

    const usuarios = await Usuario.find(filtro)
      .select("nombre email perfil unidad activo createdAt")
      .sort({ nombre: 1 })

    res.status(200).json(usuarios)
  } catch (error) {
    next(error)
  }
}

export const cambiarPerfil = async (req, res, next) => {
  try {
    const { perfil, unidad, activo } = req.body

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { perfil, unidad, activo },
      { returnDocument: "after", runValidators: true }
    ).select("nombre email perfil unidad activo")

    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" })

    res.status(200).json({ mensaje: "Usuario actualizado", usuario })
  } catch (error) {
    next(error)
  }
}

/* =========================================================
   RF10 - Reportes agregados
   RNF6: solo conteos y promedios, ningun dato nominal
   ========================================================= */
export const reporteAgregado = async (req, res, next) => {
  try {
    const porTipo = await Solicitud.aggregate([
      { $group: { _id: "$tipo", total: { $sum: 1 } } },
      { $project: { _id: 0, tipo: { $ifNull: ["$_id", "sin clasificar"] }, total: 1 } },
      { $sort: { total: -1 } }
    ])

    const porEstado = await Solicitud.aggregate([
      { $group: { _id: "$estado", total: { $sum: 1 } } },
      { $project: { _id: 0, estado: "$_id", total: 1 } }
    ])

    const porUrgencia = await Solicitud.aggregate([
      { $group: { _id: "$urgenciaPercibida", total: { $sum: 1 } } },
      { $project: { _id: 0, urgencia: "$_id", total: 1 } }
    ])

    const porOrigen = await Solicitud.aggregate([
      { $group: { _id: "$origen", total: { $sum: 1 } } },
      { $project: { _id: 0, origen: "$_id", total: 1 } }
    ])

    // Tiempo promedio entre la creacion y la asignacion, en horas
    const tiempos = await Solicitud.aggregate([
      { $match: { estado: { $ne: "recibida" } } },
      {
        $project: {
          horas: {
            $divide: [
              { $subtract: ["$updatedAt", "$createdAt"] },
              1000 * 60 * 60
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          promedioHoras: { $avg: "$horas" },
          maximoHoras: { $max: "$horas" }
        }
      }
    ])

    res.status(200).json({
      generadoEl: new Date(),
      totalSolicitudes: await Solicitud.countDocuments(),
      porTipo,
      porEstado,
      porUrgencia,
      porOrigen,
      tiemposRespuesta: tiempos[0]
        ? {
            promedioHoras: Number(tiempos[0].promedioHoras.toFixed(1)),
            maximoHoras: Number(tiempos[0].maximoHoras.toFixed(1))
          }
        : { promedioHoras: 0, maximoHoras: 0 }
    })
  } catch (error) {
    next(error)
  }
}

/* =========================================================
   RF12 - Consultar la bitacora
   ========================================================= */
export const listarBitacora = async (req, res, next) => {
  try {
    const registros = await Bitacora.find()
      .populate("usuario", "nombre email perfil")
      .sort({ fecha: -1 })
      .limit(200)

    res.status(200).json(registros)
  } catch (error) {
    next(error)
  }
}
