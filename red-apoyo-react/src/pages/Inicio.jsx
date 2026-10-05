// ============================================================
// Home institucional + login/registro (RF1, CU1)
// Fajardo Zamora
// ============================================================
import { Link } from 'react-router-dom'
import EncabezadoPagina from '../components/EncabezadoPagina'
import Seccion from '../components/Seccion'
import Tarjeta from '../components/Tarjeta'
import Respiracion from '../components/inicio/Respiracion'
import Acceso from '../components/inicio/Acceso'
import { canales, paginasSistema, tiposApoyo } from '../data/inicio'
import { imagenes } from '../data/imagenes'

function Inicio({ sesion, alIniciarSesion, alCerrarSesion }) {
  return (
    <>
      {/* ---------- Presentación ---------- */}
      <EncabezadoPagina
        grande
        imagen={imagenes.portada}
        etiqueta="Bienestar estudiantil"
        titulo="Pedir ayuda no debería ser lo difícil"
        bajada="Hoy las solicitudes de apoyo andan repartidas entre correos, formularios sueltos y derivaciones de palabra. Acá queda todo en un solo lugar, con seguimiento, y sin que tengas que contar tu historia tres veces."
        lateral={<Respiracion />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/#acceso" className="boton border-white bg-white text-verde hover:bg-menta hover:text-verde">
            Entrar a la plataforma
          </Link>
          <Link to="/#apoyo" className="boton-blanco">No sé qué necesito</Link>
        </div>
        <p className="mt-4 text-sm text-white/80">
          Confidencial: solo el equipo asignado a tu caso lee lo que escribes.
        </p>
      </EncabezadoPagina>

      {/* ---------- Páginas del sistema ---------- */}
      <Seccion
        id="paginas"
        titulo="Las páginas del sistema"
        bajada="Esta portada es la entrada. De aquí el recorrido sigue en cuatro pantallas, una por cada tramo del proceso."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {paginasSistema.map((pagina) => (
            <Tarjeta
              key={pagina.id}
              imagen={pagina.imagen}
              titulo={pagina.nombre}
              texto={pagina.texto}
              pie={`La hizo ${pagina.integrante}`}
            >
              <Link to={pagina.ruta} className="font-medium text-verde underline hover:text-verde-claro">
                Entrar a esta página
              </Link>
            </Tarjeta>
          ))}
        </div>
      </Seccion>

      {/* ---------- Tipos de apoyo ---------- */}
      <Seccion
        id="apoyo"
        gris
        titulo="¿Qué te está pasando?"
        bajada="Si ninguna calza del todo, elige la que más se acerque y escríbelo con tus palabras. El equipo la reclasifica si corresponde a otra unidad y no pierdes el turno por eso."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tiposApoyo.map((tipo) => (
            <Tarjeta key={tipo.id} imagen={tipo.imagen} titulo={tipo.titulo} texto={tipo.texto} pie={tipo.pie}>
              {/* El motivo viaja en la URL y el formulario lo deja marcado */}
              <Link to={`/solicitud?motivo=${tipo.id}`} className="font-medium text-verde underline hover:text-verde-claro">
                Pedir apoyo por esto
              </Link>
            </Tarjeta>
          ))}
        </div>
      </Seccion>

      {/* ---------- Canales ---------- */}
      <Seccion
        id="canales"
        titulo="Dónde ir según el caso"
        bajada="Cada canal sirve para algo distinto. El último es el único que corresponde usar cuando la situación es inmediata."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {canales.map((canal) => (
            <Tarjeta
              key={canal.id}
              imagen={canal.imagen}
              titulo={canal.titulo}
              texto={canal.texto}
              pie={canal.pie}
              urgente={canal.urgente}
            />
          ))}
        </div>
      </Seccion>

      {/* ---------- Acceso ---------- */}
      <Seccion id="acceso" gris titulo="Entra con tu cuenta institucional">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <p className="text-texto-suave">
              Si es tu primera vez, crea la cuenta y bienestar valida tu perfil antes del primer ingreso.
              No hay registro con correos personales.
            </p>
            <p className="mt-4 border-l-4 border-verde-claro pl-3 text-sm text-texto-suave">
              La sesión se cierra sola a los 20 minutos sin actividad.
            </p>
            <img
              src={imagenes.acceso}
              alt="Dos personas conversando con un café"
              loading="lazy"
              className="mt-6 hidden aspect-[4/3] w-full object-cover lg:block"
            />
          </div>

          <div className="border border-borde bg-fondo p-5 md:p-7">
            <Acceso sesion={sesion} alIniciarSesion={alIniciarSesion} alCerrarSesion={alCerrarSesion} />
          </div>
        </div>
      </Seccion>
    </>
  )
}

export default Inicio
