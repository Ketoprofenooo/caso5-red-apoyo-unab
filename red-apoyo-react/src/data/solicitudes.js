// Datos de la parte de Alfaro Sánchez: solicitud del estudiante y
// derivación docente. Las opciones viven acá y los formularios las
// recorren con map() para no repetir el mismo bloque de JSX.
// Los motivos son los mismos tipos de apoyo del home (data/inicio.js).

export const urgenciasEstudiante = [
  { valor: 'baja', titulo: 'Baja', texto: 'Orientación preventiva. Puedo esperar unos días.' },
  { valor: 'media', titulo: 'Moderada', texto: 'Afecta mi rendimiento diario o mi bienestar.' },
  { valor: 'alta', titulo: 'Alta', texto: 'Siento una sobrecarga clara y necesito una cita pronto.' },
]

export const modalidades = [
  { valor: 'presencial', titulo: 'Presencial', texto: 'En la mesa de bienestar.' },
  { valor: 'online', titulo: 'En línea', texto: 'Por videollamada.' },
]

export const senalesAlerta = [
  { valor: 'asistencia', titulo: 'Baja abrupta en la asistencia', texto: 'Ausencias notorias o seguidas, sin aviso.' },
  { valor: 'animo', titulo: 'Cambios de ánimo o de conducta', texto: 'Aislamiento, desánimo prolongado o irritabilidad.' },
  { valor: 'desanimo', titulo: 'Expresa angustia o desánimo', texto: 'Comentarios de agobio o cansancio fuera de lo común.' },
  { valor: 'orientacion', titulo: 'Pidió orientación o apoyo', texto: 'El estudiante pidió ayuda directamente.' },
]

export const urgenciasDocente = [
  { valor: 'baja', titulo: 'Preventivo', texto: 'Orientación regular.' },
  { valor: 'media', titulo: 'Seguimiento', texto: 'Hubo contacto reciente.' },
  { valor: 'alta', titulo: 'Prioritario', texto: 'Requiere atención preferente.' },
]

export const dialogoPrevio = [
  { valor: 'si', titulo: 'Sí, y está de acuerdo' },
  { valor: 'no', titulo: 'No' },
  { valor: 'no_pude', titulo: 'No fue posible' },
]

// Para mostrar la urgencia con palabras (y no "baja", "media", "alta")
export const nombreUrgencia = { baja: 'Baja', media: 'Moderada', alta: 'Alta' }
