const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');

const app = express();
const server = http.createServer(app);
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
};

const io = new Server(server, {
  cors: corsOptions
});

// ========== EXPORTAR IO ==========
global.io = io;
module.exports.io = io;

// ========== WEBSOCKET ==========
require('./src/websocket')(io);

// ========== MIDDLEWARES ==========
app.use(cors(corsOptions));

// Configurar límites altos para payloads grandes (imágenes en base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// REDIRECCION DE RAIZ A HOME
app.get('/', (req, res) => {
  res.redirect('/api/home');
});

// ========== DOCUMENTACION SWAGGER ==========
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'RenovaRed API Docs'
}));

// Ruta para obtener la especificacion JSON (para exportar)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// ========== RUTAS ==========
const homeRoutes = require('./src/routes/home.routes');
app.use('/api/home', homeRoutes);

const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./src/routes/profile.routes');
app.use('/api/profile', profileRoutes);

const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);

const categoryRoutes = require('./src/routes/category.routes');
app.use('/api/categories', categoryRoutes);

const publicationRoutes = require('./src/routes/publication.routes');
app.use('/api/publications', publicationRoutes);

const conversationRoutes = require('./src/routes/conversation.routes');
app.use('/api/conversations', conversationRoutes);

const exchangeRoutes = require('./src/routes/exchange.routes');
app.use('/api/exchanges', exchangeRoutes);

const favoriteRoutes = require('./src/routes/favorite.routes');
app.use('/api/favorites', favoriteRoutes);

const dailyStatsRoutes = require('./src/routes/dailyStats.routes');
app.use('/api/stats', dailyStatsRoutes);

const messageRoutes = require('./src/routes/message.routes');
app.use('/api/conversations/:conversationId/messages', messageRoutes);

const healthRoutes = require('./src/routes/health.routes');
app.use('/api/health', healthRoutes);

// 404 para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Puerto
const PORT = process.env.PORT || 3000;
const publicBaseUrl = (process.env.PUBLIC_API_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

// Configuración adicional del servidor
server.maxHeadersCount = 2000;
server.timeout = 120000;

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`==========RenovaRed==========`);
    console.log(` - RenovaRed activo en: ${publicBaseUrl}`);
    console.log(` - Health check: ${publicBaseUrl}/api/health`);
    console.log(` - Swagger: ${publicBaseUrl}/api-docs`);
    console.log(` - Swagger JSON: ${publicBaseUrl}/api-docs.json`);
    console.log(`============================`);
});
