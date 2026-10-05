// ============================================================
// Talleres, administración y reportes (RF8, RF9, RF10, RF12)
// Mena Navea
// ============================================================
import { useState } from 'react'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Pestanas from '../components/Pestanas'
import TallerTarjeta from '../components/talleres/TallerTarjeta'
import PanelMantenedores from '../components/talleres/PanelMantenedores'
import PanelReportes from '../components/talleres/PanelReportes'
import TablaBitacora from '../components/talleres/TablaBitacora'
import { bitacora, mantenedores, reporteMensual, talleres } from '../data/talleres'
import { imagenes } from '../data/imagenes'

const pestanas = [
  { valor: 'talleres', texto: 'Talleres' },
  { valor: 'mantenedores', texto: 'Mantenedores' },
  { valor: 'reportes', texto: 'Reportes' },
  { valor: 'bitacora', texto: 'Bitácora' },
]

function Talleres() {
  const [activa, setActiva] = useState('talleres')
  const [cupos, setCupos] = useState(talleres.map((t) => t.cupos))
  const [inscritos, setInscritos] = useState([])

  // Inscribirse resta un cupo; anular lo devuelve.
  const alternarInscripcion = (indice, id) => {
    const yaInscrito = inscritos.includes(id)
    setInscritos(yaInscrito ? inscritos.filter((x) => x !== id) : [...inscritos, id])
    setCupos(cupos.map((c, i) => (i === indice ? c + (yaInscrito ? 1 : -1) : c)))
  }

  return (
    <>
      <EncabezadoPagina
        imagen={imagenes.talleres}
        etiqueta="Prevención y administración · RF8 a RF12"
        titulo="Talleres, mantenedores y reportes"
        bajada="Actividades preventivas abiertas a toda la comunidad y la gestión del sistema para el equipo de bienestar."
      />

      <div className="contenedor py-10">
        <div className="max-w-2xl">
          <Pestanas opciones={pestanas} activa={activa} alCambiar={setActiva} />
        </div>

        {/* Solo se dibuja la pestaña activa */}
        <div className="mt-8">
          {activa === 'talleres' && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {talleres.map((taller, i) => (
                <TallerTarjeta
                  key={taller.id}
                  taller={taller}
                  cupos={cupos[i]}
                  inscrito={inscritos.includes(taller.id)}
                  alAlternar={() => alternarInscripcion(i, taller.id)}
                />
              ))}
            </div>
          )}

          {activa === 'mantenedores' && <PanelMantenedores mantenedores={mantenedores} />}

          {activa === 'reportes' && <PanelReportes filas={reporteMensual} talleresActivos={talleres.length} />}

          {activa === 'bitacora' && <TablaBitacora filas={bitacora} />}
        </div>
      </div>
    </>
  )
}

export default Talleres
