import { fechaHora } from '../../data/tonos'

// Tabla con las citas del caso: son los seguimientos de tipo "cita".
function TablaCitas({ citas }) {
  if (citas.length === 0) {
    return <p className="border border-dashed border-borde p-6 text-sm text-texto-suave">Todavía no hay citas agendadas.</p>
  }

  return (
    <div className="overflow-x-auto border border-borde bg-fondo">
      <table className="w-full text-left text-sm">
        <thead className="bg-fondo-gris text-texto-suave">
          <tr>
            <th className="p-3 font-semibold">Registrada el</th>
            <th className="p-3 font-semibold">Detalle</th>
            <th className="p-3 font-semibold">Por</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-borde">
          {citas.map((cita) => (
            <tr key={cita._id}>
              <td className="whitespace-nowrap p-3">{fechaHora(cita.fecha)}</td>
              <td className="p-3">{cita.detalle}</td>
              <td className="p-3">{cita.autor ? cita.autor.nombre : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaCitas
