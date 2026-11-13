// Reglas que usan los formularios. Cada una devuelve true o false.

export const correoValido = (correo) => correo.includes('@') && correo.includes('.')

export const correoInstitucional = (correo) => correo.endsWith('@universidad.cl')

export const claveValida = (clave) => clave.length >= 8 && /[0-9]/.test(clave)

// Acepta +56 9 1234 5678 con o sin espacios
export const telefonoValido = (telefono) => /^\+?[0-9 ]{8,15}$/.test(telefono.trim())

// true si el objeto de errores no tiene ningún mensaje
export const sinErrores = (errores) => Object.values(errores).every((mensaje) => mensaje === '')
