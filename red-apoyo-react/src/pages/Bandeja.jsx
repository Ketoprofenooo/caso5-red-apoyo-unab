// ============================================================
// Bandeja del orientador: clasificar y asignar (RF4, RF5)
// Briones Osorio
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Kpi from '../components/Kpi'
import FiltrosBandeja from '../components/bandeja/FiltrosBandeja'
import TablaSolicitudes from '../components/bandeja/TablaSolicitudes'
import Paginacion from '../components/bandeja/Paginacion'
import ModalAsignacion from '../components/bandeja/ModalAsignacion'
import { pesoUrgencia, solicitudesDemo } from '../data/bandeja'
import { imagenes } from '../data/imagenes'
import { leerSolicitudes } from '../utils/almacenamiento'

const filtrosVacios = { busqueda: '', tipo: '', estado: '', orden: '' }

// Las solicitudes demo + las que se enviaron desde el formulario de Alfaro.
// Así se ve el flujo conectado: lo que pide el estudiante llega a esta bandeja.
function cargarSolicitudes() {
  const enviadas = leerSolicitudes().map((s) => ({
    id: s.folio,
    estudiante: s.estudiante,
    tipo: s.motivo,
    estado: 'pendiente',
    urgencia: s.prioridad,
    profesional: '',
    nueva: true,
  }))
  return [...enviadas, ...solicitudesDemo]
}

function Bandeja() {
  // El estado vive en la página; los componentes hijos lo reciben por props.
  const [solicitudes, setSolicitudes] = useState(cargarSolicitudes)
  const [filtros, setFiltros] = useState(filtrosVacios)
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(5)
  const [seleccionada, setSeleccionada] = useState(null)
  const [mensaje, setMensaje] = useState('')

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
      (s.estudiante.toLowerCase().includes(texto) || s.id.toLowerCase().includes(texto)) &&
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

  // ---------- Asignar profesional ----------
  const asignar = (profesional) => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.id === seleccionada.id ? { ...s, estado: 'asignada', profesional } : s,
      ),
    )
    setMensaje(`${seleccionada.id} quedó asignada a ${profesional}.`)
    setSeleccionada(null)
  }

  const kpis = [
    { titulo: 'Solicitudes', numero: solicitudes.length, detalle: 'En la bandeja', tono: 'verde' },
    { titulo: 'Urgentes', numero: solicitudes.filter((s) => s.urgencia === 'alta').length, detalle: 'Urgencia alta', tono: 'rojo' },
    { titulo: 'Asignadas', numero: solicitudes.filter((s) => s.estado === 'asignada').length, detalle: 'Con profesional', tono: 'verde' },
    { titulo: 'Pendientes', numero: solicitudes.filter((s) => s.estado === 'pendiente').length, detalle: 'Por asignar', tono: 'ambar' },
  ]

  return (
    <>
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

        <TablaSolicitudes solicitudes={visibles} alAsignar={setSeleccionada} />

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
          alGuardar={asignar}
          alCerrar={() => setSeleccionada(null)}
        />
      )}
    </>
  )
}

export default Bandeja
