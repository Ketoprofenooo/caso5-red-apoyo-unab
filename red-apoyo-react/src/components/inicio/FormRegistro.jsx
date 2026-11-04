import { useState } from 'react'
import Campo from '../Campo'
import { registroRequest } from '../../api/auth'
import { mensajeDeError } from '../../api/axios'
import { perfiles } from '../../data/usuarios'
import { claveValida, correoInstitucional, correoValido, sinErrores } from '../../utils/validaciones'

const vacio = { nombre: '', correo: '', perfil: '', unidad: '', clave: '', clave2: '', pauta: false }

function FormRegistro({ alRegistrar }) {
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [errorServidor, setErrorServidor] = useState('')

  // El checkbox guarda checked (true/false); el resto guarda value.
  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setErrorServidor('')
    const correo = datos.correo.trim()

    const nuevosErrores = {
      nombre: datos.nombre.trim().length < 3 ? 'Escribe tu nombre completo.' : '',
      correo:
        correo === '' ? 'Falta tu correo institucional.'
        : !correoValido(correo) ? 'Revisa el formato: nombre@universidad.cl'
        : !correoInstitucional(correo) ? 'Tiene que ser tu correo @universidad.cl, no uno personal.'
        : '',
      perfil: datos.perfil === '' ? 'Elige tu perfil institucional.' : '',
      unidad: datos.unidad.trim() === '' ? 'Indica tu carrera o unidad.' : '',
      clave: !claveValida(datos.clave) ? 'Necesita 8 caracteres como mínimo y al menos un número.' : '',
      clave2: datos.clave2 !== datos.clave ? 'Las dos contraseñas no son iguales.' : '',
      pauta: !datos.pauta ? 'Tienes que aceptar la pauta de uso responsable.' : '',
    }

    setErrores(nuevosErrores)

    if (!sinErrores(nuevosErrores)) return

    try {
      // POST /api/auth/registro. El backend vuelve a validar y cifra la clave.
      const respuesta = await registroRequest({
        nombre: datos.nombre.trim(),
        email: correo,
        password: datos.clave,
        perfil: datos.perfil,
        unidad: datos.unidad.trim(),
      })
      alRegistrar({ ...respuesta.data.usuario, unidad: datos.unidad.trim(), mensaje: respuesta.data.mensaje })
      setDatos(vacio)
    } catch (error) {
      setErrorServidor(mensajeDeError(error))
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="mt-6">
      <Campo id="registroNombre" etiqueta="Nombre completo" error={errores.nombre}>
        <input id="registroNombre" name="nombre" type="text" value={datos.nombre} onChange={manejarCambio} className="entrada" />
      </Campo>

      <Campo id="registroCorreo" etiqueta="Correo institucional" error={errores.correo}>
        <input
          id="registroCorreo"
          name="correo"
          type="email"
          placeholder="nombre@universidad.cl"
          value={datos.correo}
          onChange={manejarCambio}
          className="entrada"
        />
      </Campo>

      <div className="grid gap-x-4 md:grid-cols-2">
        <Campo id="registroPerfil" etiqueta="Perfil institucional" error={errores.perfil}>
          <select id="registroPerfil" name="perfil" value={datos.perfil} onChange={manejarCambio} className="entrada">
            <option value="">Elige tu perfil</option>
            {perfiles.map((p) => (
              <option key={p.valor} value={p.valor}>{p.nombre}</option>
            ))}
          </select>
        </Campo>

        <Campo id="registroUnidad" etiqueta="Carrera o unidad" error={errores.unidad}>
          <input
            id="registroUnidad"
            name="unidad"
            type="text"
            placeholder="Ej: Ingeniería en Computación"
            value={datos.unidad}
            onChange={manejarCambio}
            className="entrada"
          />
        </Campo>
      </div>

      <div className="grid gap-x-4 md:grid-cols-2">
        <Campo
          id="registroClave"
          etiqueta="Contraseña"
          pista="Mínimo 8 caracteres y al menos un número."
          error={errores.clave}
        >
          <input id="registroClave" name="clave" type="password" value={datos.clave} onChange={manejarCambio} className="entrada" />
        </Campo>

        <Campo id="registroClave2" etiqueta="Repite la contraseña" error={errores.clave2}>
          <input id="registroClave2" name="clave2" type="password" value={datos.clave2} onChange={manejarCambio} className="entrada" />
        </Campo>
      </div>

      <div className="mb-4">
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="pauta" checked={datos.pauta} onChange={manejarCambio} className="mt-1 accent-verde" />
          Acepto la pauta de uso responsable de la Red de Apoyo.
        </label>
        {errores.pauta && <p className="mt-1 text-sm text-rojo">{errores.pauta}</p>}
      </div>

      {errorServidor && (
        <p className="mb-4 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{errorServidor}</p>
      )}

      <button type="submit" className="boton w-full">Crear cuenta</button>
    </form>
  )
}

export default FormRegistro
