import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AvisoEmergencia from './components/AvisoEmergencia'
import Footer from './components/Footer'
import SubirAlCambiar from './components/SubirAlCambiar'
import Inicio from './pages/Inicio'
import SolicitudEstudiante from './pages/SolicitudEstudiante'
import DerivacionDocente from './pages/DerivacionDocente'
import Confirmacion from './pages/Confirmacion'
import MisSolicitudes from './pages/MisSolicitudes'
import Bandeja from './pages/Bandeja'
import FichaCaso from './pages/FichaCaso'
import Talleres from './pages/Talleres'
import NoEncontrada from './pages/NoEncontrada'
import { borrar, guardar, leerSesion } from './utils/almacenamiento'

function App() {
  // La sesión vive acá arriba para que el Header y las páginas la compartan.
  // useState(leerSesion) la recupera de localStorage al abrir la página.
  const [sesion, setSesion] = useState(leerSesion)

  // Recibe lo que responde POST /api/auth/login: { token, usuario }
  const iniciarSesion = ({ token, usuario }) => {
    const nueva = {
      token,
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.email,
      perfil: usuario.perfil,
      inicio: Date.now(),
    }
    guardar('sesionRedApoyo', nueva)
    setSesion(nueva)
  }

  const cerrarSesion = () => {
    borrar('sesionRedApoyo')
    setSesion(null)
  }

  return (
    <BrowserRouter>
      <SubirAlCambiar />
      <div className="flex min-h-screen flex-col">
        <Header sesion={sesion} alCerrarSesion={cerrarSesion} />
        <AvisoEmergencia />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Inicio sesion={sesion} alIniciarSesion={iniciarSesion} alCerrarSesion={cerrarSesion} />}
            />
            <Route path="/solicitud" element={<SolicitudEstudiante sesion={sesion} />} />
            <Route path="/derivacion" element={<DerivacionDocente sesion={sesion} />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/mis-solicitudes" element={<MisSolicitudes sesion={sesion} />} />
            <Route path="/bandeja" element={<Bandeja sesion={sesion} />} />
            <Route path="/ficha" element={<FichaCaso sesion={sesion} />} />
            <Route path="/ficha/:id" element={<FichaCaso sesion={sesion} />} />
            <Route path="/talleres" element={<Talleres sesion={sesion} />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
