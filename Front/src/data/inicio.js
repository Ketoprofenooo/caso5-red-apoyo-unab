import { imagenes } from './imagenes'

// Datos del home (Fajardo Zamora). Antes estaban escritos a mano en el HTML;
// ahora la página los recorre con map() y arma una Tarjeta por cada uno.

export const paginasSistema = [
  {
    id: 'solicitud',
    nombre: 'Solicitud y derivación',
    texto: 'El estudiante pide apoyo con sus palabras y el docente deriva de forma responsable.',
    integrante: 'Alfaro Sánchez',
    ruta: '/solicitud',
    imagen: imagenes.solicitud,
  },
  {
    id: 'bandeja',
    nombre: 'Bandeja del orientador',
    texto: 'Clasificar lo que va llegando y asignárselo al profesional que corresponde.',
    integrante: 'Briones Osorio',
    ruta: '/bandeja',
    imagen: imagenes.bandeja,
  },
  {
    id: 'ficha',
    nombre: 'Ficha de seguimiento',
    texto: 'Citas, estados y observaciones de cada caso, hasta que se puede cerrar.',
    integrante: 'Méndez Muñoz',
    ruta: '/ficha',
    imagen: imagenes.ficha,
  },
  {
    id: 'talleres',
    nombre: 'Talleres y reportes',
    texto: 'Inscripción a talleres, mantenedores y reportes agregados, sin datos de personas.',
    integrante: 'Mena Navea',
    ruta: '/talleres',
    imagen: imagenes.talleres,
  },
]

export const tiposApoyo = [
  {
    id: 'emocional',
    titulo: 'Emocional',
    texto: 'Ansiedad, angustia, duelo, sobrecarga o esos días en que simplemente no te levantas.',
    pie: 'Deriva a Psicología',
    imagen: imagenes.emocional,
  },
  {
    id: 'academico',
    titulo: 'Académico',
    texto: 'Ramos que se te fueron de las manos, métodos de estudio, reprogramar una evaluación.',
    pie: 'Deriva a Orientación académica',
    imagen: imagenes.academico,
  },
  {
    id: 'social',
    titulo: 'Social',
    texto: 'Aislamiento, adaptarse a la universidad o sentir que no tienes a quién decirle las cosas.',
    pie: 'Deriva a Trabajo social',
    imagen: imagenes.social,
  },
  {
    id: 'economico',
    titulo: 'Económico',
    texto: 'Arancel, almuerzo, locomoción, materiales o dónde vivir durante el semestre.',
    pie: 'Deriva a Bienestar estudiantil',
    imagen: imagenes.economico,
  },
  {
    id: 'convivencia',
    titulo: 'Convivencia',
    texto: 'Conflictos, maltrato, hostigamiento o un ambiente pesado en la carrera.',
    pie: 'Deriva a Convivencia universitaria',
    imagen: imagenes.convivencia,
  },
  {
    id: 'otro',
    titulo: 'Otro',
    texto: 'Si nada de lo anterior te calza, escríbelo como salga. Igual lo leemos.',
    pie: 'Deriva a Mesa de bienestar',
    imagen: imagenes.otro,
  },
]

export const canales = [
  {
    id: 'linea',
    titulo: 'Acá mismo',
    texto: 'Solicitudes, citas y seguimiento en línea. Abierto a cualquier hora.',
    pie: 'Respuesta en hasta 48 horas hábiles',
    imagen: imagenes.enLinea,
  },
  {
    id: 'presencial',
    titulo: 'Presencial',
    texto: 'Mesa de bienestar estudiantil, Casa Central, oficina 12.',
    pie: 'Lunes a viernes, 9:00 a 18:00',
    imagen: imagenes.presencial,
  },
  {
    id: 'correo',
    titulo: 'Por correo',
    texto: 'Para consultas administrativas que no requieren abrir un caso.',
    pie: 'bienestar@universidad.cl',
    imagen: imagenes.correo,
  },
  {
    id: 'ahora',
    titulo: 'Si es ahora',
    texto: 'No uses esta plataforma. Llama y pide ayuda de inmediato.',
    pie: 'Salud Responde 600 360 7777 · Emergencias 131',
    urgente: true,
  },
]
