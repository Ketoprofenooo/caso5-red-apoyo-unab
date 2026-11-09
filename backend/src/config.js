import dotenv from "dotenv"
dotenv.config()

// Centraliza la configuracion. Si falta el .env usa valores de desarrollo.
export const PORT = process.env.PORT || 4000
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/redapoyo"
export const JWT_SECRET = process.env.JWT_SECRET || "clave-de-desarrollo"
export const JWT_EXPIRA = process.env.JWT_EXPIRA || "20m"
// Paginas que pueden llamar a la API (CORS). Puede ser una lista separada por comas:
// en local http://localhost:5173 y en Render tambien la direccion de Vercel.
export const ORIGENES_FRONTEND = (process.env.ORIGEN_FRONTEND || "http://localhost:5173")
  .split(",")
  .map(origen => origen.trim())

// Valores fijos del caso. Se usan en los modelos y en las validaciones.
export const PERFILES = [
  "estudiante",
  "docente",
  "orientador",
  "profesional",
  "admin"
]

export const TIPOS_SOLICITUD = [
  "emocional",
  "academico",
  "social",
  "economico",
  "convivencia",
  "otro"
]

export const URGENCIAS = ["baja", "media", "alta"]

export const ESTADOS = [
  "recibida",
  "clasificada",
  "asignada",
  "en_atencion",
  "cerrada"
]
