// ============================================================
// Bandeja del orientador: clasificar y asignar (RF4, RF5)
// Briones Osorio
// ============================================================
import { useEffect, useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Kpi from '../components/Kpi'
import RequiereSesion from '../components/RequiereSesion'
import FiltrosBandeja from '../components/bandeja/FiltrosBandeja'
import TablaSolicitudes from '../components/bandeja/TablaSolicitudes'
import Paginacion from '../components/bandeja/Paginacion'
import ModalAsignacion from '../components/bandeja/ModalAsignacion'
import {
  asignarRequest,
  clasificarRequest,
  getProfesionalesRequest,
  getSolicitudesRequest,
} from '../api/solicitudes'
import { mensajeDeError } from '../api/axios'
import { aFila, pesoUrgencia } from '../data/bandeja'
import { imagenes } from '../data/imagenes'

const filtrosVacios = { busqueda: '', tipo: '', estado: '', orden: '' }

function Bandeja({ sesion }) {
  // El estado vive en la página; los componentes hijos lo reciben por props.
  const [solicitudes, setSolicitudes] = useState([])
  const [profesionales, setProfesionales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [filtros, setFiltros] = useState(filtrosVacios)
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(5)
  const [seleccionada, setSeleccionada] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [errorModal, setErrorModal] = useState('')
  const [mensaje, setMensaje] = useState('')
  // Cada vez que se suma 1, el useEffect vuelve a pedir la lista
  const [version, setVersion] = useState(0)

  // GET /api/solicitudes: al orientador el backend le devuelve todas.
  // Corre al abrir la pagina y cada vez que cambia `version`.
  useEffect(() => {
    if (!sesion) return
    getSolicitudesRequest()
      .then((respuesta) => setSolicitudes(respuesta.data.map(aFila)))
      .catch((err) => setError(mensajeDeError(err)))
      .finally(() => setCargando(false))
  }, [sesion, version])

  // La lista de profesionales para el selector se pide una sola vez
  useEffect(() => {
    if (!sesion) return
    getProfesionalesRequest()
      .then((respuesta) => setProfesionales(respuesta.data))
      .catch((err) => setError(mensajeDeError(err)))
  }, [sesion])

  // Cada vez que cambia un filtro se vuelve a la página 1
  const manejarFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value })
    setPagina(1)
  }

  const limpiarFiltros = () => {
    setFiltros(filtrosVacios)
    setPagina(1)
  }

  const cambiarPorPagina = (cantidad) => {
    setPorPagina(cantidad)
    setPagina(1)
  }

  // ---------- Filtrar, ordenar y paginar ----------
  // No se guardan en el estado: se calculan de nuevo en cada render.
  const texto = filtros.busqueda.toLowerCase().trim()

  const filtradas = solicitudes.filter(
    (s) =>
      (s.estudiante.toLowerCase().includes(texto) || s.folio.toLowerCase().includes(texto)) &&
      (filtros.tipo === '' || s.tipo === filtros.tipo) &&
      (filtros.estado === '' || s.estado === filtros.estado),
  )

  const ordenadas =
    filtros.orden === ''
      ? filtradas
      : [...filtradas].sort((a, b) =>
          filtros.orden === 'desc'
            ? pesoUrgencia[b.urgencia] - pesoUrgencia[a.urgencia]
            : pesoUrgencia[a.urgencia] - pesoUrgencia[b.urgencia],
        )

  const totalPaginas = Math.max(1, Math.ceil(ordenadas.length / porPagina))
  const inicio = (pagina - 1) * porPagina
  const visibles = ordenadas.slice(inicio, inicio + porPagina)

  // ---------- Clasificar (RF4) y asignar (RF5) ----------
  // El backend exige clasificar antes de asignar, por eso van en ese orden.
  const guardarAsignacion = async ({ tipo, profesionalId }) => {
    setGuardando(true)
    setErrorModal('')
    try {
      if (tipo !== seleccionada.tipo) await clasificarRequest(seleccionada.id, tipo)
      await asignarRequest(seleccionada.id, profesionalId)
      setMensaje(`${seleccionada.folio} quedó clasificada y asignada.`)
      setSeleccionada(null)
      setVersion(version + 1) // vuelve a pedir la lista para ver el cambio
    } catch (err) {
      setErrorModal(mensajeDeError(err))
    }
    setGuardando(false)
  }

  const kpis = [
    { titulo: 'Solicitudes', numero: solicitudes.length, detalle: 'En la bandeja', tono: 'verde' },
    { titulo: 'Urgentes', numero: solicitudes.filter((s) => s.urgencia === 'alta').length, detalle: 'Urgencia alta', tono: 'rojo' },
    { titulo: 'Por asignar', numero: solicitudes.filter((s) => ['recibida', 'clasificada'].includes(s.estado)).length, detalle: 'Sin profesional', tono: 'ambar' },
    { titulo: 'En atención', numero: solicitudes.filter((s) => ['asignada', 'en_atencion'].includes(s.estado)).length, detalle: 'Con profesional', tono: 'verde' },
  ]

  return (
    <RequiereSesion sesion={sesion} perfiles={['orientador', 'admin']}>
      <EncabezadoPagina
        imagen={imagenes.bandeja}
        etiqueta="Consejero / Orientador · RF4, RF5"
        titulo="Bandeja de orientación"
        bajada="Clasifica lo que va llegando y asígnalo al profesional que corresponde. Lo urgente arriba."
      />

      <div className="contenedor space-y-6 py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Kpi key={kpi.titulo} {...kpi} />
          ))}
        </div>

        <FiltrosBandeja filtros={filtros} alCambiar={manejarFiltro} alLimpiar={limpiarFiltros} />

        {mensaje && (
          <p className="border border-verde bg-menta px-4 py-2 text-sm text-verde" aria-live="polite">{mensaje}</p>
        )}
        {error && <p className="border border-rojo bg-rojo-fondo px-4 py-2 text-sm text-rojo">{error}</p>}

        {cargando ? (
          <p className="text-texto-suave">Cargando solicitudes…</p>
        ) : (
          <TablaSolicitudes solicitudes={visibles} alAsignar={setSeleccionada} />
        )}

        <Paginacion
          pagina={pagina}
          totalPaginas={totalPaginas}
          porPagina={porPagina}
          desde={ordenadas.length === 0 ? 0 : inicio + 1}
          hasta={Math.min(inicio + porPagina, ordenadas.length)}
          total={ordenadas.length}
          alCambiarPagina={setPagina}
          alCambiarPorPagina={cambiarPorPagina}
        />
      </div>

      {/* key hace que el modal parta de cero con cada solicitud */}
      {seleccionada && (
        <ModalAsignacion
          key={seleccionada.id}
          solicitud={seleccionada}
          profesionales={profesionales}
          enviando={guardando}
          error={errorModal}
          alGuardar={guardarAsignacion}
          alCerrar={() => {
            setSeleccionada(null)
            setErrorModal('')
          }}
        />
      )}
    </RequiereSesion>
  )
}

export default Bandeja
