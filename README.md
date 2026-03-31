# RenovaRed

Proyecto preparado para desplegar en Render con:

- `backend` como Web Service Node/Express
- `frontend` Angular como Static Site
- `render.yaml` para crear ambos servicios

## Variables importantes

Backend:

- `JWT_SECRET`
- `DATABASE_URL` o `DB_HOST` + `DB_PORT` + `DB_NAME` + `DB_USER` + `DB_PASSWORD`
- `DB_SSL` (`true` para Supabase, `false` para Render Postgres interno)
- `GOOGLE_CLIENT_ID` si usás login con Google
- credenciales de Mercado Pago si aplica

Frontend:

- `API_URL` apuntando a la URL del backend
- `GOOGLE_CLIENT_ID` si usás login con Google

## Deploy en Render

1. Importá el repo en Render.
2. Si querés usar blueprint, Render detectará `render.yaml`.
3. Completá las variables marcadas como `sync: false`.
4. Si usás base de datos de Render, normalmente conviene `DB_SSL=false`.

## Builds locales

- Frontend producción para Render: `npm --prefix frontend run build:render`
- Backend build: `npm --prefix backend run build`
