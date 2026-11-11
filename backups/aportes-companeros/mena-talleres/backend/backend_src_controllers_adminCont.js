/**
 * Controlador de Administración (RF9, RF10, RF12)
 * Gestiona mantenedores (Maestro), cuentas de usuario, reportes agregados
 * sin datos nominales (RNF6) y consulta de la bitácora de accesos.
 */
import Maestro from "../models/maestro.js"
import Usuario from "../models/usuario.js"
import Solicitud from "../models/solicitud.js"
import Taller from "../models/taller.js"
import Bitacora from "../models/bitacora.js"

// --- MANTENEDORES (MAESTROS - RF9) ---

export const listarMaestros = async (req, res, next) => {
  try {
    const filtro = { activo: true }
    if (req.query.categoria) {
      filtro.categoria = req.query.categoria
    }
    const maestros = await Maestro.find(filtro).sort({ categoria: 1, nombre: 1 })
    res.status(200).json(maestros)
  } catch (error) {
    next(error)
  }
}

export const crearMaestro = async (req, res, next) => {
  try {
    const { categoria, nombre, descripcion } = req.body
    const nuevo = new Maestro({ categoria, nombre, descripcion })
    await nuevo.save()
    res.status(201).json({ mensaje: "Registro creado en mantenedor", maestro: nuevo })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Ese elemento ya existe en esta categoría" })
    }
    next(error)
  }
}

export const actualizarMaestro = async (req, res, next) => {
  try {
    const maestro = await Maestro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    )
    if (!maestro) {
      return res.status(404).json({ mensaje: "Elemento no encontrado" })
    }
    res.status(200).json({ mensaje: "Mantenedor actualizado", maestro })
  } catch (error) {
    next(error)
  }
}

export const eliminarMaestro = async (req, res, next) => {
  try {
    const maestro = await Maestro.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" }
    )
    if (!maestro) {
      return res.status(404).json({ mensaje: "Elemento no encontrado" })
    }
    res.status(200).json({ mensaje: "Elemento desactivado", maestro })
  } catch (error) {
    next(error)
  }
}

// --- GESTIÓN DE USUARIOS Y PROFESIONALES (RF9 / RF5) ---

export const listarUsuarios = async (req, res, next) => {
  try {
    const filtro = {}
    if (req.query.perfil) filtro.perfil = req.query.perfil
    const usuarios = await Usuario.find(filtro).sort({ createdAt: -1 })
    res.status(200).json(usuarios)
  } catch (error) {
    next(error)
  }
}

export const cambiarEstadoUsuario = async (req, res, next) => {
  try {
    const { activo, perfil } = req.body
    const datos = {}
    if (typeof activo === "boolean") datos.activo = activo
    if (perfil) datos.perfil = perfil

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      datos,
      { returnDocument: "after", runValidators: true }
    )
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }
    res.status(200).json({ mensaje: "Usuario actualizado", usuario })
  } catch (error) {
    next(error)
  }
}

// Devuelve solo nombre y unidad para que el orientador asigne profesionales (RF5)
export const listarProfesionales = async (_req, res, next) => {
  try {
    const profesionales = await Usuario.find(
      { perfil: "profesional", activo: true },
      "nombre unidad email"
    ).sort({ nombre: 1 })
    res.status(200).json(profesionales)
  } catch (error) {
    next(error)
  }
}

// --- REPORTES AGREGADOS SIN DATOS NOMINALES (RF10 / RNF6) ---

export const reporteAgregado = async (_req, res, next) => {
  try {
    const totalSolicitudes = await Solicitud.countDocuments()
    const enAtencion = await Solicitud.countDocuments({ estado: "en_atencion" })
    const talleresActivos = await Taller.countDocuments({ activo: true })

    // Agrupación por tipo de apoyo exactamente como pide la rúbrica
    const porTipo = await Solicitud.aggregate([
      { $group: { _id: "$tipo", total: { $sum: 1 } } },
      { $project: { _id: 0, tipo: { $ifNull: ["$_id", "sin clasificar"] }, total: 1 } },
      { $sort: { total: -1 } }
    ])

    // Agrupación por estado
    const porEstado = await Solicitud.aggregate([
      { $group: { _id: "$estado", total: { $sum: 1 } } },
      { $project: { _id: 0, estado: "$_id", total: 1 } },
      { $sort: { total: -1 } }
    ])

    // Agrupación por origen (solicitud estudiante vs derivación docente)
    const porOrigen = await Solicitud.aggregate([
      { $group: { _id: "$origen", total: { $sum: 1 } } },
      { $project: { _id: 0, origen: { $ifNull: ["$_id", "estudiante"] }, total: 1 } }
    ])

    // Cálculo de tiempo promedio de atención en horas
    const solicitudesConCierre = await Solicitud.find(
      { estado: "cerrada" },
      "createdAt updatedAt"
    )
    let tiempoPromedioHoras = 0
    if (solicitudesConCierre.length > 0) {
      const sumaHoras = solicitudesConCierre.reduce((acc, s) => {
        const diffMs = new Date(s.updatedAt) - new Date(s.createdAt)
        return acc + diffMs / (1000 * 60 * 60)
      }, 0)
      tiempoPromedioHoras = Math.round(sumaHoras / solicitudesConCierre.length)
    }

    res.status(200).json({
      kpis: {
        totalSolicitudes,
        enAtencion,
        tiempoPromedioHoras,
        talleresActivos
      },
      porTipo,
      porEstado,
      porOrigen
    })
  } catch (error) {
    next(error)
  }
}

// --- BITÁCORA DE ACCESOS (RF12) ---

export const listarBitacora = async (_req, res, next) => {
  try {
    const registros = await Bitacora.find()
      .populate("usuario", "nombre email perfil")
      .populate("solicitud", "folio")
      .sort({ createdAt: -1 })
      .limit(100)

    res.status(200).json(registros)
  } catch (error) {
    next(error)
  }
}