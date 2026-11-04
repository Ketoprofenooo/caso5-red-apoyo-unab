export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` })
}

// Captura todo lo que revienta en los controladores
export const manejadorErrores = (error, req, res, next) => {
  console.log(error)

  if (error.name === "CastError") {
    return res.status(400).json({ mensaje: "El id enviado no es valido" })
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      mensaje: "Datos invalidos",
      detalle: Object.values(error.errors).map(e => e.message)
    })
  }

  if (error.code === 11000) {
    return res.status(409).json({ mensaje: "Ese registro ya existe" })
  }

  res.status(500).json({ mensaje: "Error interno del servidor" })
}
