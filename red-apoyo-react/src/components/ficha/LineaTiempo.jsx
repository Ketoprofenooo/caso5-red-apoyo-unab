import { useState } from 'react'
import Campo from '../Campo'
import { tiposRegistro, tituloRegistro } from '../../data/caso'
import { fechaHora } from '../../data/tonos'

// Historial del caso (RF6) + formulario para registrar algo nuevo.
// Lo que se esta escribiendo es estado propio de este componente;
// la lista llega por props desde la página (son los seguimientos del backend).
function LineaTiempo({ eventos, alAgregar, puedeEscribir, bloqueado }) {
  const [tipoRegistro, setTipoRegistro] = useState('observacion')
  const [detalle, setDetalle] = useState('')

  const agregar = async (e) => {
    e.preventDefault()
    if (detalle.trim() === '') return
    const ok = await alAgregar({ tipoRegistro, detalle: detalle.trim() })
    if (ok) setDetalle('')
  }

  return (
    <div className={`grid gap-8 ${puedeEscribir ? 'lg:grid-cols-[1fr_20rem]' : ''}`}>
      <ol className="relative border-l-2 border-verde-claro pl-6">
        {eventos.map((evento) => (
          <li key={evento._id} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-fondo bg-verde" />
            <p className="text-xs text-texto-suave">
              {fechaHora(evento.fecha)}
              {evento.autor && ` · ${evento.autor.nombre}`}
            </p>
            <p className="font-semibold">{tituloRegistro[evento.tipoRegistro]}</p>
            <p className="text-sm text-texto-suave">{evento.detalle}</p>
          </li>
        ))}
        {eventos.length === 0 && <li className="text-sm text-texto-suave">Todavía no hay registros.</li>}
      </ol>

      {puedeEscribir && (
        <form onSubmit={agregar} className="h-fit border border-borde bg-fondo p-5">
          <Campo id="tipoRegistro" etiqueta="Qué vas a registrar">
            <select
              id="tipoRegistro"
              value={tipoRegistro}
              onChange={(e) => setTipoRegistro(e.target.value)}
              disabled={bloqueado}
              className="entrada"
            >
              {tiposRegistro.map((t) => <option key={t.valor} value={t.valor}>{t.nombre}</option>)}
            </select>
          </Campo>
          <Campo id="nuevoEvento" etiqueta="Detalle">
            <input
              id="nuevoEvento"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Ej: Primera sesión el martes a las 11:00"
              disabled={bloqueado}
              className="entrada"
            />
          </Campo>
          <button type="submit" disabled={bloqueado || detalle.trim() === ''} className="boton w-full">
            Agregar al historial
          </button>
        </form>
      )}
    </div>
  )
}

export default LineaTiempo
