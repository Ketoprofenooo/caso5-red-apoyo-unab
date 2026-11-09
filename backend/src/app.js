import express from "express"
import morgan from "morgan"
import cors from "cors"
import rutas from "./routes/routes.js"
import { manejadorErrores, noEncontrado } from "./middlewares/errores.js"
import { ORIGENES_FRONTEND } from "./config.js"

const app = express()

// CORS: sin esto el navegador bloquea al frontend, que corre en otra direccion.
// Se aceptan solo las paginas de la lista (localhost y Vercel).
app.use(cors({ origin: ORIGENES_FRONTEND, credentials: true }))

app.use(express.json())
app.use(morgan("dev"))

// Para revisar rapido que el servidor responde
app.get("/api/salud", (req, res) => res.json({ ok: true }))

app.use("/api", rutas)

app.use(noEncontrado)
app.use(manejadorErrores)

export default app
