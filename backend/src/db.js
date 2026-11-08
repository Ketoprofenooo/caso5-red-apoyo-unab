import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"

// Conexion a MongoDB con Mongoose, como en la clase.
// La direccion viene del .env (MONGO_URI); por defecto mongodb://localhost:27017/redapoyo
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Base de Datos Conectada")
  } catch (error) {
    // Sin base de datos la API no sirve: se avisa y se detiene el proceso
    console.log("Error conectando a MongoDB:", error.message)
    process.exit(1)
  }
}
