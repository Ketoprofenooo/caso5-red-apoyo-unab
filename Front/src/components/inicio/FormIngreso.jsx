import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Campo from '../Campo'
import { loginRequest } from '../../api/auth'
import { mensajeDeError } from '../../api/axios'
import { CLAVE_PRUEBA, nombrePerfil, usuariosPrueba } from '../../data/usuarios'

// Login con react-hook-form, como en la clase: register() conecta cada input
// y handleSubmit() valida antes de llamar a onSubmit.
function FormIngreso({ alIngresar }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [errorServidor, setErrorServidor] = useState('')
  const [enviando, setEnviando] = useState(false)

  const onSubmit = async (valores) => {
    setErrorServidor('')
    setEnviando(true)
    try {
      // POST /api/auth/login -> { token, usuario }
      const respuesta = await loginRequest(valores)
      alIngresar(respuesta.data)
    } catch (error) {
      setErrorServidor(mensajeDeError(error))
    }
    setEnviando(false)
  }

  // Rellena el formulario con una cuenta de prueba
  const usarCuenta = (correo) => {
    setValue('email', correo)
    setValue('password', CLAVE_PRUEBA)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
      <Campo id="ingresoCorreo" etiqueta="Correo institucional" error={errors.email?.message}>
        <input
          id="ingresoCorreo"
          type="email"
          placeholder="nombre@universidad.cl"
          className="entrada"
          {...register('email', {
            required: 'Falta tu correo institucional.',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Revisa el formato: nombre@universidad.cl' },
          })}
        />
      </Campo>

      <Campo id="ingresoClave" etiqueta="Contraseña" error={errors.password?.message}>
        <input
          id="ingresoClave"
          type="password"
          className="entrada"
          {...register('password', { required: 'Falta la contraseña.' })}
        />
      </Campo>

      {errorServidor && (
        <p className="mb-4 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{errorServidor}</p>
      )}

      <button type="submit" disabled={enviando} className="boton w-full">
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>

      <details className="mt-5 border border-borde bg-fondo-gris p-3 text-sm">
        <summary className="cursor-pointer font-medium text-verde">Cuentas de prueba para la demo</summary>
        <p className="mt-2 text-texto-suave">
          Las crea <code className="bg-fondo px-1">npm run seed</code> en el backend. Todas usan la contraseña{' '}
          <code className="bg-fondo px-1">{CLAVE_PRUEBA}</code>.
        </p>
        <ul className="mt-2 space-y-1">
          {usuariosPrueba.map((u) => (
            <li key={u.correo}>
              <button type="button" className="text-left text-verde underline" onClick={() => usarCuenta(u.correo)}>
                {u.correo}
              </button>{' '}
              <span className="text-texto-suave">· {nombrePerfil(u.perfil)}</span>
            </li>
          ))}
        </ul>
      </details>
    </form>
  )
}

export default FormIngreso
