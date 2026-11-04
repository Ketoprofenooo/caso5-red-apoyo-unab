import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { PERFILES } from "../config.js"

const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false          // RNF1: no viaja en las consultas normales
  },
  perfil: {
    type: String,
    required: true,
    enum: PERFILES,
    default: "estudiante"
  },
  unidad: {
    type: String,
    trim: true,
    default: ""
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

// RNF3: la contrasena se cifra antes de guardar, nunca en texto plano.
// En Mongoose 9 la funcion async no recibe next: basta con terminar.
esquema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

esquema.methods.compararPassword = function (texto) {
  return bcrypt.compare(texto, this.password)
}

export default mongoose.model("Usuario", esquema)
