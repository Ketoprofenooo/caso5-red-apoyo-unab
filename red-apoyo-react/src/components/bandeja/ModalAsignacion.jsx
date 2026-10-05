import { useState } from 'react'
import Modal from '../Modal'
import { nombreTipo, profesionales } from '../../data/bandeja'

// Ventana para elegir el profesional de una solicitud.
// Guarda su propia selección y, al confirmar, se la pasa a la página.
// La página solo la dibuja cuando hay una solicitud elegida.
function ModalAsignacion({ solicitud, alGuardar, alCerrar }) {
  const [profesional, setProfesional] = useState(solicitud.profesional)

  const guardar = (e) => {
    e.preventDefault()
    if (profesional !== '') alGuardar(profesional)
  }

  return (
    <Modal abierto titulo="Asignar profesional" alCerrar={alCerrar}>
      <form onSubmit={guardar}>
        <p className="text-sm text-texto-suave">
          {solicitud.id} · {solicitud.estudiante} · {nombreTipo(solicitud.tipo)}
        </p>
        <label htmlFor="profesional" className="mb-1.5 mt-4 block text-sm font-semibold">Profesional</label>
        <select id="profesional" value={profesional} onChange={(e) => setProfesional(e.target.value)} className="entrada">
          <option value="">Elige un profesional</option>
          {profesionales.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <button type="submit" disabled={profesional === ''} className="boton mt-5 w-full">
          Guardar asignación
        </button>
      </form>
    </Modal>
  )
}

export default ModalAsignacion
