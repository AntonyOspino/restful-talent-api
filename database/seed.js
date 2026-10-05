require('dotenv').config();
const mongoose = require('mongoose');
const Empleado = require('../models/Empleado');

/**
 * Script de Inicialización y Población de Base de Datos NoSQL
 * Actividad: AA2-EV01 - Código fuente API RestFull y Scripts BD
 * Autor: Antony Ospino
 * 
 * Uso: npm run seed
 */

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

const poblarBaseDeDatos = async () => {
  try {
    console.log('--------------------------------------------------');
    console.log('Iniciando script de generación y población de BD NoSQL...');
    console.log('Conectando a MongoDB Atlas...');

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión establecida exitosamente.');

    // 1. Limpiar colección previa para garantizar idempotencia
    const eliminados = await Empleado.deleteMany({});
    console.log(`Documentos anteriores eliminados: ${eliminados.deletedCount}`);

    // 2. Insertar los documentos iniciales
    console.log(`Insertando ${empleadosIniciales.length} empleados de prueba...`);
    const insertados = await Empleado.insertMany(empleadosIniciales);

    console.log('--------------------------------------------------');
    console.log('¡Colección "empleados" creada y poblada con éxito!');
    console.log(`Total de documentos insertados: ${insertados.length}`);
    console.log('--------------------------------------------------');
    insertados.forEach((emp, index) => {
      console.log(`[${index + 1}] ID: ${emp._id} | Nombre: ${emp.nombre} | Correo: ${emp.correo} | Cargo: ${emp.cargo}`);
    });
    console.log('--------------------------------------------------');

    await mongoose.connection.close();
    console.log('Conexión cerrada correctamente. Proceso completado.');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la ejecución del script de BD:', error.message);
    process.exit(1);
  }
};

poblarBaseDeDatos();
