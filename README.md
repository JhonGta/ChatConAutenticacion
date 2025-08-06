# ChatConAutenticacion 💬

Una aplicación de chat en tiempo real con autenticación OAuth 2.0 usando Google y sistema de registro tradicional.

## 🚀 Características

- **Chat en tiempo real** con Socket.io
- **Autenticación múltiple:**
  - OAuth 2.0 con Google
  - Registro/Login tradicional con email/password
- **Interfaz moderna** con diseño responsivo
- **Indicadores de escritura** en tiempo real
- **Lista de usuarios conectados**
- **Persistencia de mensajes** en MongoDB
- **JWT Authentication** para seguridad

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** con Express
- **Socket.io** para comunicación en tiempo real
- **MongoDB** con Mongoose
- **Passport.js** para OAuth
- **JWT** para autenticación
- **bcrypt** para hash de contraseñas

### Frontend
- **HTML5/CSS3** con diseño moderno
- **JavaScript** vanilla
- **Font Awesome** para iconos
- **Responsive Design**

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (local o cloud)
- Cuenta de Google Cloud Console (para OAuth)

## ⚙️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JhonGta/ChatConAutenticacion.git
   cd ChatConAutenticacion
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/chat_app
   JWT_SECRET=tu_jwt_secret_super_seguro
   JWT_EXPIRES_IN=24h
   
   # Google OAuth
   GOOGLE_CLIENT_ID=tu_google_client_id
   GOOGLE_CLIENT_SECRET=tu_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
   ```

4. **Configurar Google OAuth:**
   - Ir a [Google Cloud Console](https://console.cloud.google.com/)
   - Crear un nuevo proyecto o usar uno existente
   - Habilitar Google+ API
   - Crear credenciales OAuth 2.0
   - Configurar URIs de redirección

## 🚀 Uso

1. **Iniciar el servidor:**
   ```bash
   npm start
   ```

2. **Abrir el cliente:**
   - Servidor: `http://localhost:3001`
   - Cliente moderno: `http://localhost:5500/client-modern.html`
   - Cliente básico: `http://localhost:5500/client-example.html`

## 📁 Estructura del Proyecto

```
ChatConAutenticacion/
├── src/
│   ├── api/
│   │   ├── controllers/     # Controladores de rutas
│   │   └── routes/          # Definición de rutas
│   ├── config/
│   │   ├── database.js      # Configuración MongoDB
│   │   └── passport-setup.js # Configuración OAuth
│   ├── domain/
│   │   ├── models/          # Modelos de datos
│   │   └── use-cases/       # Lógica de negocio
│   └── infrastructure/
│       ├── middlewares/     # Middlewares
│       ├── repositories/    # Acceso a datos
│       ├── utils/           # Utilidades
│       └── websockets/      # Manejo de Socket.io
├── client-modern.html       # Cliente con diseño moderno
├── client-example.html      # Cliente básico
├── auth-callback.html       # Callback OAuth
├── app.js                   # Archivo principal
└── package.json
```

## 🎨 Interfaces

### Cliente Moderno (`client-modern.html`)
- Diseño glassmorphism
- Animaciones CSS
- Pestañas de autenticación
- Chat con sidebar de usuarios
- Responsive design

### Cliente Básico (`client-example.html`)
- Interfaz simple y funcional
- Todas las características principales

## 🔐 Autenticación

### OAuth 2.0 con Google
- Login con cuenta de Google
- Sincronización automática de perfil
- Redirección segura

### Sistema Tradicional
- Registro con email/password
- Login con credenciales
- Hash de contraseñas con bcrypt

## 💬 Funcionalidades del Chat

- **Mensajes en tiempo real**
- **Indicador de escritura**
- **Lista de usuarios conectados**
- **Persistencia de mensajes**
- **Timestamps**
- **Avatares de usuarios**

## 🔧 Scripts Disponibles

```bash
npm start          # Iniciar servidor
npm run dev        # Modo desarrollo con nodemon
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**JhonGta** - [GitHub](https://github.com/JhonGta)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
