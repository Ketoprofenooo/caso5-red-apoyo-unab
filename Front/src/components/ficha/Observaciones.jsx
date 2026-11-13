import { fechaHora } from '../../data/tonos'

// Observaciones internas del equipo (RNF1).
// El backend ya no se las manda al estudiante; aca ademas se le explica.
function Observaciones({ observaciones, esEstudiante }) {
  if (esEstudiante) {
    return (
      <p className="border-l-4 border-rojo bg-rojo-fondo p-5 text-sm text-rojo">
        Las observaciones internas son solo para el equipo que te acompaña.
      </p>
    )
  }

  if (observaciones.length === 0) {
    return <p className="text-sm text-texto-suave">Todavía no hay observaciones internas.</p>
  }

  return (
    <ul className="space-y-3">
      {observaciones.map((o) => (
        <li key={o._id} className="border-l-4 border-verde bg-menta p-4">
          <p className="text-xs text-texto-suave">
            {fechaHora(o.fecha)}{o.autor && ` · ${o.autor.nombre}`}
          </p>
          <p className="mt-1 text-sm">{o.detalle}</p>
        </li>
      ))}
    </ul>
  )
}

export default Observaciones
