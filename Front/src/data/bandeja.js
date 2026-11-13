// Datos de la bandeja del orientador (Briones Osorio).
// Las solicitudes y los profesionales ahora vienen del backend.
import { nombreEstado } from './tonos'

// Los mismos tipos que acepta el backend en PUT /solicitudes/:id/clasificar
export const tipos = [
  { valor: 'emocional', nombre: 'Emocional' },
  { valor: 'academico', nombre: 'Académico' },
  { valor: 'social', nombre: 'Social' },
  { valor: 'economico', nombre: 'Económico' },
  { valor: 'convivencia', nombre: 'Convivencia' },
  { valor: 'otro', nombre: 'Otro' },
]

// Para el filtro de estado: [{ valor: 'recibida', nombre: 'Recibida' }, ...]
export const estados = Object.keys(nombreEstado).map((valor) => ({ valor, nombre: nombreEstado[valor] }))

// Para ordenar por urgencia: un número por cada nivel
export const pesoUrgencia = { alta: 3, media: 2, baja: 1 }

// De 'economico' a 'Económico'. Si todavia no se clasifica, lo dice.
export const nombreTipo = (valor) => {
  if (!valor) return 'Sin clasificar'
  const tipo = tipos.find((t) => t.valor === valor)
  return tipo ? tipo.nombre : valor
}

// Convierte una solicitud del backend en una fila de la tabla
export const aFila = (s) => ({
  id: s._id,
  folio: s.folio,
  estudiante: s.estudiante ? s.estudiante.nombre : '—',
  motivo: s.motivo,
  origen: s.origen,
  tipo: s.tipo || '',
  estado: s.estado,
  urgencia: s.urgenciaPercibida,
  profesional: s.profesionalAsignado ? s.profesionalAsignado.nombre : '',
})
