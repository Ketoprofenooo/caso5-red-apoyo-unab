// Bloque de contenido con título y bajada. numero es opcional
// (la ficha de caso numera sus secciones 01, 02, 03...).
function Seccion({ id, numero, titulo, bajada, gris = false, children }) {
  return (
    <section id={id} className={`py-12 md:py-16 ${gris ? 'border-y border-borde bg-fondo-gris' : ''}`}>
      <div className="contenedor">
        <div className="mb-8 flex gap-4">
          {numero && (
            <span className="font-titulo text-3xl text-verde-claro md:text-4xl">{numero}</span>
          )}
          <div>
            <h2 className="text-2xl md:text-3xl">{titulo}</h2>
            {bajada && <p className="mt-2 max-w-2xl text-texto-suave">{bajada}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

export default Seccion
