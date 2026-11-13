// Qué color le toca a cada urgencia y a cada estado en las insignias.
export const tonoUrgencia = { alta: 'rojo', media: 'ambar', baja: 'verde' }

// Estados de una solicitud, tal como los guarda el backend
export const nombreEstado = {
  recibida: 'Recibida',
  clasificada: 'Clasificada',
  asignada: 'Asignada',
  en_atencion: 'En atención',
  cerrada: 'Cerrada',
}

export const tonoEstado = {
  recibida: 'ambar',
  clasificada: 'ambar',
  asignada: 'verde',
  en_atencion: 'verde',
  cerrada: 'gris',
}

// Fecha del backend (texto ISO) a formato chileno: 04-11-2026
export const fechaCorta = (iso) => (iso ? new Date(iso).toLocaleDateString('es-CL') : '—')

// Con hora: 04-11-2026, 10:30
export const fechaHora = (iso) =>
  iso ? new Date(iso).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' }) : '—'
