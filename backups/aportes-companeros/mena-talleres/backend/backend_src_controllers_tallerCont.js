/**
 * Controlador de Talleres (RF8)
 * CRUD de talleres preventivos, inscripción y anulación de inscripción.
 */
import Taller from "../models/taller.js"

// Listar todos los talleres activos
export const listarTalleres = async (_req, res, next) => {
  try {
    const talleres = await Taller.find({ activo: true }).sort({ createdAt: -1 })
    res.status(200).json(talleres)
  } catch (error) {
    next(error)
  }
}

// Crear un nuevo taller (solo admin / orientador)
export const crearTaller = async (req, res, next) => {
  try {
    const { titulo, descripcion, fecha, modalidad, lugar, cupos, imagen } = req.body
    const nuevoTaller = new Taller({
      titulo,
      descripcion,
      fecha,
      modalidad,
      lugar,
      cupos: Number(cupos),
      imagen
    })
    await nuevoTaller.save()
    res.status(201).json({ mensaje: "Taller creado correctamente", taller: nuevoTaller })
  } catch (error) {
    next(error)
  }
}

// Actualizar datos de un taller usando returnDocument: 'after'
export const actualizarTaller = async (req, res, next) => {
  try {
    const taller = await Taller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    )
    if (!taller) {
      return res.status(404).json({ mensaje: "Taller no encontrado" })
    }
    res.status(200).json({ mensaje: "Taller actualizado", taller })
  } catch (error) {
    next(error)
  }
}

// Baja lógica del taller (activo: false) para no romper reportes históricos
export const eliminarTaller = async (req, res, next) => {
  try {
    const taller = await Taller.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" }
    )
    if (!taller) {
      return res.status(404).json({ mensaje: "Taller no encontrado" })
    }
    res.status(200).json({ mensaje: "Taller dado de baja correctamente", taller })
  } catch (error) {
    next(error)
  }
}

// Inscribir al usuario autenticado en un taller
export const inscribirTaller = async (req, res, next) => {
  try {
    const taller = await Taller.findOne({ _id: req.params.id, activo: true })
    if (!taller) {
      return res.status(404).json({ mensaje: "Taller no encontrado" })
    }

    const usuarioId = req.usuario._id.toString()
    const yaInscrito = taller.inscritos.some((id) => id.toString() === usuarioId)

    if (yaInscrito) {
      return res.status(409).json({ mensaje: "Ya estás inscrito en este taller" })
    }

    if (taller.cuposDisponibles <= 0) {
      return res.status(400).json({ mensaje: "No quedan cupos disponibles para este taller" })
    }

    taller.inscritos.push(req.usuario._id)
    await taller.save()

    res.status(200).json({ mensaje: "Inscripción realizada con éxito", taller })
  } catch (error) {
    next(error)
  }
}

// Anular la inscripción del usuario autenticado
export const cancelarInscripcion = async (req, res, next) => {
  try {
    const taller = await Taller.findOne({ _id: req.params.id, activo: true })
    if (!taller) {
      return res.status(404).json({ mensaje: "Taller no encontrado" })
    }

    const usuarioId = req.usuario._id.toString()
    taller.inscritos = taller.inscritos.filter((id) => id.toString() !== usuarioId)
    await taller.save()

    res.status(200).json({ mensaje: "Inscripción anulada", taller })
  } catch (error) {
    next(error)
  }
}