// ============================================================
// Ficha de caso: seguimiento, citas y cierre (RF6, RF7, RF11)
// Méndez Muñoz
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Seccion from '../components/Seccion'
import Insignia from '../components/Insignia'
import LineaTiempo from '../components/ficha/LineaTiempo'
import Observaciones from '../components/ficha/Observaciones'
import TablaCitas from '../components/ficha/TablaCitas'
import Aviso from '../components/ficha/Aviso'
import FormCierre from '../components/ficha/FormCierre'
import { caso, citas, eventosIniciales, notificaciones } from '../data/caso'
import { nombreUrgencia } from '../data/solicitudes'
import { tonoUrgencia } from '../data/tonos'
import { imagenes } from '../data/imagenes'

const hoy = () => new Date().toLocaleDateString('es-CL')

function FichaCaso() {
  // El estado que comparten varias secciones vive en la página
  const [estado, setEstado] = useState(caso.estado)
  const [eventos, setEventos] = useState(eventosIniciales)
  const [cierre, setCierre] = useState(null)

  const cerrado = estado === 'Cerrado'

  // ---------- Línea de tiempo: agregar una acción ----------
  const agregarEvento = (titulo) => {
    const evento = { id: Date.now(), fecha: hoy(), titulo, detalle: 'Registrado por el profesional de apoyo.' }
    setEventos([...eventos, evento])
  }

  // ---------- Cierre: cambia el estado y deja registro en la línea de tiempo ----------
  const cerrarCaso = (datos) => {
    setCierre(datos)
    setEstado('Cerrado')
    setEventos([
      ...eventos,
      { id: Date.now(), fecha: hoy(), titulo: 'Caso cerrado', detalle: `${datos.motivo}. Derivación: ${datos.derivacion}.` },
    ])
  }

  const datosCaso = [
    { etiqueta: 'Estudiante', valor: caso.estudiante },
    { etiqueta: 'Tipo de solicitud', valor: caso.tipo },
    { etiqueta: 'Profesional', valor: caso.profesional },
  ]

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.ficha}
        etiqueta={`Profesional de apoyo · Caso ${caso.folio}`}
        titulo="Ficha de seguimiento del caso"
        bajada="Citas, cambios de estado, avisos al estudiante y cierre, todo en un mismo lugar."
      />

      {/* ---------- 01 Información ---------- */}
      <Seccion numero="01" titulo="Información del caso">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {datosCaso.map((dato) => (
            <div key={dato.etiqueta} className="border border-borde p-4">
              <p className="text-xs text-texto-suave">{dato.etiqueta}</p>
              <p className="mt-1 font-semibold">{dato.valor}</p>
            </div>
          ))}
          <div className="border border-borde p-4">
            <p className="text-xs text-texto-suave">Urgencia</p>
            <p className="mt-1"><Insignia texto={nombreUrgencia[caso.urgencia]} tono={tonoUrgencia[caso.urgencia]} /></p>
          </div>
          <div className={`border p-4 ${cerrado ? 'border-borde bg-fondo-gris' : 'border-verde bg-menta'}`}>
            <p className="text-xs text-texto-suave">Estado actual</p>
            <p className="mt-1 font-semibold text-verde">{estado}</p>
          </div>
        </div>
      </Seccion>

      {/* ---------- 02 Línea de tiempo ---------- */}
      <Seccion id="seguimiento" numero="02" gris titulo="Línea de tiempo" bajada="Las acciones que se han hecho en el caso, en orden.">
        <LineaTiempo eventos={eventos} alAgregar={agregarEvento} bloqueado={cerrado} />
      </Seccion>

      {/* ---------- 03 Observaciones ---------- */}
      <Seccion numero="03" titulo="Observaciones de seguimiento" bajada="Solo las ve el perfil autorizado. Cambia el perfil para probarlo.">
        <Observaciones texto="Se revisó la situación académica y se acordó volver a ver el caso en la próxima cita." />
      </Seccion>

      {/* ---------- 04 Citas y avisos ---------- */}
      <Seccion id="citas" numero="04" gris titulo="Citas y avisos" bajada="Las atenciones del caso y lo que se le ha avisado al estudiante.">
        <div className="grid gap-8 lg:grid-cols-2">
          <TablaCitas citas={citas} />
          <ul className="space-y-3">
            {notificaciones.map((n) => (
              <Aviso key={n.id} titulo={n.titulo} texto={n.texto} lista={n.lista} />
            ))}
          </ul>
        </div>
      </Seccion>

      {/* ---------- 05 Cierre ---------- */}
      <Seccion id="cierre" numero="05" titulo="Cierre del caso" bajada="Registra el motivo de cierre y si hubo una derivación.">
        {cerrado ? (
          <div className="max-w-xl border border-verde bg-menta p-5">
            <h3 className="text-lg">Caso cerrado</h3>
            <p className="mt-2 text-sm">Motivo: {cierre.motivo}</p>
            <p className="text-sm">Derivación realizada: {cierre.derivacion}</p>
          </div>
        ) : (
          <FormCierre alCerrar={cerrarCaso} />
        )}
      </Seccion>
    </>
  )
}

export default FichaCaso
