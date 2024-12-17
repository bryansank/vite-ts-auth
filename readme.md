# Proyecto: Frontend Vite + TypeScript con Spotify OAuth 2.0

## **Descripción del Proyecto**

Este es un proyecto **Frontend** desarrollado con **Vite** y **TypeScript**, cuya funcionalidad principal es autenticar usuarios mediante **Spotify OAuth 2.0** y consumir información de la API de Spotify. A su vez puede ser utilizado para template de pruebas para implementar la auth2.0 y jwt he entender todo.

La aplicación permite:

- Autenticarse con una cuenta de Spotify mediante **OAuth 2.0**.
- Obtener y refrescar **tokens de acceso** de forma segura.
- Acceder a información de usuario autenticado desde la API de Spotify.

Este frontend está diseñado como una aplicación **SPA (Single Page Application)** usando **Vite** para su rapidez y optimización.

---

## **Tecnologías utilizadas**

- **Vite**: Herramienta para construir y servir aplicaciones frontend de forma rápida.
- **TypeScript**: Mejora la mantenibilidad del código con tipado estático.
- **Spotify API**: Autenticación y consumo de recursos mediante OAuth 2.0.
- **HTML/CSS**: Estructura y estilos básicos.

---

## **Requisitos previos**

Antes de iniciar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior).
- **npm** (gestor de paquetes de Node.js).
- Cuenta de desarrollador en **Spotify** para obtener credenciales:
  - `CLIENT_ID`
  - `CLIENT_SECRET`

---

## **Configuración del Proyecto**

1. **Clonar el repositorio**:

   ```bash
   git clone <URL-del-repositorio>
   cd nombre-del-proyecto
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:

   - Crea un archivo en la carpeta **`/src/config`** llamado `config_env.json`.
   - Añade tus credenciales de Spotify.

   Ejemplo de archivo:

   ```json
   {
    "API": {
      "SPOTIFY_DEV_CLIENT_ID": "tu-client-id",
      "SPOTIFY_DEV_SECRET": "tu-secrect-id",
      "SPOTIFY_AUTH": "https://accounts.spotify.com/authorize",
      "SPOTIFY_TOKEN": "https://accounts.spotify.com/api/token",
      "SPOTIFY_REDIRECT_URL": "tu-redirect",
      "SPOTIFY_GETME_DATA_URL": "https://api.spotify.com/v1/me",
  
      "TWITTER_DEV_CLIENT_ID": "",
      "TWITTER_DEV_SECRET": "",
      "TWITTER_AUTH": "",
      "TWITTER_TOKEN": ""
    },
  
    "PROXY": {
      "REDIRECT_PROXY": "https://cors-anywhere.herokuapp.com/"
    }

   }
   ```

4. **Iniciar la aplicación en desarrollo**:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en:

   - `http://localhost:5173`

5. **Build de producción** (opcional):
   ```bash
   npm run build
   ```
   Esto generará los archivos optimizados en la carpeta `dist`.

---

## **Estructura del Proyecto**

```
.
|-- public/                   # Archivos públicos
|-- src/                      # Código fuente
|   |-- assets/               # Recursos estáticos
|   |-- config/               # Configuración de entorno
|   |-- pages/                # Páginas principales
|   |-- utils/                # Utilidades (autenticación, almacenamiento)
|   |-- main.ts               # Punto de entrada principal
|-- index.html                # HTML principal
|-- package.json              # Configuración de dependencias
|-- tsconfig.json             # Configuración de TypeScript
|-- vite.config.ts            # Configuración de Vite
```

---

## **Flujo de Autenticación con Spotify OAuth 2.0**

1. El usuario hace clic en el botón de **Login con Spotify**.
2. La aplicación redirige a la URL de autorización de Spotify, pasando:
   - `client_id` (ID de cliente de Spotify).
   - `scope` (permisos solicitados).
   - `redirect_uri` (URL de callback).
3. Spotify redirige al **callback** especificado con un `code` de autorización.
4. La aplicación intercambia el `code` por un **Access Token** y **Refresh Token**.
5. El Access Token se utiliza para realizar peticiones a la **API de Spotify**.
6. Si el token expira, la aplicación usa el Refresh Token para obtener uno nuevo.

---

## **Manejo de Tokens**

- Los tokens de acceso y refresco se almacenan en **sessionStorage** para mantener la sesión del usuario.
- Existe una lógica en `utilsFn.ts` que verifica si el token ha expirado y lo refresca automáticamente cada 30 minutos.

---

## **Funcionalidades Principales**

- **Autenticación**: OAuth 2.0 con Spotify.
- **Gestor de sesión**: Almacenamiento y validación de tokens.
- **Renovación de tokens**: Mecanismo automático para refrescar tokens antes de su expiración.

---

## **Próximos Pasos**

- Implementar un backend seguro para manejar **client_secret** y evitar exponerlo en el frontend.
- Mejorar la interfaz de usuario.
- Consumir más recursos de la API de Spotify (listas de reproducción, canciones, etc.).

---

## **Créditos**

- Desarrollado por: **Bryan Key**
- Documentación de la API de Spotify: [Spotify for Developers](https://developer.spotify.com/)

---

## **Licencia**

Este proyecto está bajo la licencia **APACCHE**.
