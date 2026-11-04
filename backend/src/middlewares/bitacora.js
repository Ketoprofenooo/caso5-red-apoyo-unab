import mongoose from "mongoose"
import Bitacora from "../models/bitacora.js"

// RF12: deja registro de cada acceso o cambio sobre datos sensibles.
// Se engancha con router.use("/solicitudes", registrar("solicitud")).
// Como va montado con router.use, aca no existe req.params.id:
// el id se saca del primer tramo de la URL (/:id/clasificar -> id).
export const registrar = (entidad) => async (req, res, next) => {
  const primerTramo = req.path.split("/")[1] || ""
  const entidadId = mongoose.isValidObjectId(primerTramo) ? primerTramo : ""

  try {
    await Bitacora.create({
      usuario: req.usuario?._id,
      perfil: req.usuario?.perfil,
      accion: `${req.method} ${req.originalUrl}`,
      entidad,
      entidadId,
      ip: req.ip
    })
  } catch (error) {
    // Si la bitacora falla no se corta la peticion, pero queda el aviso
    console.log("No se pudo escribir en bitacora:", error.message)
  }
  next()
}
