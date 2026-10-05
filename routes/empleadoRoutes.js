const express = require('express');
const router = express.Router();
const {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  restaurarBaseDeDatos
} = require('../controllers/EmpleadoController');

// Rutas RESTful estándar
router.get('/', obtenerEmpleados);
router.get('/:id', obtenerEmpleadoPorId);
router.post('/', crearEmpleado);
router.put('/:id', actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

// Endpoints de utilidad y compatibilidad
router.post('/guardar', crearEmpleado);
router.post('/restaurar', restaurarBaseDeDatos);

module.exports = router;
