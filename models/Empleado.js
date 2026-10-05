const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Esquema de Empleado
 * Define la estructura de los documentos en la colección 'empleados'.
 * Cumple con los requerimientos del componente formativo "Construcción de API RESTful con Node.js".
 */
const empleadoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    correo: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo electrónico válido']
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true
    },
    edad: {
      type: Number,
      required: [true, 'La edad es obligatoria'],
      min: [18, 'La edad mínima requerida es 18 años'],
      max: [100, 'La edad máxima permitida es 100 años']
    },
    cargo: {
      type: String,
      default: 'Desarrollador Backend',
      trim: true
    }
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    versionKey: false
  }
);

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
