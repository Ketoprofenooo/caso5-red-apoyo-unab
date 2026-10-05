import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Mismo encabezado para todas las páginas: marca + navegación con Link,
// como el Header.jsx visto en clase. Además muestra quién inició sesión
// y en celular el menú se abre y se cierra con un botón (useState).

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/solicitud', texto: 'Pedir apoyo' },
  { ruta: '/derivacion', texto: 'Derivar' },
  { ruta: '/bandeja', texto: 'Bandeja' },
  { ruta: '/ficha', texto: 'Seguimiento' },
  { ruta: '/talleres', texto: 'Talleres' },
]

function Header({ sesion, alCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  // NavLink le avisa a la función si el enlace es el de la página actual
  const claseEnlace = ({ isActive }) =>
    `block px-3 py-2 text-[0.92rem] transition-colors ${
      isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 bg-verde shadow-md">
      <div className="contenedor flex items-center justify-between gap-4 py-3">
        <Link to="/" onClick={cerrarMenu} className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-white font-titulo text-lg font-semibold text-verde">
            RA
          </span>
          <span className="leading-tight">
            <span className="block font-titulo text-lg text-white">Red de Apoyo</span>
            <span className="block text-xs text-white/70">Salud Mental Universitaria</span>
          </span>
        </Link>

        <button
          type="button"
          className="border border-white/40 px-3 py-2 text-sm text-white lg:hidden"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? 'Cerrar' : 'Menú'}
        </button>

        <nav
          id="menu-principal"
          aria-label="Navegación principal"
          className={`${menuAbierto ? 'block' : 'hidden'} absolute left-0 right-0 top-full border-t border-white/15 bg-verde pb-4 lg:static lg:block lg:border-0 lg:pb-0`}
        >
          <ul className="contenedor flex flex-col gap-1 lg:flex-row lg:items-center lg:px-0">
            {enlaces.map((enlace) => (
              <li key={enlace.ruta}>
                <NavLink to={enlace.ruta} end onClick={cerrarMenu} className={claseEnlace}>
                  {enlace.texto}
                </NavLink>
              </li>
            ))}

            <li className="mt-2 lg:ml-3 lg:mt-0">
              {sesion ? (
                <div className="flex items-center gap-3 px-3 lg:px-0">
                  <span className="text-sm text-white/80">
                    Hola, <strong className="text-white">{sesion.nombre.split(' ')[0]}</strong>
                  </span>
                  <button
                    type="button"
                    className="border border-white/50 px-3 py-1.5 text-sm text-white hover:bg-white hover:text-verde"
                    onClick={() => {
                      alCerrarSesion()
                      cerrarMenu()
                    }}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/#acceso"
                  onClick={cerrarMenu}
                  className="mx-3 block bg-white px-4 py-2 text-center text-sm font-medium text-verde hover:bg-menta lg:mx-0"
                >
                  Entrar
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
