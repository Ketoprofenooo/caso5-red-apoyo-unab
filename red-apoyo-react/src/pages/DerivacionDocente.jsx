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
import { dialogoPrevio, senalesAlerta, urgenciasDocente } from '../data/solicitudes'
import { imagenes } from '../data/imagenes'
import { agregarSolicitud, crearFolio } from '../utils/almacenamiento'
import { sinErrores } from '../utils/validaciones'

const MAX_DESCRIPCION = 800

function DerivacionDocente({ sesion }) {
  const navegar = useNavigate()
  const esDocente = sesion && sesion.perfil === 'Docente derivador'

  const [datos, setDatos] = useState({
    estudiante: '',
    contactoEstudiante: '',
    curso: '',
    senales: [],
    descripcion: '',
    urgencia: '',
    dialogo: '',
    docente: esDocente ? sesion.nombre : '',
    departamento: '',
  })
  const [errores, setErrores] = useState({})

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

  const manejarEnvio = (e) => {
    e.preventDefault()

    const nuevosErrores = {
      estudiante: datos.estudiante.trim() === '' ? 'Falta el nombre del estudiante.' : '',
      contactoEstudiante: datos.contactoEstudiante.trim() === '' ? 'Falta su correo o matrícula.' : '',
      curso: datos.curso.trim() === '' ? 'Indica la carrera o asignatura.' : '',
      senales: datos.senales.length === 0 ? 'Marca al menos una señal observada.' : '',
      descripcion: datos.descripcion.trim().length < 10 ? 'Describe lo observado (al menos 10 caracteres).' : '',
      urgencia: datos.urgencia === '' ? 'Elige la prioridad estimada.' : '',
      dialogo: datos.dialogo === '' ? 'Indica si conversaste con el estudiante.' : '',
      docente: datos.docente.trim() === '' ? 'Falta tu nombre.' : '',
      departamento: datos.departamento.trim() === '' ? 'Falta tu departamento.' : '',
    }
    setErrores(nuevosErrores)

    if (!sinErrores(nuevosErrores)) return

    agregarSolicitud({
      folio: crearFolio('DD'),
      fecha: new Date().toLocaleDateString('es-CL'),
      tipo: 'Derivación docente',
      motivo: 'otro',
      estudiante: datos.estudiante.trim(),
      prioridad: datos.urgencia,
      estado: 'En revisión',
    })
    navegar('/confirmacion')
  }

  return (
    <>
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
              <Campo id="estudiante" etiqueta="Nombre completo" error={errores.estudiante}>
                <input id="estudiante" name="estudiante" placeholder="Ej: Sofía Valenzuela Ruiz" value={datos.estudiante} onChange={manejarCambio} className="entrada" />
              </Campo>
              <Campo id="contactoEstudiante" etiqueta="Correo institucional o matrícula" error={errores.contactoEstudiante}>
                <input id="contactoEstudiante" name="contactoEstudiante" placeholder="sofia.valenzuela@universidad.cl" value={datos.contactoEstudiante} onChange={manejarCambio} className="entrada" />
              </Campo>
            </div>
            <Campo id="curso" etiqueta="Carrera o asignatura" error={errores.curso}>
              <input id="curso" name="curso" placeholder="Ej: Ing. Civil, Cálculo Multivariable (sección 3)" value={datos.curso} onChange={manejarCambio} className="entrada" />
            </Campo>
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
            <textarea
              name="descripcion"
              rows="5"
              maxLength={MAX_DESCRIPCION}
              aria-label="Descripción de lo observado"
              value={datos.descripcion}
              onChange={manejarCambio}
              className="entrada"
            />
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-rojo">{errores.descripcion}</span>
              <span className="text-texto-suave">{datos.descripcion.length} / {MAX_DESCRIPCION}</span>
            </div>
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

          <PasoFormulario numero="5" titulo="Tus datos como docente">
            <div className="grid gap-x-4 md:grid-cols-2">
              <Campo id="docente" etiqueta="Nombre" error={errores.docente}>
                <input id="docente" name="docente" value={datos.docente} onChange={manejarCambio} className="entrada" />
              </Campo>
              <Campo id="departamento" etiqueta="Departamento" error={errores.departamento}>
                <input id="departamento" name="departamento" placeholder="Ej: Facultad de Ingeniería" value={datos.departamento} onChange={manejarCambio} className="entrada" />
              </Campo>
            </div>
          </PasoFormulario>

          <div className="flex flex-col-reverse gap-3 py-6 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navegar('/')} className="boton-claro">Cancelar</button>
            <button type="submit" className="boton">Ingresar derivación</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DerivacionDocente
