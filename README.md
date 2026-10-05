# Restful Talent API 🚀

[![Node.js](https://img.shields.io/badge/Node.js-v22.19.0-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=flat-square&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Postman](https://img.shields.io/badge/Postman-Tested-FF6C37?style=flat-square&logo=postman&logoColor=white)](https://www.postman.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

Una API RESTful orientada a microservicios para la administración moderna del talento humano y colaboradores en organizaciones. Desarrollada con **Node.js**, **Express** y **MongoDB Atlas**, implementando el patrón arquitectónico **MVC (Modelo - Vista/Ruta - Controlador)**, validaciones rigurosas con Mongoose y persistencia en la nube.

---

## 📋 Tabla de Contenido

- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Modelo de Datos NoSQL](#-modelo-de-datos-nosql)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Puesta en Marcha](#-puesta-en-marcha)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
- [Pruebas Automatizadas con Postman](#-pruebas-automatizadas-con-postman)
- [Roadmap de Mejoras Futuras](#-roadmap-de-mejoras-futuras)
- [Autor](#-autor)

---

## ✨ Características Principales

* **Arquitectura Limpia & Modular:** Desacoplamiento estricto de responsabilidades siguiendo el patrón MVC.
* **Persistencia NoSQL Cloud:** Conexión asíncrona segura con **MongoDB Atlas** mediante Mongoose ODM.
* **Ciclo CRUD Completo:** Operaciones de creación, consulta por ID, listado general, actualización y eliminación permanente.
* **Esquemas & Validaciones Robustas:** Reglas estrictas de obligatoriedad, formato de correo (Regex), límites de edad y limpieza de cadenas (`trim`).
* **Auditoría Automática (`timestamps`):** Seguimiento automático de fecha y hora de creación (`createdAt`) y actualización (`updatedAt`).
* **Población Idempotente (`Seeding`):** Script `npm run seed` para inicializar y restablecer la base de datos a un estado conocido con 5 documentos de prueba.
* **Seguridad & Configuración Segura:** Variables de entorno desacopladas (`.env`) y aislamiento de credenciales en control de versiones.
* **Logs & Monitoreo en Tiempo Real:** Registro detallado de peticiones HTTP en consola mediante `morgan`.

---

## 🏗 Arquitectura del Proyecto

```text
restful-talent-api/
│
├── config/
│   └── db.js                 # Conexión asíncrona a MongoDB Atlas (Mongoose)
│
├── controllers/
│   └── EmpleadoController.js  # Lógica de negocio de los endpoints (CRUD + Restore)
│
├── models/
│   └── Empleado.js           # Esquema BSON / Mongoose con validaciones
│
├── routes/
│   └── empleadoRoutes.js     # Enrutamiento RESTful modular
│
├── database/
│   └── seed.js               # Script para poblar y reiniciar la base de datos
│
├── .env.example              # Plantilla pública de variables de entorno
├── .gitignore                # Reglas de exclusión para Git (node_modules, .env)
├── package.json              # Dependencias y scripts de ejecución
├── postman_collection.json   # Colección de pruebas para Postman lista para importar
├── README.md                 # Documentación técnica del proyecto
└── server.js                 # Punto de entrada de la aplicación Express
```

---

## 🗄 Modelo de Datos NoSQL

La colección `empleados` almacena documentos BSON con la siguiente estructura:

| Campo | Tipo BSON | Restricciones / Validaciones | Descripción |
|---|---|---|---|
| `_id` | `ObjectId` | Autogenerado por MongoDB | Identificador único inmutable |
| `nombre` | `String` | Requerido, Trim | Nombre completo del empleado |
| `correo` | `String` | Requerido, Único, Regex Email | Correo electrónico empresarial |
| `telefono` | `String` | Requerido, Trim | Número telefónico de contacto |
| `edad` | `Number` | Requerido, Min: 18, Max: 100 | Edad cronológica en años |
| `cargo` | `String` | Opcional, Default: *Dev Backend* | Rol desempeñado en la empresa |
| `createdAt` | `Date` | Timestamp Automático | Fecha de creación del registro |
| `updatedAt` | `Date` | Timestamp Automático | Fecha de última modificación |

---

## 🔌 Endpoints de la API

URL Base: `http://localhost:3000`

| Método | Endpoint | Descripción | Códigos HTTP |
|:---:|---|---|:---:|
| `GET` | `/` | Comprobar salud y rutas de la API | `200 OK` |
| `GET` | `/api/empleados` | Obtener todos los colaboradores | `200 OK` |
| `GET` | `/api/empleados/:id` | Consultar colaborador específico por su ID | `200 OK`, `404 Not Found` |
| `POST` | `/api/empleados` | Registrar un nuevo colaborador | `201 Created`, `400 Bad Request` |
| `PUT` | `/api/empleados/:id` | Actualizar atributos de un colaborador | `200 OK`, `404 Not Found` |
| `DELETE` | `/api/empleados/:id` | Eliminar definitivamente un registro | `200 OK`, `404 Not Found` |
| `POST` | `/api/empleados/restaurar` | Restablecer los 5 empleados iniciales de prueba | `200 OK` |

### Ejemplo de Payload (POST `/api/empleados`)

```json
{
  "nombre": "Mariana Duarte",
  "correo": "mariana.duarte@empresa.com",
  "telefono": "3189990011",
  "edad": 27,
  "cargo": "Ingeniera DevOps"
}
```

### Respuesta Exitosa (`201 Created`):

```json
{
  "success": true,
  "message": "Empleado registrado exitosamente",
  "data": {
    "_id": "6ac40a95475d56089f578cf3",
    "nombre": "Mariana Duarte",
    "correo": "mariana.duarte@empresa.com",
    "telefono": "3189990011",
    "edad": 27,
    "cargo": "Ingeniera DevOps",
    "createdAt": "2026-10-05T20:34:35.706Z",
    "updatedAt": "2026-10-05T20:34:35.706Z"
  }
}
```

---

## 🚀 Puesta en Marcha

### Requisitos Previos

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* [npm](https://www.npmjs.com/) (incluido con Node.js)
* Cuenta activa en [MongoDB Atlas](https://www.mongodb.com/atlas) (o instancia local de MongoDB)

### Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AntonyOspino/restful-talent-api.git
   cd restful-talent-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```
   Configura tu cadena de conexión a MongoDB Atlas en `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxx.mongodb.net/empleados_db?retryWrites=true&w=majority
   ```

4. **Poblar la Base de Datos:**
   Ejecuta el script para crear la colección e insertar 5 registros iniciales:
   ```bash
   npm run seed
   ```

5. **Iniciar el Servidor:**
   ```bash
   # Modo desarrollo (con recarga automática mediante Nodemon)
   npm run dev

   # Modo estándar
   npm start
   ```

---

## 🧪 Pruebas Automatizadas con Postman

El repositorio incluye la suite completa de pruebas en el archivo `postman_collection.json`:

1. Abre **Postman**.
2. Haz clic en **Import** y selecciona el archivo `postman_collection.json`.
3. Ejecuta las peticiones preconfiguradas directamente hacia `http://localhost:3000`.

---

## 🔮 Roadmap de Mejoras Futuras

- [ ] Autenticación y Autorización basada en **JWT (JSON Web Tokens)**.
- [ ] Roles de usuario (Administrador, Reclutador, Empleado).
- [ ] Paginación y filtrado dinámico en `GET /api/empleados?page=1&limit=10`.
- [ ] Documentación interactiva con **Swagger / OpenAPI**.
- [ ] Contenerización de entorno mediante **Docker** y Docker Compose.

---

## 👨‍💻 Autor

Desarrollado con dedicación por **Antony Ospino**  
* GitHub: [@AntonyOspino](https://github.com/AntonyOspino)  
* Portafolio y Proyectos Backend
