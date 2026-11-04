import Kpi from '../Kpi'
import { nombreTipo } from '../../data/bandeja'
import { nombreEstado } from '../../data/tonos'

// Reporte agregado (RF10) que arma el backend con aggregate().
// Solo trae conteos y promedios: ningun nombre ni correo (RNF6).
function PanelReportes({ reporte, talleresActivos }) {
  const maximo = Math.max(1, ...reporte.porTipo.map((fila) => fila.total))
  const enAtencion = reporte.porEstado
    .filter((f) => ['asignada', 'en_atencion'].includes(f.estado))
    .reduce((suma, f) => suma + f.total, 0)

  return (
    <div className="space-y-6">
      <p className="border-l-4 border-verde-claro bg-fondo-gris p-4 text-sm">
        Datos agregados. No se muestra ningún nombre ni dato que identifique a un estudiante (RNF6).
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi numero={reporte.totalSolicitudes} titulo="Solicitudes" detalle="En total" />
        <Kpi numero={enAtencion} titulo="En atención" detalle="Con profesional" />
        <Kpi numero={`${reporte.tiemposRespuesta.promedioHoras} h`} titulo="Tiempo promedio" detalle="Desde que se crea" tono="ambar" />
        <Kpi numero={talleresActivos} titulo="Talleres activos" tono="gris" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-borde p-5">
          <h3 className="text-xl">Solicitudes por tipo</h3>
          <ul className="mt-4 space-y-3">
            {reporte.porTipo.map((fila) => (
              <li key={fila.tipo}>
                <div className="flex justify-between text-sm">
                  <span>{fila.tipo === 'sin clasificar' ? 'Sin clasificar' : nombreTipo(fila.tipo)}</span>
                  <span className="font-semibold">{fila.total}</span>
                </div>
                {/* El ancho de la barra es el porcentaje respecto al tipo con más solicitudes */}
                <div className="mt-1 h-3 bg-fondo-gris">
                  <div className="h-3 bg-verde-claro" style={{ width: `${(fila.total / maximo) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-borde p-5">
          <h3 className="text-xl">Por estado y por origen</h3>
          <ul className="mt-4 divide-y divide-borde text-sm">
            {reporte.porEstado.map((f) => (
              <li key={f.estado} className="flex justify-between py-2">
                <span>{nombreEstado[f.estado]}</span>
                <span className="font-semibold">{f.total}</span>
              </li>
            ))}
            {reporte.porOrigen.map((f) => (
              <li key={f.origen} className="flex justify-between py-2">
                <span>{f.origen === 'derivacion' ? 'Derivadas por docentes' : 'Pedidas por estudiantes'}</span>
                <span className="font-semibold">{f.total}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PanelReportes
