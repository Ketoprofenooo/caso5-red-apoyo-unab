# Red de Apoyo y Salud Mental Universitaria — versión React

Caso 5 del ramo **Desarrollo Web y Móvil** (UNAB). Frontend en **React +
Vite + Tailwind CSS** de la Red de Apoyo. Desde la Entrega 2 (MERN) se conecta
con el backend de `../backend` (Express + MongoDB) usando **axios**.

```
Navegador (React, :5173)  --axios-->  API Express (:4000/api)  --mongoose-->  MongoDB (:27017)
```

> La plataforma ordena el acceso y el seguimiento administrativo. **No reemplaza
> la atención de un profesional y no es un canal de emergencia.** Si es ahora:
> Salud Responde 600 360 7777 o Emergencias 131.

## Requisitos

- Node.js 20 o superior (se probó con Node 24)
- npm (viene con Node)

## Instalación y ejecución

Primero el backend (ver `../backend/README.md`), en una terminal:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Después el frontend, en otra terminal:

```bash
cd red-apoyo-react
npm install
npm run dev
```

Se abre en <http://localhost:5173>. Si el backend no está corriendo, las
páginas muestran "No se pudo conectar con el servidor".

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión final en `dist/` |
| `npm run preview` | Sirve lo que quedó en `dist/` |
| `npm run lint` | Revisa el código con OxLint |

> Si PowerShell bloquea `npm` con un error de scripts, ejecuta una vez
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Cuentas de prueba

Las crea `npm run seed` en el backend. Todas usan la contraseña `clave1234`.
También aparecen en la caja de login (se rellenan con un clic).

| Correo | Perfil | Lo manda a |
|---|---|---|
| estudiante@universidad.cl | Estudiante | Pedir apoyo |
| docente@universidad.cl | Docente derivador | Derivar |
| orientador@universidad.cl | Consejero / Orientador | Bandeja |
| profesional@universidad.cl | Profesional de apoyo | Seguimiento |
| admin@universidad.cl | Administrador de bienestar | Talleres |

## Tecnologías

| Herramienta | Para qué |
|---|---|
| React 19 | Componentes, props y estado (`useState`, `useEffect`) |
| Vite | Servidor de desarrollo y compilación |
| React Router | Navegación entre páginas sin recargar (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`) |
| axios | Llamadas al backend, con el token agregado solo en `src/api/axios.js` |
| react-hook-form | Formulario de login (`register`, `handleSubmit`), como en la clase |
| Tailwind CSS 4 | Estilos con clases utilitarias y tema propio en `src/index.css` |
| Google Fonts | Fraunces (títulos) e Inter (texto) |
| Unsplash | Fotos libres de uso, guardadas en `src/assets/fotos/` e importadas en `src/data/imagenes.js` (funcionan sin internet) |

## Estructura

```
red-apoyo-react/
├── index.html              página base donde React se monta (#root)
├── vite.config.js          plugins de React y Tailwind
├── package.json            dependencias y scripts
├── public/favicon.svg
└── src/
    ├── main.jsx            punto de entrada: monta <App />
    ├── api/                llamadas al backend con axios, una por endpoint
    │   ├── axios.js            instancia con la URL base, el token y el manejo del 401
    │   ├── auth.js             login, registro, perfil (Fajardo)
    │   ├── solicitudes.js      solicitud, derivación, bandeja, ficha (Alfaro, Briones, Méndez)
    │   └── talleres.js         talleres, mantenedores, reportes, bitácora (Mena)
    ├── App.jsx             rutas + sesión compartida (estado global)
    ├── index.css           Tailwind + tema (colores, fuentes, breakpoints)
    ├── components/         piezas reutilizables
    │   ├── Header.jsx          encabezado común con navegación
    │   ├── Footer.jsx          pie común
    │   ├── AvisoEmergencia.jsx aviso "no es canal de emergencia"
    │   ├── EncabezadoPagina.jsx banda con foto al inicio de cada página
    │   ├── Seccion.jsx         bloque con título y bajada
    │   ├── Tarjeta.jsx         tarjeta con imagen, título, texto y pie
    │   ├── Campo.jsx           etiqueta + input + error
    │   ├── OpcionTarjeta.jsx   radio o checkbox con forma de tarjeta
    │   ├── GrupoOpciones.jsx   lista de OpcionTarjeta con map()
    │   ├── PasoFormulario.jsx  bloque numerado de un formulario
    │   ├── Pestanas.jsx        botones de pestañas
    │   ├── Insignia.jsx        etiqueta de color (estado, urgencia)
    │   ├── Kpi.jsx             número destacado
    │   ├── Modal.jsx           ventana emergente
    │   ├── SubirAlCambiar.jsx  scroll al cambiar de página
    │   ├── RequiereSesion.jsx  pide sesión y el perfil correcto antes de mostrar una página
    │   ├── inicio/             Acceso, FormIngreso, FormRegistro, Resultado, Respiracion
    │   ├── solicitud/          AreaTexto, QuePasaDespues
    │   ├── bandeja/            FiltrosBandeja, TablaSolicitudes, Paginacion, ModalAsignacion
    │   ├── ficha/              LineaTiempo, Observaciones, TablaCitas, Aviso, FormCierre
    │   └── talleres/           TallerTarjeta, PanelMantenedores, PanelReportes, TablaBitacora
    ├── pages/              una por pantalla
    ├── data/               textos y opciones fijas (los datos reales vienen del backend)
    └── utils/              sesión en localStorage con try/catch y validaciones
```

## Reparto

| Página | Ruta | Integrante | Requisitos |
|---|---|---|---|
| `Inicio.jsx` + `components/inicio/` | `/` | Fajardo Zamora | RF1, CU1: home, login y registro |
| `SolicitudEstudiante.jsx`, `DerivacionDocente.jsx`, `Confirmacion.jsx`, `MisSolicitudes.jsx` + `components/solicitud/` | `/solicitud`, `/derivacion`, `/confirmacion`, `/mis-solicitudes` | Alfaro Sánchez | RF2, RF3 |
| `Bandeja.jsx` + `components/bandeja/` | `/bandeja` | Briones Osorio | RF4, RF5 |
| `FichaCaso.jsx` + `components/ficha/` | `/ficha`, `/ficha/:id` | Méndez Muñoz | RF6, RF7, RF11 |
| `Talleres.jsx` + `components/talleres/` | `/talleres` | Mena Navea | RF8, RF9, RF10, RF12 |

## Flujo conectado (demo)

1. **Estudiante** entra y pide apoyo en `/solicitud`. El backend crea la
   solicitud en MongoDB con su folio (`RA-2026-0003`) y se ve en `/confirmacion`.
2. **Orientador** la ve en `/bandeja`, la clasifica y le asigna un profesional.
3. **Profesional** la abre en `/ficha`, registra una cita y una observación, y
   la cierra.
4. **Estudiante** ve en `/mis-solicitudes` los avisos y en su ficha la cita,
   pero no las observaciones internas.
5. **Admin** revisa en `/talleres` el reporte agregado, los mantenedores y la
   bitácora.

## Responsivo

Mobile-first con los breakpoints del grupo: **720 px** (`md`) y **1000 px**
(`lg`), definidos en `src/index.css`. En celular el menú se abre con un botón y
la bandeja cambia la tabla por tarjetas. Las animaciones se apagan si el
sistema pide menos movimiento (`prefers-reduced-motion`).

## La versión anterior

Las maquetas de la Entrega 1 están guardadas en `../backups/entrega1-html/`,
una carpeta por integrante, para poder comparar.