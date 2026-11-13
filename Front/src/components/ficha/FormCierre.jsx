import { useState } from 'react'
import Campo from '../Campo'
import { motivosCierre } from '../../data/caso'

// Formulario para cerrar el caso. Valida sus dos campos y, si están
// completos, le entrega los datos a la página con alCerrar.
function FormCierre({ alCerrar }) {
  const [cierre, setCierre] = useState({ motivo: '', derivacion: '' })
  const [error, setError] = useState('')

  const manejarCambio = (e) => {
    setCierre({ ...cierre, [e.target.name]: e.target.value })
  }

  const registrar = (e) => {
    e.preventDefault()
    if (cierre.motivo === '' || cierre.derivacion === '') {
      setError('Completa los dos campos para cerrar el caso.')
      return
    }
    alCerrar(cierre)
  }

  return (
    <form onSubmit={registrar} className="grid max-w-xl gap-x-4 md:grid-cols-2">
      <Campo id="motivoCierre" etiqueta="Motivo de cierre">
        <select id="motivoCierre" name="motivo" value={cierre.motivo} onChange={manejarCambio} className="entrada">
          <option value="">Elige un motivo</option>
          {motivosCierre.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </Campo>
      <Campo id="derivacion" etiqueta="¿Hubo derivación?">
        <select id="derivacion" name="derivacion" value={cierre.derivacion} onChange={manejarCambio} className="entrada">
          <option value="">Elige una opción</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </Campo>
      {error && <p className="text-sm text-rojo md:col-span-2">{error}</p>}
      <div className="md:col-span-2">
        <button type="submit" className="boton mt-2">Registrar cierre</button>
      </div>
    </form>
  )
}

export default FormCierre
