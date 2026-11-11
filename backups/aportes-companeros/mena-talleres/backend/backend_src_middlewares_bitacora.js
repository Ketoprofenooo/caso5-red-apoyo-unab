/**
 * Middleware de Bitácora (RF12)
 * Registra automáticamente cada petición autenticada en la colección Bitacora.
 */
import mongoose from "mongoose"
import Bitacora from "../models/bitacora.js"

export const registrar = (recurso) => async (req, _res, next) => {
  try {
    const idParam = req.params?.id
    const esIdValido = idParam && mongoose.Types.ObjectId.isValid(idParam)

    await Bitacora.create({
      usuario: req.usuario?._id || null,
      perfil: req.usuario?.perfil || "sin_sesion",
      accion: `${req.method} ${req.originalUrl}`,
      recurso,
      solicitud: recurso === "solicitud" && esIdValido ? idParam : null,
      ip: req.ip || ""
    })
  } catch (error) {
    // No detenemos la petición principal si falla el registro secundario
    console.error("Error al registrar en bitácora:", error.message)
  }
  next()
}