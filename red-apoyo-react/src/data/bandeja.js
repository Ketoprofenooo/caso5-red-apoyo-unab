// Datos de la bandeja del orientador (Briones Osorio).

export const solicitudesDemo = [
  { id: 'SOL-001', estudiante: 'Juan Pérez', tipo: 'emocional', estado: 'pendiente', urgencia: 'alta', profesional: '' },
  { id: 'SOL-002', estudiante: 'María López', tipo: 'academico', estado: 'asignada', urgencia: 'media', profesional: 'Ana Martínez' },
  { id: 'SOL-003', estudiante: 'Carlos Gómez', tipo: 'social', estado: 'resuelta', urgencia: 'baja', profesional: 'José Díaz' },
  { id: 'SOL-004', estudiante: 'Ana Díaz', tipo: 'economico', estado: 'pendiente', urgencia: 'alta', profesional: '' },
  { id: 'SOL-005', estudiante: 'Pedro Silva', tipo: 'social', estado: 'asignada', urgencia: 'media', profesional: 'Pedro Ruiz' },
  { id: 'SOL-006', estudiante: 'Valentina Muñoz', tipo: 'convivencia', estado: 'pendiente', urgencia: 'media', profesional: '' },
  { id: 'SOL-007', estudiante: 'Tomás Herrera', tipo: 'academico', estado: 'pendiente', urgencia: 'baja', profesional: '' },
  { id: 'SOL-008', estudiante: 'Fernanda Castro', tipo: 'emocional', estado: 'asignada', urgencia: 'alta', profesional: 'Ana Martínez' },
]

export const tipos = [
  { valor: 'emocional', nombre: 'Emocional' },
  { valor: 'academico', nombre: 'Académico' },
  { valor: 'social', nombre: 'Social' },
  { valor: 'economico', nombre: 'Económico' },
  { valor: 'convivencia', nombre: 'Convivencia' },
  { valor: 'otro', nombre: 'Otro' },
]

export const estados = [
  { valor: 'pendiente', nombre: 'Pendiente' },
  { valor: 'asignada', nombre: 'Asignada' },
  { valor: 'resuelta', nombre: 'Resuelta' },
]

export const profesionales = ['Ana Martínez', 'Pedro Ruiz', 'José Díaz']

// Para ordenar por urgencia: un número por cada nivel
export const pesoUrgencia = { alta: 3, media: 2, baja: 1 }
