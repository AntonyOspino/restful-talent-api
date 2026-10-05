require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const empleadoRoutes = require('./routes/empleadoRoutes');

// Inicializar la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
connectDB();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales (soporta tanto plural como singular para máxima compatibilidad)
app.use('/api/empleados', empleadoRoutes);
app.use('/api/empleado', empleadoRoutes);

// Ruta de bienvenida y verificación de estado
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API RESTful de Gestión de Empleados en ejecución',
    autor: 'Antony Ospino',
    version: '1.0.0',
    endpoints: {
      listar_empleados: 'GET /api/empleados',
      obtener_empleado: 'GET /api/empleados/:id',
      crear_empleado: 'POST /api/empleados',
      actualizar_empleado: 'PUT /api/empleados/:id',
      eliminar_empleado: 'DELETE /api/empleados/:id'
    }
  });
});

// Middleware para manejo de rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `La ruta ${req.originalUrl} no fue encontrada en este servidor`
  });
});

// Puerto de ejecución
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
