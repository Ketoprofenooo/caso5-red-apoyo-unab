// Cuadro de texto largo con contador de caracteres y mensaje de error.
// Lo usan la solicitud del estudiante (500) y la derivación docente (800).
function AreaTexto({ nombre, etiqueta, valor, alCambiar, maximo, placeholder, error }) {
  return (
    <>
      <textarea
        name={nombre}
        aria-label={etiqueta}
        rows="5"
        maxLength={maximo}
        placeholder={placeholder}
        value={valor}
        onChange={alCambiar}
        className="entrada"
      />
      <div className="mt-1 flex justify-between text-sm">
        <span className="text-rojo">{error}</span>
        <span className="text-texto-suave">{valor.length} / {maximo}</span>
      </div>
    </>
  )
}

export default AreaTexto
