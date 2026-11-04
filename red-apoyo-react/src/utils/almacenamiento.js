// localStorage puede fallar (modo incógnito, permisos del navegador),
// por eso toda lectura y escritura pasa por estas funciones con try/catch.
// Ahora solo guarda la sesion (con el token del backend), el borrador de la
// solicitud y la ultima solicitud enviada. Los datos reales estan en MongoDB.

export function leer(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : valorPorDefecto
  } catch (error) {
    console.warn('No se pudo leer', clave, error)
    return valorPorDefecto
  }
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch (error) {
    console.warn('No se pudo guardar', clave, error)
  }
}

export function borrar(clave) {
  try {
    localStorage.removeItem(clave)
  } catch (error) {
    console.warn('No se pudo borrar', clave, error)
  }
}

// ---------- Sesión simulada ----------
export const MINUTOS_SESION = 20

// Devuelve la sesión guardada, o null si no hay o si ya venció (RNF3).
export function leerSesion() {
  const sesion = leer('sesionRedApoyo', null)
  if (!sesion) return null

  const minutos = (Date.now() - sesion.inicio) / 60000
  if (minutos > MINUTOS_SESION) {
    borrar('sesionRedApoyo')
    return null
  }
  return sesion
}
