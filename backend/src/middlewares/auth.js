import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"
import { JWT_SECRET } from "../config.js"

// Lee el token del header Authorization: Bearer <token>
export const verificarToken = async (req, res, next) => {
  const cabecera = req.headers.authorization || ""

  if (!cabecera.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "No hay sesion iniciada" })
  }

  try {
    const datos = jwt.verify(cabecera.slice(7), JWT_SECRET)
    const usuario = await Usuario.findById(datos.id)

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ mensaje: "Usuario no valido" })
    }

    req.usuario = usuario
    next()
  } catch (error) {
    // RNF3: el token vence a los 20 minutos de iniciar sesion y la sesion se cae sola
    const vencido = error.name === "TokenExpiredError"
    return res.status(401).json({
      mensaje: vencido ? "La sesion expiro, vuelve a iniciar sesion" : "Token invalido"
    })
  }
}
