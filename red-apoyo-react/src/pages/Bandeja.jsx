// ============================================================
// Bandeja del orientador: clasificar y asignar (RF4, RF5)
// Briones Osorio
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Kpi from '../components/Kpi'
import Insignia from '../components/Insignia'
import Modal from '../components/Modal'
import { estados, pesoUrgencia, profesionales, solicitudesDemo, tipos } from '../data/bandeja'
import { nombreUrgencia } from '../data/solicitudes'
import { tonoEstado, tonoUrgencia } from '../data/tonos'
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

const nombreTipo = (valor) => {
  const tipo = tipos.find((t) => t.valor === valor)
  return tipo ? tipo.nombre : valor
}

function Bandeja() {
  const [solicitudes, setSolicitudes] = useState(cargarSolicitudes)
  const [filtros, setFiltros] = useState(filtrosVacios)
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(5)
  const [seleccionada, setSeleccionada] = useState(null)
  const [profesional, setProfesional] = useState('')
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
  const numerosPagina = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  // ---------- Asignar profesional ----------
  const abrirModal = (solicitud) => {
    setSeleccionada(solicitud)
    setProfesional(solicitud.profesional)
  }

  const asignar = (e) => {
    e.preventDefault()
    if (profesional === '') return

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

        {/* ---------- Filtros ---------- */}
        <div className="grid gap-3 border border-borde bg-fondo-gris p-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <input
            name="busqueda"
            type="search"
            placeholder="Buscar por nombre o ID"
            aria-label="Buscar por nombre o ID"
            value={filtros.busqueda}
            onChange={manejarFiltro}
            className="entrada"
          />
          <select name="tipo" aria-label="Tipo" value={filtros.tipo} onChange={manejarFiltro} className="entrada">
            <option value="">Todos los tipos</option>
            {tipos.map((t) => <option key={t.valor} value={t.valor}>{t.nombre}</option>)}
          </select>
          <select name="estado" aria-label="Estado" value={filtros.estado} onChange={manejarFiltro} className="entrada">
            <option value="">Todos los estados</option>
            {estados.map((e) => <option key={e.valor} value={e.valor}>{e.nombre}</option>)}
          </select>
          <select name="orden" aria-label="Ordenar por urgencia" value={filtros.orden} onChange={manejarFiltro} className="entrada">
            <option value="">Sin ordenar</option>
            <option value="desc">Urgencia: alta a baja</option>
            <option value="asc">Urgencia: baja a alta</option>
          </select>
          <button type="button" onClick={limpiarFiltros} className="boton-claro">Limpiar</button>
        </div>

        {mensaje && (
          <p className="border border-verde bg-menta px-4 py-2 text-sm text-verde" aria-live="polite">{mensaje}</p>
        )}

        {/* ---------- Tabla (computador y tablet) ---------- */}
        <div className="hidden overflow-x-auto border border-borde md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-fondo-gris text-texto-suave">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Estudiante</th>
                <th className="p-3 font-semibold">Tipo</th>
                <th className="p-3 font-semibold">Estado</th>
                <th className="p-3 font-semibold">Urgencia</th>
                <th className="p-3 font-semibold">Profesional</th>
                <th className="p-3 font-semibold"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {visibles.map((s) => (
                <tr key={s.id} className="hover:bg-fondo-gris/60">
                  <td className="p-3 font-mono text-xs">{s.id}</td>
                  <td className="p-3">
                    {s.estudiante} {s.nueva && <Insignia texto="nueva" tono="verde" />}
                  </td>
                  <td className="p-3">{nombreTipo(s.tipo)}</td>
                  <td className="p-3"><Insignia texto={s.estado} tono={tonoEstado[s.estado]} /></td>
                  <td className="p-3"><Insignia texto={nombreUrgencia[s.urgencia]} tono={tonoUrgencia[s.urgencia]} /></td>
                  <td className="p-3 text-texto-suave">{s.profesional || '—'}</td>
                  <td className="p-3 text-right">
                    <button type="button" onClick={() => abrirModal(s)} className="boton px-3 py-1.5 text-sm">
                      {s.profesional ? 'Reasignar' : 'Asignar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- Tarjetas (celular) ---------- */}
        <ul className="space-y-3 md:hidden">
          {visibles.map((s) => (
            <li key={s.id} className="border border-borde p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{s.estudiante}</p>
                <Insignia texto={nombreUrgencia[s.urgencia]} tono={tonoUrgencia[s.urgencia]} />
              </div>
              <p className="mt-1 text-sm text-texto-suave">{s.id} · {nombreTipo(s.tipo)}</p>
              <div className="mt-3 flex items-center justify-between">
                <Insignia texto={s.estado} tono={tonoEstado[s.estado]} />
                <button type="button" onClick={() => abrirModal(s)} className="boton px-3 py-1.5 text-sm">
                  {s.profesional ? 'Reasignar' : 'Asignar'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {visibles.length === 0 && (
          <p className="border border-dashed border-borde p-8 text-center text-texto-suave">
            No hay solicitudes con esos filtros.
          </p>
        )}

        {/* ---------- Paginación ---------- */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-texto-suave">
            <label htmlFor="porPagina">Mostrar</label>
            <select
              id="porPagina"
              value={porPagina}
              onChange={(e) => {
                setPorPagina(Number(e.target.value))
                setPagina(1)
              }}
              className="entrada w-auto py-1.5"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>
              {ordenadas.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + porPagina, ordenadas.length)} de {ordenadas.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)} className="boton-claro px-3 py-1.5 text-sm disabled:opacity-40">
              Anterior
            </button>
            {numerosPagina.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPagina(n)}
                aria-current={n === pagina ? 'page' : undefined}
                className={`h-9 w-9 text-sm ${n === pagina ? 'bg-verde text-white' : 'border border-borde hover:border-verde'}`}
              >
                {n}
              </button>
            ))}
            <button type="button" disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)} className="boton-claro px-3 py-1.5 text-sm disabled:opacity-40">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Modal de asignación ---------- */}
      <Modal abierto={seleccionada !== null} titulo="Asignar profesional" alCerrar={() => setSeleccionada(null)}>
        {seleccionada && (
          <form onSubmit={asignar}>
            <p className="text-sm text-texto-suave">
              {seleccionada.id} · {seleccionada.estudiante} · {nombreTipo(seleccionada.tipo)}
            </p>
            <label htmlFor="profesional" className="mb-1.5 mt-4 block text-sm font-semibold">Profesional</label>
            <select id="profesional" value={profesional} onChange={(e) => setProfesional(e.target.value)} className="entrada">
              <option value="">Elige un profesional</option>
              {profesionales.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="submit" disabled={profesional === ''} className="boton mt-5 w-full">
              Guardar asignación
            </button>
          </form>
        )}
      </Modal>
    </>
  )
}

export default Bandeja
