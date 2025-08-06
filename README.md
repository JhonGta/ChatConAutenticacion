# 🌟 ChatApp Pro - Sistema de Chat en Tiempo Real

<div align="center">

![ChatApp Logo](https://img.shields.io/badge/ChatApp-Pro-blue?style=for-the-badge&logo=chat&logoColor=white)

**📚 Universidad de las Fuerzas Armadas ESPE**  
**👨‍🎓 Estudiante: Jhon Guamán**  
**📋 Proyecto: Sistema de Chat con Autenticación OAuth 2.0**

</div>

---

## � Introducción y Objetivos

Este proyecto implementa un **sistema de chat en tiempo real** con capacidades de autenticación múltiple, desarrollado como parte del programa académico de Sistemas Distribuidos. El objetivo principal es demostrar la implementación de tecnologías web modernas para crear una aplicación de mensajería instantánea funcional y segura.

### Objetivos Específicos:
- ✅ Implementar comunicación en tiempo real usando WebSockets
- ✅ Integrar autenticación OAuth 2.0 con Google
- ✅ Desarrollar un sistema de autenticación tradicional con JWT
- ✅ Crear una interfaz de usuario moderna y responsiva
- ✅ Gestionar persistencia de datos con MongoDB
- ✅ Aplicar arquitectura limpia en el desarrollo backend

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución para JavaScript
- **Express.js** - Framework web para Node.js
- **Socket.io** - Biblioteca para comunicación en tiempo real bidireccional
- **MongoDB** - Base de datos NoSQL para persistencia
- **Mongoose** - ODM para MongoDB
- **Passport.js** - Middleware de autenticación para OAuth
- **JWT (JSON Web Tokens)** - Estándar para autenticación stateless
- **bcrypt** - Librería para hash seguro de contraseñas

### Frontend
- **HTML5** - Estructura semántica de la aplicación
- **CSS3** - Estilos modernos con técnicas de glassmorphism
- **JavaScript ES6+** - Lógica del cliente y manejo de eventos
- **Font Awesome** - Iconografía vectorial
- **Responsive Design** - Adaptabilidad a diferentes dispositivos

### Herramientas de Desarrollo
- **Google Cloud Console** - Configuración OAuth 2.0
- **Git** - Control de versiones
- **npm** - Gestor de paquetes

## 🚀 Instrucciones para Ejecutar el Proyecto

### Prerrequisitos
- Node.js (versión 14 o superior)
- MongoDB (local o en la nube)
- Cuenta en Google Cloud Console
- Git para clonar el repositorio

### Instalación Paso a Paso

**1. Clonar el repositorio:**
```bash
git clone https://github.com/JhonGta/ChatConAutenticacion.git
cd ChatConAutenticacion
```

**2. Instalar dependencias:**
```bash
npm install
```

**3. Configurar variables de entorno:**
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/chat_app
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h

# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

**4. Configurar OAuth en Google Cloud Console:**
- Acceder a [Google Cloud Console](https://console.cloud.google.com/)
- Crear un nuevo proyecto o seleccionar uno existente
- Habilitar Google+ API o Google People API
- Crear credenciales OAuth 2.0
- Configurar URIs de redirección autorizadas

**5. Iniciar la aplicación:**
```bash
npm start
```

**6. Acceder a la aplicación:**
- Abrir navegador en `http://localhost:3001/client-example.html`

## � Capturas de Pantalla y Demostración

### 1. Pantalla de Inicio de Sesión
![Pantalla de Login](https://i.imgur.com/eXCLaWI.png)

La interfaz principal presenta un diseño moderno con fondo degradado púrpura y estilo glassmorphism. Los usuarios pueden elegir entre dos métodos de autenticación: el tradicional con email/contraseña o el sistema OAuth 2.0 con Google. La interfaz es completamente responsiva y cuenta con validación de formularios en tiempo real.

### 2. Selección de Cuenta Google
![Selección Cuenta Google](https://i.imgur.com/xBZsGFZ.png)

El sistema permite a los usuarios seleccionar entre diferentes cuentas de Google disponibles o usar otra cuenta. En esta captura se muestra el usuario "Jhon Guaman" con email jsguaman7@espe.edu.ec disponible para autenticación, junto con la opción de "Usar otra cuenta" para máxima flexibilidad.

### 3. Confirmación de Autenticación Google
![Confirmación Google OAuth](https://i.imgur.com/1bQObYQ.png)

Pantalla de confirmación donde se solicita al usuario autorizar el acceso a "Chat App OAuth" con la cuenta seleccionada jsguaman7@espe.edu.ec. Esta pantalla garantiza transparencia en el proceso de autenticación y permite al usuario revisar los permisos antes de continuar.

### 4. Procesamiento de Autenticación
![Procesando Autenticación](https://i.imgur.com/CIWk9sG.png)

Durante el proceso de autenticación, se muestra una pantalla intermedia con el mensaje "Procesando Autenticación" y "Verificando credenciales de Google..." junto con el indicador de autenticación exitosa y redirección automática al chat.

### 5. Chat con Usuario Autenticado por Google
![Chat Usuario Google](https://i.imgur.com/wFsf6Xb.png)

La interfaz principal del chat muestra al usuario "Jhon Guaman" autenticado correctamente con Google OAuth. Se puede observar en la esquina superior derecha el nombre del usuario autenticado y un mensaje "Holaaaaaaa" enviado por el usuario jsguaman7@espe.edu.ec (Tú) con timestamp 5:49:55 p. m.

### 6. Inicio de Sesión con Cuenta Tradicional
![Login Cuenta Tradicional](https://i.imgur.com/dWCCsNT.png)

En un segundo navegador, se muestra el proceso de autenticación usando el sistema tradicional con email/contraseña. El usuario jhonguaman-10@hotmail.com está ingresando sus credenciales para acceder al chat, demostrando la funcionalidad dual de autenticación del sistema.

### 7. Usuario Tradicional Enviando Mensaje
![Mensaje Usuario Tradicional](https://i.imgur.com/kULJ4Gs.png)

El usuario autenticado de forma tradicional (jhonguaman-10@hotmail.com) aparece en la interfaz del chat y envía el mensaje "Hola desde la cuenta registrada sin google" a las 5:51:51 p. m., demostrando que ambos sistemas de autenticación funcionan correctamente y pueden coexistir en el mismo chat.

### 8. Comunicación en Tiempo Real entre Usuarios
![Chat Multi-Usuario Tiempo Real](https://i.imgur.com/6N8iUni.png)

Vista final del chat mostrando la conversación completa entre ambos usuarios: el mensaje inicial "Holaaaaaaa" del usuario autenticado con Google (jsguaman7@espe.edu.ec), seguido del mensaje "Hola desde la cuenta registrada sin google" del usuario tradicional (jhonguaman-10@hotmail.com), y finalmente "Aquí estoy desde la cuenta vinculada con google" del usuario Google. Esta captura demuestra exitosamente la comunicación en tiempo real entre diferentes métodos de autenticación.

## �📁 Estructura del Proyecto

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

```

## 🎯 Funcionalidades Implementadas

### Autenticación Dual
- **OAuth 2.0 con Google**: Integración completa con Google Sign-In
- **Sistema Tradicional**: Registro y login con email/contraseña
- **JWT Tokens**: Autenticación stateless y segura
- **Sesiones Persistentes**: Mantenimiento de sesión entre recargas

### Chat en Tiempo Real
- **Mensajería Instantánea**: Comunicación bidireccional con Socket.io
- **Multi-Usuario**: Soporte para múltiples usuarios simultáneos
- **Persistencia**: Almacenamiento de mensajes en MongoDB
- **Ordenamiento Cronológico**: Mensajes mostrados como WhatsApp
- **Identificación de Usuario**: Diferenciación clara entre usuarios

### Experiencia de Usuario
- **Interfaz Moderna**: Diseño glassmorphism con efectos visuales
- **Responsive Design**: Adaptable a diferentes dispositivos
- **Indicadores Visuales**: Estados de conexión y tiempo real
- **Auto-resize**: Campo de texto que se adapta al contenido

## 🎓 Conclusiones Personales

### Aprendizajes Técnicos

Durante el desarrollo de este proyecto, he consolidado conocimientos fundamentales en el desarrollo de aplicaciones web modernas y sistemas distribuidos. La implementación de WebSockets con Socket.io me ha permitido comprender profundamente los desafíos de la comunicación en tiempo real, especialmente en el manejo de múltiples conexiones simultáneas y la sincronización de estado entre clientes.

### Desafíos Superados

Uno de los principales retos fue la implementación correcta de la autenticación OAuth 2.0 con Google, requiriendo una comprensión detallada del flujo de autorización y la configuración adecuada de las credenciales. Adicionalmente, lograr que los mensajes aparezcan en tiempo real sin necesidad de recargar la página implicó resolver problemas de gestión de conexiones WebSocket y prevención de duplicación de mensajes.

### Arquitectura y Buenas Prácticas

La aplicación de una arquitectura limpia separando responsabilidades en capas (API, domain, infrastructure) ha demostrado ser fundamental para mantener un código escalable y mantenible. La implementación de repositorios, casos de uso y controladores facilita la testing y futuras modificaciones del sistema.

### Experiencia con Tecnologías Modernas

El proyecto me ha proporcionado experiencia práctica con tecnologías actuales del desarrollo web, desde la gestión de bases de datos NoSQL con MongoDB hasta la implementación de interfaces de usuario responsivas. La integración de múltiples tecnologías (Node.js, Express, Socket.io, JWT) en un sistema cohesivo ha fortalecido mi comprensión de ecosistemas tecnológicos complejos.

### Proyección Profesional

Este desarrollo representa una base sólida para futuras implementaciones de sistemas de comunicación en tiempo real y me ha preparado para abordar proyectos de mayor complejidad en el ámbito de sistemas distribuidos y aplicaciones web escalables.

---

<div align="center">

### 👨‍💻 Desarrollado por Jhon Guamán
**Universidad de las Fuerzas Armadas ESPE**  
**Carrera: Ingeniería en Software**

[![GitHub](https://img.shields.io/badge/GitHub-JhonGta-black?style=flat-square&logo=github)](https://github.com/JhonGta)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jhon%20Guamán-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/jhon-guaman)

⭐ **Si te gusta este proyecto, ¡dale una estrella en GitHub!**

</div>
