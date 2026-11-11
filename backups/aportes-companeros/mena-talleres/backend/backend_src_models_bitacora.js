/**
 * Modelo Bitacora (RF12)
 * Registra los accesos y acciones relevantes sobre el sistema para auditoría.
 */
import mongoose from "mongoose"

const esquemaBitacora = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: false
    },
    perfil: {
      type: String,
      default: "anonimo"
    },
    accion: {
      type: String,
      required: true,
      trim: true
    },
    recurso: {
      type: String,
      required: true,
      trim: true
    },
    solicitud: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solicitud",
      default: null
    },
    ip: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
)

export default mongoose.model("Bitacora", esquemaBitacora)