# Contexto del proyecto

API del Caso 5 — Red de Apoyo y Salud Mental Universitaria. Ramo Desarrollo
Web y Móvil, UNAB. Entrega 2, se presenta el **11 de noviembre**. Trabajo
grupal de 5 integrantes; yo soy Jose Fajardo.

La Entrega 1 fueron maquetas HTML/CSS/JS. Esta entrega es MERN.

## Stack y restricciones

- Node + Express 5 + MongoDB con Mongoose. ES modules (`"type": "module"`).
- El frontend es React 19 + Vite + axios, corre en `http://localhost:5173`.
- **No agregues dependencias sin preguntar.** Lo instalado es: express,
  mongoose, morgan, cors, bcryptjs, jsonwebtoken, dotenv, nodemon.
- Nada de TypeScript, nada de ORMs alternativos, nada de Docker.
- El nivel del ramo es básico: el profe recién pasó CRUD con Mongoose, axios y
  react-hook-form. **Todo lo que escribas lo tengo que poder explicar frente al
  profesor.** Si una solución es más elegante pero más difícil de defender,
  prefiero la simple.
- Comentarios en castellano, sin tildes en el código.

## Estructura

```
backend/src/
├── index.js            arranque
├── app.js              express, cors, morgan, montaje de rutas
├── db.js               conexión a Mongo
├── config.js           variables de entorno y constantes del caso
├── seed.js             carga inicial (npm run seed)
├── models/             usuario, solicitud, taller, maestro, bitacora
├── controllers/        autCont, solicitudCont, tallerCont, adminCont
├── routes/routes.js    todas las rutas, con permisos por perfil
├── middlewares/        auth, roles, bitacora, errores
└── validar/            validadores.js
```

## Decisiones tomadas (no las cambies sin avisarme)

- **JWT con vencimiento de 20 minutos**, no sesión de servidor. Cumple el RNF3
  directamente y el backend queda sin estado.
- **El folio se genera en un `pre("save")`** del modelo Solicitud, no en el
  controlador, para que nadie se olvide de asignarlo. Formato `RA-2026-0001`.
- **Los DELETE desactivan, no borran** (`activo: false`) en talleres y
  mantenedores, para no romper los reportes históricos.
- **Una sola colección `Maestro`** para tipos de solicitud, sedes y unidades,
  diferenciadas por el campo `categoria`.
- **El password va con `select: false`** y se cifra con bcrypt en un
  `pre("save")`.
- Seguimientos y notificaciones son **subdocumentos** dentro de Solicitud, no
  colecciones aparte.

## Trazabilidad

RF1 en `autCont.js`. RF2–RF7 y RF11 en `solicitudCont.js`. RF8 en
`tallerCont.js`. RF9, RF10 y RF12 en `adminCont.js`.

RNF1 en `middlewares/roles.js` y en la función `puedeVer` de `solicitudCont.js`.
RNF3 en el cifrado y el vencimiento del token. RNF4 y RF12 en
`middlewares/bitacora.js`. RNF6 en el `aggregate` del reporte, que solo
devuelve conteos. RNF8 en `validar/validadores.js`. RNF9 en la separación
rutas / controladores / modelos.

## Reglas de contenido del caso

- Lenguaje claro, respetuoso y **no estigmatizante** en todo mensaje que vea un
  estudiante (RNF5).
- Los reportes son **agregados**: ningún nombre, correo ni dato nominal.
- La plataforma no reemplaza atención profesional ni es canal de emergencia.
- Perfiles del sistema: `estudiante`, `docente`, `orientador`, `profesional`,
  `admin`.

## Estado actual

El backend está completo, cubre los 12 RF y **está probado contra MongoDB
local** (9.0, servicio de Windows en `localhost:27017`). El seed carga sin
errores y el flujo de 7 pasos del README pasa entero, junto con los controles
de permisos (401/403), errores (400), talleres y mantenedores.

Arreglos hechos al probarlo (4 de noviembre):

- Los `pre("save")` de `usuario.js` y `solicitud.js` usaban `next()`, que en
  Mongoose 9 ya no existe: el seed se caía. Ahora son `async` sin `next`.
- `POST /auth/registro` dejaba crearse una cuenta `admin`. Ahora todo perfil
  distinto de `estudiante` queda `activo: false` hasta que el admin lo valide.
- La bitácora guardaba `entidadId` vacío (con `router.use` no hay
  `req.params.id`). Ahora lo saca de la URL.
- `{ new: true }` pasó a `returnDocument: "after"`, como en la clase.
- Nueva ruta `GET /api/profesionales` (orientador y admin) para el selector de
  asignación de la bandeja.
- El mensaje del token vencido decía "por inactividad", pero los 20 minutos
  cuentan desde el login. Se corrigió el texto.

## Pendientes

- [x] Correr `npm run seed` y verificar que carga sin errores.
- [x] Probar el flujo de 7 pasos del README de punta a punta.
- [ ] Conectar el frontend `red-apoyo-react/`, que hoy usa datos fijos y localStorage.
- [ ] Unificar las contraseñas de prueba: el frontend muestra `Apoyo2026`, el seed usa `clave1234`.
- [ ] Decidir si se agrega recuperación de contraseña. Hoy solo la cambia el admin.
- [ ] La bitácora devuelve los últimos 200 registros sin paginar.

## Cómo quiero que trabajes

Respuestas directas, sin adornos. Si algo que pido está mal planteado o hay un
problema que no vi, dímelo. Antes de refactorizar algo grande, pregunta.
Castellano de Chile.
