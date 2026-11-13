import { Link } from 'react-router-dom'

// Se muestra cuando la ruta no existe (Route path="*")
function NoEncontrada() {
  return (
    <div className="contenedor py-24 text-center">
      <p className="font-titulo text-6xl text-verde-claro">404</p>
      <h1 className="mt-2 text-3xl">Esta página no existe</h1>
      <p className="mt-3 text-texto-suave">Puede que el enlace esté mal escrito.</p>
      <Link to="/" className="boton mt-6">Volver al inicio</Link>
    </div>
  )
}

export default NoEncontrada
