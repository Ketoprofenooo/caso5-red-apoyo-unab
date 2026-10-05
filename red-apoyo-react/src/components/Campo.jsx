// Envoltorio de un campo de formulario: etiqueta, el input (children),
// una pista opcional y el mensaje de error si lo hay.
function Campo({ id, etiqueta, pista, error, children }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {etiqueta}
      </label>
      {children}
      {pista && <p className="mt-1 text-xs text-texto-suave">{pista}</p>}
      {error && <p className="mt-1 text-sm text-rojo">{error}</p>}
    </div>
  )
}

export default Campo
