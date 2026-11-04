import Taller from "../models/taller.js"

const DATOS_PERSONA = "nombre email perfil"

/* ---------- RF8 ---------- */
export const crearTaller = async (req, res, next) => {
  try {
    const { titulo, descripcion, fecha, lugar, cupos } = req.body

    const taller = new Taller({
      titulo,
      descripcion,
      fecha,
      lugar,
      cupos,
      responsable: req.usuario._id
    })

    await taller.save()
    res.status(201).json({ mensaje: "Taller creado correctamente", taller })
  } catch (error) {
    next(error)
  }
}

export const listarTalleres = async (req, res, next) => {
  try {
    const talleres = await Taller.find({ activo: true })
      .populate("responsable", DATOS_PERSONA)
      .sort({ fecha: 1 })

    res.status(200).json(talleres)
  } catch (error) {
    next(error)
  }
}

export const verTaller = async (req, res, next) => {
  try {
    const taller = await Taller.findById(req.params.id)
      .populate("responsable", DATOS_PERSONA)

    if (!taller) return res.status(404).json({ mensaje: "Taller no encontrado" })

    res.status(200).json(taller)
  } catch (error) {
    next(error)
  }
}

export const actualizarTaller = async (req, res, next) => {
  try {
    const taller = await Taller.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true
    })

    if (!taller) return res.status(404).json({ mensaje: "Taller no encontrado" })

    res.status(200).json({ mensaje: "Taller actualizado", taller })
  } catch (error) {
    next(error)
  }
}

export const eliminarTaller = async (req, res, next) => {
  try {
    // Baja logica: el historial se conserva para los reportes
    const taller = await Taller.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" }
    )

    if (!taller) return res.status(404).json({ mensaje: "Taller no encontrado" })

    res.status(200).json({ mensaje: "Taller desactivado", taller })
  } catch (error) {
    next(error)
  }
}

/* ---------- Inscripcion ---------- */
export const inscribirse = async (req, res, next) => {
  try {
    const taller = await Taller.findById(req.params.id)
    if (!taller) return res.status(404).json({ mensaje: "Taller no encontrado" })

    const yaEsta = taller.inscritos.some(
      id => String(id) === String(req.usuario._id)
    )

    if (yaEsta) {
      return res.status(409).json({ mensaje: "Ya estas inscrito en este taller" })
    }

    if (taller.inscritos.length >= taller.cupos) {
      return res.status(409).json({ mensaje: "El taller ya no tiene cupos" })
    }

    taller.inscritos.push(req.usuario._id)
    await taller.save()

    res.status(200).json({
      mensaje: "Inscripcion confirmada",
      cuposDisponibles: taller.cupos - taller.inscritos.length
    })
  } catch (error) {
    next(error)
  }
}

export const anularInscripcion = async (req, res, next) => {
  try {
    const taller = await Taller.findById(req.params.id)
    if (!taller) return res.status(404).json({ mensaje: "Taller no encontrado" })

    taller.inscritos = taller.inscritos.filter(
      id => String(id) !== String(req.usuario._id)
    )

    await taller.save()
    res.status(200).json({ mensaje: "Inscripcion anulada" })
  } catch (error) {
    next(error)
  }
}
