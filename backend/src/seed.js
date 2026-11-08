// Carga inicial de la base de datos.
// Se ejecuta con: npm run seed
// OJO: borra todo lo que haya y vuelve a crear los datos de prueba.

import mongoose from "mongoose"
import { connectDB } from "./db.js"
import Usuario from "./models/usuario.js"
import Solicitud from "./models/solicitud.js"
import Taller from "./models/taller.js"
import Maestro from "./models/maestro.js"
import Bitacora from "./models/bitacora.js"

const usuariosPrueba = [
  { nombre: "Camila Rojas",      email: "estudiante@universidad.cl",  password: "clave1234", perfil: "estudiante",  unidad: "Ingenieria en Computacion" },
  { nombre: "Matias Soto",       email: "estudiante2@universidad.cl", password: "clave1234", perfil: "estudiante",  unidad: "Enfermeria" },
  { nombre: "Prof. Elena Vargas", email: "docente@universidad.cl",    password: "clave1234", perfil: "docente",     unidad: "Facultad de Ingenieria" },
  { nombre: "Daniela Munoz",     email: "orientador@universidad.cl",  password: "clave1234", perfil: "orientador",  unidad: "Bienestar Estudiantil" },
  { nombre: "Ps. Jorge Herrera", email: "profesional@universidad.cl", password: "clave1234", perfil: "profesional", unidad: "Psicologia" },
  { nombre: "Admin Bienestar",   email: "admin@universidad.cl",       password: "clave1234", perfil: "admin",       unidad: "Direccion de Asuntos Estudiantiles" }
]

const maestros = [
  { categoria: "tipo_solicitud", nombre: "Emocional",   descripcion: "Deriva a Psicologia" },
  { categoria: "tipo_solicitud", nombre: "Academico",   descripcion: "Deriva a Orientacion academica" },
  { categoria: "tipo_solicitud", nombre: "Social",      descripcion: "Deriva a Trabajo social" },
  { categoria: "tipo_solicitud", nombre: "Economico",   descripcion: "Deriva a Bienestar estudiantil" },
  { categoria: "tipo_solicitud", nombre: "Convivencia", descripcion: "Deriva a Convivencia universitaria" },
  { categoria: "sede",  nombre: "Casa Central" },
  { categoria: "sede",  nombre: "Campus Republica" },
  { categoria: "unidad", nombre: "Psicologia" },
  { categoria: "unidad", nombre: "Trabajo Social" },
  { categoria: "unidad", nombre: "Bienestar Estudiantil" }
]

const cargar = async () => {
  await connectDB()

  console.log("Limpiando colecciones...")
  await Promise.all([
    Usuario.deleteMany({}),
    Solicitud.deleteMany({}),
    Taller.deleteMany({}),
    Maestro.deleteMany({}),
    Bitacora.deleteMany({})
  ])

  // create() dispara el pre("save"), asi las contrasenas quedan cifradas
  console.log("Creando usuarios...")
  const usuarios = await Usuario.create(usuariosPrueba)

  const estudiante   = usuarios.find(u => u.email === "estudiante@universidad.cl")
  const estudiante2  = usuarios.find(u => u.email === "estudiante2@universidad.cl")
  const docente      = usuarios.find(u => u.perfil === "docente")
  const orientador   = usuarios.find(u => u.perfil === "orientador")
  const profesional  = usuarios.find(u => u.perfil === "profesional")

  console.log("Creando mantenedores...")
  await Maestro.create(maestros)

  console.log("Creando talleres...")
  await Taller.create([
    {
      titulo: "Manejo de la ansiedad antes de evaluaciones",
      descripcion: "Taller practico de tecnicas de respiracion y organizacion del estudio.",
      fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lugar: "Sala 204, Casa Central",
      cupos: 25,
      responsable: profesional._id,
      inscritos: [estudiante._id]
    },
    {
      titulo: "Habitos de sueno en periodo academico",
      descripcion: "Charla abierta sobre descanso y rendimiento.",
      fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      lugar: "Auditorio principal",
      cupos: 60,
      responsable: profesional._id
    }
  ])

  console.log("Creando solicitudes de ejemplo...")

  // Una solicitud completa: creada, clasificada, asignada y en atencion
  const s1 = new Solicitud({
    estudiante: estudiante._id,
    origen: "directa",
    motivo: "Me cuesta concentrarme y llevo semanas durmiendo mal",
    descripcion: "Vengo arrastrando varias evaluaciones y siento que no doy abasto. Me gustaria hablar con alguien.",
    urgenciaPercibida: "media",
    contacto: "Correo institucional",
    tipo: "emocional",
    estado: "en_atencion",
    profesionalAsignado: profesional._id
  })

  s1.notificaciones.push(
    { mensaje: "Recibimos tu solicitud. Un orientador la revisara pronto." },
    { mensaje: "Tu solicitud fue revisada y clasificada." },
    { mensaje: "Tu solicitud fue asignada a un profesional de apoyo." }
  )

  s1.seguimientos.push(
    { tipoRegistro: "cambio_estado", detalle: "Clasificada como emocional", autor: orientador._id },
    { tipoRegistro: "cambio_estado", detalle: `Asignada a ${profesional.nombre}`, autor: orientador._id },
    { tipoRegistro: "cita", detalle: "Primera sesion agendada para el lunes a las 10:00", autor: profesional._id }
  )

  await s1.save()

  // Una derivacion docente recien recibida
  const s2 = new Solicitud({
    estudiante: estudiante2._id,
    origen: "derivacion",
    docenteDerivador: docente._id,
    motivo: "Inasistencias reiteradas y baja participacion",
    descripcion: "El estudiante dejo de asistir hace tres semanas y no responde los correos del curso.",
    urgenciaPercibida: "alta",
    contacto: "Telefono registrado en la ficha"
  })

  s2.notificaciones.push({
    mensaje: "Un docente te derivo a la Red de Apoyo. Te contactaremos pronto."
  })

  await s2.save()

  console.log("\n==============================================")
  console.log(" USUARIOS DE PRUEBA (todos con clave1234)")
  console.log("==============================================")
  usuariosPrueba.forEach(u => {
    console.log(` ${u.perfil.padEnd(12)} ${u.email}`)
  })
  console.log("==============================================\n")

  await mongoose.disconnect()
  process.exit(0)
}

cargar().catch(error => {
  console.log("Error cargando datos:", error)
  process.exit(1)
})
