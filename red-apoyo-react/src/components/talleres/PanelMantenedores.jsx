// Mantenedores del sistema. Administrar requiere backend,
// por eso el botón se muestra deshabilitado.
function PanelMantenedores({ mantenedores }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {mantenedores.map((m) => (
        <div key={m.id} className="border border-borde p-5">
          <h3 className="text-xl">{m.titulo}</h3>
          <p className="mt-2 text-sm text-texto-suave">{m.texto}</p>
          <p className="mt-4 font-titulo text-2xl text-verde">{m.total}</p>
          <button type="button" disabled className="boton-claro mt-4 w-full">
            Administrar (requiere backend)
          </button>
        </div>
      ))}
    </div>
  )
}

export default PanelMantenedores
