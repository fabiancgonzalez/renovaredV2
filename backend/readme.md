## Backend en Render

Variables recomendadas:

- `PORT` lo maneja Render
- `NODE_ENV=production`
- `PUBLIC_API_URL=https://tu-backend.onrender.com`
- `FRONTEND_URL=https://tu-frontend.onrender.com`
- `JWT_SECRET`
- `DATABASE_URL` o credenciales `DB_*`
- `DB_SSL=true|false`
- `GOOGLE_CLIENT_ID` si usás autenticación Google

Notas:

- El servidor acepta `FRONTEND_URL` o `CORS_ORIGINS` para CORS y Socket.IO.
- Si tu base está en Supabase, usá `DB_SSL=true`.
- Si usás Postgres interno de Render, probá primero con `DB_SSL=false`.
