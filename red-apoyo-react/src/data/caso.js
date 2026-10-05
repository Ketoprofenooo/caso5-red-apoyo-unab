// Datos de la ficha de caso (Méndez Muñoz). Datos ficticios.

export const caso = {
  folio: 'SOL-002',
  estudiante: 'María López',
  tipo: 'Apoyo académico',
  estado: 'En seguimiento',
  urgencia: 'media',
  profesional: 'Ana Martínez',
}

export const eventosIniciales = [
  { id: 1, fecha: '28/08/2026', titulo: 'Solicitud recibida', detalle: 'Se registra la solicitud de apoyo.' },
  { id: 2, fecha: '29/08/2026', titulo: 'Profesional asignado', detalle: 'Se asigna un profesional de apoyo.' },
  { id: 3, fecha: '02/09/2026', titulo: 'Primera atención realizada', detalle: 'Se registra la primera atención.' },
]

export const citas = [
  { id: 1, fecha: '02/09/2026', tipo: 'Orientación', profesional: 'Ana Martínez', estado: 'Realizada' },
  { id: 2, fecha: '09/09/2026', tipo: 'Seguimiento', profesional: 'Ana Martínez', estado: 'Programada' },
]

export const notificaciones = [
  { id: 1, titulo: 'Solicitud recibida', texto: 'Tu solicitud fue recibida correctamente.', lista: true },
  { id: 2, titulo: 'Profesional asignado', texto: 'Se asignó un profesional para acompañar tu caso.', lista: true },
  { id: 3, titulo: 'Cita programada', texto: 'Tienes una cita de seguimiento el 09/09/2026.', lista: false },
]

export const motivosCierre = ['Objetivo cumplido', 'Derivación realizada', 'Solicitud finalizada']
