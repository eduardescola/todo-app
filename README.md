
# Todo App con React y Express

Este es un proyecto de una aplicación de lista de tareas (Todo App) creada con React en el frontend y Express en el backend. La aplicación permite agregar, editar, eliminar y completar tareas, además de cambiar entre un modo claro y oscuro.

## Tecnologías utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express, Node.js, MongoDB
- **Otros**: Mongoose, React Toastify, Lucide React

## Requisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:

- Node.js (v16 o superior)
- MongoDB (local o en la nube)

## Instalación

### Clonación del Repositorio

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/eduardescola/todo-app.git
   ```

2. Entra en el directorio del proyecto:
   ```bash
   cd todo-app
   ```

### Configuración del Backend

1. Entra en la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala las dependencias del backend:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `backend` y agrega tu URL de conexión a MongoDB:
   ```
   MONGO_URI=tu_url_de_mongodb
   ```

4. Inicia el servidor backend:
   ```bash
   npm start
   ```

El servidor backend debería estar corriendo en `http://localhost:5000`.

### Configuración del Frontend

1. Entra en la carpeta `frontend`:
   ```bash
   cd frontend
   ```

2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo del frontend:
   ```bash
   npm start
   ```

El frontend debería estar corriendo en `http://localhost:3000`.

## Características

- **Agregar Tareas**: Puedes agregar nuevas tareas a la lista.
- **Marcar Tareas como Completadas**: Las tareas pueden ser marcadas como completadas.
- **Editar Tareas**: Puedes editar las tareas existentes.
- **Eliminar Tareas**: Las tareas se pueden eliminar.
- **Prioridades**: Las tareas tienen diferentes niveles de prioridad, que se muestran con diferentes colores.
- **Modo Oscuro/Claro**: Puedes alternar entre modo oscuro y claro.
- **Notificaciones**: Utiliza notificaciones Toast para mostrar mensajes de éxito, error e información.

## Estructura del Proyecto

```
todo-app/
├── backend/
│   ├── models/
│   │   └── todo.ts
│   ├── routes/
│   │   └── todo.ts
│   ├── .env
│   ├── server.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.tsx
    │   └── index.tsx
    ├── public/
    └── package.json
```

## Explicación del Código

### Backend (Express)

El backend es un servidor Express que proporciona las siguientes rutas para manejar las tareas:

- **GET /api/todos**: Obtiene todas las tareas.
- **POST /api/todos**: Agrega una nueva tarea.
- **DELETE /api/todos/:id**: Elimina una tarea por ID.
- **PATCH /api/todos/:id**: Marca una tarea como completada.
- **PATCH /api/todos/:id/edit**: Edita una tarea existente.

El backend utiliza MongoDB como base de datos para almacenar las tareas, y Mongoose se encarga de la gestión de la base de datos.

### Frontend (React)

El frontend es una aplicación React con TypeScript que permite a los usuarios interactuar con las tareas. Utiliza los siguientes componentes:

- **Input**: Para agregar nuevas tareas.
- **Lista de tareas**: Muestra las tareas pendientes y completadas.
- **Botones de acción**: Para marcar tareas como completadas, editar o eliminar tareas.
- **Modo Oscuro/Claro**: Alterna entre los dos modos visuales.

### MongoDB

Se utiliza MongoDB para almacenar las tareas de forma persistente. Cada tarea tiene los siguientes campos:

- **text**: El texto de la tarea.
- **completed**: Un valor booleano que indica si la tarea ha sido completada.
- **priority**: Un valor numérico que representa la prioridad de la tarea.

## Contribuciones

Si deseas contribuir a este proyecto, puedes hacer un fork del repositorio y crear un Pull Request con tus cambios. Asegúrate de seguir las mejores prácticas de codificación y probar tus cambios antes de enviarlos.

## Licencia

Este proyecto está bajo la licencia MIT.
