// ============================================================
// Ficha de caso: seguimiento, citas y cierre (RF6, RF7, RF11)
// Méndez Muñoz
// ============================================================
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Seccion from '../components/Seccion'
import Insignia from '../components/Insignia'
import RequiereSesion from '../components/RequiereSesion'
import LineaTiempo from '../components/ficha/LineaTiempo'
import Observaciones from '../components/ficha/Observaciones'
import TablaCitas from '../components/ficha/TablaCitas'
import Aviso from '../components/ficha/Aviso'
import FormCierre from '../components/ficha/FormCierre'
import {
  cerrarRequest,
  getSolicitudRequest,
  getSolicitudesRequest,
  seguimientoRequest,
} from '../api/solicitudes'
import { mensajeDeError } from '../api/axios'
import { perfilesEquipo } from '../data/caso'
import { nombreTipo } from '../data/bandeja'
import { nombreUrgencia } from '../data/solicitudes'
import { fechaCorta, fechaHora, nombreEstado, tonoEstado, tonoUrgencia } from '../data/tonos'
import { imagenes } from '../data/imagenes'

// ---------- Sin id en la URL: lista de casos para elegir ----------
function ListaCasos({ casos }) {
  if (casos.length === 0) {
    return <p className="border border-dashed border-borde p-8 text-center text-texto-suave">No tienes casos para revisar.</p>
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {casos.map((s) => (
        <li key={s._id} className="border border-borde p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-titulo text-lg text-verde">{s.folio}</p>
            <Insignia texto={nombreEstado[s.estado]} tono={tonoEstado[s.estado]} />
          </div>
          <p className="mt-1 text-sm">{s.estudiante ? s.estudiante.nombre : ''} · {nombreTipo(s.tipo)}</p>
          <p className="text-sm text-texto-suave">Ingresó el {fechaCorta(s.createdAt)}</p>
          <Link to={`/ficha/${s._id}`} className="boton mt-4 px-3 py-1.5 text-sm">Abrir ficha</Link>
        </li>
      ))}
    </ul>
  )
}

function FichaCaso({ sesion }) {
  const { id } = useParams() // /ficha/:id
  const [caso, setCaso] = useState(null)
  const [casos, setCasos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  // Cada vez que se suma 1, el useEffect vuelve a pedir el caso
  const [version, setVersion] = useState(0)

  const puedeEscribir = sesion && perfilesEquipo.includes(sesion.perfil)
  const esEstudiante = sesion && sesion.perfil === 'estudiante'

  // Con id: GET /solicitudes/:id. Sin id: GET /solicitudes (la lista de casos).
  // Corre al abrir la pagina, si cambia el id de la URL o si cambia `version`.
  useEffect(() => {
    if (!sesion) return
    const pedido = id
      ? getSolicitudRequest(id).then((respuesta) => setCaso(respuesta.data))
      : getSolicitudesRequest().then((respuesta) => setCasos(respuesta.data))
    pedido
      .catch((err) => setError(mensajeDeError(err)))
      .finally(() => setCargando(false))
  }, [sesion, id, version])

  // ---------- RF6: registrar un seguimiento o una cita ----------
  const agregarSeguimiento = async (datos) => {
    setError('')
    try {
      await seguimientoRequest(id, datos)
      setMensaje('Quedó registrado en el historial.')
      setVersion(version + 1)
      return true
    } catch (err) {
      setError(mensajeDeError(err))
      return false
    }
  }

  // ---------- RF11: cerrar el caso ----------
  const cerrarCaso = async (datos) => {
    setError('')
    try {
      await cerrarRequest(id, { motivo: datos.motivo, derivacionRealizada: datos.derivacion })
      setMensaje('El caso quedó cerrado. Se le avisó al estudiante.')
      setVersion(version + 1)
    } catch (err) {
      setError(mensajeDeError(err))
    }
  }

  const encabezado = (
    <EncabezadoPagina
      imagen={imagenes.ficha}
      etiqueta={caso ? `Caso ${caso.folio}` : 'Seguimiento · RF6, RF7, RF11'}
      titulo={caso ? 'Ficha de seguimiento del caso' : 'Casos en seguimiento'}
      bajada="Citas, cambios de estado, avisos al estudiante y cierre, todo en un mismo lugar."
    />
  )

  // Sin id en la URL: se muestra la lista
  if (!id) {
    return (
      <RequiereSesion sesion={sesion}>
        {encabezado}
        <Seccion titulo={esEstudiante ? 'Tus solicitudes' : 'Casos a tu cargo'}>
          {cargando && <p className="text-texto-suave">Cargando…</p>}
          {error && <p className="border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{error}</p>}
          {!cargando && !error && <ListaCasos casos={casos} />}
        </Seccion>
      </RequiereSesion>
    )
  }

  const cerrado = caso && caso.estado === 'cerrada'
  const seguimientos = caso ? caso.seguimientos : []

  const datosCaso = caso
    ? [
        { etiqueta: 'Estudiante', valor: caso.estudiante ? caso.estudiante.nombre : '—' },
        { etiqueta: 'Tipo de apoyo', valor: nombreTipo(caso.tipo) },
        { etiqueta: 'Profesional', valor: caso.profesionalAsignado ? caso.profesionalAsignado.nombre : 'Sin asignar' },
      ]
    : []

  return (
    <RequiereSesion sesion={sesion}>
      {encabezado}

      {cargando && <p className="contenedor py-10 text-texto-suave">Cargando el caso…</p>}
      {error && (
        <p className="contenedor mt-6 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{error}</p>
      )}
      {mensaje && (
        <p className="contenedor mt-6 border border-verde bg-menta px-3 py-2 text-sm text-verde" aria-live="polite">{mensaje}</p>
      )}

      {caso && (
        <>
          {/* ---------- 01 Información ---------- */}
          <Seccion numero="01" titulo="Información del caso" bajada={`Motivo: ${caso.motivo}`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {datosCaso.map((dato) => (
                <div key={dato.etiqueta} className="border border-borde p-4">
                  <p className="text-xs text-texto-suave">{dato.etiqueta}</p>
                  <p className="mt-1 font-semibold">{dato.valor}</p>
                </div>
              ))}
              <div className="border border-borde p-4">
                <p className="text-xs text-texto-suave">Urgencia</p>
                <p className="mt-1">
                  <Insignia texto={nombreUrgencia[caso.urgenciaPercibida]} tono={tonoUrgencia[caso.urgenciaPercibida]} />
                </p>
              </div>
              <div className={`border p-4 ${cerrado ? 'border-borde bg-fondo-gris' : 'border-verde bg-menta'}`}>
                <p className="text-xs text-texto-suave">Estado actual</p>
                <p className="mt-1 font-semibold text-verde">{nombreEstado[caso.estado]}</p>
              </div>
            </div>
          </Seccion>

          {/* ---------- 02 Historial ---------- */}
          <Seccion id="seguimiento" numero="02" gris titulo="Historial del caso" bajada="Todo lo que se ha hecho en el caso, en orden.">
            <LineaTiempo
              eventos={seguimientos}
              alAgregar={agregarSeguimiento}
              puedeEscribir={puedeEscribir}
              bloqueado={cerrado}
            />
          </Seccion>

          {/* ---------- 03 Observaciones ---------- */}
          <Seccion numero="03" titulo="Observaciones internas" bajada="Solo las ve el equipo (RNF1).">
            <Observaciones
              observaciones={seguimientos.filter((s) => s.tipoRegistro === 'observacion')}
              esEstudiante={esEstudiante}
            />
          </Seccion>

          {/* ---------- 04 Citas y avisos ---------- */}
          <Seccion id="citas" numero="04" gris titulo="Citas y avisos" bajada="Las citas agendadas y lo que se le ha avisado al estudiante (RF7).">
            <div className="grid gap-8 lg:grid-cols-2">
              <TablaCitas citas={seguimientos.filter((s) => s.tipoRegistro === 'cita')} />
              <ul className="space-y-3">
                {caso.notificaciones.map((n) => (
                  <Aviso key={n._id} titulo={fechaHora(n.fecha)} texto={n.mensaje} lista />
                ))}
              </ul>
            </div>
          </Seccion>

          {/* ---------- 05 Cierre ---------- */}
          <Seccion id="cierre" numero="05" titulo="Cierre del caso" bajada="Registra el motivo de cierre y si hubo una derivación (RF11).">
            {cerrado ? (
              <div className="max-w-xl border border-verde bg-menta p-5">
                <h3 className="text-lg">Caso cerrado el {fechaCorta(caso.cierre.fecha)}</h3>
                <p className="mt-2 text-sm">Motivo: {caso.cierre.motivo}</p>
                <p className="text-sm">Derivación realizada: {caso.cierre.derivacionRealizada || '—'}</p>
              </div>
            ) : puedeEscribir ? (
              <FormCierre alCerrar={cerrarCaso} />
            ) : (
              <p className="text-sm text-texto-suave">El caso sigue abierto. Lo cierra el profesional que te acompaña.</p>
            )}
          </Seccion>
        </>
      )}
    </RequiereSesion>
  )
}

export default FichaCaso
