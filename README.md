# API RESTful con Node.js y MongoDB Atlas (Evidencia AA2-EV01)

**Programa de Formación:** Desarrollo Backend con Node.JS y MongoDB  
**Actividad:** AA2 - Codificar la API Restfull utilizando las características de Node.JS  
**Aprendiz:** Antony Ospino  

---

## Instrucciones de Puesta en Marcha (Para el Evaluador)

### Paso 1: Instalar dependencias
Abra una terminal en la carpeta raíz del proyecto y ejecute:
```bash
npm install
```

### Paso 2: Verificar la Base de Datos NoSQL (Script Seed)
Para conectar a MongoDB Atlas, crear la colección `empleados` y poblarla con los 5 documentos iniciales:
```bash
npm run seed
```

### Paso 3: Iniciar el Servidor de la API
```bash
npm start
```
*O en modo desarrollo con nodemon:*
```bash
npm run dev
```

El servidor quedará en ejecución en: `http://localhost:3000`

---

## Pruebas de Endpoints con Postman

Se incluye en la raíz el archivo `postman_collection.json`:
1. Abra **Postman**.
2. Haga clic en **Import** y seleccione el archivo `postman_collection.json`.
3. Podrá ejecutar directamente las 7 solicitudes preconfiguradas del CRUD:
   - **GET** `/api/empleados` (Listar todos)
   - **POST** `/api/empleados` (Crear empleado)
   - **GET** `/api/empleados/:id` (Consultar por ID)
   - **PUT** `/api/empleados/:id` (Actualizar empleado)
   - **DELETE** `/api/empleados/:id` (Eliminar empleado)
   - **POST** `/api/empleados/restaurar` (Restaurar los 5 documentos iniciales)
