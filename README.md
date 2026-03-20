# Backend Node.js - Users y Posts

API con Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, multer y Cloudinary.

## Estructura

- src/
  - config/
  - controllers/
  - middlewares/
  - models/
  - routes/
  - seeds/
  - utils/
  - index.js

## Tecnologías

- Node.js
- Express
- MongoDB Atlas con Mongoose
- JWT
- bcrypt
- multer + Cloudinary
- dotenv

## Instalación

1. Clonar repositorio
2. `npm install`
3. Crear archivo `.env` con variables (ver abajo)
4. `npm run dev`

## Variables de entorno (.env)

```
MONGO_URI=
JWT_SECRET=
CLOUD_NAME=
API_KEY=
API_SECRET=
PORT=3000
SEED=false
```

## Endpoints

### Autenticación

- `POST /api/auth/register` (multipart/form-data: username, email, password, image)
- `POST /api/auth/login` (JSON: email, password)

### Usuarios

- `GET /api/users` (auth required)
- `GET /api/users/:id` (auth required)
- `PUT /api/users/:id` (auth required, own user o admin)
- `DELETE /api/users/:id` (auth required, own user o admin)
- `PUT /api/users/role/:id` (auth required, admin)

### Posts

- `POST /api/post` (auth required; JSON title, content)
- `GET /api/post` (listar todos)
- `GET /api/post/:id` (obtener uno)
- `PUT /api/post/:id` (auth required)
- `DELETE /api/post/:id` (auth required)

## Seed

Para ejecutar seed de posts, agrega `SEED=true` en `.env` y arranca el servidor.

## Reglas principales

- Usuarios se crean siempre con role `user`.
- Solo admin puede cambiar roles.
- Un usuario puede eliminar su propia cuenta; admin puede eliminar cualquier usuario.
- Subida de imagen en registro con Cloudinary y se elimina al borrar usuario.
