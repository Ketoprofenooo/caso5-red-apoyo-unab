import { useEffect, useState } from "react"
import Kpi from "../../components/Kpi"
import { getReporteAgregadoRequest } from "../../api/talleres"

function PanelReportes() {
  const [reporte, setReporte] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getReporteAgregadoRequest()
        setReporte(res.data)
      } catch (err) {
        console.error("Error cargando reportes:", err)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  if (cargando) {
    return <p className="text-sm text-texto-suave">Calculando reportes agregados...</p>
  }

  if (!reporte) {
    return <p className="text-sm text-red-600">No se pudo cargar el reporte.</p>
  }

  const { kpis, porTipo = [], porEstado = [], porOrigen = [] } = reporte
  const maxTipo = Math.max(1, ...porTipo.map((x) => x.total))

  // Filas combinadas de estado y origen como muestra la diapositiva 16
  const filasEstadoOrigen = [
    ...porEstado.map((e) => ({
      etiqueta: e.estado === "en_atencion" ? "En atención" : e.estado,
      total: e.total
    })),
    ...porOrigen.map((o) => ({
      etiqueta:
        o.origen === "docente" ? "Derivadas por docentes" : "Pedidas por estudiantes",
      total: o.total
    }))
  ]
  const maxEstadoOrigen = Math.max(1, ...filasEstadoOrigen.map((x) => x.total))

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-verde bg-fondo-gris p-4 text-sm text-gray-800">
        Datos agregados. No se muestra ningún nombre ni dato que identifique a un estudiante (RNF6).
      </div>

      {/* 4 KPIs superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi
          valor={kpis.totalSolicitudes}
          titulo="Solicitudes"
          subtitulo="En total"
        />
        <Kpi
          valor={kpis.enAtencion}
          titulo="En atención"
          subtitulo="Con profesional"
        />
        <Kpi
          valor={`${kpis.tiempoPromedioHoras} h`}
          titulo="Tiempo promedio"
          subtitulo="Desde que se crea"
        />
        <Kpi
          valor={kpis.talleresActivos}
          titulo="Talleres activos"
          subtitulo="Abiertos a inscripción"
        />
      </div>

      {/* Dos bloques de gráficos de barras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-borde bg-white p-6 space-y-4">
          <h3 className="font-serif text-lg">Solicitudes por tipo</h3>
          {porTipo.map((fila) => (
            <div key={fila.tipo} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{fila.tipo}</span>
                <span className="font-semibold">{fila.total}</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200">
                <div
                  className="h-2.5 bg-verde"
                  style={{ width: `${(fila.total / maxTipo) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border border-borde bg-white p-6 space-y-4">
          <h3 className="font-serif text-lg">Por estado y por origen</h3>
          {filasEstadoOrigen.map((fila, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{fila.etiqueta}</span>
                <span className="font-semibold">{fila.total}</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200">
                <div
                  className="h-2.5 bg-verde"
                  style={{ width: `${(fila.total / maxEstadoOrigen) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PanelReportes