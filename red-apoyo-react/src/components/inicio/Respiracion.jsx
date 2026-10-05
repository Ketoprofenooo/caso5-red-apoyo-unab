import { useEffect, useState } from 'react'

// Ejercicio de respiración 4-7-8: el círculo crece al inhalar, se queda
// quieto al sostener y se achica al exhalar. El texto va sincronizado.
const fases = [
  { texto: 'Inhala', segundos: 4, grande: true },
  { texto: 'Sostén', segundos: 7, grande: true },
  { texto: 'Exhala', segundos: 8, grande: false },
]

function Respiracion() {
  const [activo, setActivo] = useState(false)
  const [fase, setFase] = useState(0)
  const [restante, setRestante] = useState(fases[0].segundos)

  // Cada segundo descuenta 1; cuando llega al final pasa a la fase siguiente.
  useEffect(() => {
    if (!activo) return

    const reloj = setTimeout(() => {
      if (restante > 1) {
        setRestante(restante - 1)
      } else {
        const siguiente = (fase + 1) % fases.length
        setFase(siguiente)
        setRestante(fases[siguiente].segundos)
      }
    }, 1000)

    // Si el componente cambia antes de que pase el segundo, se limpia el reloj
    return () => clearTimeout(reloj)
  }, [activo, fase, restante])

  const alternar = () => {
    setActivo(!activo)
    setFase(0)
    setRestante(fases[0].segundos)
  }

  const actual = fases[fase]
  const grande = activo && actual.grande

  return (
    <div className="flex flex-col items-center border border-white/25 bg-verde/60 p-6 text-center backdrop-blur-sm">
      <p className="text-sm uppercase tracking-wider text-white/80">¿Necesitas una pausa?</p>

      <div className="my-6 grid h-48 w-48 place-items-center">
        <div
          className={`grid place-items-center rounded-full bg-menta/90 transition-all ease-in-out ${
            grande ? 'h-48 w-48' : 'h-24 w-24'
          }`}
          style={{ transitionDuration: `${actual.segundos}s` }}
        >
          <span className="font-titulo text-xl text-verde">
            {activo ? actual.texto : 'Respira'}
          </span>
        </div>
      </div>

      <p className="h-6 text-white" aria-live="polite">
        {activo ? `${actual.texto} · ${restante}` : 'Inhala 4, sostén 7, exhala 8'}
      </p>

      <button type="button" onClick={alternar} className="boton-blanco mt-4">
        {activo ? 'Detener' : 'Empezar a respirar'}
      </button>
    </div>
  )
}

export default Respiracion
