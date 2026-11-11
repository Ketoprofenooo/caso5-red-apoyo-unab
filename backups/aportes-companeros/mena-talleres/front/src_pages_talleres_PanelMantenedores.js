import { useEffect, useState } from "react"
import {
  getMaestrosRequest,
  crearMaestroRequest,
  eliminarMaestroRequest,
  getUsuariosRequest,
  actualizarUsuarioRequest
} from "../../api/talleres"

function PanelMantenedores() {
  const [maestros, setMaestros] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [categoria, setCategoria] = useState("tipo_apoyo")
  const [nombre, setNombre] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  const cargarDatos = async () => {
    try {
      const [resMaestros, resUsuarios] = await Promise.all([
        getMaestrosRequest(),
        getUsuariosRequest()
      ])
      setMaestros(resMaestros.data)
      setUsuarios(resUsuarios.data)
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al cargar mantenedores")
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const agregarMaestro = async (e) => {
    e.preventDefault()
    setMensaje("")
    setError("")
    try {
      await crearMaestroRequest({ categoria, nombre })
      setNombre("")
      setMensaje("Elemento agregado al catálogo.")
      await cargarDatos()
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo agregar")
    }
  }

  const desactivarMaestro = async (id) => {
    try {
      await eliminarMaestroRequest(id)
      await cargarDatos()
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo eliminar")
    }
  }

  const alternarUsuarioActivo = async (u) => {
    try {
      await actualizarUsuarioRequest(u._id, { activo: !u.activo })
      setMensaje(`Estado de ${u.nombre} actualizado.`)
      await cargarDatos()
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo actualizar el usuario")
    }
  }

  return (
    <div className="space-y-8">
      {mensaje && (
        <div className="border-l-4 border-verde bg-verde/10 p-3 text-sm text-verde">
          {mensaje}
        </div>
      )}
      {error && (
        <div className="border-l-4 border-red-600 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Catálogos Maestros */}
      <div className="border border-borde bg-white p-6 space-y-4">
        <h3 className="font-serif text-xl">Catálogos del sistema (Tipos, Unidades y Sedes)</h3>
        <form onSubmit={agregarMaestro} className="flex flex-wrap gap-3">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border border-borde px-3 py-2 text-sm bg-white"
          >
            <option value="tipo_apoyo">Tipo de apoyo</option>
            <option value="unidad">Unidad de apoyo</option>
            <option value="sede">Sede</option>
          </select>
          <input
            type="text"
            placeholder="Nombre del nuevo elemento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-borde px-3 py-2 text-sm flex-1 min-w-[200px]"
            required
          />
          <button
            type="submit"
            className="bg-verde text-white px-5 py-2 text-sm font-medium"
          >
            Agregar
          </button>
        </form>

        <div className="divide-y divide-borde text-sm">
          {maestros.map((item) => (
            <div key={item._id} className="py-2.5 flex justify-between items-center">
              <div>
                <span className="font-medium">{item.nombre}</span>{" "}
                <span className="text-xs uppercase px-2 py-0.5 bg-gray-100 text-texto-suave ml-2">
                  {item.categoria}
                </span>
              </div>
              <button
                type="button"
                onClick={() => desactivarMaestro(item._id)}
                className="text-xs text-red-700 hover:underline"
              >
                Dar de baja
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gestión de Usuarios y Activación de Perfiles */}
      <div className="border border-borde bg-white p-6 space-y-4">
        <h3 className="font-serif text-xl">Cuentas de usuario y perfiles</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-borde text-texto-suave">
                <th className="py-2">Nombre</th>
                <th className="py-2">Correo</th>
                <th className="py-2">Perfil</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td className="py-2.5 font-medium">{u.nombre}</td>
                  <td className="py-2.5">{u.email}</td>
                  <td className="py-2.5 capitalize">{u.perfil}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 text-xs ${
                        u.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {u.activo ? "Activo" : "Pendiente / Inactivo"}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <button
                      type="button"
                      onClick={() => alternarUsuarioActivo(u)}
                      className="text-xs underline text-verde"
                    >
                      {u.activo ? "Desactivar" : "Activar cuenta"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PanelMantenedores