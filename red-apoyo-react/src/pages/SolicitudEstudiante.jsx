// ============================================================
// Solicitud de apoyo del estudiante (RF2)
// Alfaro Sánchez
// ============================================================
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina'
import PasoFormulario from '../components/PasoFormulario'
import GrupoOpciones from '../components/GrupoOpciones'
import Campo from '../components/Campo'
import { tiposApoyo } from '../data/inicio'
import { modalidades, urgenciasEstudiante } from '../data/solicitudes'
import { imagenes } from '../data/imagenes'
import { agregarSolicitud, borrar, crearFolio, guardar, leer } from '../utils/almacenamiento'
import { sinErrores, telefonoValido } from '../utils/validaciones'

const MAX_DESCRIPCION = 500

const vacio = { motivo: '', descripcion: '', urgencia: '', modalidad: '', telefono: '', consentimiento: false }

// Los motivos son los mismos tipos de apoyo del home
const opcionesMotivo = tiposApoyo.map((tipo) => ({
  valor: tipo.id,
  titulo: tipo.titulo,
  texto: tipo.pie,
  imagen: tipo.imagen,
}))

function SolicitudEstudiante({ sesion }) {
  const navegar = useNavigate()
  const [parametros] = useSearchParams()

  // Arranca desde el borrador guardado; si viene ?motivo= en la URL, lo marca.
  const [datos, setDatos] = useState(() => {
    const borrador = leer('borradorSolicitud', vacio)
    const motivoUrl = parametros.get('motivo')
    return motivoUrl ? { ...borrador, motivo: motivoUrl } : borrador
  })
  const [errores, setErrores] = useState({})
  const [aviso, setAviso] = useState('')

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value })
    setAviso('')
  }

  const guardarBorrador = () => {
    guardar('borradorSolicitud', datos)
    setAviso('Borrador guardado en este navegador. Puedes volver después y seguir.')
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    const nuevosErrores = {
      motivo: datos.motivo === '' ? 'Elige el motivo que más se acerque.' : '',
      descripcion: datos.descripcion.trim().length < 10 ? 'Cuéntanos un poco más (al menos 10 caracteres).' : '',
      urgencia: datos.urgencia === '' ? 'Elige qué tan urgente lo sientes.' : '',
      modalidad: datos.modalidad === '' ? 'Elige cómo prefieres que te atiendan.' : '',
      telefono: !telefonoValido(datos.telefono) ? 'Escribe un teléfono válido, por ejemplo +56 9 1234 5678.' : '',
      consentimiento: !datos.consentimiento ? 'Necesitamos tu consentimiento para registrar la solicitud.' : '',
    }
    setErrores(nuevosErrores)

    if (!sinErrores(nuevosErrores)) {
      setAviso('Hay campos por revisar. Están marcados en rojo.')
      return
    }

    agregarSolicitud({
      folio: crearFolio('SM'),
      fecha: new Date().toLocaleDateString('es-CL'),
      tipo: 'Solicitud de estudiante',
      motivo: datos.motivo,
      estudiante: sesion ? sesion.nombre : 'Estudiante (sin sesión)',
      prioridad: datos.urgencia,
      estado: 'En revisión',
    })
    borrar('borradorSolicitud')
    navegar('/confirmacion')
  }

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.solicitud}
        etiqueta="100% confidencial · RF2"
        titulo="Solicitud de apoyo estudiantil"
        bajada="Cuéntanos brevemente cómo podemos acompañarte. Lo que escribas lo lee solo el equipo de psicología y consejería asignado."
      />

      <div className="contenedor grid gap-8 py-10 lg:grid-cols-[1fr_18rem]">
        <form onSubmit={manejarEnvio} noValidate className="border border-borde bg-fondo px-5 md:px-8">
          <PasoFormulario numero="1" titulo="Motivo de consulta" ayuda="Elige el área que mejor se ajusta a lo que te pasa." requerido>
            <GrupoOpciones
              nombre="motivo"
              opciones={opcionesMotivo}
              valor={datos.motivo}
              alCambiar={manejarCambio}
              error={errores.motivo}
            />
          </PasoFormulario>

          <PasoFormulario numero="2" titulo="Descripción breve" ayuda="Explica con tus palabras qué está pasando o en qué te gustaría apoyo." requerido>
            <textarea
              id="descripcion"
              name="descripcion"
              aria-label="Descripción breve"
              rows="5"
              maxLength={MAX_DESCRIPCION}
              placeholder="Ejemplo: me cuesta concentrarme, duermo mal y me pongo muy ansioso antes de las pruebas."
              value={datos.descripcion}
              onChange={manejarCambio}
              className="entrada"
            />
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-rojo">{errores.descripcion}</span>
              <span className="text-texto-suave">{datos.descripcion.length} / {MAX_DESCRIPCION}</span>
            </div>
          </PasoFormulario>

          <PasoFormulario numero="3" titulo="Urgencia percibida" ayuda="Nos ayuda a coordinar la cita con la prioridad adecuada." requerido>
            <GrupoOpciones
              nombre="urgencia"
              opciones={urgenciasEstudiante}
              valor={datos.urgencia}
              alCambiar={manejarCambio}
              error={errores.urgencia}
              columnas="md:grid-cols-3"
            />
          </PasoFormulario>

          <PasoFormulario numero="4" titulo="Modalidad y contacto" requerido>
            <GrupoOpciones
              nombre="modalidad"
              opciones={modalidades}
              valor={datos.modalidad}
              alCambiar={manejarCambio}
              error={errores.modalidad}
            />
            <div className="mt-4">
              <Campo id="telefono" etiqueta="Teléfono de contacto" error={errores.telefono}>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={datos.telefono}
                  onChange={manejarCambio}
                  className="entrada"
                />
              </Campo>
            </div>
          </PasoFormulario>

          <div className="py-6">
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="consentimiento"
                checked={datos.consentimiento}
                onChange={manejarCambio}
                className="mt-1 accent-verde"
              />
              Acepto el consentimiento informado y el tratamiento confidencial de mis datos de bienestar estudiantil.
            </label>
            {errores.consentimiento && <p className="mt-1 text-sm text-rojo">{errores.consentimiento}</p>}

            {aviso && <p className="mt-4 border border-borde bg-fondo-gris px-3 py-2 text-sm" aria-live="polite">{aviso}</p>}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={guardarBorrador} className="boton-claro">
                Guardar borrador
              </button>
              <button type="submit" className="boton">Enviar solicitud</button>
            </div>
          </div>
        </form>

        <aside className="space-y-5 text-sm">
          <div className="border border-borde bg-fondo-gris p-5">
            <h2 className="text-xl">Qué pasa después</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-texto-suave">
              <li>Recibes un folio para seguir tu solicitud.</li>
              <li>Un orientador la revisa y la asigna.</li>
              <li>Te contactan para agendar la primera cita.</li>
            </ol>
          </div>
          <div className="border border-rojo bg-rojo-fondo p-5">
            <h2 className="text-xl text-rojo">¿Es ahora?</h2>
            <p className="mt-2">
              Si sientes que no puedes esperar, no uses este formulario: llama a Salud Responde{' '}
              <strong>600 360 7777</strong> o a Emergencias <strong>131</strong>.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

export default SolicitudEstudiante
