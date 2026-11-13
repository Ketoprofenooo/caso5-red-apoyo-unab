import api from './axios'

// RF8 a RF12 - Mena Navea
// Talleres
export const getTalleresRequest = () => api.get('/talleres')
export const inscribirseRequest = (id) => api.post(`/talleres/${id}/inscripcion`)
export const anularInscripcionRequest = (id) => api.delete(`/talleres/${id}/inscripcion`)

// Mantenedores (solo admin)
export const getMaestrosRequest = () => api.get('/maestros')
// Reporte agregado (admin y orientador)
export const getReporteRequest = () => api.get('/reportes/agregado')
// Bitacora (solo admin)
export const getBitacoraRequest = () => api.get('/bitacora')
