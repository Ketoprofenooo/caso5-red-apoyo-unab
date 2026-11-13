import { estados, tipos } from '../../data/bandeja'

// Buscador y filtros de la bandeja. Los valores viven en la página (Bandeja.jsx);
// este componente solo los muestra y avisa cuando cambian.
function FiltrosBandeja({ filtros, alCambiar, alLimpiar }) {
  return (
    <div className="grid gap-3 border border-borde bg-fondo-gris p-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <input
        name="busqueda"
        type="search"
        placeholder="Buscar por nombre o folio"
        aria-label="Buscar por nombre o folio"
        value={filtros.busqueda}
        onChange={alCambiar}
        className="entrada"
      />
      <select name="tipo" aria-label="Tipo" value={filtros.tipo} onChange={alCambiar} className="entrada">
        <option value="">Todos los tipos</option>
        {tipos.map((t) => <option key={t.valor} value={t.valor}>{t.nombre}</option>)}
      </select>
      <select name="estado" aria-label="Estado" value={filtros.estado} onChange={alCambiar} className="entrada">
        <option value="">Todos los estados</option>
        {estados.map((e) => <option key={e.valor} value={e.valor}>{e.nombre}</option>)}
      </select>
      <select name="orden" aria-label="Ordenar por urgencia" value={filtros.orden} onChange={alCambiar} className="entrada">
        <option value="">Sin ordenar</option>
        <option value="desc">Urgencia: alta a baja</option>
        <option value="asc">Urgencia: baja a alta</option>
      </select>
      <button type="button" onClick={alLimpiar} className="boton-claro">Limpiar</button>
    </div>
  )
}

export default FiltrosBandeja
