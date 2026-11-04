import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Base de Datos Conectada")
  } catch (error) {
    console.log("Error conectando a MongoDB:", error.message)
    process.exit(1)
  }
}
