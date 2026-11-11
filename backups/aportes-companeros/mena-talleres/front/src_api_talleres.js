/**
 * Funciones de comunicación con el backend para Talleres,
 * Mantenedores, Reportes y Bitácora (RF8 a RF12).
 */
import api from "./axios"

// Talleres (RF8)
export const getTalleresRequest = () => api.get("/talleres")
export const crearTallerRequest = (datos) => api.post("/talleres", datos)
export const actualizarTallerRequest = (id, datos) => api.put(`/talleres/${id}`, datos)
export const eliminarTallerRequest = (id) => api.delete(`/talleres/${id}`)
export const inscribirTallerRequest = (id) => api.post(`/talleres/${id}/inscribir`)
export const cancelarInscripcionRequest = (id) => api.delete(`/talleres/${id}/inscribir`)

// Mantenedores y Usuarios (RF9)
export const getMaestrosRequest = (categoria) =>
  api.get("/maestros", { params: categoria ? { categoria } : {} })
export const crearMaestroRequest = (datos) => api.post("/maestros", datos)
export const eliminarMaestroRequest = (id) => api.delete(`/maestros/${id}`)

export const getUsuariosRequest = () => api.get("/usuarios")
export const actualizarUsuarioRequest = (id, datos) => api.put(`/usuarios/${id}`, datos)

// Reportes agregados (RF10) y Bitácora (RF12)
export const getReporteAgregadoRequest = () => api.get("/reportes")
export const getBitacoraRequest = () => api.get("/bitacora")