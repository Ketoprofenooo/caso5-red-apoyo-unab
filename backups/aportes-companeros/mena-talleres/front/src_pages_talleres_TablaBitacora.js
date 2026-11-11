import { useEffect, useState } from "react"
import { getBitacoraRequest } from "../../api/talleres"

function TablaBitacora() {
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getBitacoraRequest()
        setRegistros(res.data)
      } catch (err) {
        console.error("Error al cargar bitácora:", err)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  if (cargando) {
    return <p className="text-sm text-texto-suave">Cargando bitácora de accesos...</p>
  }

  return (
    <div className="border border-borde bg-white p-6 space-y-4">
      <h3 className="font-serif text-xl">Bitácora de accesos y auditoría (RF12)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-borde text-texto-suave">
              <th className="py-2">Fecha y hora</th>
              <th className="py-2">Usuario</th>
              <th className="py-2">Perfil</th>
              <th className="py-2">Recurso</th>
              <th className="py-2">Acción</th>
              <th className="py-2">Solicitud</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {registros.map((reg) => (
              <tr key={reg._id}>
                <td className="py-2.5 text-xs text-texto-suave">
                  {new Date(reg.createdAt).toLocaleString("es-CL")}
                </td>
                <td className="py-2.5">
                  {reg.usuario?.nombre || reg.usuario?.email || "Sistema"}
                </td>
                <td className="py-2.5 capitalize">{reg.perfil}</td>
                <td className="py-2.5 capitalize">{reg.recurso}</td>
                <td className="py-2.5 font-mono text-xs">{reg.accion}</td>
                <td className="py-2.5 text-xs">
                  {reg.solicitud?.folio || reg.solicitud || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaBitacora