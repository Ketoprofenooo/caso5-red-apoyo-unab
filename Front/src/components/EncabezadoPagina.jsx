// Banda de presentación con foto de fondo. La usan todas las páginas,
// cada una con su propia foto, etiqueta, título y bajada (props).
// children va debajo del texto (botones) y lateral a la derecha en computador.
function EncabezadoPagina({ imagen, etiqueta, titulo, bajada, grande = false, lateral, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-verde">
      <img src={imagen} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-verde via-verde/85 to-verde/30" />

      <div
        className={`contenedor grid items-center gap-10 ${grande ? 'py-14 md:py-20' : 'py-10 md:py-14'} ${
          lateral ? 'lg:grid-cols-[1fr_18rem]' : ''
        }`}
      >
        <div>
          {etiqueta && (
            <p className="mb-3 inline-block border border-white/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
              {etiqueta}
            </p>
          )}
          <h1 className={`max-w-3xl text-white ${grande ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'}`}>
            {titulo}
          </h1>
          {bajada && <p className="mt-4 max-w-2xl text-white/90 md:text-lg">{bajada}</p>}
          {children}
        </div>
        {lateral}
      </div>
    </section>
  )
}

export default EncabezadoPagina
