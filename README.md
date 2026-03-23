# Backend Node.js - API REST con Express y MongoDB

## Descripción

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB Atlas. Proporciona funcionalidades completas de autenticación, gestión de usuarios y posts, con integración de Cloudinary para el manejo de imágenes. Incluye roles de usuario (user y admin) con permisos diferenciados, y utiliza JWT para la autenticación segura.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework web para Node.js.
- **MongoDB Atlas**: Base de datos NoSQL en la nube.
- **Mongoose**: ODM para MongoDB.
- **JWT (JSON Web Tokens)**: Para autenticación.
- **bcrypt**: Para encriptación de contraseñas.
- **Cloudinary**: Servicio de gestión de imágenes en la nube.
- **Multer**: Middleware para manejo de archivos multipart/form-data.
- **CORS**: Para permitir solicitudes desde diferentes orígenes.
- **dotenv**: Para manejo de variables de entorno.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Beltran18/backend-nodejs.git
   cd backend-nodejs
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3000
   JWT_SECRET=tu_clave_secreta_para_jwt
   DB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_db
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   SEED=false
   ```

4. **Ejecuta el proyecto:**
   ```bash
   npm run dev
   ```

   El servidor se iniciará en `http://localhost:3000`.

## Variables de Entorno

- `PORT`: Puerto en el que se ejecuta el servidor (por defecto 3000).
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.
- `DB_URI`: URI de conexión a MongoDB Atlas.
- `CLOUDINARY_CLOUD_NAME`: Nombre de la nube en Cloudinary.
- `CLOUDINARY_API_KEY`: Clave API de Cloudinary.
- `CLOUDINARY_API_SECRET`: Clave secreta API de Cloudinary.
- `SEED`: Booleano para ejecutar el seed de datos al iniciar (true/false).

## Autenticación (JWT)

La API utiliza JSON Web Tokens (JWT) para la autenticación. Para acceder a rutas protegidas, incluye el token en el header de la solicitud:

```
Authorization: Bearer <tu_token_jwt>
```

Los tokens se obtienen al hacer login exitosamente.

## Endpoints

### Auth

- **POST /api/auth/register**
  - Descripción: Registra un nuevo usuario.
  - Body: `username`, `email`, `password`, `image` (opcional, archivo).
  - Respuesta: Usuario creado.

- **POST /api/auth/login**
  - Descripción: Inicia sesión.
  - Body: `email`, `password`.
  - Respuesta: Token JWT.

### Users

- **GET /api/users**
  - Descripción: Obtiene todos los usuarios (requiere autenticación).
  - Respuesta: Lista de usuarios con sus posts.

- **GET /api/users/:id**
  - Descripción: Obtiene un usuario por ID (requiere autenticación).
  - Parámetros: `id` (ID del usuario).
  - Respuesta: Detalles del usuario.

- **PUT /api/users/:id**
  - Descripción: Actualiza un usuario (solo el propio usuario o admin).
  - Parámetros: `id` (ID del usuario).
  - Body: `username`, `email`, `password`, `image` (opcional).
  - Respuesta: Usuario actualizado.

- **DELETE /api/users/:id**
  - Descripción: Elimina un usuario (solo el propio usuario o admin).
  - Parámetros: `id` (ID del usuario).
  - Respuesta: Confirmación de eliminación.

- **PUT /api/users/role/:id**
  - Descripción: Cambia el rol de un usuario (solo admin).
  - Parámetros: `id` (ID del usuario).
  - Body: `role` (nuevo rol: "user" o "admin").
  - Respuesta: Usuario con rol actualizado.

### Posts

- **POST /api/post**
  - Descripción: Crea un nuevo post (requiere autenticación).
  - Body: `title`, `content`.
  - Respuesta: Post creado.

- **GET /api/post**
  - Descripción: Obtiene todos los posts.
  - Respuesta: Lista de posts.

- **GET /api/post/:id**
  - Descripción: Obtiene un post por ID.
  - Parámetros: `id` (ID del post).
  - Respuesta: Detalles del post.

- **PUT /api/post/:id**
  - Descripción: Actualiza un post (requiere autenticación).
  - Parámetros: `id` (ID del post).
  - Body: `title`, `content`.
  - Respuesta: Post actualizado.

- **DELETE /api/post/:id**
  - Descripción: Elimina un post (requiere autenticación).
  - Parámetros: `id` (ID del post).
  - Respuesta: Confirmación de eliminación.

## Roles y Permisos

- **User (por defecto)**: Puede crear, leer, actualizar y eliminar sus propios posts. Solo puede editar/eliminar su propia cuenta.
- **Admin**: Tiene todos los permisos de user, además puede eliminar cualquier usuario y cambiar roles de usuarios.

Los permisos se verifican mediante middlewares de autenticación y autorización.

## Uso de Cloudinary

Cloudinary se utiliza para almacenar y gestionar imágenes de perfil de usuarios. Al registrar o actualizar un usuario con una imagen, esta se sube automáticamente a Cloudinary. Al eliminar un usuario, su imagen se elimina de Cloudinary para liberar espacio.

## Seed de Datos

El proyecto incluye un seed para insertar datos de ejemplo en la colección de posts. Para ejecutarlo, establece `SEED=true` en el archivo `.env` y reinicia el servidor. Esto eliminará todos los posts existentes e insertará 3 posts de ejemplo.

## Notas Importantes

- La relación entre usuarios y posts se maneja mediante un array de referencias en el modelo User, utilizando `$addToSet` para evitar duplicados.
- Las contraseñas se encriptan con bcrypt antes de almacenarse.
- Los tokens JWT tienen una expiración implícita (configurable en el código si es necesario).
- Asegúrate de configurar correctamente las credenciales de MongoDB Atlas y Cloudinary para el funcionamiento completo.
- El proyecto utiliza ES6 modules, por lo que requiere Node.js 14+.
- Para desarrollo, se utiliza Nodemon para reinicio automático del servidor.
