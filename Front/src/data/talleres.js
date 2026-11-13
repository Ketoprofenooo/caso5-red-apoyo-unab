import { imagenes } from './imagenes'

// Datos de talleres, administración y reportes (Mena Navea).
// Los talleres, mantenedores, reportes y bitacora vienen del backend.
// Los reportes son agregados: no hay ningún nombre de estudiante (RNF6).

// Fotos para las tarjetas: el backend no guarda imagenes,
// asi que se reparten en orden (taller 1, 2, 3, y se repite).
export const fotosTalleres = [imagenes.estres, imagenes.sueno, imagenes.tiempo]

// Pestañas de la página y qué perfiles ven cada una (RNF1)
export const pestanasTalleres = [
  { valor: 'talleres', texto: 'Talleres', perfiles: ['estudiante', 'docente', 'orientador', 'profesional', 'admin'] },
  { valor: 'reportes', texto: 'Reportes', perfiles: ['orientador', 'admin'] },
  { valor: 'mantenedores', texto: 'Mantenedores', perfiles: ['admin'] },
  { valor: 'bitacora', texto: 'Bitácora', perfiles: ['admin'] },
]

// Nombre de cada categoria de la coleccion Maestro
export const categoriasMaestro = {
  tipo_solicitud: 'Tipos de solicitud',
  sede: 'Sedes',
  unidad: 'Unidades de apoyo',
}
