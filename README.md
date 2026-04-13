# 🚀 Backend Node.js - API REST con Express y MongoDB

---

## 📌 Descripción

Este proyecto es una API REST desarrollada con Node.js y Express, conectada a una base de datos MongoDB Atlas.

La API permite:

* Registro y autenticación de usuarios mediante JWT
* Gestión de usuarios con roles (user / admin)
* CRUD completo de posts
* Relación entre usuarios y posts
* Validación de autoría de posts (seguridad)
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

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/backend?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta

CLOUD_NAME=tu_cloud_name
API_KEY=tu_api_key
API_SECRET=tu_api_secret

SEED=false
```

⚠️ Importante:

* Las variables deben coincidir EXACTAMENTE con las usadas en el código
* No subas tu `.env` real a GitHub

---

### 4. Configurar MongoDB Atlas

En **Network Access → IP Access List**, debes agregar:

```
0.0.0.0/0
```

✔ Esto permite acceso desde cualquier IP (requerido para despliegue)

---

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 🔐 Autenticación

La API utiliza JSON Web Tokens (JWT).

Para acceder a rutas protegidas, enviar el token en el header:

```
Authorization: Bearer TU_TOKEN
```

---

## 📡 Endpoints

---

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
| GET    | /api/users/:id      | Obtener usuario          | ✅    |
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
* Editar y eliminar **solo sus propios posts**
* Eliminar su propia cuenta

### Admin

* Todos los permisos de user
* Eliminar cualquier usuario
* Cambiar roles de usuarios

---

## 🔗 Relación entre Modelos

* Un usuario tiene un array de posts
* Cada post tiene un campo `author` (ID del usuario)
* Se utiliza `$addToSet` para evitar duplicados
* Se utiliza `$pull` para eliminar referencias al borrar un post

---

## 🔒 Seguridad Implementada

✔ Validación de autoría de posts:

* Un usuario NO puede editar/eliminar posts de otros
* Un admin SÍ puede hacerlo

✔ Middleware utilizados:

* `auth` → protege rutas privadas
* `isAdmin` → restringe acceso a administradores

---

## ☁️ Cloudinary

* Las imágenes se suben directamente a la nube
* No se almacenan en el servidor local
* Al eliminar un usuario, su imagen también se elimina

---

## 🌱 Seed de Datos

Ejecutar:

```bash
npm run seed
```

✔ El seed:

* Se conecta a la base de datos
* Inserta datos automáticamente
* Funciona como script independiente

---

## 🧪 Pruebas

Puedes probar la API usando:

* Postman
* Insomnia

### Flujo recomendado:

1. Registrar usuario
2. Login → obtener token
3. Usar token en endpoints protegidos
4. Crear post
5. Editar post (solo propio)
6. Eliminar post

---

## ⚠️ Notas Técnicas

* Contraseñas encriptadas con bcrypt
* Autenticación mediante JWT
* Se usa `$addToSet` para evitar duplicados
* Se usa `$pull` para eliminar referencias
* Middleware reutilizables implementados correctamente
* Proyecto configurado con ES Modules (`"type": "module"`)
* No se mezcla CommonJS con ES Modules

---

## 📌 Estado del Proyecto

✔ CRUD completo de usuarios y posts
✔ Autenticación JWT funcional
✔ Roles implementados correctamente
✔ Seguridad en endpoints
✔ Relación entre modelos correcta
✔ Subida de imágenes con Cloudinary
✔ Eliminación de imágenes en Cloudinary
✔ Seed funcional
✔ Documentación completa

---
