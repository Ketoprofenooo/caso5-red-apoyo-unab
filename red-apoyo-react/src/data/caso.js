// Datos de la ficha de caso (Méndez Muñoz).
// El caso, su historial y sus avisos ahora vienen del backend.

// Los tipos de registro que acepta POST /solicitudes/:id/seguimiento
export const tiposRegistro = [
  { valor: 'observacion', nombre: 'Observación interna' },
  { valor: 'cita', nombre: 'Cita agendada' },
]

// Titulo de cada evento de la linea de tiempo
export const tituloRegistro = {
  observacion: 'Observación',
  cita: 'Cita',
  cambio_estado: 'Cambio de estado',
}

export const motivosCierre = ['Objetivo cumplido', 'Derivación realizada', 'Solicitud finalizada']

// Perfiles que pueden registrar seguimiento y cerrar (igual que en el backend)
export const perfilesEquipo = ['profesional', 'orientador', 'admin']
