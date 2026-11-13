// Botones de pestañas. El estado (cuál está activa) lo guarda el padre;
// este componente solo lo muestra y avisa con alCambiar cuando se hace clic.
function Pestanas({ opciones, activa, alCambiar }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          role="tab"
          aria-selected={activa === opcion.valor}
          onClick={() => alCambiar(opcion.valor)}
          className={`flex-1 border px-4 py-2.5 text-[0.95rem] transition-colors ${
            activa === opcion.valor
              ? 'border-verde bg-verde text-white'
              : 'border-borde bg-fondo-gris text-texto-suave hover:text-verde'
          }`}
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  )
}

export default Pestanas
