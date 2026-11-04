import mongoose from "mongoose"
import { TIPOS_SOLICITUD, URGENCIAS, ESTADOS } from "../config.js"

// Cada atencion registrada sobre la solicitud (RF6)
const seguimiento = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  tipoRegistro: {
    type: String,
    enum: ["cita", "observacion", "cambio_estado"],
    default: "observacion"
  },
  detalle: { type: String, required: true, trim: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
}, { _id: true })

// Mensajes al estudiante (RF7)
const notificacion = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  mensaje: { type: String, required: true, trim: true },
  leida: { type: Boolean, default: false }
}, { _id: true })

const esquema = new mongoose.Schema({
  folio: { type: String, unique: true, index: true },

  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  // "directa" la crea el estudiante (RF2), "derivacion" la crea un docente (RF3)
  origen: {
    type: String,
    enum: ["directa", "derivacion"],
    default: "directa"
  },
  docenteDerivador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },

  motivo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  urgenciaPercibida: { type: String, enum: URGENCIAS, default: "media" },
  contacto: { type: String, required: true, trim: true },

  // RF4: lo completa el orientador al clasificar
  tipo: { type: String, enum: TIPOS_SOLICITUD },

  // RF5
  profesionalAsignado: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },

  estado: { type: String, enum: ESTADOS, default: "recibida" },

  seguimientos: [seguimiento],
  notificaciones: [notificacion],

  // RF11
  cierre: {
    motivo: { type: String, trim: true },
    derivacionRealizada: { type: String, trim: true },
    fecha: Date,
    cerradaPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
  }
}, { timestamps: true })

// Folio correlativo por anio: RA-2026-0001
// En Mongoose 9 la funcion async no recibe next: basta con terminar.
esquema.pre("save", async function () {
  if (this.folio) return
  const anio = new Date().getFullYear()
  const total = await mongoose.model("Solicitud").countDocuments({
    createdAt: { $gte: new Date(`${anio}-01-01`) }
  })
  this.folio = `RA-${anio}-${String(total + 1).padStart(4, "0")}`
})

export default mongoose.model("Solicitud", esquema)
