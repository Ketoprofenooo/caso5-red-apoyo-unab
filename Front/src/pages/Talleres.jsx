// ============================================================
// Talleres, administración y reportes (RF8, RF9, RF10, RF12)
// Mena Navea
// ============================================================
import { useEffect, useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Pestanas from '../components/Pestanas'
import RequiereSesion from '../components/RequiereSesion'
import TallerTarjeta from '../components/talleres/TallerTarjeta'
import PanelMantenedores from '../components/talleres/PanelMantenedores'
import PanelReportes from '../components/talleres/PanelReportes'
import TablaBitacora from '../components/talleres/TablaBitacora'
import {
  anularInscripcionRequest,
  getBitacoraRequest,
  getMaestrosRequest,
  getReporteRequest,
  getTalleresRequest,
  inscribirseRequest,
} from '../api/talleres'
import { mensajeDeError } from '../api/axios'
import { fotosTalleres, pestanasTalleres } from '../data/talleres'
import { imagenes } from '../data/imagenes'

function Talleres({ sesion }) {
  const [activa, setActiva] = useState('talleres')
  const [talleres, setTalleres] = useState([])
  const [maestros, setMaestros] = useState([])
  const [reporte, setReporte] = useState(null)
  const [bitacora, setBitacora] = useState([])
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  // Cada vez que se suma 1, el useEffect vuelve a pedir los datos
  const [version, setVersion] = useState(0)

  // Solo las pestañas que le tocan al perfil de la sesion (RNF1)
  const pestanas = sesion ? pestanasTalleres.filter((p) => p.perfiles.includes(sesion.perfil)) : []

  const cambiarPestana = (nueva) => {
    setError('')
    setActiva(nueva)
  }

  // Cada vez que cambia la pestaña se piden sus datos al backend
  useEffect(() => {
    if (!sesion) return
    const mostrarError = (err) => setError(mensajeDeError(err))

    // Los talleres se usan en dos pestañas: en Talleres y para contar en Reportes
    if (activa === 'talleres' || activa === 'reportes') {
      getTalleresRequest().then((r) => setTalleres(r.data)).catch(mostrarError)
    }
    if (activa === 'reportes') getReporteRequest().then((r) => setReporte(r.data)).catch(mostrarError)
    if (activa === 'mantenedores') getMaestrosRequest().then((r) => setMaestros(r.data)).catch(mostrarError)
    if (activa === 'bitacora') getBitacoraRequest().then((r) => setBitacora(r.data)).catch(mostrarError)
  }, [sesion, activa, version])

  // RF8: inscribirse o anular. Despues se vuelve a pedir la lista para ver los cupos.
  const alternarInscripcion = async (taller, inscrito) => {
    setError('')
    try {
      const respuesta = inscrito
        ? await anularInscripcionRequest(taller._id)
        : await inscribirseRequest(taller._id)
      setMensaje(`${respuesta.data.mensaje}: ${taller.titulo}`)
      setVersion(version + 1)
    } catch (err) {
      setError(mensajeDeError(err))
    }
  }

  return (
    <RequiereSesion sesion={sesion}>
      <EncabezadoPagina
        imagen={imagenes.talleres}
        etiqueta="Prevención y administración · RF8 a RF12"
        titulo="Talleres, mantenedores y reportes"
        bajada="Actividades preventivas abiertas a toda la comunidad y la gestión del sistema para el equipo de bienestar."
      />

      <div className="contenedor py-10">
        <div className="max-w-2xl">
          <Pestanas opciones={pestanas} activa={activa} alCambiar={cambiarPestana} />
        </div>

        {mensaje && activa === 'talleres' && (
          <p className="mt-6 border border-verde bg-menta px-4 py-2 text-sm text-verde" aria-live="polite">{mensaje}</p>
        )}
        {error && <p className="mt-6 border border-rojo bg-rojo-fondo px-4 py-2 text-sm text-rojo">{error}</p>}

        {/* Solo se dibuja la pestaña activa */}
        <div className="mt-8">
          {activa === 'talleres' && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {talleres.map((taller, i) => {
                // inscritos es una lista de ids de usuarios
                const inscrito = taller.inscritos.includes(sesion.id)
                return (
                  <TallerTarjeta
                    key={taller._id}
                    taller={taller}
                    imagen={fotosTalleres[i % fotosTalleres.length]}
                    inscrito={inscrito}
                    puedeInscribirse={sesion.perfil === 'estudiante'}
                    alAlternar={() => alternarInscripcion(taller, inscrito)}
                  />
                )
              })}
            </div>
          )}

          {activa === 'mantenedores' && <PanelMantenedores maestros={maestros} />}

          {activa === 'reportes' && reporte && <PanelReportes reporte={reporte} talleresActivos={talleres.length} />}

          {activa === 'bitacora' && <TablaBitacora filas={bitacora} />}
        </div>
      </div>
    </RequiereSesion>
  )
}

export default Talleres
