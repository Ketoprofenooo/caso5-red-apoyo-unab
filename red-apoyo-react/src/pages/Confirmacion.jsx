// ============================================================
// Confirmación de la solicitud o derivación (RF2, RF3)
// Alfaro Sánchez
// ============================================================
import { Link } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina'
import { imagenes } from '../data/imagenes'
import { nombreUrgencia } from '../data/solicitudes'
import { leer } from '../utils/almacenamiento'

const pasos = [
  { titulo: 'Solicitud recibida', detalle: 'Quedó registrada con el folio de arriba.', estado: 'hecho' },
  { titulo: 'Revisión confidencial', detalle: 'Un orientador la lee y la clasifica.', estado: 'actual' },
  { titulo: 'Profesional y cita', detalle: 'Te contactan por los canales institucionales para agendar.', estado: 'pendiente' },
]

const colorPaso = {
  hecho: 'bg-verde text-white',
  actual: 'border-2 border-verde bg-menta text-verde',
  pendiente: 'border border-borde bg-fondo text-texto-suave',
}

function Confirmacion() {
  const solicitud = leer('ultimaSolicitud', null)

  if (!solicitud) {
    return (
      <div className="contenedor py-20 text-center">
        <h1 className="text-3xl">Todavía no has enviado nada</h1>
        <p className="mt-3 text-texto-suave">Cuando envíes una solicitud, acá vas a ver su folio.</p>
        <Link to="/solicitud" className="boton mt-6">Pedir apoyo</Link>
      </div>
    )
  }

  const datos = [
    { etiqueta: 'Fecha de ingreso', valor: solicitud.fecha },
    { etiqueta: 'Tipo', valor: solicitud.tipo },
    { etiqueta: 'Prioridad inicial', valor: nombreUrgencia[solicitud.prioridad] },
    { etiqueta: 'Estado', valor: solicitud.estado },
  ]

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.confirmacion}
        etiqueta="Solicitud ingresada"
        titulo="Listo, ya la recibimos"
        bajada="Se va a atender con confidencialidad. Guarda el folio para seguirla cuando quieras."
      />

      <div className="contenedor grid gap-8 py-10 lg:grid-cols-2">
        <div className="border border-verde bg-fondo p-6">
          <p className="text-sm uppercase tracking-wider text-texto-suave">Número de folio</p>
          <p className="mt-1 break-all font-titulo text-3xl text-verde">{solicitud.folio}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            {datos.map((dato) => (
              <div key={dato.etiqueta}>
                <dt className="text-xs text-texto-suave">{dato.etiqueta}</dt>
                <dd className="font-medium">{dato.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-2xl">Próximos pasos</h2>
          <ol className="mt-5 space-y-5">
            {pasos.map((paso, i) => (
              <li key={paso.titulo} className="flex gap-4">
                <span className={`grid h-9 w-9 shrink-0 place-items-center text-sm font-semibold ${colorPaso[paso.estado]}`}>
                  {paso.estado === 'hecho' ? '✓' : i + 1}
                </span>
                <div>
                  <p className="font-semibold">{paso.titulo}</p>
                  <p className="text-sm text-texto-suave">{paso.detalle}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/mis-solicitudes" className="boton">Ver mis solicitudes</Link>
            <Link to="/" className="boton-claro">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmacion
