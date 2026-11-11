/**
 * Modelo Maestro (RF9)
 * Almacena catálogos del sistema (tipos de apoyo, sedes y unidades)
 * en una sola colección diferenciada por categoría.
 */
import mongoose from "mongoose"

const esquemaMaestro = new mongoose.Schema(
  {
    categoria: {
      type: String,
      required: true,
      enum: ["tipo_apoyo", "sede", "unidad"],
      trim: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      default: "",
      trim: true
    },
    activo: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Índice único compuesto para evitar duplicados dentro de la misma categoría
esquemaMaestro.index({ categoria: 1, nombre: 1 }, { unique: true })

export default mongoose.model("Maestro", esquemaMaestro)