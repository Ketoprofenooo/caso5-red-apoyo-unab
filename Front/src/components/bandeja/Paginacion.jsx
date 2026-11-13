// Controles de paginación: cuántas filas mostrar y botones de página.
// No guarda nada: recibe los números por props y avisa los cambios.
function Paginacion({ pagina, totalPaginas, porPagina, desde, hasta, total, alCambiarPagina, alCambiarPorPagina }) {
  const numeros = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 text-sm text-texto-suave">
        <label htmlFor="porPagina">Mostrar</label>
        <select
          id="porPagina"
          value={porPagina}
          onChange={(e) => alCambiarPorPagina(Number(e.target.value))}
          className="entrada w-auto py-1.5"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>{desde}–{hasta} de {total}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={pagina === 1}
          onClick={() => alCambiarPagina(pagina - 1)}
          className="boton-claro px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Anterior
        </button>
        {numeros.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => alCambiarPagina(n)}
            aria-current={n === pagina ? 'page' : undefined}
            className={`h-9 w-9 text-sm ${n === pagina ? 'bg-verde text-white' : 'border border-borde hover:border-verde'}`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          disabled={pagina === totalPaginas}
          onClick={() => alCambiarPagina(pagina + 1)}
          className="boton-claro px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Paginacion
