// ============================================================
// Ficha de caso: seguimiento, citas y cierre (RF6, RF7, RF11)
// Méndez Muñoz
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Seccion from '../components/Seccion'
import Insignia from '../components/Insignia'
import Campo from '../components/Campo'
import { caso, citas, eventosIniciales, motivosCierre, notificaciones } from '../data/caso'
import { nombreUrgencia } from '../data/solicitudes'
import { tonoEstado, tonoUrgencia } from '../data/tonos'
import { imagenes } from '../data/imagenes'

const hoy = () => new Date().toLocaleDateString('es-CL')

function FichaCaso() {
  const [estado, setEstado] = useState(caso.estado)
  const [eventos, setEventos] = useState(eventosIniciales)
  const [nuevoEvento, setNuevoEvento] = useState('')
  const [perfil, setPerfil] = useState('profesional')
  const [cierre, setCierre] = useState({ motivo: '', derivacion: '' })
  const [errorCierre, setErrorCierre] = useState('')

  const cerrado = estado === 'Cerrado'

  // ---------- Línea de tiempo: agregar una acción ----------
  const agregarEvento = (e) => {
    e.preventDefault()
    if (nuevoEvento.trim() === '') return

    const evento = { id: Date.now(), fecha: hoy(), titulo: nuevoEvento.trim(), detalle: 'Registrado por el profesional de apoyo.' }
    setEventos([...eventos, evento])
    setNuevoEvento('')
  }

  // ---------- Cierre del caso ----------
  const registrarCierre = (e) => {
    e.preventDefault()
    if (cierre.motivo === '' || cierre.derivacion === '') {
      setErrorCierre('Completa los dos campos para cerrar el caso.')
      return
    }
    setErrorCierre('')
    setEstado('Cerrado')
    setEventos([
      ...eventos,
      { id: Date.now(), fecha: hoy(), titulo: 'Caso cerrado', detalle: `${cierre.motivo}. Derivación: ${cierre.derivacion}.` },
    ])
  }

  const datosCaso = [
    { etiqueta: 'Estudiante', valor: caso.estudiante },
    { etiqueta: 'Tipo de solicitud', valor: caso.tipo },
    { etiqueta: 'Profesional', valor: caso.profesional },
  ]

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.ficha}
        etiqueta={`Profesional de apoyo · Caso ${caso.folio}`}
        titulo="Ficha de seguimiento del caso"
        bajada="Citas, cambios de estado, avisos al estudiante y cierre, todo en un mismo lugar."
      />

      {/* ---------- 01 Información ---------- */}
      <Seccion numero="01" titulo="Información del caso">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {datosCaso.map((dato) => (
            <div key={dato.etiqueta} className="border border-borde p-4">
              <p className="text-xs text-texto-suave">{dato.etiqueta}</p>
              <p className="mt-1 font-semibold">{dato.valor}</p>
            </div>
          ))}
          <div className="border border-borde p-4">
            <p className="text-xs text-texto-suave">Urgencia</p>
            <p className="mt-1"><Insignia texto={nombreUrgencia[caso.urgencia]} tono={tonoUrgencia[caso.urgencia]} /></p>
          </div>
          <div className={`border p-4 ${cerrado ? 'border-borde bg-fondo-gris' : 'border-verde bg-menta'}`}>
            <p className="text-xs text-texto-suave">Estado actual</p>
            <p className="mt-1 font-semibold text-verde">{estado}</p>
          </div>
        </div>
      </Seccion>

      {/* ---------- 02 Línea de tiempo ---------- */}
      <Seccion id="seguimiento" numero="02" gris titulo="Línea de tiempo" bajada="Las acciones que se han hecho en el caso, en orden.">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ol className="relative border-l-2 border-verde-claro pl-6">
            {eventos.map((evento) => (
              <li key={evento.id} className="relative mb-6 last:mb-0">
                <span className="absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-fondo bg-verde" />
                <p className="text-xs text-texto-suave">{evento.fecha}</p>
                <p className="font-semibold">{evento.titulo}</p>
                <p className="text-sm text-texto-suave">{evento.detalle}</p>
              </li>
            ))}
          </ol>

          <form onSubmit={agregarEvento} className="h-fit border border-borde bg-fondo p-5">
            <Campo id="nuevoEvento" etiqueta="Registrar una acción">
              <input
                id="nuevoEvento"
                value={nuevoEvento}
                onChange={(e) => setNuevoEvento(e.target.value)}
                placeholder="Ej: Llamado de seguimiento"
                disabled={cerrado}
                className="entrada"
              />
            </Campo>
            <button type="submit" disabled={cerrado || nuevoEvento.trim() === ''} className="boton w-full">
              Agregar a la línea de tiempo
            </button>
          </form>
        </div>
      </Seccion>

      {/* ---------- 03 Observaciones ---------- */}
      <Seccion numero="03" titulo="Observaciones de seguimiento" bajada="Solo las ve el perfil autorizado. Cambia el perfil para probarlo.">
        <div className="max-w-xs">
          <Campo id="perfil" etiqueta="Ver como">
            <select id="perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)} className="entrada">
              <option value="profesional">Profesional de apoyo</option>
              <option value="estudiante">Estudiante</option>
            </select>
          </Campo>
        </div>

        {perfil === 'profesional' ? (
          <div className="border-l-4 border-verde bg-menta p-5">
            <h3 className="text-lg">Observaciones internas</h3>
            <p className="mt-2 text-sm">
              Se revisó la situación académica y se acordó volver a ver el caso en la próxima cita.
            </p>
          </div>
        ) : (
          <p className="border-l-4 border-rojo bg-rojo-fondo p-5 text-sm text-rojo">
            Las observaciones de seguimiento están restringidas para este perfil.
          </p>
        )}
      </Seccion>

      {/* ---------- 04 Citas y 05 Notificaciones ---------- */}
      <Seccion id="citas" numero="04" gris titulo="Citas y avisos" bajada="Las atenciones del caso y lo que se le ha avisado al estudiante.">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-x-auto border border-borde bg-fondo">
            <table className="w-full text-left text-sm">
              <thead className="bg-fondo-gris text-texto-suave">
                <tr>
                  <th className="p-3 font-semibold">Fecha</th>
                  <th className="p-3 font-semibold">Tipo</th>
                  <th className="p-3 font-semibold">Profesional</th>
                  <th className="p-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borde">
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td className="p-3">{cita.fecha}</td>
                    <td className="p-3">{cita.tipo}</td>
                    <td className="p-3">{cita.profesional}</td>
                    <td className="p-3"><Insignia texto={cita.estado} tono={tonoEstado[cita.estado]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3">
            {notificaciones.map((n) => (
              <li key={n.id} className="flex gap-3 border border-borde bg-fondo p-4">
                <span className={`grid h-8 w-8 shrink-0 place-items-center text-sm font-bold ${n.lista ? 'bg-verde text-white' : 'bg-ambar-fondo text-ambar'}`}>
                  {n.lista ? '✓' : '!'}
                </span>
                <div>
                  <p className="font-semibold">{n.titulo}</p>
                  <p className="text-sm text-texto-suave">{n.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Seccion>

      {/* ---------- 05 Cierre ---------- */}
      <Seccion id="cierre" numero="05" titulo="Cierre del caso" bajada="Registra el motivo de cierre y si hubo una derivación.">
        {cerrado ? (
          <div className="max-w-xl border border-verde bg-menta p-5">
            <h3 className="text-lg">Caso cerrado</h3>
            <p className="mt-2 text-sm">Motivo: {cierre.motivo}</p>
            <p className="text-sm">Derivación realizada: {cierre.derivacion}</p>
          </div>
        ) : (
          <form onSubmit={registrarCierre} className="grid max-w-xl gap-x-4 md:grid-cols-2">
            <Campo id="motivoCierre" etiqueta="Motivo de cierre">
              <select
                id="motivoCierre"
                value={cierre.motivo}
                onChange={(e) => setCierre({ ...cierre, motivo: e.target.value })}
                className="entrada"
              >
                <option value="">Elige un motivo</option>
                {motivosCierre.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Campo>
            <Campo id="derivacion" etiqueta="¿Hubo derivación?">
              <select
                id="derivacion"
                value={cierre.derivacion}
                onChange={(e) => setCierre({ ...cierre, derivacion: e.target.value })}
                className="entrada"
              >
                <option value="">Elige una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </Campo>
            {errorCierre && <p className="text-sm text-rojo md:col-span-2">{errorCierre}</p>}
            <div className="md:col-span-2">
              <button type="submit" className="boton mt-2">Registrar cierre</button>
            </div>
          </form>
        )}
      </Seccion>
    </>
  )
}

export default FichaCaso
