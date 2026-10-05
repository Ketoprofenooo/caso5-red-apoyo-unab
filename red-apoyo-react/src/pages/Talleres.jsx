// ============================================================
// Talleres, administración y reportes (RF8, RF9, RF10, RF12)
// Mena Navea
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Pestanas from '../components/Pestanas'
import Tarjeta from '../components/Tarjeta'
import Kpi from '../components/Kpi'
import { bitacora, mantenedores, reporteMensual, talleres } from '../data/talleres'
import { imagenes } from '../data/imagenes'

const pestanas = [
  { valor: 'talleres', texto: 'Talleres' },
  { valor: 'mantenedores', texto: 'Mantenedores' },
  { valor: 'reportes', texto: 'Reportes' },
  { valor: 'bitacora', texto: 'Bitácora' },
]

function Talleres() {
  const [activa, setActiva] = useState('talleres')
  const [cupos, setCupos] = useState(talleres.map((t) => t.cupos))
  const [inscritos, setInscritos] = useState([])

  // Inscribirse resta un cupo; anular lo devuelve.
  const alternarInscripcion = (indice, id) => {
    const yaInscrito = inscritos.includes(id)
    setInscritos(yaInscrito ? inscritos.filter((x) => x !== id) : [...inscritos, id])
    setCupos(cupos.map((c, i) => (i === indice ? c + (yaInscrito ? 1 : -1) : c)))
  }

  const totalSolicitudes = reporteMensual.reduce((suma, fila) => suma + fila.total, 0)
  const maximo = Math.max(...reporteMensual.map((fila) => fila.total))
  const promedioHoras = Math.round(reporteMensual.reduce((suma, fila) => suma + fila.horas, 0) / reporteMensual.length)

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.talleres}
        etiqueta="Prevención y administración · RF8 a RF12"
        titulo="Talleres, mantenedores y reportes"
        bajada="Actividades preventivas abiertas a toda la comunidad y la gestión del sistema para el equipo de bienestar."
      />

      <div className="contenedor py-10">
        <div className="max-w-2xl">
          <Pestanas opciones={pestanas} activa={activa} alCambiar={setActiva} />
        </div>

        <div className="mt-8">
          {/* ---------- Talleres ---------- */}
          {activa === 'talleres' && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {talleres.map((taller, i) => {
                const inscrito = inscritos.includes(taller.id)
                const sinCupos = cupos[i] === 0 && !inscrito
                return (
                  <Tarjeta
                    key={taller.id}
                    imagen={taller.imagen}
                    titulo={taller.titulo}
                    texto={taller.texto}
                    pie={`${taller.fecha} · ${taller.lugar}`}
                  >
                    <p className={`mb-3 text-sm font-semibold ${cupos[i] <= 2 ? 'text-ambar' : 'text-verde'}`}>
                      {cupos[i] === 0 ? 'Sin cupos' : `Quedan ${cupos[i]} cupos`}
                    </p>
                    <button
                      type="button"
                      disabled={sinCupos}
                      onClick={() => alternarInscripcion(i, taller.id)}
                      className={`${inscrito ? 'boton-claro' : 'boton'} w-full`}
                    >
                      {inscrito ? 'Anular inscripción' : sinCupos ? 'Sin cupos' : 'Inscribirme'}
                    </button>
                  </Tarjeta>
                )
              })}
            </div>
          )}

          {/* ---------- Mantenedores ---------- */}
          {activa === 'mantenedores' && (
            <div className="grid gap-5 md:grid-cols-3">
              {mantenedores.map((m) => (
                <div key={m.id} className="border border-borde p-5">
                  <h3 className="text-xl">{m.titulo}</h3>
                  <p className="mt-2 text-sm text-texto-suave">{m.texto}</p>
                  <p className="mt-4 font-titulo text-2xl text-verde">{m.total}</p>
                  <button type="button" disabled className="boton-claro mt-4 w-full">
                    Administrar (requiere backend)
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ---------- Reportes agregados ---------- */}
          {activa === 'reportes' && (
            <div className="space-y-6">
              <p className="border-l-4 border-verde-claro bg-fondo-gris p-4 text-sm">
                Datos agregados del mes. No se muestra ningún nombre ni dato que identifique a un estudiante (RNF6).
              </p>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Kpi numero={totalSolicitudes} titulo="Solicitudes del mes" />
                <Kpi numero={`${promedioHoras} h`} titulo="Asignación promedio" tono="ambar" />
                <Kpi numero={talleres.length} titulo="Talleres activos" />
                <Kpi numero={reporteMensual.length} titulo="Motivos registrados" tono="gris" />
              </div>

              <div className="border border-borde p-5">
                <h3 className="text-xl">Solicitudes por motivo</h3>
                <ul className="mt-4 space-y-3">
                  {reporteMensual.map((fila) => (
                    <li key={fila.motivo}>
                      <div className="flex justify-between text-sm">
                        <span>{fila.motivo}</span>
                        <span className="font-semibold">{fila.total} · {fila.horas} h promedio</span>
                      </div>
                      {/* El ancho de la barra es el porcentaje respecto al motivo más alto */}
                      <div className="mt-1 h-3 bg-fondo-gris">
                        <div className="h-3 bg-verde-claro" style={{ width: `${(fila.total / maximo) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ---------- Bitácora ---------- */}
          {activa === 'bitacora' && (
            <div className="overflow-x-auto border border-borde">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-fondo-gris text-texto-suave">
                  <tr>
                    <th className="p-3 font-semibold">Fecha y hora</th>
                    <th className="p-3 font-semibold">Usuario</th>
                    <th className="p-3 font-semibold">Acción</th>
                    <th className="p-3 font-semibold">Módulo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borde">
                  {bitacora.map((fila) => (
                    <tr key={fila.id}>
                      <td className="p-3">{fila.fecha}</td>
                      <td className="p-3 font-mono text-xs">{fila.usuario}</td>
                      <td className="p-3">{fila.accion}</td>
                      <td className="p-3">{fila.modulo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Talleres
