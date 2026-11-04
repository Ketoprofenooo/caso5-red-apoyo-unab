import { fechaHora } from '../../data/tonos'
import { nombrePerfil } from '../../data/usuarios'

// Registro de accesos (RF12): quien hizo que y cuando.
// Viene de GET /api/bitacora, los ultimos 200 registros.
function TablaBitacora({ filas }) {
  return (
    <div className="overflow-x-auto border border-borde">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="bg-fondo-gris text-texto-suave">
          <tr>
            <th className="p-3 font-semibold">Fecha y hora</th>
            <th className="p-3 font-semibold">Usuario</th>
            <th className="p-3 font-semibold">Acción</th>
            <th className="p-3 font-semibold">Módulo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-borde">
          {filas.map((fila) => (
            <tr key={fila._id}>
              <td className="whitespace-nowrap p-3">{fechaHora(fila.fecha)}</td>
              <td className="p-3">
                {fila.usuario ? fila.usuario.nombre : '—'}
                <span className="block text-xs text-texto-suave">{nombrePerfil(fila.perfil)}</span>
              </td>
              <td className="p-3 font-mono text-xs">{fila.accion}</td>
              <td className="p-3">{fila.entidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaBitacora
