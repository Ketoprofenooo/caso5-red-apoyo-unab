import Insignia from '../Insignia'
import { nombreTipo } from '../../data/bandeja'
import { nombreUrgencia } from '../../data/solicitudes'
import { tonoEstado, tonoUrgencia } from '../../data/tonos'

// Muestra las solicitudes de la página actual: tabla en computador y
// tarjetas en celular. alAsignar avisa a la página qué fila se eligió.
function TablaSolicitudes({ solicitudes, alAsignar }) {
  if (solicitudes.length === 0) {
    return (
      <p className="border border-dashed border-borde p-8 text-center text-texto-suave">
        No hay solicitudes con esos filtros.
      </p>
    )
  }

  const textoBoton = (s) => (s.profesional ? 'Reasignar' : 'Asignar')

  return (
    <>
      {/* ---------- Tabla (computador y tablet) ---------- */}
      <div className="hidden overflow-x-auto border border-borde md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-fondo-gris text-texto-suave">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Estudiante</th>
              <th className="p-3 font-semibold">Tipo</th>
              <th className="p-3 font-semibold">Estado</th>
              <th className="p-3 font-semibold">Urgencia</th>
              <th className="p-3 font-semibold">Profesional</th>
              <th className="p-3 font-semibold"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {solicitudes.map((s) => (
              <tr key={s.id} className="hover:bg-fondo-gris/60">
                <td className="p-3 font-mono text-xs">{s.id}</td>
                <td className="p-3">
                  {s.estudiante} {s.nueva && <Insignia texto="nueva" tono="verde" />}
                </td>
                <td className="p-3">{nombreTipo(s.tipo)}</td>
                <td className="p-3"><Insignia texto={s.estado} tono={tonoEstado[s.estado]} /></td>
                <td className="p-3"><Insignia texto={nombreUrgencia[s.urgencia]} tono={tonoUrgencia[s.urgencia]} /></td>
                <td className="p-3 text-texto-suave">{s.profesional || '—'}</td>
                <td className="p-3 text-right">
                  <button type="button" onClick={() => alAsignar(s)} className="boton px-3 py-1.5 text-sm">
                    {textoBoton(s)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Tarjetas (celular) ---------- */}
      <ul className="space-y-3 md:hidden">
        {solicitudes.map((s) => (
          <li key={s.id} className="border border-borde p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{s.estudiante}</p>
              <Insignia texto={nombreUrgencia[s.urgencia]} tono={tonoUrgencia[s.urgencia]} />
            </div>
            <p className="mt-1 text-sm text-texto-suave">{s.id} · {nombreTipo(s.tipo)}</p>
            <div className="mt-3 flex items-center justify-between">
              <Insignia texto={s.estado} tono={tonoEstado[s.estado]} />
              <button type="button" onClick={() => alAsignar(s)} className="boton px-3 py-1.5 text-sm">
                {textoBoton(s)}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TablaSolicitudes
