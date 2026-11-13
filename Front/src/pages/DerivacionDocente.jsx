// ============================================================
// Derivación docente responsable (RF3)
// Alfaro Sánchez
// ============================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina'
import PasoFormulario from '../components/PasoFormulario'
import GrupoOpciones from '../components/GrupoOpciones'
import OpcionTarjeta from '../components/OpcionTarjeta'
import Campo from '../components/Campo'
import AreaTexto from '../components/solicitud/AreaTexto'
import RequiereSesion from '../components/RequiereSesion'
import { derivarRequest } from '../api/solicitudes'
import { mensajeDeError } from '../api/axios'
import { dialogoPrevio, senalesAlerta, urgenciasDocente } from '../data/solicitudes'
import { imagenes } from '../data/imagenes'
import { guardar } from '../utils/almacenamiento'
import { correoValido, sinErrores } from '../utils/validaciones'

const MAX_DESCRIPCION = 800

function DerivacionDocente({ sesion }) {
  const navegar = useNavigate()

  const [datos, setDatos] = useState({
    correoEstudiante: '',
    curso: '',
    senales: [],
    descripcion: '',
    urgencia: '',
    dialogo: '',
  })
  const [errores, setErrores] = useState({})
  const [errorServidor, setErrorServidor] = useState('')

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  // Las señales son varias: si ya estaba marcada se saca, si no se agrega.
  const alternarSenal = (e) => {
    const valor = e.target.value
    const senales = datos.senales.includes(valor)
      ? datos.senales.filter((s) => s !== valor)
      : [...datos.senales, valor]
    setDatos({ ...datos, senales })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setErrorServidor('')

    const nuevosErrores = {
      correoEstudiante: !correoValido(datos.correoEstudiante.trim()) ? 'Escribe el correo institucional del estudiante.' : '',
      curso: datos.curso.trim() === '' ? 'Indica la carrera o asignatura.' : '',
      senales: datos.senales.length === 0 ? 'Marca al menos una señal observada.' : '',
      descripcion: datos.descripcion.trim().length < 10 ? 'Describe lo observado (al menos 10 caracteres).' : '',
      urgencia: datos.urgencia === '' ? 'Elige la prioridad estimada.' : '',
      dialogo: datos.dialogo === '' ? 'Indica si conversaste con el estudiante.' : '',
    }
    setErrores(nuevosErrores)

    if (!sinErrores(nuevosErrores)) return

    // Se arma el texto que guarda el backend con lo que marco el docente
    const senalesTexto = senalesAlerta
      .filter((s) => datos.senales.includes(s.valor))
      .map((s) => s.titulo)
      .join(', ')
    const dialogo = dialogoPrevio.find((d) => d.valor === datos.dialogo)

    try {
      // POST /api/solicitudes/derivacion. El backend busca al estudiante por su correo.
      const respuesta = await derivarRequest({
        emailEstudiante: datos.correoEstudiante.trim().toLowerCase(),
        motivo: senalesTexto,
        descripcion: `${datos.descripcion.trim()} (Asignatura: ${datos.curso.trim()}. ¿Conversó antes con el estudiante?: ${dialogo.titulo})`,
        urgenciaPercibida: datos.urgencia,
        contacto: 'Correo institucional',
      })
      guardar('ultimaSolicitud', respuesta.data.solicitud)
      navegar('/confirmacion')
    } catch (error) {
      setErrorServidor(mensajeDeError(error))
    }
  }

  return (
    <RequiereSesion sesion={sesion} perfiles={['docente']}>
      <EncabezadoPagina
        imagen={imagenes.docente}
        etiqueta="Red docente de cuidado · RF3"
        titulo="Derivación docente responsable"
        bajada="Canal institucional y confidencial para derivar a un estudiante que podría necesitar apoyo emocional o académico."
      />

      <div className="contenedor py-10">
        <form onSubmit={manejarEnvio} noValidate className="mx-auto max-w-4xl border border-borde bg-fondo px-5 md:px-8">
          <PasoFormulario numero="1" titulo="Datos del estudiante" requerido>
            <div className="grid gap-x-4 md:grid-cols-2">
              <Campo
                id="correoEstudiante"
                etiqueta="Correo institucional del estudiante"
                pista="Tiene que tener cuenta en la plataforma. Prueba: estudiante2@universidad.cl"
                error={errores.correoEstudiante}
              >
                <input id="correoEstudiante" name="correoEstudiante" type="email" placeholder="nombre@universidad.cl" value={datos.correoEstudiante} onChange={manejarCambio} className="entrada" />
              </Campo>
              <Campo id="curso" etiqueta="Carrera o asignatura" error={errores.curso}>
                <input id="curso" name="curso" placeholder="Ej: Cálculo Multivariable (sección 3)" value={datos.curso} onChange={manejarCambio} className="entrada" />
              </Campo>
            </div>
          </PasoFormulario>

          <PasoFormulario numero="2" titulo="Señales observadas" ayuda="Marca todas las que correspondan.">
            <div className="grid gap-3 md:grid-cols-2">
              {senalesAlerta.map((senal) => (
                <OpcionTarjeta
                  key={senal.valor}
                  tipo="checkbox"
                  nombre="senales"
                  valor={senal.valor}
                  titulo={senal.titulo}
                  texto={senal.texto}
                  marcada={datos.senales.includes(senal.valor)}
                  alCambiar={alternarSenal}
                />
              ))}
            </div>
            {errores.senales && <p className="mt-2 text-sm text-rojo">{errores.senales}</p>}
          </PasoFormulario>

          <PasoFormulario numero="3" titulo="Descripción de lo observado" ayuda="Hechos concretos y observables, escritos con respeto. Sin diagnósticos.">
            <AreaTexto
              nombre="descripcion"
              etiqueta="Descripción de lo observado"
              valor={datos.descripcion}
              alCambiar={manejarCambio}
              maximo={MAX_DESCRIPCION}
              error={errores.descripcion}
            />
          </PasoFormulario>

          <PasoFormulario numero="4" titulo="Prioridad y conversación previa">
            <p className="mb-2 text-sm font-semibold">Prioridad según tu criterio</p>
            <GrupoOpciones
              nombre="urgencia"
              opciones={urgenciasDocente}
              valor={datos.urgencia}
              alCambiar={manejarCambio}
              error={errores.urgencia}
              columnas="md:grid-cols-3"
            />
            <p className="mb-2 mt-5 text-sm font-semibold">¿Conversaste antes con el estudiante?</p>
            <GrupoOpciones
              nombre="dialogo"
              opciones={dialogoPrevio}
              valor={datos.dialogo}
              alCambiar={manejarCambio}
              error={errores.dialogo}
              columnas="md:grid-cols-3"
            />
          </PasoFormulario>

          {errorServidor && (
            <p className="mt-6 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{errorServidor}</p>
          )}

          <div className="flex flex-col-reverse gap-3 py-6 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navegar('/')} className="boton-claro">Cancelar</button>
            <button type="submit" className="boton">Ingresar derivación</button>
          </div>
        </form>
      </div>
    </RequiereSesion>
  )
}

export default DerivacionDocente
