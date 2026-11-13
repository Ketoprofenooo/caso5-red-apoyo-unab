// Ventana sobre la página. Si abierto es false no se dibuja nada.
// Se cierra con el botón o haciendo clic en el fondo oscuro.
function Modal({ abierto, titulo, alCerrar, children }) {
  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-texto/60 p-4"
      onClick={alCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="w-full max-w-md bg-fondo p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-2xl">{titulo}</h2>
          <button type="button" onClick={alCerrar} className="text-sm text-texto-suave hover:text-verde">
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
