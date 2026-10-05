# Plan de Trabajo Maestro: API RESTful y Script BD (AA2-EV01)

**Programa de formación:** Desarrollo Backend con Node.js y MongoDB  
**Actividad:** AA2 - Codificar la API Restful utilizando las características de Node.JS, de acuerdo con los requerimientos establecidos  
**Evidencia:** Código fuente API RestFull y Scripts BD. AA2-EV01  
**Estudiante:** Antony Ospino  

---

## 1. Matriz de Criterios de Evaluación (Rúbrica Oficial)

| # | Indicador de Logro / Variable | Ponderación | Entregable / Estado |
|---|---|:---:|---|
| **1** | Cumple con las normas básicas de presentación de documentos escritos. | **5%** | Documento formal técnico (`INFORME_EVIDENCIA_AA2_EV01.md` / PDF) con normas de presentación. |
| **2** | Se describe claramente la necesidad que se pretende satisfacer y los usuarios/clientes objetivo. | **5%** | Sección introductoria y justificación de negocio (Sistema de Gestión de Talento Humano). |
| **3** | Se identifica claramente el esquema de base de datos propuesto como solución al problema planteado. | **10%** | Definición del esquema Mongoose, diagrama de modelo y tipos de datos. |
| **4** | Se describen todos los Endpoints que provee la API desarrollada. | **5%** | Catálogo completo de rutas RESTful (`/api/empleados`). |
| **5** | Se documenta el tipo de solicitud, los parámetros y las respuestas ofrecidas de cada endpoint. | **5%** | Tabla técnica con Verbo HTTP, Headers, Body JSON, Códigos de Estado (200, 201, 400, 404, 500) y respuestas JSON. |
| **6** | Se entregan los scripts de generación del esquema de base de datos NoSQL desarrollado. | **5%** | Script `database/seed.js` para crear e insertar documentos de prueba automáticamente. |
| **7** | Se entrega el código fuente del proyecto Node.js. | **5%** | Repositorio estructurado según el patrón MVC con dependencias oficiales. |
| **8** | Es posible ejecutar los scripts de la base de datos y verificar la construcción de colecciones y documentos. | **30%** | Comando `npm run seed` que conecta a MongoDB y puebla la colección con retroalimentación visual en consola. |
| **9** | Es posible poner en ejecución la API y verificar el funcionamiento de los endpoints. | **30%** | Servidor funcional con `npm run dev` y colección de Postman (`postman_collection.json`) lista para pruebas. |
| **Total** | | **100%** | |

---

## 2. Estructura del Proyecto (Patrón Arquitectónico MVC)

El proyecto se estructurará de forma limpia, modular y desacoplada tal como lo exige el componente formativo:

```text
Api node.js y Mongo/
│
├── config/
│   └── db.js                 # Lógica de conexión a MongoDB Atlas mediante Mongoose
│
├── controllers/
│   └── EmpleadoController.js  # Lógica de negocio (CRUD: store, index, show, update, destroy)
│
├── models/
│   └── Empleado.js           # Esquema Mongoose con validaciones y timestamps
│
├── routes/
│   └── empleadoRoutes.js     # Definición de rutas y mapeo a métodos del controlador
│
├── database/
│   └── seed.js               # Script de inicialización y poblamiento de la base de datos
│
├── .env                      # Variables de entorno (PORT, MONGO_URI) - NO se sube a repos públicos
├── .env.example              # Plantilla de variables de entorno para la instructora
├── .gitignore                # Exclusión de node_modules y .env
├── package.json              # Dependencias y scripts de ejecución (start, dev, seed)
├── server.js                 # Punto de entrada de la aplicación Express
├── postman_collection.json   # Colección de Postman exportada para pruebas en 1 clic
└── INFORME_EVIDENCIA_AA2_EV01.md # Documento formal de entrega con todos los requisitos
```

---

## 3. Modelo de Datos NoSQL (`Empleado`)

Diseñado de acuerdo con el ejemplo y lineamientos del componente formativo, con tipos de datos y validaciones:

| Campo | Tipo BSON / Mongoose | Requerido | Descripción |
|---|---|:---:|---|
| `_id` | ObjectId | Automático | Identificador único generado por MongoDB |
| `nombre` (`name`) | String | Sí | Nombre completo del empleado |
| `correo` (`email`) | String | Sí, único | Correo electrónico corporativo |
| `telefono` (`phone`) | String | Sí | Número de celular / teléfono de contacto |
| `edad` (`age`) | Number | Sí | Edad en años (entero positivo) |
| `cargo` | String | Opcional | Cargo o departamento del empleado |
| `createdAt` | Date | Automático | Fecha de creación del registro (`timestamps: true`) |
| `updatedAt` | Date | Automático | Fecha de última actualización (`timestamps: true`) |

---

## 4. Catálogo de Endpoints RESTful

| Método HTTP | Ruta | Descripción | Código Éxito |
|:---:|---|---|:---:|
| `GET` | `/api/empleados` | Obtener todos los empleados registrados | `200 OK` |
| `GET` | `/api/empleados/:id` | Obtener un empleado por su ID de MongoDB | `200 OK` |
| `POST` | `/api/empleados` | Registrar un nuevo empleado | `201 Created` |
| `PUT` | `/api/empleados/:id` | Actualizar los datos de un empleado existente | `200 OK` |
| `DELETE` | `/api/empleados/:id` | Eliminar un empleado por su ID | `200 OK` |

---

## 5. Hoja de Ruta de Ejecución

- [x] **Fase 1: Diagnóstico y Planificación**
  - Análisis de los PDFs de evaluación y material de estudio.
  - Creación del presente Plan de Trabajo (`PLAN_DE_TRABAJO.md`).
- [x] **Fase 2: Conexión con MongoDB Atlas**
  - Configuración de regla de red `0.0.0.0/0` y usuario en Atlas.
  - Configuración del archivo `.env` y `.env.example`.
- [x] **Fase 3: Construcción del Código Fuente (API)**
  - Inicialización de `package.json` e instalación de dependencias (`express`, `mongoose`, `dotenv`, `morgan`, `cors`, `nodemon`).
  - Creación de `config/db.js`, `models/Empleado.js`, `controllers/EmpleadoController.js`, `routes/empleadoRoutes.js` y `server.js`.
- [x] **Fase 4: Script de Base de Datos**
  - Creación de `database/seed.js` con datos de prueba iniciales.
  - Ejecución verificada con `npm run seed`: creación de la colección `empleados` e inserción de 5 documentos.
- [x] **Fase 5: Pruebas y Validación con Postman**
  - Generación de `postman_collection.json`.
  - Validación automatizada exitosa de los 5 métodos del CRUD (200 OK, 201 Created).
- [x] **Fase 6: Generación del Informe Formal de Entrega**
  - Redacción completa del documento técnico `INFORME_EVIDENCIA_AA2_EV01.md` según la rúbrica oficial para la instructora.
