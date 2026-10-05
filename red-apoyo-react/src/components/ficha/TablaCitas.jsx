import Insignia from '../Insignia'
import { tonoEstado } from '../../data/tonos'

// Tabla con las citas del caso. Recibe el arreglo por props.
function TablaCitas({ citas }) {
  return (
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
  )
}

export default TablaCitas
