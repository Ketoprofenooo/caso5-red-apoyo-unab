import { useState } from 'react'
import Campo from '../Campo'

// Observaciones internas: solo las ve el profesional de apoyo.
// Con el selector se prueba cómo se ve para cada perfil.
function Observaciones({ texto }) {
  const [perfil, setPerfil] = useState('profesional')

  return (
    <>
      <div className="max-w-xs">
        <Campo id="perfil" etiqueta="Ver como">
          <select id="perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)} className="entrada">
            <option value="profesional">Profesional de apoyo</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </Campo>
      </div>

      {perfil === 'profesional' ? (
        <div className="border-l-4 border-verde bg-menta p-5">
          <h3 className="text-lg">Observaciones internas</h3>
          <p className="mt-2 text-sm">{texto}</p>
        </div>
      ) : (
        <p className="border-l-4 border-rojo bg-rojo-fondo p-5 text-sm text-rojo">
          Las observaciones de seguimiento están restringidas para este perfil.
        </p>
      )}
    </>
  )
}

export default Observaciones
