// Registro de accesos al sistema (quién hizo qué y cuándo).
function TablaBitacora({ filas }) {
  return (
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
          {filas.map((fila) => (
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
  )
}

export default TablaBitacora
