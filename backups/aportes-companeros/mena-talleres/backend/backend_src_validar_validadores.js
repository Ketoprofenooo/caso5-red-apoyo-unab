/**
 * Validadores para Talleres y Mantenedores (RNF8)
 */
export const validarTaller = (req, res, next) => {
  const { titulo, descripcion, fecha, lugar, cupos } = req.body
  if (!titulo || titulo.trim().length < 4) {
    return res.status(400).json({ mensaje: "El título del taller es obligatorio (mínimo 4 caracteres)" })
  }
  if (!descripcion || descripcion.trim().length < 10) {
    return res.status(400).json({ mensaje: "La descripción debe tener al menos 10 caracteres" })
  }
  if (!fecha || !lugar) {
    return res.status(400).json({ mensaje: "Debes indicar fecha y lugar del taller" })
  }
  if (!cupos || Number(cupos) < 1) {
    return res.status(400).json({ mensaje: "Los cupos deben ser un número mayor a 0" })
  }
  next()
}

export const validarMaestro = (req, res, next) => {
  const { categoria, nombre } = req.body
  const categoriasValidas = ["tipo_apoyo", "sede", "unidad"]
  if (!categoriasValidas.includes(categoria)) {
    return res.status(400).json({ mensaje: "Categoría de mantenedor no válida" })
  }
  if (!nombre || nombre.trim().length < 2) {
    return res.status(400).json({ mensaje: "El nombre del elemento es obligatorio" })
  }
  next()
}