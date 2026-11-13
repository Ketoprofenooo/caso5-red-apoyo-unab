import api from './axios'

// RF1 - Fajardo Zamora
// Iniciar sesion: devuelve { token, usuario }
export const loginRequest = (datos) => api.post('/auth/login', datos)
// Crear cuenta
export const registroRequest = (datos) => api.post('/auth/registro', datos)
// Datos del usuario de la sesion actual
export const perfilRequest = () => api.get('/auth/perfil')
