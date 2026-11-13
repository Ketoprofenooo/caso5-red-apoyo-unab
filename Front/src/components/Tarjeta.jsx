// Tarjeta reutilizable: se usa para las páginas del sistema, los tipos
// de apoyo, los canales y los talleres. Todo lo que cambia llega por props.
// urgente pinta la tarjeta en rojo (el canal "Si es ahora").
function Tarjeta({ imagen, titulo, texto, pie, urgente = false, children }) {
  return (
    <article
      className={`flex flex-col border bg-fondo transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        urgente ? 'border-rojo' : 'border-borde'
      }`}
    >
      {imagen && (
        <img src={imagen} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`text-xl ${urgente ? 'text-rojo' : ''}`}>{titulo}</h3>
        <p className="mt-2 text-[0.93rem] text-texto-suave">{texto}</p>

        {children && <div className="mt-4">{children}</div>}

        {pie && (
          <p className={`mt-auto pt-4 text-sm ${urgente ? 'font-semibold text-rojo' : 'text-verde-claro'}`}>
            <span className="block border-t border-borde pt-3">{pie}</span>
          </p>
        )}
      </div>
    </article>
  )
}

export default Tarjeta
