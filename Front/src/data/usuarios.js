// Perfiles del sistema. `valor` es como lo guarda el backend; `nombre`, como
// se muestra; `ruta`, la pagina a la que se manda a cada perfil al entrar.

export const perfiles = [
  { valor: 'estudiante', nombre: 'Estudiante', ruta: '/solicitud' },
  { valor: 'docente', nombre: 'Docente derivador', ruta: '/derivacion' },
  { valor: 'orientador', nombre: 'Consejero / Orientador', ruta: '/bandeja' },
  { valor: 'profesional', nombre: 'Profesional de apoyo', ruta: '/ficha' },
  { valor: 'admin', nombre: 'Administrador de bienestar', ruta: '/talleres' },
]

// De 'orientador' a 'Consejero / Orientador'
export const nombrePerfil = (valor) => {
  const perfil = perfiles.find((p) => p.valor === valor)
  return perfil ? perfil.nombre : valor
}

// Las cuentas las crea el seed del backend (npm run seed).
// Aca solo se listan para rellenar el login con un clic en la demo.
export const CLAVE_PRUEBA = 'clave1234'

export const usuariosPrueba = [
  { correo: 'estudiante@universidad.cl', perfil: 'estudiante' },
  { correo: 'docente@universidad.cl', perfil: 'docente' },
  { correo: 'orientador@universidad.cl', perfil: 'orientador' },
  { correo: 'profesional@universidad.cl', perfil: 'profesional' },
  { correo: 'admin@universidad.cl', perfil: 'admin' },
]
