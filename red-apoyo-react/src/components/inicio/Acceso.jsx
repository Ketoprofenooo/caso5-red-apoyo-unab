import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pestanas from '../Pestanas'
import FormIngreso from './FormIngreso'
import FormRegistro from './FormRegistro'
import Resultado from './Resultado'
import { perfiles } from '../../data/usuarios'
import { MINUTOS_SESION } from '../../utils/almacenamiento'

const opciones = [
  { valor: 'ingreso', texto: 'Entrar' },
  { valor: 'registro', texto: 'Crear cuenta' },
]

// Caja de acceso (RF1, CU1). Decide qué mostrar según el estado:
// sesión iniciada, cuenta recién creada, o uno de los dos formularios.
function Acceso({ sesion, alIniciarSesion, alCerrarSesion }) {
  const [vista, setVista] = useState('ingreso')
  const [registro, setRegistro] = useState(null)

  const cambiarVista = (nueva) => {
    setVista(nueva)
    setRegistro(null)
  }

  // Busca la página que le toca al perfil de la sesión
  const destino = sesion ? perfiles.find((p) => p.valor === sesion.perfil) : null

  if (sesion) {
    return (
      <Resultado
        titulo="Sesión iniciada"
        filas={[
          { etiqueta: 'Nombre', valor: sesion.nombre },
          { etiqueta: 'Correo', valor: sesion.correo },
          { etiqueta: 'Perfil', valor: sesion.perfil },
          { etiqueta: 'Entraste a las', valor: new Date(sesion.inicio).toLocaleTimeString('es-CL') },
        ]}
        pie={`La sesión se cierra sola a los ${MINUTOS_SESION} minutos sin actividad.`}
      >
        {destino && <Link to={destino.ruta} className="boton">Ir a mi panel</Link>}
        <button type="button" onClick={alCerrarSesion} className="boton-claro">Cerrar sesión</button>
      </Resultado>
    )
  }

  return (
    <div>
      <Pestanas opciones={opciones} activa={vista} alCambiar={cambiarVista} />

      {registro ? (
        <Resultado
          titulo="Cuenta creada"
          filas={[
            { etiqueta: 'Nombre', valor: registro.nombre },
            { etiqueta: 'Correo', valor: registro.correo },
            { etiqueta: 'Perfil solicitado', valor: registro.perfil },
            { etiqueta: 'Carrera o unidad', valor: registro.unidad },
          ]}
          pie="Bienestar tiene que validar tu perfil antes del primer ingreso. Te avisamos por correo."
        >
          <button type="button" onClick={() => cambiarVista('ingreso')} className="boton-claro">
            Volver a Entrar
          </button>
        </Resultado>
      ) : vista === 'ingreso' ? (
        <FormIngreso alIngresar={alIniciarSesion} />
      ) : (
        <FormRegistro alRegistrar={setRegistro} />
      )}
    </div>
  )
}

export default Acceso
