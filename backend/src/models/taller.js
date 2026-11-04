import mongoose from "mongoose"

// RF8: talleres, charlas y actividades preventivas con inscripcion
const esquema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true, trim: true },
  cupos: { type: Number, required: true, min: 1 },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  inscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  activo: { type: Boolean, default: true }
}, { timestamps: true })

esquema.virtual("cuposDisponibles").get(function () {
  return this.cupos - this.inscritos.length
})

esquema.set("toJSON", { virtuals: true })

export default mongoose.model("Taller", esquema)
