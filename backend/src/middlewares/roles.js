// RNF1: minimo privilegio. Se usa asi: permitir("orientador","admin")
export const permitir = (...perfiles) => (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No hay sesion iniciada" })
  }

  if (!perfiles.includes(req.usuario.perfil)) {
    return res.status(403).json({
      mensaje: "Tu perfil no tiene permiso para esta accion"
    })
  }

  next()
}
