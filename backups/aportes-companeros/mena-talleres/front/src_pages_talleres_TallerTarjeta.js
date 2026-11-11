function TallerTarjeta({
  taller,
  yaInscrito,
  esAdmin,
  alAlternarInscripcion,
  alEliminar
}) {
  const disponibles =
    typeof taller.cuposDisponibles === "number"
      ? taller.cuposDisponibles
      : Math.max(0, taller.cupos - (taller.inscritos?.length || 0))

  const sinCupos = disponibles <= 0 && !yaInscrito

  return (
    <article className="border border-borde bg-white flex flex-col justify-between">
      <div>
        {taller.imagen && (
          <img
            src={taller.imagen}
            alt={taller.titulo}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-5 space-y-3">
          <h3 className="font-serif text-xl text-gray-900">{taller.titulo}</h3>
          <p className="text-sm text-texto-suave">{taller.descripcion}</p>
          <p className="text-xs font-semibold text-gray-800">
            {disponibles > 0 ? `Quedan ${disponibles} cupos` : "Sin cupos"}
          </p>

          <button
            type="button"
            disabled={sinCupos}
            onClick={alAlternarInscripcion}
            className={`w-full py-2.5 px-4 text-sm font-medium transition-colors ${
              yaInscrito
                ? "border border-gray-800 bg-white text-gray-900 hover:bg-gray-100"
                : sinCupos
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-verde text-white hover:opacity-95"
            }`}
          >
            {yaInscrito
              ? "Anular inscripción"
              : sinCupos
              ? "Sin cupos disponibles"
              : "Inscribirme"}
          </button>

          {esAdmin && (
            <button
              type="button"
              onClick={alEliminar}
              className="w-full py-1.5 text-xs text-red-700 border border-red-200 hover:bg-red-50"
            >
              Dar de baja taller
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-borde text-xs text-texto-suave">
        {taller.fecha} · {taller.lugar}
      </div>
    </article>
  )
}

export default TallerTarjeta