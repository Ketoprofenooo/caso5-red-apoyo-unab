// Perfiles del sistema y usuarios de prueba.
// Sin backend, el login revisa contra esta lista. Cada perfil tiene
// la ruta a la que se le manda después de entrar.

export const perfiles = [
  { valor: 'Estudiante', ruta: '/solicitud' },
  { valor: 'Docente derivador', ruta: '/derivacion' },
  { valor: 'Consejero / Orientador', ruta: '/bandeja' },
  { valor: 'Profesional de apoyo', ruta: '/ficha' },
  { valor: 'Administrador de bienestar', ruta: '/talleres' },
]

// Clave de prueba para todos: Apoyo2026
export const usuariosPrueba = [
  { correo: 'estudiante@universidad.cl', clave: 'Apoyo2026', nombre: 'Camila Rojas', perfil: 'Estudiante' },
  { correo: 'docente@universidad.cl', clave: 'Apoyo2026', nombre: 'Rodrigo Fuentes', perfil: 'Docente derivador' },
  { correo: 'orientador@universidad.cl', clave: 'Apoyo2026', nombre: 'Ana Martínez', perfil: 'Consejero / Orientador' },
  { correo: 'profesional@universidad.cl', clave: 'Apoyo2026', nombre: 'Pedro Ruiz', perfil: 'Profesional de apoyo' },
  { correo: 'admin@universidad.cl', clave: 'Apoyo2026', nombre: 'Javiera Soto', perfil: 'Administrador de bienestar' },
]
