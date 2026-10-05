import { useState } from 'react'
import Campo from '../Campo'

// Lista de acciones del caso + formulario para registrar una nueva.
// El texto que se está escribiendo es estado propio de este componente;
// la lista de eventos llega por props desde la página.
function LineaTiempo({ eventos, alAgregar, bloqueado }) {
  const [texto, setTexto] = useState('')

  const agregar = (e) => {
    e.preventDefault()
    if (texto.trim() === '') return
    alAgregar(texto.trim())
    setTexto('')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <ol className="relative border-l-2 border-verde-claro pl-6">
        {eventos.map((evento) => (
          <li key={evento.id} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-fondo bg-verde" />
            <p className="text-xs text-texto-suave">{evento.fecha}</p>
            <p className="font-semibold">{evento.titulo}</p>
            <p className="text-sm text-texto-suave">{evento.detalle}</p>
          </li>
        ))}
      </ol>

      <form onSubmit={agregar} className="h-fit border border-borde bg-fondo p-5">
        <Campo id="nuevoEvento" etiqueta="Registrar una acción">
          <input
            id="nuevoEvento"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Ej: Llamado de seguimiento"
            disabled={bloqueado}
            className="entrada"
          />
        </Campo>
        <button type="submit" disabled={bloqueado || texto.trim() === ''} className="boton w-full">
          Agregar a la línea de tiempo
        </button>
      </form>
    </div>
  )
}

export default LineaTiempo
