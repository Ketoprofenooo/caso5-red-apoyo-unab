// localStorage puede fallar (modo incógnito, permisos del navegador),
// por eso toda lectura y escritura pasa por estas funciones con try/catch.

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

// ---------- Solicitudes ingresadas (las comparten Alfaro y Briones) ----------
export const leerSolicitudes = () => leer('listaSolicitudes', [])

export function agregarSolicitud(solicitud) {
  const lista = leerSolicitudes()
  guardar('listaSolicitudes', [...lista, solicitud])
  guardar('ultimaSolicitud', solicitud)
}

// Folio al azar, igual que en la Entrega 1: FOLIO-2026-123456-SM
export function crearFolio(sufijo) {
  const numero = Math.floor(Math.random() * 900000) + 100000
  return `FOLIO-2026-${numero}-${sufijo}`
}
