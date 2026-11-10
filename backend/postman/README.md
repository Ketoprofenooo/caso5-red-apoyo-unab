# Probar la API con Postman

`Red_de_Apoyo.postman_collection.json` tiene 42 peticiones en 6 carpetas, una
por integrante. Cada login guarda su token y las demás peticiones lo usan solas.

## Antes de empezar

En la carpeta `backend`:

```bash
npm run seed
npm run dev
```

Comprobar en el navegador: <http://localhost:4000/api/salud> → `{"ok":true}`.

## Importar

1. Abrir Postman → **Import** → arrastrar `Red_de_Apoyo.postman_collection.json`.
2. Aparece la colección **Red de Apoyo · API (Entrega 2)** con sus carpetas.
3. La variable `baseUrl` ya apunta a `http://localhost:4000/api`. Para usar la
   versión publicada en Render, se cambia en la pestaña **Variables** de la
   colección.

## Mostrar una petición

1. Abrir una petición. Por ejemplo, **2. Alfaro → Crear solicitud**.
2. Mostrar arriba el **método** y la **URL** (`POST {{baseUrl}}/solicitudes`).
3. Pestaña **Authorization**: Bearer Token con `{{tokenEstudiante}}`. Lo guardó el login.
4. Pestaña **Body** (raw, JSON): los datos que se mandan.
5. **Send**. Abajo se ve el **código** (201 Created), el **JSON** que respondió
   el backend y, en **Test Results**, las comprobaciones en verde.

Importante: dentro de cada carpeta las peticiones van en orden. Primero el
**Login** (guarda el token), y después las demás.

## Correr todo de una vez

Click derecho en la colección → **Run collection** → **Run**. Ejecuta las 42 en
orden y muestra el resultado de cada una.

## Qué muestra cada carpeta

| Carpeta | Peticiones clave | Lo que demuestra |
|---|---|---|
| 1. Fajardo | Registro, Login, Perfil, Login con clave mala (401), Perfil sin token (401) | bcrypt, JWT, validaciones |
| 2. Alfaro | Crear solicitud (201 con folio), descripción corta (400), Derivar (201), correo inexistente (404) | POST con body, validación, pre("save") |
| 3. Briones | Listar, Profesionales, Estudiante clasifica (403), Asignar sin clasificar (400), Clasificar, Asignar | PUT, permisos por perfil, reglas del negocio |
| 4. Méndez | Ver solicitud, Cita, Observación, estudiante sin observaciones, Notificaciones, Cerrar, Cerrar dos veces (409) | Subdocumentos, RNF1, estados |
| 5. Mena | Talleres, Inscribirse (y dos veces: 409), CRUD de taller, baja lógica, Reporte, Bitácora, estudiante pide reporte (403) | CRUD completo, aggregate, bitácora |

## Si algo falla

| Síntoma | Causa |
|---|---|
| `Error: connect ECONNREFUSED` | El backend no está corriendo (`npm run dev`) |
| 401 en todo | Falta ejecutar el **Login** de esa carpeta |
| 400 «El id enviado no es valido» | Falta ejecutar antes la petición que guarda ese id |
| El backend se cae al partir | MongoDB no está corriendo (servicio de Windows) |
