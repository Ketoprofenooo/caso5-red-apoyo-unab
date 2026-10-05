import { useState } from 'react'
import Campo from '../Campo'
import { usuariosPrueba } from '../../data/usuarios'
import { correoValido, sinErrores } from '../../utils/validaciones'

// Formulario controlado: cada input lee su valor desde el estado datos
// y lo actualiza con manejarCambio.
function FormIngreso({ alIngresar }) {
  const [datos, setDatos] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const correo = datos.correo.trim()

    const nuevosErrores = {
      correo:
        correo === '' ? 'Falta tu correo institucional.'
        : !correoValido(correo) ? 'Revisa el formato: nombre@universidad.cl'
        : '',
      clave: datos.clave === '' ? 'Falta la contraseña.' : '',
      general: '',
    }

    if (sinErrores(nuevosErrores)) {
      const usuario = usuariosPrueba.find(
        (u) => u.correo === correo.toLowerCase() && u.clave === datos.clave,
      )
      if (usuario) {
        alIngresar(usuario)
        return
      }
      nuevosErrores.general = 'El correo o la contraseña no coinciden.'
    }

    setErrores(nuevosErrores)
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="mt-6">
      <Campo id="ingresoCorreo" etiqueta="Correo institucional" error={errores.correo}>
        <input
          id="ingresoCorreo"
          name="correo"
          type="email"
          placeholder="nombre@universidad.cl"
          value={datos.correo}
          onChange={manejarCambio}
          className="entrada"
        />
      </Campo>

      <Campo id="ingresoClave" etiqueta="Contraseña" error={errores.clave}>
        <input
          id="ingresoClave"
          name="clave"
          type="password"
          value={datos.clave}
          onChange={manejarCambio}
          className="entrada"
        />
      </Campo>

      {errores.general && (
        <p className="mb-4 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{errores.general}</p>
      )}

      <button type="submit" className="boton w-full">Entrar</button>

      <details className="mt-5 border border-borde bg-fondo-gris p-3 text-sm">
        <summary className="cursor-pointer font-medium text-verde">Cuentas de prueba para la demo</summary>
        <p className="mt-2 text-texto-suave">
          Todas usan la contraseña <code className="bg-fondo px-1">Apoyo2026</code>.
        </p>
        <ul className="mt-2 space-y-1">
          {usuariosPrueba.map((u) => (
            <li key={u.correo}>
              <button
                type="button"
                className="text-left text-verde underline"
                onClick={() => setDatos({ correo: u.correo, clave: u.clave })}
              >
                {u.correo}
              </button>{' '}
              <span className="text-texto-suave">· {u.perfil}</span>
            </li>
          ))}
        </ul>
      </details>
    </form>
  )
}

export default FormIngreso
