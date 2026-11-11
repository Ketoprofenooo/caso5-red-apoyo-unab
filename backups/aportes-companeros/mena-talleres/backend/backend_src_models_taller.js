/**
 * Modelo Taller (RF8)
 * Guarda los talleres preventivos, el arreglo de usuarios inscritos y
 * calcula dinámicamente los cupos disponibles mediante un virtual.
 */
import mongoose from "mongoose"

const esquemaTaller = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    fecha: {
      type: String,
      required: true,
      trim: true
    },
    modalidad: {
      type: String,
      enum: ["presencial", "online"],
      default: "presencial"
    },
    lugar: {
      type: String,
      required: true,
      trim: true
    },
    imagen: {
      type: String,
      default: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    cupos: {
      type: Number,
      required: true,
      min: 1
    },
    inscritos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ],
    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Propiedad virtual: calcula cupos restantes sin duplicar datos en MongoDB
esquemaTaller.virtual("cuposDisponibles").get(function () {
  const ocupados = Array.isArray(this.inscritos) ? this.inscritos.length : 0
  return Math.max(0, this.cupos - ocupados)
})

export default mongoose.model("Taller", esquemaTaller)