import { Link } from 'react-router-dom'
import { nombrePerfil } from '../data/usuarios'

// Envuelve una pagina que necesita sesion. Si no hay sesion, o el perfil no
// esta en la lista `perfiles`, muestra un aviso en vez de la pagina (RNF1).
// El backend igual revisa los permisos: esto solo evita mostrar algo inutil.
function RequiereSesion({ sesion, perfiles, children }) {
  if (!sesion) {
    return (
      <div className="contenedor py-20 text-center">
        <h1 className="text-3xl">Primero entra con tu cuenta</h1>
        <p className="mt-3 text-texto-suave">Esta página necesita una sesión iniciada.</p>
        <Link to="/#acceso" className="boton mt-6">Entrar</Link>
      </div>
    )
  }

  if (perfiles && !perfiles.includes(sesion.perfil)) {
    return (
      <div className="contenedor py-20 text-center">
        <h1 className="text-3xl">Esta página no es para tu perfil</h1>
        <p className="mt-3 text-texto-suave">
          Entraste como {nombrePerfil(sesion.perfil)}. Esta página es para:{' '}
          {perfiles.map(nombrePerfil).join(', ')}.
        </p>
        <Link to="/" className="boton-claro mt-6">Volver al inicio</Link>
      </div>
    )
  }

  return children
}

export default RequiereSesion
