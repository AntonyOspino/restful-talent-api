# INFORME TÉCNICO DE EVIDENCIA DE APRENDIZAJE

**Programa de Formación:** Desarrollo Backend con Node.JS y MongoDB  
**Actividad de Aprendizaje:** AA2 - Codificar la API Restfull utilizando las características de Node.JS, de acuerdo con los requerimientos establecidos  
**Evidencia de Producto:** Código fuente API RestFull y Scripts BD. AA2-EV01  
**Resultado de Aprendizaje:** 220501123-02. Construir la API de acuerdo con los requerimientos establecidos  
**Aprendiz:** Antony Ospino  
**Fecha:** Octubre de 2026  

---

## 1. INTRODUCCIÓN Y DESCRIPCIÓN DE LA NECESIDAD (Criterio 1 y 2 - 10%)

### 1.1. Necesidad que se pretende satisfacer
En las organizaciones modernas, la administración del talento humano requiere sistemas ágiles, desacoplados y altamente escalables que permitan gestionar el ciclo de vida de la información de los colaboradores sin comprometer la integridad ni la disponibilidad del sistema principal.

Tradicionalmente, las aplicaciones acoplaban la lógica del negocio directamente a motores de bases de datos relacionales rígidos, lo cual dificultaba la incorporación de nuevos atributos, la integración con múltiples clientes (aplicaciones móviles, plataformas web o sistemas de nómina externos) y el escalamiento horizontal.

Para dar respuesta a esta problemática, se desarrolló una **API RESTful orientada a servicios construida con Node.js y Express**, conectada a una base de datos NoSQL documental **MongoDB Atlas**. Esta arquitectura permite que cualquier cliente autorizado consulte, registre, actualice y elimine información de los empleados de forma asíncrona, no bloqueante y bajo un estándar de intercambio de datos ligero en formato JSON.

### 1.2. Usuarios y Clientes Objetivo
* **Administradores y Analistas de Talento Humano:** Personal encargado de registrar contrataciones, actualizar cargos, números telefónicos o gestionar desvinculaciones.
* **Aplicaciones Clientes (Frontend Web / Móvil):** Aplicaciones internas que consumen los servicios para dashboards de empleados y portales corporativos.
* **Sistemas de Terceros:** Servicios de nómina, control de acceso y plataformas de capacitación empresarial.

---

## 2. ESQUEMA DE BASE DE DATOS NOSQL PROPUESTO (Criterio 3 - 10%)

### 2.1. Modelo Conceptual y Documental
En MongoDB, los datos se almacenan en formato de documentos BSON dentro de colecciones. La solución propuesta define la colección `empleados`, cuyo esquema fue modelado mediante la biblioteca **Mongoose** aplicando validaciones estrictas y marcas de tiempo automáticas (`timestamps`).

```text
+-----------------------------------------------------------+
|                   COLECCIÓN: empleados                    |
+-----------------------------------------------------------+
| _id          : ObjectId (Autogenerado por MongoDB)       |
| nombre       : String   (Requerido, trim)                 |
| correo       : String   (Requerido, único, regex email)   |
| telefono     : String   (Requerido, trim)                 |
| edad         : Number   (Requerido, min: 18, max: 100)    |
| cargo        : String   (Opcional, default: Dev Backend)  |
| createdAt    : ISODate  (Auditoría creación automática)   |
| updatedAt    : ISODate  (Auditoría actualización autom.)  |
+-----------------------------------------------------------+
```

### 2.2. Definición del Esquema Mongoose (`models/Empleado.js`)
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true, lowercase: true, trim: true },
    telefono: { type: String, required: [true, 'El teléfono es obligatorio'], trim: true },
    edad: { type: Number, required: [true, 'La edad es obligatoria'], min: 18, max: 100 },
    cargo: { type: String, default: 'Desarrollador Backend', trim: true }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Empleado', empleadoSchema);
```

---

## 3. CATÁLOGO Y DOCUMENTACIÓN DE ENDPOINTS (Criterio 4 y 5 - 10%)

La API expone los servicios bajo el prefijo unificado `/api/empleados` (y `/api/empleado` para compatibilidad de nomenclatura).

### 3.1. Resumen de Endpoints

| Método | Endpoint | Descripción | Código Éxito |
|---|---|---|:---:|
| `GET` | `/` | Información general y estado de la API | 200 OK |
| `GET` | `/api/empleados` | Obtener listado de todos los empleados | 200 OK |
| `GET` | `/api/empleados/:id` | Consultar un empleado específico por su ID | 200 OK |
| `POST` | `/api/empleados` | Registrar un nuevo empleado | 201 Created |
| `PUT` | `/api/empleados/:id` | Modificar parcialmente o totalmente un empleado | 200 OK |
| `DELETE` | `/api/empleados/:id` | Eliminar de forma definitiva a un empleado | 200 OK |
| `POST` | `/api/empleados/restaurar` | Restaurar la colección a sus 5 documentos originales de prueba | 200 OK |

---

### 3.2. Detalle Técnico de cada Solicitud

#### 1. Listar Empleados
* **Método:** `GET`
* **Ruta:** `http://localhost:3000/api/empleados`
* **Headers:** `Content-Type: application/json`
* **Parámetros:** Ninguno
* **Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "total": 5,
  "data": [
    {
      "_id": "67a3f81e3a12b45c89d001a1",
      "nombre": "Jhonatan Pérez",
      "correo": "jhonatan.perez@empresa.com",
      "telefono": "3001234567",
      "edad": 28,
      "cargo": "Desarrollador Backend Senior",
      "createdAt": "2026-10-05T20:00:00.000Z",
      "updatedAt": "2026-10-05T20:00:00.000Z"
    }
  ]
}
```

#### 2. Registrar Empleado
* **Método:** `POST`
* **Ruta:** `http://localhost:3000/api/empleados`
* **Headers:** `Content-Type: application/json`
* **Cuerpo de Solicitud (Body JSON):**
```json
{
  "nombre": "Mariana Duarte",
  "correo": "mariana.duarte@empresa.com",
  "telefono": "3189990011",
  "edad": 27,
  "cargo": "Ingeniera DevOps"
}
```
* **Respuesta Exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Empleado registrado exitosamente",
  "data": {
    "_id": "67a3f8903a12b45c89d001b2",
    "nombre": "Mariana Duarte",
    "correo": "mariana.duarte@empresa.com",
    "telefono": "3189990011",
    "edad": 27,
    "cargo": "Ingeniera DevOps",
    "createdAt": "2026-10-05T20:15:30.000Z",
    "updatedAt": "2026-10-05T20:15:30.000Z"
  }
}
```
* **Respuesta de Error (400 Bad Request):**
```json
{
  "success": false,
  "message": "Ya existe un empleado registrado con ese correo electrónico"
}
```

#### 3. Consultar Empleado por ID
* **Método:** `GET`
* **Ruta:** `http://localhost:3000/api/empleados/:id`
* **Parámetros de Ruta:** `:id` (Identificador ObjectId de MongoDB)
* **Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67a3f8903a12b45c89d001b2",
    "nombre": "Mariana Duarte",
    "correo": "mariana.duarte@empresa.com",
    "telefono": "3189990011",
    "edad": 27,
    "cargo": "Ingeniera DevOps"
  }
}
```
* **Respuesta de Error (404 Not Found):**
```json
{
  "success": false,
  "message": "No se encontró ningún empleado con el ID: 67a3f8903a12b45c89d00999"
}
```

#### 4. Actualizar Empleado
* **Método:** `PUT`
* **Ruta:** `http://localhost:3000/api/empleados/:id`
* **Cuerpo de Solicitud (Body JSON):**
```json
{
  "telefono": "3191112233",
  "cargo": "Líder de Arquitectura Cloud",
  "edad": 29
}
```
* **Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Empleado actualizado exitosamente",
  "data": {
    "_id": "67a3f8903a12b45c89d001b2",
    "nombre": "Mariana Duarte",
    "correo": "mariana.duarte@empresa.com",
    "telefono": "3191112233",
    "edad": 29,
    "cargo": "Líder de Arquitectura Cloud"
  }
}
```

#### 5. Eliminar Empleado
* **Método:** `DELETE`
* **Ruta:** `http://localhost:3000/api/empleados/:id`
* **Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Empleado eliminado exitosamente",
  "data": {
    "_id": "67a3f8903a12b45c89d001b2",
    "nombre": "Mariana Duarte"
  }
}
```

#### 6. Restaurar Base de Datos a Estado Inicial
* **Método:** `POST`
* **Ruta:** `http://localhost:3000/api/empleados/restaurar`
* **Descripción:** Restablece la colección `empleados` a los 5 registros iniciales predefinidos. Permite a los evaluadores re-probar la API cuantas veces deseen sin importar si eliminaron o alteraron documentos.
* **Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Base de datos restaurada con éxito a su estado original",
  "total": 5,
  "data": [ ... ]
}
```

---

## 4. SCRIPTS DE GENERACIÓN DE BASE DE DATOS NOSQL (Criterio 6 y 8 - 35%)

Se implementó el script automatizado [seed.js](file:///c:/Users/tonny/OneDrive/Documents/CURSO%20MONGO-DB/Api%20node.js%20y%20Mongo/database/seed.js) dentro del directorio `database/`.

### 4.1. Instrucciones de Ejecución del Script
Para que el evaluador verifique la creación automática de la base de datos, la colección y los documentos:

```bash
# 1. Instalar dependencias si es la primera vez
npm install

# 2. Ejecutar el script de inicialización y población
npm run seed
```

### 4.2. Resultado Obtenido en Consola:
```text
--------------------------------------------------
Iniciando script de generación y población de BD NoSQL...
Conectando a MongoDB Atlas...
Conexión establecida exitosamente.
Documentos anteriores eliminados: 0
Insertando 5 empleados de prueba...
--------------------------------------------------
¡Colección "empleados" creada y poblada con éxito!
Total de documentos insertados: 5
--------------------------------------------------
[1] ID: ... | Nombre: Jhonatan Pérez | Correo: jhonatan.perez@empresa.com | Cargo: Desarrollador Backend Senior
[2] ID: ... | Nombre: Carolina Gómez | Correo: carolina.gomez@empresa.com | Cargo: Líder Técnica de Proyectos
[3] ID: ... | Nombre: Andrés Morales | Correo: andres.morales@empresa.com | Cargo: Desarrollador Fullstack Junior
[4] ID: ... | Nombre: Valeria Restrepo | Correo: valeria.restrepo@empresa.com | Cargo: Diseñadora UI/UX
[5] ID: ... | Nombre: Diego Sánchez | Correo: diego.sanchez@empresa.com | Cargo: Administrador de Base de Datos
--------------------------------------------------
Conexión cerrada correctamente. Proceso completado.
```

---

## 5. PUESTA EN MARCHA Y VERIFICACIÓN DE LA API (Criterio 7 y 9 - 35%)

### 5.1. Ejecución del Servidor
```bash
# Modo desarrollo con reinicio automático (Nodemon)
npm run dev

# O modo estándar
npm start
```
Salida en consola esperada:
```text
[nodemon] starting node server.js
Conexion exitosa a la BD!!
Host: cluster0.6bihswg.mongodb.net
Base de datos: empleados_db
Servidor corriendo en el puerto 3000
```

### 5.2. Validación con Postman
Se adjunta el archivo [postman_collection.json](file:///c:/Users/tonny/OneDrive/Documents/CURSO%20MONGO-DB/Api%20node.js%20y%20Mongo/postman_collection.json) listo para ser importado en Postman:
1. Abrir Postman.
2. Hacer clic en **Import** (esquina superior izquierda).
3. Seleccionar o arrastrar el archivo `postman_collection.json`.
4. Ejecutar secuencialmente las solicitudes preconfiguradas.

---

## 6. CONCLUSIONES
* Se implementó con éxito una API RESTful desacoplada adoptando el patrón arquitectónico Modelo-Controlador-Rutas, disminuyendo la interdependencia entre componentes tal como lo recomienda la guía del curso.
* Se utilizó Mongoose para asegurar la consistencia del esquema de datos NoSQL y gestionar las conexiones seguras hacia MongoDB Atlas.
* Todos los métodos HTTP asociados al ciclo CRUD (Create, Read, Update, Delete) responden conforme a los estándares de la industria con códigos de estado semánticos y formato JSON.
