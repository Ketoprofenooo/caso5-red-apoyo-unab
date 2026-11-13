// Crea un usuario de cualquier perfil desde la terminal, ya activo.
// Reemplaza al mantenedor de usuarios mientras no exista en la pagina.
//
// Uso (desde la carpeta backend):
//   npm run usuario -- "Nombre Apellido" correo@universidad.cl clave perfil "Unidad"
//
// Ejemplo:
//   npm run usuario -- "Ana Perez" ana@universidad.cl clave1234 profesional "Psicologia"
//
// Perfiles: estudiante, docente, orientador, profesional, admin

import mongoose from "mongoose"
import { connectDB } from "./db.js"
import Usuario from "./models/usuario.js"
import { PERFILES } from "./config.js"

// process.argv trae lo que se escribio en la terminal.
// Las dos primeras posiciones son "node" y el nombre del archivo.
const [nombre, email, password, perfilEscrito = "estudiante", unidad = ""] = process.argv.slice(2)

// Se pasa a minuscula para que "Estudiante" tambien sirva
const perfil = perfilEscrito.toLowerCase()

if (!nombre || !email || !password) {
  console.log('Faltan datos. Uso: npm run usuario -- "Nombre" correo clave perfil "Unidad"')
  process.exit(1)
}

// Si el nombre tenia espacios y no iba entre comillas, el correo queda
// corrido a otra posicion: se avisa en vez de crear un usuario mal hecho
if (!email.includes("@")) {
  console.log(`"${email}" no es un correo. Si el nombre tiene espacios, va entre comillas.`)
  process.exit(1)
}

if (!PERFILES.includes(perfil)) {
  console.log(`Perfil no valido. Usa uno de: ${PERFILES.join(", ")}`)
  process.exit(1)
}

await connectDB()

const existe = await Usuario.findOne({ email })
if (existe) {
  console.log(`Ya existe un usuario con el correo ${email}`)
} else {
  // Se usa el modelo (y no un insert directo) para que el pre("save")
  // cifre la clave con bcrypt
  const usuario = await Usuario.create({ nombre, email, password, perfil, unidad, activo: true })
  console.log(`Usuario creado: ${usuario.nombre} (${usuario.perfil}) - ${usuario.email}`)
}

await mongoose.disconnect()
