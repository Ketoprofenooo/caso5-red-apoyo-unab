# Red de Apoyo y Salud Mental Universitaria

Caso 5 del ramo **Desarrollo Web y Móvil** (UNAB). Entrega 2: aplicación MERN.

```
red-apoyo-react/   Frontend: React + Vite + Tailwind + axios   → http://localhost:5173
backend/           Backend: Node + Express + MongoDB (Mongoose) → http://localhost:4000/api
backups/           Entrega 1 en HTML y código que mandaron los compañeros (no se usa)
render.yaml        Configuración para publicar el backend en Render
```

## Cómo se ejecuta

Necesita Node.js y MongoDB corriendo en `localhost:27017`.

Terminal 1, backend:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Terminal 2, frontend:

```bash
cd red-apoyo-react
npm install
npm run dev
```

Abrir <http://localhost:5173>. Cuentas de prueba: `estudiante@universidad.cl`,
`docente@`, `orientador@`, `profesional@` y `admin@universidad.cl`, todas con la
contraseña `clave1234`.

Para probar la API sin la página: `backend/postman/` tiene la colección de
Postman con 42 peticiones y una guía de uso.

## Reparto

| Integrante | Frontend | Backend | RF |
|---|---|---|---|
| Fajardo Zamora | `pages/Inicio.jsx` (login y registro) | `autCont.js`, `models/usuario.js` | RF1 |
| Alfaro Sánchez | Solicitud, derivación, confirmación, mis solicitudes | `crearSolicitud`, `derivarEstudiante` | RF2, RF3 |
| Briones Osorio | `pages/Bandeja.jsx` | `clasificarSolicitud`, `asignarProfesional` | RF4, RF5 |
| Méndez Muñoz | `pages/FichaCaso.jsx` | `registrarSeguimiento`, `cerrarSolicitud` | RF6, RF7, RF11 |
| Mena Navea | `pages/Talleres.jsx` | `tallerCont.js`, `adminCont.js` | RF8 a RF12 |

Detalle de cada parte en `backend/README.md` y `red-apoyo-react/README.md`.

> La plataforma no reemplaza la atención de un profesional y no es un canal de
> emergencia. Si es ahora: Salud Responde 600 360 7777 o Emergencias 131.
