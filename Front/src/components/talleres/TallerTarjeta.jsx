import Tarjeta from '../Tarjeta'
import { fechaHora } from '../../data/tonos'

// Un taller: reutiliza la Tarjeta del home y le agrega los cupos y el botón.
// `taller` viene del backend; inscrito y puedeInscribirse los calcula la página.
function TallerTarjeta({ taller, imagen, inscrito, puedeInscribirse, alAlternar }) {
  const cupos = taller.cuposDisponibles
  const sinCupos = cupos === 0 && !inscrito

  return (
    <Tarjeta
      imagen={imagen}
      titulo={taller.titulo}
      texto={taller.descripcion}
      pie={`${fechaHora(taller.fecha)} · ${taller.lugar}`}
    >
      <p className={`mb-3 text-sm font-semibold ${cupos <= 2 ? 'text-ambar' : 'text-verde'}`}>
        {cupos === 0 ? 'Sin cupos' : `Quedan ${cupos} de ${taller.cupos} cupos`}
      </p>
      {puedeInscribirse && (
        <button
          type="button"
          disabled={sinCupos}
          onClick={alAlternar}
          className={`${inscrito ? 'boton-claro' : 'boton'} w-full`}
        >
          {inscrito ? 'Anular inscripción' : sinCupos ? 'Sin cupos' : 'Inscribirme'}
        </button>
      )}
    </Tarjeta>
  )
}

export default TallerTarjeta
