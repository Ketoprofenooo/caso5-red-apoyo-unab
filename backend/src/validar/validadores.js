import { TIPOS_SOLICITUD, URGENCIAS, PERFILES } from "../config.js"

// RNF8: mensajes comprensibles, no codigos de error sueltos
const vacio = (v) => v === undefined || v === null || String(v).trim() === ""

export const validarRegistro = (req, res, next) => {
  const { nombre, email, password, perfil } = req.body
  const errores = []

  if (vacio(nombre)) errores.push("El nombre es obligatorio")
  if (vacio(email)) errores.push("El correo es obligatorio")
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    errores.push("El correo no tiene un formato valido")
  }
  if (vacio(password)) errores.push("La contrasena es obligatoria")
  else if (password.length < 8 || !/\d/.test(password)) {
    errores.push("La contrasena necesita 8 caracteres como minimo y al menos un numero")
  }
  if (!vacio(perfil) && !PERFILES.includes(perfil)) {
    errores.push(`El perfil debe ser uno de: ${PERFILES.join(", ")}`)
  }

  if (errores.length) return res.status(400).json({ mensaje: "Datos invalidos", errores })
  next()
}

export const validarLogin = (req, res, next) => {
  const { email, password } = req.body
  const errores = []

  if (vacio(email)) errores.push("El correo es obligatorio")
  if (vacio(password)) errores.push("La contrasena es obligatoria")

  if (errores.length) return res.status(400).json({ mensaje: "Datos invalidos", errores })
  next()
}

// RF1 - Editar el perfil propio: todo es opcional, pero lo que venga tiene que estar bien
export const validarEdicionPerfil = (req, res, next) => {
  const { nombre, password } = req.body
  const errores = []

  if (nombre !== undefined && vacio(nombre)) errores.push("El nombre no puede quedar vacio")
  if (password !== undefined && (String(password).length < 8 || !/\d/.test(password))) {
    errores.push("La contrasena necesita 8 caracteres como minimo y al menos un numero")
  }

  if (errores.length) return res.status(400).json({ mensaje: "Datos invalidos", errores })
  next()
}

export const validarSolicitud = (req, res, next) => {
  const { motivo, descripcion, contacto, urgenciaPercibida } = req.body
  const errores = []

  if (vacio(motivo)) errores.push("Indica el motivo de tu solicitud")
  if (vacio(descripcion)) errores.push("Describe brevemente lo que necesitas")
  else if (descripcion.trim().length < 10) {
    errores.push("La descripcion es muy corta, escribe al menos 10 caracteres")
  }
  if (vacio(contacto)) errores.push("Indica como prefieres que te contacten")
  if (!vacio(urgenciaPercibida) && !URGENCIAS.includes(urgenciaPercibida)) {
    errores.push(`La urgencia debe ser: ${URGENCIAS.join(", ")}`)
  }

  if (errores.length) return res.status(400).json({ mensaje: "Datos invalidos", errores })
  next()
}

export const validarClasificacion = (req, res, next) => {
  const { tipo } = req.body

  if (!TIPOS_SOLICITUD.includes(tipo)) {
    return res.status(400).json({
      mensaje: "Datos invalidos",
      errores: [`El tipo debe ser uno de: ${TIPOS_SOLICITUD.join(", ")}`]
    })
  }

  next()
}

export const validarTaller = (req, res, next) => {
  const { titulo, descripcion, fecha, lugar, cupos } = req.body
  const errores = []

  if (vacio(titulo)) errores.push("El titulo es obligatorio")
  if (vacio(descripcion)) errores.push("La descripcion es obligatoria")
  if (vacio(fecha)) errores.push("La fecha es obligatoria")
  else if (isNaN(Date.parse(fecha))) errores.push("La fecha no es valida")
  if (vacio(lugar)) errores.push("El lugar es obligatorio")
  if (!cupos || Number(cupos) < 1) errores.push("Los cupos deben ser al menos 1")

  if (errores.length) return res.status(400).json({ mensaje: "Datos invalidos", errores })
  next()
}
