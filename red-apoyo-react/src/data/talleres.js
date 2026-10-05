import { imagenes } from './imagenes'

// Datos de talleres, administración y reportes (Mena Navea).
// Los reportes son agregados: no hay ningún nombre de estudiante (RNF6).

export const talleres = [
  {
    id: 'estres',
    titulo: 'Manejo del estrés académico',
    texto: 'Sesión grupal para armar herramientas propias frente a las evaluaciones.',
    fecha: 'Martes 13 de octubre · 17:00',
    lugar: 'Sala 204, Casa Central',
    cupos: 12,
    imagen: imagenes.estres,
  },
  {
    id: 'tiempo',
    titulo: 'Gestión del tiempo',
    texto: 'Estrategias prácticas para equilibrar el estudio con la vida personal.',
    fecha: 'Jueves 15 de octubre · 12:30',
    lugar: 'En línea',
    cupos: 5,
    imagen: imagenes.tiempo,
  },
  {
    id: 'sueno',
    titulo: 'Dormir mejor en época de pruebas',
    texto: 'Hábitos simples de descanso y cómo ordenar la semana antes de un examen.',
    fecha: 'Lunes 19 de octubre · 18:00',
    lugar: 'Sala 110, Edificio B',
    cupos: 1,
    imagen: imagenes.sueno,
  },
]

export const mantenedores = [
  { id: 'usuarios', titulo: 'Usuarios y perfiles', texto: 'Alta, baja y cambio de perfil de las cuentas.', total: '1.284 cuentas' },
  { id: 'unidades', titulo: 'Unidades de apoyo', texto: 'Psicología, orientación, trabajo social y otras.', total: '6 unidades' },
  { id: 'tipos', titulo: 'Tipos de solicitud', texto: 'Categorías con las que se clasifica cada caso.', total: '6 categorías' },
]

export const reporteMensual = [
  { motivo: 'Orientación académica', total: 45, horas: 24 },
  { motivo: 'Acompañamiento emocional', total: 32, horas: 12 },
  { motivo: 'Apoyo económico', total: 18, horas: 36 },
  { motivo: 'Convivencia', total: 9, horas: 18 },
]

export const bitacora = [
  { id: 1, fecha: '2026-08-28 09:15', usuario: 'admin_bienestar', accion: 'Creación de taller', modulo: 'Talleres' },
  { id: 2, fecha: '2026-08-28 10:05', usuario: 'orientador_sede1', accion: 'Lectura de caso #1042', modulo: 'Solicitudes' },
  { id: 3, fecha: '2026-08-28 11:40', usuario: 'profesional_psico', accion: 'Registro de cita', modulo: 'Seguimiento' },
]
