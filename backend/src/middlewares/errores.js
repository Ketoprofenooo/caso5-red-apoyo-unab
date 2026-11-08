// Si ninguna ruta calzo con la URL pedida, se responde 404
export const noEncontrado = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` })
}

// Captura todo lo que revienta en los controladores (llegan con next(error)).
// Express reconoce un manejador de errores porque tiene 4 parametros:
// _next no se usa, pero tiene que estar.
export const manejadorErrores = (error, req, res, _next) => {
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
