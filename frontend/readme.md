## Frontend en Render

Build command:

```bash
npm install && npm run build:render
```

Publish directory:

```bash
dist/renovared/browser
```

Variables:

- `API_URL=https://tu-backend.onrender.com/api`
- `GOOGLE_CLIENT_ID=` si usás login con Google

`build:render` genera `src/environments/environment.prod.ts` con los valores de Render antes de compilar.
