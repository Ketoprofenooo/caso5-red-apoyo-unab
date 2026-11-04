import mongoose from "mongoose"

// RF12 / RNF4: quien abrio o modifico que, y cuando
const esquema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  perfil: String,
  accion: { type: String, required: true },
  entidad: String,
  entidadId: String,
  ip: String,
  fecha: { type: Date, default: Date.now }
})

export default mongoose.model("Bitacora", esquema)
