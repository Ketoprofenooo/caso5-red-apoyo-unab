// ============================================================
// Mis solicitudes: historial de lo enviado (RF2) y avisos (RF7)
// Alfaro Sánchez
// ============================================================
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seccion from '../components/Seccion'
import Insignia from '../components/Insignia'
import RequiereSesion from '../components/RequiereSesion'
import { getNotificacionesRequest, getSolicitudesRequest } from '../api/solicitudes'
import { mensajeDeError } from '../api/axios'
import { nombreUrgencia } from '../data/solicitudes'
import { fechaCorta, fechaHora, nombreEstado, tonoEstado, tonoUrgencia } from '../data/tonos'

function MisSolicitudes({ sesion }) {
  const [solicitudes, setSolicitudes] = useState([])
  const [avisos, setAvisos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const esEstudiante = sesion && sesion.perfil === 'estudiante'

  // Como cargarClientes() de la clase: pide los datos y los guarda en el estado.
  // Corre al abrir la pagina y otra vez solo si cambia la sesion.
  useEffect(() => {
    if (!sesion) return

    // El backend devuelve solo las del estudiante (o las derivadas por el docente)
    getSolicitudesRequest()
      .then((respuesta) => setSolicitudes(respuesta.data))
      .catch((err) => setError(mensajeDeError(err)))
      .finally(() => setCargando(false))

    // RF7: los avisos son solo para el estudiante
    if (sesion.perfil === 'estudiante') {
      getNotificacionesRequest()
        .then((respuesta) => setAvisos(respuesta.data))
        .catch((err) => setError(mensajeDeError(err)))
    }
  }, [sesion])

  return (
    <RequiereSesion sesion={sesion} perfiles={['estudiante', 'docente']}>
      <Seccion
        titulo={esEstudiante ? 'Mis solicitudes' : 'Mis derivaciones'}
        bajada="El estado de cada solicitud, tal como está registrado en la plataforma."
      >
        {cargando && <p className="text-texto-suave">Cargando…</p>}
        {error && <p className="border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{error}</p>}

        {!cargando && !error && solicitudes.length === 0 && (
          <div className="border border-dashed border-borde p-10 text-center">
            <p className="text-texto-suave">Todavía no hay solicitudes registradas.</p>
            <Link to={esEstudiante ? '/solicitud' : '/derivacion'} className="boton mt-5">
              {esEstudiante ? 'Pedir apoyo' : 'Derivar a un estudiante'}
            </Link>
          </div>
        )}

        <ul className="grid gap-4 md:grid-cols-2">
          {solicitudes.map((s) => (
            <li key={s._id} className="border border-borde bg-fondo p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-titulo text-lg text-verde">{s.folio}</p>
                <Insignia texto={nombreEstado[s.estado]} tono={tonoEstado[s.estado]} />
              </div>
              <p className="mt-1 text-sm">{s.motivo}</p>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-texto-suave">Origen</dt>
                  <dd>{s.origen === 'derivacion' ? 'Derivación' : 'Directa'}</dd>
                </div>
                <div>
                  <dt className="text-texto-suave">Fecha</dt>
                  <dd>{fechaCorta(s.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-texto-suave">Urgencia</dt>
                  <dd><Insignia texto={nombreUrgencia[s.urgenciaPercibida]} tono={tonoUrgencia[s.urgenciaPercibida]} /></dd>
                </div>
              </dl>
              {esEstudiante && (
                <Link to={`/ficha/${s._id}`} className="mt-4 inline-block text-sm font-medium text-verde underline">
                  Ver el seguimiento
                </Link>
              )}
            </li>
          ))}
        </ul>

        {esEstudiante && avisos.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl">Avisos sobre tus solicitudes</h3>
            <ul className="mt-4 space-y-2">
              {avisos.map((a, i) => (
                <li key={i} className="flex flex-wrap gap-x-3 border-l-4 border-verde-claro bg-fondo-gris px-4 py-2 text-sm">
                  <span className="font-semibold text-verde">{a.folio}</span>
                  <span>{a.mensaje}</span>
                  <span className="text-texto-suave">{fechaHora(a.fecha)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Seccion>
    </RequiereSesion>
  )
}

export default MisSolicitudes
