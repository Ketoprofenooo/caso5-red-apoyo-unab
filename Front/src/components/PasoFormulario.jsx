// Cada bloque numerado de un formulario largo (1. Motivo, 2. Descripción...).
function PasoFormulario({ numero, titulo, ayuda, requerido = false, children }) {
  return (
    <fieldset className="border-b border-borde py-6 last:border-b-0">
      <legend className="sr-only">{titulo}</legend>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center bg-verde text-sm font-semibold text-white">
            {numero}
          </span>
          <span className="font-titulo text-xl text-verde">{titulo}</span>
        </p>
        {requerido && <span className="text-xs font-medium uppercase text-texto-suave">Requerido</span>}
      </div>
      {ayuda && <p className="mb-4 text-sm text-texto-suave">{ayuda}</p>}
      {children}
    </fieldset>
  )
}

export default PasoFormulario
