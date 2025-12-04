# Superheroes App

Es una aplicación en React que permite explorar una lista de superhéroes obtenidos desde una API externa. Incluye autenticación de usuarios, paginación para navegar por la lista, y vistas detalladas de cada superhéroe en modales.

## Características

- **Autenticación**: Sistema de login/logout. El estado de sesión se mantiene en localStorage, lo que permite que los usuarios permanezcan conectados al recargar la página.
- **Lista de Superhéroes**: Muestra una cuadrícula de superhéroes con información básica como nombre, género, editorial y poder sobresaliente.
- **Paginación**: Navegación por páginas para explorar todos los superhéroes disponibles.
- **Detalles en Modal**: Al hacer clic en un superhéroe, se abre un modal con información detallada incluyendo estadísticas de poder, apariencia, biografía y conexiones.
- **Estilos Consistentes**: La aplicación usa estilos globales para mantener una interfaz coherente en todas las vistas.

## Tecnologías Utilizadas

- **React 18.3.1**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript**: Para tipado estático y mejor desarrollo.
- **Vite**: Herramienta de construcción rápida con HMR (Hot Module Replacement).
- **ESLint**: Para linting y mantener la calidad del código.
- **Vitest**: Para pruebas unitarias.
- **clsx**: Para manejo condicional de clases CSS.
- **Lucide React**: Para iconos (si se usan en el futuro).

## Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd prueba-superheroes
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir el navegador en `http://localhost:5173` (o el puerto que indique Vite).


## API

La aplicación consume datos de una API externa alojada en AWS API Gateway:
- **Base URL**: `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api`
- **Endpoints**:
  - `GET /heroes?page={page}&size={size}`: Obtiene una lista paginada de superhéroes.
  - `GET /hero?id={id}`: Obtiene detalles de un superhéroe específico.
- Requiere autenticación con Bearer token en el header `Authorization`.


## Probar test
Ejecutar el comando para correr los test.
```bash
   npm run test
   ```



