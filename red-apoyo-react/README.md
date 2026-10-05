# Red de Apoyo y Salud Mental Universitaria — versión React

Caso 5 del ramo **Desarrollo Web y Móvil** (UNAB). Control 2: las cinco
maquetas de la Entrega 1 (HTML, CSS y JS puros) migradas a **React + Vite**
con **Tailwind CSS**, con un solo diseño para todas las páginas.

Es solo frontend. No hay backend: la sesión y las solicitudes se simulan con
`localStorage`.

> La plataforma ordena el acceso y el seguimiento administrativo. **No reemplaza
> la atención de un profesional y no es un canal de emergencia.** Si es ahora:
> Salud Responde 600 360 7777 o Emergencias 131.

## Requisitos

- Node.js 20 o superior (se probó con Node 24)
- npm (viene con Node)

## Instalación y ejecución

```bash
cd red-apoyo-react
npm install
npm run dev
```

Se abre en <http://localhost:5173>.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión final en `dist/` |
| `npm run preview` | Sirve lo que quedó en `dist/` |
| `npm run lint` | Revisa el código con OxLint |

> Si PowerShell bloquea `npm` con un error de scripts, ejecuta una vez
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Cuentas de prueba

Todas usan la contraseña `Apoyo2026`. También aparecen en la caja de login
(se rellenan con un clic).

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
| React Router | Navegación entre páginas sin recargar (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`) |
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
    │   └── inicio/             piezas que solo usa el home
    ├── pages/              una por pantalla
    ├── data/               datos de prueba (arreglos y objetos)
    └── utils/              localStorage con try/catch y validaciones
```

## Reparto

| Página | Ruta | Integrante | Requisitos |
|---|---|---|---|
| `Inicio.jsx` | `/` | Fajardo Zamora | RF1, CU1: home, login y registro |
| `SolicitudEstudiante.jsx`, `DerivacionDocente.jsx`, `Confirmacion.jsx`, `MisSolicitudes.jsx` | `/solicitud`, `/derivacion`, `/confirmacion`, `/mis-solicitudes` | Alfaro Sánchez | RF2, RF3 |
| `Bandeja.jsx` | `/bandeja` | Briones Osorio | RF4, RF5 |
| `FichaCaso.jsx` | `/ficha` | Méndez Muñoz | RF6, RF7, RF11 |
| `Talleres.jsx` | `/talleres` | Mena Navea | RF8, RF9, RF10, RF12 |

## Flujo conectado

1. El estudiante entra (`/`) y elige un tipo de apoyo; el motivo viaja en la
   URL (`/solicitud?motivo=academico`) y el formulario lo deja marcado.
2. Al enviar, la solicitud se guarda en `localStorage` y se muestra el folio
   (`/confirmacion`).
3. La misma solicitud aparece en la bandeja del orientador (`/bandeja`) marcada
   como **nueva**, lista para asignarla a un profesional.

## Responsivo

Mobile-first con los breakpoints del grupo: **720 px** (`md`) y **1000 px**
(`lg`), definidos en `src/index.css`. En celular el menú se abre con un botón y
la bandeja cambia la tabla por tarjetas. Las animaciones se apagan si el
sistema pide menos movimiento (`prefers-reduced-motion`).

## La versión anterior

Las maquetas de la Entrega 1 siguen intactas en las carpetas de cada
integrante (`1-Fajardo-Zamora/`, `2-Alfaro-Sanchez/`, etc.) y en el
`index.html` de la raíz, para poder comparar.
