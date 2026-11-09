# Backend — Red de Apoyo y Salud Mental Universitaria

API REST del Caso 5. Node + Express 5 + MongoDB (Mongoose), misma estructura
de carpetas que se vio en clase.

## Instalación

```bash
cd backend
npm install
copy .env.example .env      # en Mac/Linux: cp .env.example .env
npm run seed                # carga usuarios y datos de prueba
npm run dev
```

Necesita MongoDB corriendo en `mongodb://localhost:27017`. El servidor queda en
`http://localhost:4000`. Para comprobar que levantó: `GET http://localhost:4000/api/salud`.

## Usuarios de prueba

Todos usan la contraseña `clave1234`.

| Perfil | Correo |
|---|---|
| estudiante | estudiante@universidad.cl |
| estudiante | estudiante2@universidad.cl |
| docente | docente@universidad.cl |
| orientador | orientador@universidad.cl |
| profesional | profesional@universidad.cl |
| admin | admin@universidad.cl |

## Cómo autenticarse

`POST /api/auth/login` devuelve un token. Hay que mandarlo en todas las demás
peticiones:

```
Authorization: Bearer <token>
```

El token dura 20 minutos (RNF3). Pasado ese tiempo la API responde 401 con
"La sesion expiro, vuelve a iniciar sesion". Ojo: los 20 minutos cuentan desde
el login, no desde la ultima accion.

## Endpoints

| Método | Ruta | Perfiles | RF |
|---|---|---|---|
| POST | `/api/auth/registro` | público | RF1 |
| POST | `/api/auth/login` | público | RF1 |
| GET | `/api/auth/perfil` | con sesión | RF1 |
| POST | `/api/solicitudes` | estudiante | RF2 |
| POST | `/api/solicitudes/derivacion` | docente | RF3 |
| GET | `/api/solicitudes` | todos (filtrado por perfil) | RF2–RF6 |
| GET | `/api/solicitudes/notificaciones` | estudiante | RF7 |
| GET | `/api/solicitudes/:id` | según acceso | RF6 |
| PUT | `/api/solicitudes/:id/clasificar` | orientador, admin | RF4 |
| PUT | `/api/solicitudes/:id/asignar` | orientador, admin | RF5 |
| GET | `/api/profesionales` | orientador, admin | RF5 |
| POST | `/api/solicitudes/:id/seguimiento` | profesional, orientador, admin | RF6 |
| PUT | `/api/solicitudes/:id/cerrar` | profesional, orientador, admin | RF11 |
| GET | `/api/talleres` | con sesión | RF8 |
| POST | `/api/talleres` | admin, profesional | RF8 |
| PUT | `/api/talleres/:id` | admin, profesional | RF8 |
| DELETE | `/api/talleres/:id` | admin | RF8 |
| POST | `/api/talleres/:id/inscripcion` | estudiante | RF8 |
| DELETE | `/api/talleres/:id/inscripcion` | estudiante | RF8 |
| GET/POST/PUT/DELETE | `/api/maestros` | admin | RF9 |
| GET | `/api/usuarios` | admin | RF9 |
| PUT | `/api/usuarios/:id` | admin | RF9 |
| GET | `/api/reportes/agregado` | admin, orientador | RF10 |
| GET | `/api/bitacora` | admin | RF12 |

## Flujo completo para la demo

1. Login como **estudiante** → `POST /api/solicitudes` → se genera el folio `RA-2026-0003` (el seed ya crea la 0001 y la 0002).
2. Login como **orientador** → `GET /api/solicitudes` → `PUT /:id/clasificar` con `{"tipo":"emocional"}`.
3. Mismo orientador → `GET /api/profesionales` → `PUT /:id/asignar` con `{"profesionalId":"<id del profesional>"}`.
4. Login como **profesional** → `POST /:id/seguimiento` con `{"tipoRegistro":"cita","detalle":"..."}`.
5. Login como **estudiante** → `GET /api/solicitudes/notificaciones` → aparecen los tres avisos.
6. Profesional → `PUT /:id/cerrar` con `{"motivo":"...","derivacionRealizada":"..."}`.
7. Login como **admin** → `GET /api/reportes/agregado` y `GET /api/bitacora`.

Eso recorre CU1 a CU10 sin saltarse ningún paso.

## Dónde está cada requerimiento

**Funcionales.** RF1 en `controllers/autCont.js`. RF2 a RF7 y RF11 en
`controllers/solicitudCont.js`. RF8 en `controllers/tallerCont.js`. RF9, RF10 y
RF12 en `controllers/adminCont.js`.

**No funcionales.** RNF1 (mínimo privilegio) en `middlewares/roles.js` y en la
función `puedeVer` de `solicitudCont.js`. RNF2 y RNF3: contraseña cifrada con
bcrypt en `models/usuario.js`, marcada `select:false` para que nunca viaje, y
token con vencimiento. RNF4 y RF12 en `middlewares/bitacora.js`. RNF6: el
reporte usa `aggregate` y solo devuelve conteos, ningún nombre. RNF8 en
`validar/validadores.js`. RNF9: interfaz, lógica y persistencia separadas en
rutas, controladores y modelos.

## Decisiones que conviene saber explicar

**Por qué JWT y no sesión de servidor.** El frontend es React corriendo en otro
puerto, y con token el backend no guarda estado. El vencimiento de 20 minutos
cumple el RNF3 directamente.

**Por qué el folio se genera en el modelo.** Va en un `pre("save")` de
`solicitud.js`, así ningún controlador puede olvidarse de asignarlo.

**Por qué los `delete` desactivan en vez de borrar.** Talleres y mantenedores
usan baja lógica (`activo: false`). Si se borraran de verdad, los reportes
históricos quedarían incompletos.

**Por qué una sola colección `Maestro`.** Tipos de solicitud, sedes y unidades
tienen la misma forma: nombre, descripción y activo. Tres colecciones idénticas
habría sido repetir código.

## Publicado en internet

| Pieza | Dónde |
|---|---|
| Frontend (React) | Vercel: <https://caso5-red-apoyo-unab.vercel.app> |
| Backend (Express) | Render: <https://red-apoyo-unab-api.onrender.com/api/salud> |
| Base de datos | MongoDB Atlas |

- Render se configura con `render.yaml` en la raíz del repositorio (carpeta
  `backend`, `npm install`, `npm start`).
- En Render se definen `MONGO_URI` (la cadena de Atlas) y `ORIGEN_FRONTEND`.
  `JWT_SECRET` lo genera Render.
- El frontend sabe dónde está la API por `red-apoyo-react/.env.production`.
- El plan gratis de Render se duerme tras 15 minutos sin uso: la primera
  petición puede tardar cerca de un minuto en despertar el servidor.

## Pendiente

- Falta decidir si la contraseña se recupera por correo. Hoy solo la cambia el admin.
- La bitácora devuelve los últimos 200 registros sin paginar.
