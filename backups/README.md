# Respaldos

Versiones anteriores y material que no forma parte del proyecto actual. El
proyecto que se ejecuta está en `../backend` y `../red-apoyo-react`.

## entrega1-html/

Las maquetas de la **Entrega 1** en HTML, CSS y JS puros, una carpeta por
integrante. Se abren con `entrega1-html/index.html` (no necesitan servidor).

## aportes-companeros/

Código que mandaron después, guardado como referencia. **No está integrado**:

| Carpeta | De quién | Qué es | Por qué no se integró |
|---|---|---|---|
| `briones-bandeja/` | Briones Osorio | Un CRUD aparte de solicitudes (Express + Mongoose + React con `fetch`) | Es otro proyecto: usa `require` en vez de `import`, el puerto 5000, su propio modelo `Request` con campos en inglés y no tiene login ni permisos |
| `mena-talleres/` | Mena Navea | Una reescritura de su parte (talleres, mantenedores, reportes, bitácora) | Su `routes.js` trae solo sus rutas (reemplazarlo borraría login, solicitudes y bandeja) y su modelo Taller cambia campos que usan el seed y el frontend |

Se les quitó `node_modules` (se recrea con `npm install`) y el `.env` de Briones,
que traía su cadena de conexión a la base de datos.
