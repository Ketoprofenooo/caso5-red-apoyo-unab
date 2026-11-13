import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página, React Router no mueve el scroll. Este componente
// no dibuja nada: solo sube al inicio, o baja hasta el #ancla si la URL trae una.
function SubirAlCambiar() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const destino = document.querySelector(hash)
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default SubirAlCambiar
