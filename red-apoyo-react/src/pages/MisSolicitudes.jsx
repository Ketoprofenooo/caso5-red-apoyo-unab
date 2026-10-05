// ============================================================
// Mis solicitudes: historial de lo enviado (RF2)
// Alfaro Sánchez
// ============================================================
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seccion from '../components/Seccion'
import Insignia from '../components/Insignia'
import { nombreUrgencia } from '../data/solicitudes'
import { tonoEstado, tonoUrgencia } from '../data/tonos'
import { borrar, leerSolicitudes } from '../utils/almacenamiento'

function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState(leerSolicitudes)

  // La más nueva primero. Se copia con [...] para no dar vuelta el estado original.
  const ordenadas = [...solicitudes].reverse()

  const limpiarHistorial = () => {
    borrar('listaSolicitudes')
    borrar('ultimaSolicitud')
    setSolicitudes([])
  }

  return (
    <Seccion titulo="Mis solicitudes" bajada="El estado de las solicitudes y derivaciones que se enviaron desde este navegador.">
      {ordenadas.length === 0 ? (
        <div className="border border-dashed border-borde p-10 text-center">
          <p className="text-texto-suave">Todavía no hay solicitudes registradas.</p>
          <Link to="/solicitud" className="boton mt-5">Pedir apoyo</Link>
        </div>
      ) : (
        <>
          <ul className="grid gap-4 md:grid-cols-2">
            {ordenadas.map((s) => (
              <li key={s.folio} className="border border-borde bg-fondo p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-titulo text-lg text-verde">{s.folio}</p>
                  <Insignia texto={s.estado} tono={tonoEstado[s.estado]} />
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <dt className="text-texto-suave">Tipo</dt>
                    <dd>{s.tipo}</dd>
                  </div>
                  <div>
                    <dt className="text-texto-suave">Fecha</dt>
                    <dd>{s.fecha}</dd>
                  </div>
                  <div>
                    <dt className="text-texto-suave">Prioridad</dt>
                    <dd><Insignia texto={nombreUrgencia[s.prioridad]} tono={tonoUrgencia[s.prioridad]} /></dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <button type="button" onClick={limpiarHistorial} className="boton-claro mt-6">
            Borrar historial de prueba
          </button>
        </>
      )}
    </Seccion>
  )
}

export default MisSolicitudes
