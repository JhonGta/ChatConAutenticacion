# Chat Backend - Aplicación de Chat en Tiempo Real

Backend para una aplicación de chat en tiempo real desarrollada con Node.js, Express, MongoDB y WebSockets.

## 🚀 Características

- **Autenticación JWT**: Registro e inicio de sesión seguro
- **Chat en tiempo real**: Comunicación instantánea mediante WebSockets
- **Persistencia de mensajes**: Todos los mensajes se guardan en MongoDB
- **Arquitectura limpia**: Separación clara de responsabilidades
- **Validación de datos**: Validación robusta con Joi
- **Manejo de errores**: Sistema completo de manejo de errores

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Socket.io** - WebSockets para comunicación en tiempo real
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Hashing de contraseñas
- **Joi** - Validación de esquemas

## 📁 Estructura del Proyecto

```
/src
├── /api
│   ├── /routes           # Rutas de la API
│   └── /controllers      # Controladores HTTP
├── /domain
│   ├── /models           # Modelos de Mongoose
│   └── /use-cases        # Lógica de negocio
├── /infrastructure
│   ├── /repositories     # Acceso a datos
│   ├── /middlewares      # Middlewares de Express
│   └── /websockets       # Lógica de WebSockets
└── /config               # Configuración
```

## 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd chat-backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
JWT_EXPIRES_IN=24h
PORT=3001
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

4. **Iniciar MongoDB**

```bash
# Si usas MongoDB localmente
mongod

# O usar MongoDB Atlas (actualizar MONGODB_URI en .env)
```

5. **Ejecutar la aplicación**

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📡 API Endpoints

### Autenticación

#### POST /api/auth/register

Registra un nuevo usuario.

**Request Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "user_id",
      "email": "usuario@ejemplo.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_aqui"
  }
}
```

#### POST /api/auth/login

Inicia sesión de usuario.

**Request Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "user_id",
      "email": "usuario@ejemplo.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_aqui"
  }
}
```

#### GET /api/auth/profile

Obtiene el perfil del usuario autenticado.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "usuario@ejemplo.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🔌 WebSocket Events

### Conexión

Para conectarse al WebSocket, incluir el token JWT en la autenticación:

```javascript
const socket = io("http://localhost:3001", {
  auth: {
    token: "jwt_token_aqui",
  },
});
```

### Eventos del Cliente al Servidor

#### `sendMessage`

Envía un nuevo mensaje al chat.

```javascript
socket.emit("sendMessage", {
  text: "Hola mundo!",
});
```

#### `getMessages`

Solicita mensajes históricos.

```javascript
socket.emit("getMessages", {
  limit: 50,
  page: 1,
});
```

#### `typing`

Indica si el usuario está escribiendo.

```javascript
socket.emit("typing", {
  isTyping: true,
});
```

### Eventos del Servidor al Cliente

#### `newMessage`

Nuevo mensaje recibido.

```javascript
socket.on("newMessage", (message) => {
  console.log("Nuevo mensaje:", message);
});
```

#### `recentMessages`

Mensajes recientes al conectarse.

```javascript
socket.on("recentMessages", (messages) => {
  console.log("Mensajes recientes:", messages);
});
```

#### `userConnected`

Usuario se conectó al chat.

```javascript
socket.on("userConnected", (user) => {
  console.log("Usuario conectado:", user);
});
```

#### `userDisconnected`

Usuario se desconectó del chat.

```javascript
socket.on("userDisconnected", (user) => {
  console.log("Usuario desconectado:", user);
});
```

#### `connectedUsers`

Lista de usuarios conectados.

```javascript
socket.on("connectedUsers", (users) => {
  console.log("Usuarios conectados:", users);
});
```

#### `userTyping`

Usuario está escribiendo.

```javascript
socket.on("userTyping", (data) => {
  console.log("Usuario escribiendo:", data);
});
```

#### `error`

Error del WebSocket.

```javascript
socket.on("error", (error) => {
  console.error("Error:", error);
});
```

## 🧪 Ejemplo de Cliente

```javascript
const io = require("socket.io-client");

// Conectar con token JWT
const socket = io("http://localhost:3001", {
  auth: {
    token: "tu_jwt_token_aqui",
  },
});

// Escuchar eventos
socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("newMessage", (message) => {
  console.log("Nuevo mensaje:", message);
});

socket.on("recentMessages", (messages) => {
  console.log("Mensajes recientes:", messages);
});

// Enviar mensaje
socket.emit("sendMessage", {
  text: "¡Hola desde el cliente!",
});

// Manejar errores
socket.on("error", (error) => {
  console.error("Error:", error);
});
```

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- Autenticación JWT para todas las rutas protegidas
- Validación de entrada con Joi
- Conexiones WebSocket protegidas con JWT
- Manejo seguro de errores sin exposición de información sensible

## 📊 Modelos de Datos

### Usuario

```javascript
{
  email: String,      // Único, requerido
  password: String,   // Hasheado, requerido
  timestamps: true    // createdAt, updatedAt
}
```

### Mensaje

```javascript
{
  text: String,       // Requerido, máximo 1000 caracteres
  user: ObjectId,     // Referencia al usuario
  createdAt: Date,    // Fecha de creación
  timestamps: true    // createdAt, updatedAt
}
```

## 🚀 Deployment

### Variables de Entorno para Producción

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/chat-app
JWT_SECRET=super_secret_jwt_key_for_production
JWT_EXPIRES_IN=24h
PORT=3001
CLIENT_URL=https://tu-frontend-url.com
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en GitHub.

---

**Desarrollado con ❤️ usando Node.js y Socket.io**
# U2_Examen_distribuidas
