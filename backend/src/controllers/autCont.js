import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"
import { JWT_SECRET, JWT_EXPIRA } from "../config.js"

const firmarToken = (usuario) =>
  jwt.sign({ id: usuario._id, perfil: usuario.perfil }, JWT_SECRET, {
    expiresIn: JWT_EXPIRA
  })

// RF1 - Registro
export const registro = async (req, res, next) => {
  try {
    const { nombre, email, password, perfil, unidad } = req.body

    const existe = await Usuario.findOne({ email })
    if (existe) {
      return res.status(409).json({ mensaje: "Ese correo ya esta registrado" })
    }

    // RNF1: el estudiante entra de inmediato. Cualquier otro perfil queda
    // inactivo hasta que el admin lo valide; si no, cualquiera podria
    // registrarse como admin.
    const esEstudiante = !perfil || perfil === "estudiante"

    const nuevo = new Usuario({
      nombre,
      email,
      password,
      perfil: perfil || "estudiante",
      unidad,
      activo: esEstudiante
    })
    await nuevo.save()

    res.status(201).json({
      mensaje: esEstudiante
        ? "Cuenta creada correctamente"
        : "Cuenta creada. Bienestar tiene que validar tu perfil antes del primer ingreso",
      usuario: {
        id: nuevo._id,
        nombre: nuevo.nombre,
        email: nuevo.email,
        perfil: nuevo.perfil,
        activo: nuevo.activo
      }
    })
  } catch (error) {
    next(error)
  }
}

// RF1 - Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // El password tiene select:false, hay que pedirlo explicitamente
    const usuario = await Usuario.findOne({ email }).select("+password")

    // Mismo mensaje en ambos casos: no se revela si el correo existe
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ mensaje: "Correo o contrasena incorrectos" })
    }

    if (!usuario.activo) {
      return res.status(403).json({ mensaje: "Tu cuenta esta desactivada" })
    }

    res.status(200).json({
      mensaje: "Sesion iniciada",
      token: firmarToken(usuario),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        perfil: usuario.perfil
      }
    })
  } catch (error) {
    next(error)
  }
}

// RF1 - Cada usuario edita sus propios datos: nombre, unidad y contrasena.
// El correo y el perfil no se tocan aqui (el perfil lo cambia el admin).
export const editarPerfil = async (req, res, next) => {
  try {
    const { nombre, unidad, password } = req.body

    const usuario = await Usuario.findById(req.usuario._id).select("+password")

    if (nombre !== undefined) usuario.nombre = nombre
    if (unidad !== undefined) usuario.unidad = unidad
    if (password !== undefined) usuario.password = password

    // Se usa save() y no findByIdAndUpdate para que el pre("save")
    // cifre la nueva contrasena con bcrypt
    await usuario.save()

    res.status(200).json({
      mensaje: "Perfil actualizado",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        perfil: usuario.perfil,
        unidad: usuario.unidad
      }
    })
  } catch (error) {
    next(error)
  }
}

// Devuelve el usuario de la sesion actual
export const perfil = async (req, res) => {
  res.status(200).json({
    id: req.usuario._id,
    nombre: req.usuario.nombre,
    email: req.usuario.email,
    perfil: req.usuario.perfil,
    unidad: req.usuario.unidad
  })
}
