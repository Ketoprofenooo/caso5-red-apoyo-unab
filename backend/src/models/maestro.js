import mongoose from "mongoose"

// RF9: una sola coleccion para los mantenedores simples
// (tipos de solicitud, sedes y unidades de apoyo)
const esquema = new mongoose.Schema({
  categoria: {
    type: String,
    required: true,
    enum: ["tipo_solicitud", "sede", "unidad"]
  },
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true, default: "" },
  activo: { type: Boolean, default: true }
}, { timestamps: true })

esquema.index({ categoria: 1, nombre: 1 }, { unique: true })

export default mongoose.model("Maestro", esquema)
