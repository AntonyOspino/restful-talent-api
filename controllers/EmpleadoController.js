const Empleado = require('../models/Empleado');

/**
 * Controlador de Empleado
 * Implementa las operaciones CRUD completas sobre la colección de MongoDB.
 */

// 1. Listar todos los empleados (GET /api/empleados)
const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: empleados.length,
      data: empleados
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al consultar los empleados',
      error: error.message
    });
  }
};

// 2. Obtener un empleado por ID (GET /api/empleados/:id)
const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findById(id);

    if (!empleado) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún empleado con el ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: empleado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'ID no válido o error en la consulta',
      error: error.message
    });
  }
};

// 3. Crear un nuevo empleado (POST /api/empleados)
const crearEmpleado = async (req, res) => {
  try {
    const { nombre, correo, telefono, edad, cargo } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !correo || !telefono || !edad) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, correo, telefono y edad son obligatorios'
      });
    }

    // Verificar si el correo ya existe
    const existeCorreo = await Empleado.findOne({ correo: correo.toLowerCase().trim() });
    if (existeCorreo) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un empleado registrado con ese correo electrónico'
      });
    }

    const nuevoEmpleado = new Empleado({
      nombre,
      correo,
      telefono,
      edad,
      cargo
    });

    const empleadoGuardado = await nuevoEmpleado.save();

    res.status(201).json({
      success: true,
      message: 'Empleado registrado exitosamente',
      data: empleadoGuardado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ocurrió un error al registrar el empleado',
      error: error.message
    });
  }
};

// 4. Actualizar un empleado existente (PUT /api/empleados/:id)
const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, edad, cargo } = req.body;

    const datosActualizar = {};
    if (nombre) datosActualizar.nombre = nombre;
    if (correo) datosActualizar.correo = correo.toLowerCase().trim();
    if (telefono) datosActualizar.telefono = telefono;
    if (edad) datosActualizar.edad = edad;
    if (cargo) datosActualizar.cargo = cargo;

    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      { $set: datosActualizar },
      { new: true, runValidators: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún empleado con el ID: ${id} para actualizar`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Empleado actualizado exitosamente',
      data: empleadoActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ocurrió un error al actualizar el empleado',
      error: error.message
    });
  }
};

// 5. Eliminar un empleado (DELETE /api/empleados/:id)
const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún empleado con el ID: ${id} para eliminar`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Empleado eliminado exitosamente',
      data: empleadoEliminado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ocurrió un error al eliminar el empleado',
      error: error.message
    });
  }
};

// 6. Restaurar Base de Datos a su estado original (POST /api/empleados/restaurar)
const empleadosIniciales = [
  {
    nombre: 'Jhonatan Pérez',
    correo: 'jhonatan.perez@empresa.com',
    telefono: '3001234567',
    edad: 28,
    cargo: 'Desarrollador Backend Senior'
  },
  {
    nombre: 'Carolina Gómez',
    correo: 'carolina.gomez@empresa.com',
    telefono: '3109876543',
    edad: 32,
    cargo: 'Líder Técnica de Proyectos'
  },
  {
    nombre: 'Andrés Felipe Morales',
    correo: 'andres.morales@empresa.com',
    telefono: '3205551234',
    edad: 25,
    cargo: 'Desarrollador Fullstack Junior'
  },
  {
    nombre: 'Valeria Restrepo',
    correo: 'valeria.restrepo@empresa.com',
    telefono: '3154448899',
    edad: 30,
    cargo: 'Diseñadora UI/UX'
  },
  {
    nombre: 'Diego Armando Sánchez',
    correo: 'diego.sanchez@empresa.com',
    telefono: '3127773322',
    edad: 35,
    cargo: 'Administrador de Base de Datos'
  }
];

const restaurarBaseDeDatos = async (req, res) => {
  try {
    await Empleado.deleteMany({});
    const insertados = await Empleado.insertMany(empleadosIniciales);
    res.status(200).json({
      success: true,
      message: 'Base de datos restaurada con éxito a su estado original',
      total: insertados.length,
      data: insertados
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al restaurar la base de datos',
      error: error.message
    });
  }
};

module.exports = {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  restaurarBaseDeDatos
};
