import Tarjeta from '../Tarjeta'

// Un taller: reutiliza la Tarjeta del home y le agrega los cupos y el botón.
// cupos e inscrito vienen de la página; alAlternar avisa el clic.
function TallerTarjeta({ taller, cupos, inscrito, alAlternar }) {
  const sinCupos = cupos === 0 && !inscrito

  return (
    <Tarjeta
      imagen={taller.imagen}
      titulo={taller.titulo}
      texto={taller.texto}
      pie={`${taller.fecha} · ${taller.lugar}`}
    >
      <p className={`mb-3 text-sm font-semibold ${cupos <= 2 ? 'text-ambar' : 'text-verde'}`}>
        {cupos === 0 ? 'Sin cupos' : `Quedan ${cupos} cupos`}
      </p>
      <button
        type="button"
        disabled={sinCupos}
        onClick={alAlternar}
        className={`${inscrito ? 'boton-claro' : 'boton'} w-full`}
      >
        {inscrito ? 'Anular inscripción' : sinCupos ? 'Sin cupos' : 'Inscribirme'}
      </button>
    </Tarjeta>
  )
}

export default TallerTarjeta
