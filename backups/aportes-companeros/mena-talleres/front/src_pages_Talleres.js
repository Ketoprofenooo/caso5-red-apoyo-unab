import { useState, useEffect } from "react"
import Pestanas from "../components/Pestanas"
import TallerTarjeta from "./talleres/TallerTarjeta"
import PanelReportes from "./talleres/PanelReportes"
import PanelMantenedores from "./talleres/PanelMantenedores"
import TablaBitacora from "./talleres/TablaBitacora"
import {
  getTalleresRequest,
  inscribirTallerRequest,
  cancelarInscripcionRequest,
  crearTallerRequest,
  eliminarTallerRequest
} from "../api/talleres"

function Talleres({ sesion }) {
  const [activa, setActiva] = useState("talleres")
  const [talleres, setTalleres] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nuevoTaller, setNuevoTaller] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    modalidad: "presencial",
    cupos: 15
  })

  const perfil = sesion?.usuario?.perfil || sesion?.perfil || null
  const usuarioId = sesion?.usuario?._id || sesion?.usuario?.id || sesion?._id || null
  const esAdmin = perfil === "admin"
  const puedeVerReportes = perfil === "admin" || perfil === "orientador"

  // Pestañas dinámicas según el perfil conectado
  const opcionesPestanas = [
    { valor: "talleres", texto: "Talleres" },
    ...(puedeVerReportes ? [{ valor: "reportes", texto: "Reportes" }] : []),
    ...(esAdmin ? [{ valor: "mantenedores", texto: "Mantenedores" }] : []),
    ...(esAdmin ? [{ valor: "bitacora", texto: "Bitácora" }] : [])
  ]

  const cargarTalleres = async () => {
    try {
      setCargando(true)
      const res = await getTalleresRequest()
      setTalleres(res.data)
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudieron cargar los talleres")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarTalleres()
  }, [])

  const manejarInscripcion = async (tallerId, yaInscrito) => {
    setMensaje("")
    setError("")
    if (!sesion) {
      setError("Debes iniciar sesión para inscribirte en un taller.")
      return
    }
    try {
      if (yaInscrito) {
        await cancelarInscripcionRequest(tallerId)
        setMensaje("Inscripción anulada correctamente.")
      } else {
        await inscribirTallerRequest(tallerId)
        setMensaje("Te has inscrito en el taller correctamente.")
      }
      await cargarTalleres()
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al procesar la inscripción")
    }
  }

  const manejarCrearTaller = async (e) => {
    e.preventDefault()
    setMensaje("")
    setError("")
    try {
      await crearTallerRequest(nuevoTaller)
      setNuevoTaller({
        titulo: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        modalidad: "presencial",
        cupos: 15
      })
      setMostrarForm(false)
      setMensaje("Taller creado exitosamente.")
      await cargarTalleres()
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo crear el taller")
    }
  }

  const manejarEliminarTaller = async (id) => {
    try {
      await eliminarTallerRequest(id)
      setMensaje("Taller dado de baja.")
      await cargarTalleres()
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al dar de baja el taller")
    }
  }

  return (
    <div>
      {/* Encabezado común del módulo */}
      <section className="bg-verde text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block border border-white/40 px-3 py-1 text-xs uppercase tracking-wider mb-3">
            PREVENCIÓN Y ADMINISTRACIÓN · RF8 A RF12
          </span>
          <h1 className="text-3xl md:text-4xl font-serif mb-2">
            Talleres, mantenedores y reportes
          </h1>
          <p className="text-white/85 max-w-2xl">
            Actividades preventivas abiertas a toda la comunidad y la gestión del sistema
            para el equipo de bienestar.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <Pestanas opciones={opcionesPestanas} activa={activa} alCambiar={setActiva} />

        {mensaje && (
          <div className="border-l-4 border-verde bg-verde/10 p-4 text-sm text-verde">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="border-l-4 border-red-600 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* PESTAÑA 1: TALLERES (RF8) */}
        {activa === "talleres" && (
          <div className="space-y-6">
            {esAdmin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMostrarForm(!mostrarForm)}
                  className="bg-verde text-white px-4 py-2 text-sm hover:opacity-90"
                >
                  {mostrarForm ? "Cancelar" : "+ Nuevo taller"}
                </button>
              </div>
            )}

            {mostrarForm && esAdmin && (
              <form
                onSubmit={manejarCrearTaller}
                className="border border-borde bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <h3 className="md:col-span-2 font-serif text-lg">Crear taller preventivo</h3>
                <input
                  type="text"
                  placeholder="Título del taller"
                  value={nuevoTaller.titulo}
                  onChange={(e) => setNuevoTaller({ ...nuevoTaller, titulo: e.target.value })}
                  className="border border-borde px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Fecha y hora (ej: Martes 17:00)"
                  value={nuevoTaller.fecha}
                  onChange={(e) => setNuevoTaller({ ...nuevoTaller, fecha: e.target.value })}
                  className="border border-borde px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Lugar o enlace (ej: Sala 204 Casa Central)"
                  value={nuevoTaller.lugar}
                  onChange={(e) => setNuevoTaller({ ...nuevoTaller, lugar: e.target.value })}
                  className="border border-borde px-3 py-2 text-sm"
                  required
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Cupos totales"
                  value={nuevoTaller.cupos}
                  onChange={(e) => setNuevoTaller({ ...nuevoTaller, cupos: e.target.value })}
                  className="border border-borde px-3 py-2 text-sm"
                  required
                />
                <textarea
                  placeholder="Descripción del taller (mínimo 10 caracteres)"
                  value={nuevoTaller.descripcion}
                  onChange={(e) =>
                    setNuevoTaller({ ...nuevoTaller, descripcion: e.target.value })
                  }
                  className="md:col-span-2 border border-borde p-3 text-sm"
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  className="md:col-span-2 bg-verde text-white py-2.5 text-sm font-medium"
                >
                  Guardar taller
                </button>
              </form>
            )}

            {cargando ? (
              <p className="text-sm text-texto-suave">Cargando talleres...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {talleres.map((taller) => {
                  const yaInscrito =
                    usuarioId &&
                    Array.isArray(taller.inscritos) &&
                    taller.inscritos.some((id) => String(id) === String(usuarioId))

                  return (
                    <TallerTarjeta
                      key={taller._id}
                      taller={taller}
                      yaInscrito={yaInscrito}
                      esAdmin={esAdmin}
                      alAlternarInscripcion={() =>
                        manejarInscripcion(taller._id, yaInscrito)
                      }
                      alEliminar={() => manejarEliminarTaller(taller._id)}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 2: REPORTES AGREGADOS (RF10 / RNF6) */}
        {activa === "reportes" && puedeVerReportes && <PanelReportes />}

        {/* PESTAÑA 3: MANTENEDORES (RF9) */}
        {activa === "mantenedores" && esAdmin && <PanelMantenedores />}

        {/* PESTAÑA 4: BITÁCORA DE ACCESOS (RF12) */}
        {activa === "bitacora" && esAdmin && <TablaBitacora />}
      </div>
    </div>
  )
}

export default Talleres