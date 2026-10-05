import { Link } from 'react-router-dom'

const anio = new Date().getFullYear()

function Footer() {
  return (
    <footer className="mt-auto bg-verde text-white">
      <div className="contenedor grid gap-8 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-titulo text-xl">Red de Apoyo y Salud Mental Universitaria</p>
          <p className="mt-2 text-sm text-white/80">
            Servicio institucional de apoyo estudiantil. Lunes a viernes, 9:00 a 18:00.
          </p>
          <p className="mt-1 text-sm text-white/80">No estás molestando a nadie por preguntar.</p>
        </div>

        <div>
          <h2 className="font-cuerpo text-base font-semibold text-white">Ir a</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-white/80">
            <li><Link to="/solicitud" className="hover:text-white hover:underline">Pedir apoyo</Link></li>
            <li><Link to="/mis-solicitudes" className="hover:text-white hover:underline">Mis solicitudes</Link></li>
            <li><Link to="/talleres" className="hover:text-white hover:underline">Talleres</Link></li>
            <li><Link to="/#acceso" className="hover:text-white hover:underline">Entrar</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-cuerpo text-base font-semibold text-white">Contacto</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-white/80">
            <li>bienestar@universidad.cl</li>
            <li>+56 2 2000 0000</li>
            <li>Casa Central, oficina 12</li>
          </ul>
        </div>
      </div>

      <div className="contenedor flex flex-col gap-1 border-t border-white/20 py-4 text-xs text-white/70 md:flex-row md:justify-between">
        <p>&copy; {anio} Red de Apoyo · Universidad</p>
        <p>Uso responsable de datos conforme a la Ley 19.628. Los reportes son agregados, sin datos de personas.</p>
      </div>
    </footer>
  )
}

export default Footer
