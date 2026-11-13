import api from './axios'

// RF2 - Alfaro Sanchez: el estudiante pide apoyo
export const crearSolicitudRequest = (datos) => api.post('/solicitudes', datos)
// RF3 - Alfaro Sanchez: el docente deriva a un estudiante
export const derivarRequest = (datos) => api.post('/solicitudes/derivacion', datos)

// Listado. El backend filtra solo segun el perfil de quien pregunta
export const getSolicitudesRequest = () => api.get('/solicitudes')
// Una solicitud con su historial
export const getSolicitudRequest = (id) => api.get(`/solicitudes/${id}`)

// RF4 y RF5 - Briones Osorio: clasificar y asignar
export const clasificarRequest = (id, tipo) => api.put(`/solicitudes/${id}/clasificar`, { tipo })
export const asignarRequest = (id, profesionalId) => api.put(`/solicitudes/${id}/asignar`, { profesionalId })
export const getProfesionalesRequest = () => api.get('/profesionales')

// RF6, RF7 y RF11 - Mendez Munoz: seguimiento, avisos y cierre
export const seguimientoRequest = (id, datos) => api.post(`/solicitudes/${id}/seguimiento`, datos)
export const getNotificacionesRequest = () => api.get('/solicitudes/notificaciones')
export const cerrarRequest = (id, datos) => api.put(`/solicitudes/${id}/cerrar`, datos)
