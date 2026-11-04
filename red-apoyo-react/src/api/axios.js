import axios from 'axios'
import { borrar, leer } from '../utils/almacenamiento'

// Igual que en la clase (const API = 'http://localhost:4000/api'), pero en una
// instancia de axios para no repetir la direccion en cada llamada.
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

// Antes de cada peticion: si hay sesion, se agrega el token.
// Asi ninguna funcion de src/api tiene que acordarse de mandarlo.
api.interceptors.request.use((config) => {
  const sesion = leer('sesionRedApoyo', null)
  if (sesion) config.headers.Authorization = `Bearer ${sesion.token}`
  return config
})

// Despues de cada respuesta: si el backend dice 401 (token vencido o invalido),
// se borra la sesion y se vuelve al login.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esLogin = error.config?.url === '/auth/login'
    if (error.response?.status === 401 && !esLogin) {
      borrar('sesionRedApoyo')
      window.location.href = '/#acceso'
    }
    return Promise.reject(error)
  },
)

// El backend responde { mensaje } o { mensaje, errores: [...] }.
// Esta funcion arma un texto para mostrar en pantalla.
export const mensajeDeError = (error) => {
  if (!error.response) return 'No se pudo conectar con el servidor. Revisa que el backend este corriendo.'
  const { mensaje, errores } = error.response.data || {}
  if (errores && errores.length) return errores.join('. ')
  return mensaje || 'Ocurrio un error inesperado.'
}

export default api
