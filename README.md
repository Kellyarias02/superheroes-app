# Superheroes App

Una aplicación React que permite explorar una lista de superhéroes obtenidos desde una API externa. Incluye autenticación de usuarios, paginación para navegar por la lista, y vistas detalladas de cada superhéroe en modales.

## Características

- **Autenticación**: Sistema de login/logout para acceder a la aplicación.
- **Lista de Superhéroes**: Muestra una cuadrícula de superhéroes con información básica como nombre, género, editorial y poder sobresaliente.
- **Paginación**: Navegación por páginas para explorar todos los superhéroes disponibles.
- **Detalles en Modal**: Al hacer clic en un superhéroe, se abre un modal con información detallada incluyendo estadísticas de poder, apariencia, biografía y conexiones.
- **Interfaz Responsiva**: Diseñada con CSS modules para una experiencia de usuario fluida.

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

4. Abre tu navegador en `http://localhost:5173` (o el puerto que indique Vite).


## API

La aplicación consume datos de una API externa alojada en AWS API Gateway:
- **Base URL**: `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api`
- **Endpoints**:
  - `GET /heroes?page={page}&size={size}`: Obtiene una lista paginada de superhéroes.
  - `GET /hero?id={id}`: Obtiene detalles de un superhéroe específico.
- Requiere autenticación con Bearer token en el header `Authorization`.


## Configuración de ESLint

La configuración de ESLint está optimizada para desarrollo de producción con reglas de tipo aware:

- Configura `parserOptions` en `eslint.config.js` para incluir los archivos de configuración de TypeScript.
- Usa `tseslint.configs.recommendedTypeChecked` o `tseslint.configs.strictTypeChecked` para reglas más estrictas.
- Opcionalmente, agrega `...tseslint.configs.stylisticTypeChecked` para reglas de estilo.

Para incluir reglas específicas de React, instala `eslint-plugin-react` y actualiza la configuración:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

