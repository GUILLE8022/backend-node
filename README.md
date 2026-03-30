# 🚀 Backend Node.js - API REST con Express y MongoDB

---

## 📌 Descripción

Este proyecto es una API REST desarrollada con Node.js y Express, conectada a una base de datos MongoDB Atlas.

La API permite:

* Registro y autenticación de usuarios mediante JWT
* Gestión de usuarios con roles (user / admin)
* CRUD completo de posts
* Relación entre usuarios y posts
* Subida y eliminación de imágenes con Cloudinary

---

## 🛠 Tecnologías Utilizadas

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Tokens)
* bcrypt
* Cloudinary
* Multer
* CORS
* dotenv

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Beltran18/backend-nodejs.git
cd backend-nodejs
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/backend
JWT_SECRET=tu_clave_secreta
CLOUD_NAME=tu_cloud_name
API_KEY=tu_api_key
API_SECRET=tu_api_secret
SEED=false
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 🔐 Autenticación

La API utiliza JWT.

Enviar el token en cada petición protegida:

```
Authorization: Bearer TU_TOKEN
```

---

## 📡 Endpoints

### 🔑 Auth

| Método | Endpoint           | Descripción       | Body                      |
| ------ | ------------------ | ----------------- | ------------------------- |
| POST   | /api/auth/register | Registrar usuario | username, email, password |
| POST   | /api/auth/login    | Iniciar sesión    | email, password           |

---

### 👤 Users

| Método | Endpoint            | Descripción              | Auth |
| ------ | ------------------- | ------------------------ | ---- |
| GET    | /api/users          | Listar usuarios          | ✅    |
| GET    | /api/users/:id      | Obtener usuario por ID   | ✅    |
| PUT    | /api/users/:id      | Actualizar usuario       | ✅    |
| DELETE | /api/users/:id      | Eliminar usuario         | ✅    |
| PUT    | /api/users/role/:id | Cambiar rol (solo admin) | ✅    |

---

### 📝 Posts

| Método | Endpoint      | Descripción     | Auth |
| ------ | ------------- | --------------- | ---- |
| POST   | /api/post     | Crear post      | ✅    |
| GET    | /api/post     | Listar posts    | ❌    |
| GET    | /api/post/:id | Obtener post    | ❌    |
| PUT    | /api/post/:id | Actualizar post | ✅    |
| DELETE | /api/post/:id | Eliminar post   | ✅    |

---

## 👥 Roles y Permisos

### User

* Crear posts
* Editar y eliminar sus propios posts
* Eliminar su propia cuenta

### Admin

* Todos los permisos de user
* Eliminar cualquier usuario
* Cambiar roles de usuarios

---

## 🔗 Relación entre Modelos

* Un usuario tiene un array de posts
* Se utiliza `$addToSet` para evitar duplicados
* Al eliminar un post, también se elimina su referencia en el usuario

---

## ☁️ Cloudinary

* Permite subir imágenes de perfil
* Las imágenes se almacenan en la nube
* Al eliminar un usuario, su imagen también se elimina automáticamente

---

## 🌱 Seed de Datos

Para ejecutar la semilla:

```bash
npm run seed
```

O activar en `.env`:

```env
SEED=true
```

---

## 🧪 Pruebas

Puedes probar la API usando:

* Postman
* Insomnia

Flujo recomendado:

1. Registrar usuario
2. Login → obtener token
3. Usar token en endpoints protegidos
4. Crear, actualizar y eliminar posts

---

## ⚠️ Notas Técnicas

* Se usa `$addToSet` para evitar duplicados en el array de posts
* Se usa `$pull` para eliminar referencias al borrar un post
* Contraseñas encriptadas con bcrypt
* Autenticación mediante JWT
* Middleware `auth` protege rutas privadas
* Middleware `isAdmin` controla permisos de administrador
* Proyecto configurado con ES Modules (`"type": "module"`)

---

## 📌 Estado del Proyecto

✔ CRUD completo de usuarios y posts
✔ Autenticación JWT funcional
✔ Roles implementados correctamente
✔ Relación entre modelos funcional
✔ Subida de imágenes con Cloudinary
✔ Eliminación de archivos en Cloudinary
✔ Seed de datos implementado
✔ Documentación completa

---

