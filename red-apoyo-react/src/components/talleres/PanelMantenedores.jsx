import { categoriasMaestro } from '../../data/talleres'

// Mantenedores del sistema (RF9): tipos de solicitud, sedes y unidades.
// Vienen de GET /api/maestros, una sola coleccion separada por `categoria`.
function PanelMantenedores({ maestros }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Object.keys(categoriasMaestro).map((categoria) => {
        const registros = maestros.filter((m) => m.categoria === categoria)
        return (
          <div key={categoria} className="border border-borde p-5">
            <h3 className="text-xl">{categoriasMaestro[categoria]}</h3>
            <p className="mt-1 font-titulo text-2xl text-verde">{registros.length}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {registros.map((m) => (
                <li key={m._id}>
                  {m.nombre}
                  {m.descripcion && <span className="text-texto-suave"> · {m.descripcion}</span>}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default PanelMantenedores
