import Kpi from '../Kpi'

// Reporte mensual agregado: totales y un gráfico de barras hecho con CSS.
// No muestra ningún dato que identifique a un estudiante (RNF6).
function PanelReportes({ filas, talleresActivos }) {
  const totalSolicitudes = filas.reduce((suma, fila) => suma + fila.total, 0)
  const maximo = Math.max(...filas.map((fila) => fila.total))
  const promedioHoras = Math.round(filas.reduce((suma, fila) => suma + fila.horas, 0) / filas.length)

  return (
    <div className="space-y-6">
      <p className="border-l-4 border-verde-claro bg-fondo-gris p-4 text-sm">
        Datos agregados del mes. No se muestra ningún nombre ni dato que identifique a un estudiante (RNF6).
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi numero={totalSolicitudes} titulo="Solicitudes del mes" />
        <Kpi numero={`${promedioHoras} h`} titulo="Asignación promedio" tono="ambar" />
        <Kpi numero={talleresActivos} titulo="Talleres activos" />
        <Kpi numero={filas.length} titulo="Motivos registrados" tono="gris" />
      </div>

      <div className="border border-borde p-5">
        <h3 className="text-xl">Solicitudes por motivo</h3>
        <ul className="mt-4 space-y-3">
          {filas.map((fila) => (
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
  )
}

export default PanelReportes
