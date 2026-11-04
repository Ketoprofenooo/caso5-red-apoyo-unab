import { useState } from 'react'
import Modal from '../Modal'
import { tipos } from '../../data/bandeja'

// Ventana para clasificar (RF4) y asignar profesional (RF5).
// Guarda su propia seleccion y, al confirmar, se la pasa a la página.
// La página solo la dibuja cuando hay una solicitud elegida.
function ModalAsignacion({ solicitud, profesionales, enviando, error, alGuardar, alCerrar }) {
  const [tipo, setTipo] = useState(solicitud.tipo)
  // El profesional actual, si ya tenia uno
  const actual = profesionales.find((p) => p.nombre === solicitud.profesional)
  const [profesionalId, setProfesionalId] = useState(actual ? actual._id : '')

  const guardar = (e) => {
    e.preventDefault()
    if (tipo !== '' && profesionalId !== '') alGuardar({ tipo, profesionalId })
  }

  return (
    <Modal abierto titulo="Clasificar y asignar" alCerrar={alCerrar}>
      <form onSubmit={guardar}>
        <p className="text-sm text-texto-suave">
          {solicitud.folio} · {solicitud.estudiante}
        </p>
        <p className="mt-1 text-sm">Motivo: {solicitud.motivo}</p>

        <label htmlFor="tipo" className="mb-1.5 mt-4 block text-sm font-semibold">Tipo de apoyo (RF4)</label>
        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="entrada">
          <option value="">Elige un tipo</option>
          {tipos.map((t) => <option key={t.valor} value={t.valor}>{t.nombre}</option>)}
        </select>

        <label htmlFor="profesional" className="mb-1.5 mt-4 block text-sm font-semibold">Profesional (RF5)</label>
        <select id="profesional" value={profesionalId} onChange={(e) => setProfesionalId(e.target.value)} className="entrada">
          <option value="">Elige un profesional</option>
          {profesionales.map((p) => (
            <option key={p._id} value={p._id}>{p.nombre} · {p.unidad}</option>
          ))}
        </select>

        {error && <p className="mt-4 border border-rojo bg-rojo-fondo px-3 py-2 text-sm text-rojo">{error}</p>}

        <button type="submit" disabled={tipo === '' || profesionalId === '' || enviando} className="boton mt-5 w-full">
          {enviando ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
    </Modal>
  )
}

export default ModalAsignacion
