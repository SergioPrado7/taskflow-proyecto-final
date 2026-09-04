# 🚀 TaskFlow: Sistema de Gestión de Proyectos y Tareas

## 1. 📌 Nombre del Proyecto y Problema que Resuelve

### Nombre

**TaskFlow — Sistema de Gestión de Proyectos y Tareas**

### 🎯 Problema que Resuelve

La desorganización en la asignación de actividades y proyectos en equipos de trabajo o entornos académicos.

**TaskFlow** centraliza la creación de espacios de trabajo y permite un control organizado de las tareas mediante:

- Estados de flujo: `TODO`, `IN_PROGRESS`, `DONE`
- Prioridades: `LOW`, `MED`, `HIGH`
- Responsables mediante `assigneeId`
- Fechas límite mediante `dueDate`

Esto permite evitar que las actividades se pasen por alto y facilita el seguimiento de cada proyecto.

### 💡 ¿Para qué se usa?

TaskFlow se utiliza como una herramienta web centralizada que permite a los usuarios administrar de forma limpia y eficiente el ciclo de vida completo de sus proyectos desde cualquier navegador.

---



# 2. 🛠️ Tecnologías y Librerías Utilizadas


| Tecnología              | Uso                                                         |
| ----------------------- | ----------------------------------------------------------- |
| **React 18**            | Construcción de la interfaz de usuario mediante componentes |
| **Vite**                | Empaquetado y desarrollo rápido del proyecto                |
| **TypeScript**          | Tipado estricto y seguridad en los contratos de datos       |
| **Material UI**         | Componentes visuales y diseño responsivo                    |
| **Axios**               | Comunicación HTTP con el backend                            |
| **React Router DOM v6** | Enrutamiento y navegación                                   |




### ⚛️ React + Vite

React y Vite permiten construir una interfaz de usuario interactiva, modular y rápida basada en componentes.

### 🔷 TypeScript

TypeScript proporciona tipado estricto para prevenir errores durante el desarrollo y mantener contratos seguros entre el frontend y el backend.

### 🎨 Material UI

Se utiliza **Material UI (**`@mui/material` **y** `@mui/icons-material`**)** para construir la interfaz visual.

Se hace uso intensivo de la propiedad `sx`, permitiendo aplicar:

- Diseño responsivo.
- Estilos personalizados.
- Estados `hover`.
- Espaciados.
- Colores y tamaños.

Esto reduce la necesidad de utilizar archivos CSS externos.

### 🌐 Axios

Axios se utiliza para realizar las peticiones HTTP de manera asíncrona entre el frontend y el backend.

### 🧭 React Router DOM

React Router DOM v6 permite manejar las diferentes rutas de la aplicación y transferir información entre páginas mediante estados de navegación utilizando `useLocation`.

---



# 3. 📁 Estructura General del Proyecto

El proyecto está organizado bajo una arquitectura desacoplada orientada a la **separación de responsabilidades**.

```text
taskflow-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline de Integración Continua y Despliegue
├── src/
│   ├── components/                # Componentes visuales y de UI
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectItem.tsx
│   │   ├── ProjectList.tsx        # Incluye lógica de ordenamiento (ID y Alfabético)
│   │   ├── TaskForm.tsx           # Incluye selector de fecha límite (dueDate)
│   │   ├── TaskItem.tsx           # Incluye estados dinámicos y hover flotante
│   │   └── TaskList.tsx           # Incluye filtros por estado y ordenamiento
│   ├── config/
│   │   └── apiUrl.ts              # Centraliza y exporta la URL base del API para la app
│   ├── contexts/
│   │   └── AuthContext.tsx        # Estado global de autenticación y sesión
│   ├── hooks/                     # Custom Hooks (Lógica transaccional dividida)
│   │   ├── useAuth.ts             # Controla el acceso al contexto de autenticación
│   │   ├── useProjectActions.ts   # Maneja la edición, borrado y estados de un proyecto
│   │   ├── useProjectForm.ts      # Maneja la creación y validación de nuevos proyectos
│   │   ├── useProjects.ts         # Maneja la obtención (GET), carga y errores de proyectos
│   │   ├── useTaskActions.ts      # Maneja edición, borrado, estados y dueDate de tareas
│   │   ├── useTaskForm.ts         # Maneja la creación con validación y dueDate de tareas
│   │   └── useTasks.ts            # Maneja la obtención (GET), carga y errores de tareas por proyecto
│   ├── pages/                     # Vistas principales mapeadas por el Router
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── TasksPage.tsx          # Recibe el nombre del proyecto mediante router state
│   ├── services/
│   │   ├── httpClient.ts          # Instancia base de Axios e interceptores de cabeceras
│   │   ├── authService.ts         # Endpoints de autenticación y login
│   │   ├── projectService.ts      # Endpoints específicos para la gestión de proyectos
│   │   └── taskService.ts         # Endpoints específicos para la gestión de tareas y estados
│   ├── App.tsx                    # Enrutador principal y proveedores
│   ├── main.tsx                   # Punto de montaje de React DOM
│   ├── ProtectedRoute.tsx         # Componente wrapper ubicado en src para restringir vistas sin token
│   └── types.ts                   # Interfaces estrictas (Project, Task, NewTask, etc.)
├── .env.example                   # Plantilla de variables de entorno requeridas
├── .env.local                     # Variables de entorno locales del desarrollador
├── package.json                   # Dependencies y scripts de compilación
├── tsconfig.json                  # Configuración estricta de TypeScript
└── vite.config.ts                 # Configuración de Vite, plugins y base path
```



### 💡 ¿Para qué se usa esta estructura?

Organizar el código de manera modular.

Separar la lógica en `hooks/` y `services/` de la presentación en `components/` y `pages/` facilita:

- La mantenibilidad.
- El rastreo de errores.
- La reutilización de código.
- La escalabilidad del proyecto.
- La separación de responsabilidades.

---



# 4. ⚙️ Configuración de Entorno (`.env`)

Se implementaron archivos de entorno separados para aislar la URL base de la API dependiendo de la etapa de ejecución.

## `.env.local`

Variables utilizadas durante el desarrollo local:

```env
VITE_API_URL=https://d3ujwk09smrk9z.cloudfront.net
```



## `.env.example`

Variables utilizadas en el servidor de producción:

```env
VITE_API_URL=https://d3ujwk09smrk9z.cloudfront.net
```



### 💡 ¿Para qué se usa?

Permite cambiar dinámicamente las rutas del servidor al que se conecta Axios sin necesidad de modificar el código fuente al pasar de un entorno de pruebas local a un servidor en producción.

---



# 5. ⚡ Configuración del Empaquetador (`vite.config.ts`)

Para asegurar que los assets y las rutas relativas funcionen correctamente al subir la aplicación a un servidor estático con subrutas, se configuró Vite.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'taskflow-proyecto-final'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPages ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://d3ujwk09smrk9z.cloudfront.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```



### 💡 ¿Para qué se usa?

Configura el comportamiento de compilación de Vite y le indica al empaquetador cómo resolver las rutas raíz de los archivos estáticos de la aplicación web.

---



# 6. 📦 Configuración del `package.json`

El archivo de dependencias y scripts fue adaptado para automatizar la construcción de la SPA.

```json
{
  "name": "taskflow-proyecto-final",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "build:pages": "tsc -b && GITHUB_PAGES=true vite build && cp dist/index.html dist/404.html",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.11",
    "@mui/material": "^7.3.11",
    "axios": "^1.20.0",
    "ci": "^2.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "oxlint": "^1.79.0",
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  }
}
```



### 💡 ¿Para qué se usa?

Define los scripts ejecutables en consola:

```bash
npm install axios react-router-dom @mui/material@7 @emotion/react@11 @emotion/styled@11 @mui/icons-material@7
npm run dev
npm run build
```

También lista todas las dependencias y librerías externas que necesita el proyecto para funcionar correctamente.

---



# 7. 🔐 Sistema de Autenticación (JWT) y Rutas Protegidas



## Funcionamiento



### `AuthContext.tsx`

Gestiona el almacenamiento del token de sesión en el navegador mediante `localStorage` y expone el estado de autenticación a toda la aplicación.

### Interceptores de Axios

Los interceptores definidos en `httpClient.ts` capturan cada solicitud saliente para inyectar automáticamente el encabezado de seguridad:

```ts
import axios from 'axios'
import { getApiBaseUrl } from '../config/apiUrl'
import { TOKEN_KEY } from '../types'

export const httpClient = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl()
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      return 'Usuario o contraseña incorrectos.'
    }
    const status = err.response?.status ?? 'network'
    return `Error HTTP ${status}: ${err.message}`
  }
  return err instanceof Error ? err.message : 'Error desconocido'
}
```



### Rutas protegidas

Las rutas protegidas validan la existencia del token.

Si el usuario no está autenticado, el sistema redirige automáticamente a la vista de login.

### 💡 ¿Para qué se usa?

Garantiza la seguridad de la información del usuario, asegurando que solo las personas con credenciales válidas puedan interactuar con los datos protegidos de la API.

---



# 8. 🌐 Consumo de la API y Operaciones CRUD



## Funcionamiento

La aplicación se comunica con el backend RESTful mediante Axios.

Se implementan las operaciones principales:


| Método HTTP | Operación              | Ejemplo                           |
| ----------- | ---------------------- | --------------------------------- |
| `GET`       | Obtener información    | Listar proyectos y tareas         |
| `POST`      | Crear información      | Crear nuevos proyectos o tareas   |
| `PUT`       | Actualizar información | Editar tareas o cambiar su estado |
| `DELETE`    | Eliminar información   | Eliminar registros                |


Los payloads utilizan interfaces tipadas como `NewTask`.

También se implementan acciones específicas como:

```typescript
updateTaskStatus()
```



### 💡 ¿Para qué se usa?

Permite que la interfaz gráfica interactúe con los datos del servidor mediante solicitudes HTTP asíncronas.

---



# 9. 📝 Formularios, Validaciones y Manejo de Estado



## Funcionamiento

Los formularios utilizan componentes de Material UI como:

- `TextField`
- Selectores de prioridad.
- Selectores de estado.
- Selector de fecha mediante `type="date"`.

Los inputs se encuentran sincronizados con estados locales controlados mediante Custom Hooks como:

```text
useTaskForm
useTaskActions
```

Los botones de envío se deshabilitan condicionalmente cuando los datos no cumplen las reglas de validación:

```tsx
disabled={!valid || submitting}
```

Por ejemplo, se valida la longitud mínima del título para evitar solicitudes HTTP `400`.

### 🔄 Optimización con `useMemo`

Mediante `useMemo`, la interfaz procesa:

- Filtros por estado.
- Ordenamiento por ID.
- Ordenamiento alfabético.

Estos procesos se realizan directamente en el cliente para actualizar la información visual de forma inmediata.

### 💡 ¿Para qué se usa?

Mantener la integridad de los datos ingresados por el usuario, evitar envíos vacíos o erróneos hacia el servidor y optimizar la experiencia visual mediante un filtrado dinámico.

---



# 10. 🔄 Integración Continua (CI/CD) con GitHub Actions

El proyecto cuenta con un pipeline ubicado en:

```text
.github/workflows/ci.yml
```



## Funcionamiento

La automatización se ejecuta ante eventos de:

- `push`
- `pull_request`

hacia las ramas principales.

Se configura un entorno de Node.js, se instalan las dependencias mediante `npm ci` y se ejecuta la compilación mediante:

```bash
npm run build
```



## Configuración

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:pages
        env:
          VITE_API_URL: https://d3ujwk09smrk9z.cloudfront.net

      - name: Upload Pages artifact
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```



### 💡 ¿Para qué se usa?

Permite detectar de forma temprana cualquier fallo de compilación o error de tipado antes de que el código llegue a producción.

Esto ayuda a mantener la estabilidad del proyecto.

---



# 11. 🚀 Despliegue de la Aplicación



## Funcionamiento

La aplicación se empaqueta mediante:

```bash
npm run build
```

Este comando genera una carpeta optimizada:

```text
/dist
```

La carpeta contiene los archivos estáticos minificados necesarios para ejecutar la aplicación.

Estos archivos pueden ser alojados en plataformas como:

- Vercel.
- Netlify.
- GitHub Pages.
- Servidores web estáticos.



### 💡 ¿Para qué se usa?

Permite poner el sistema accesible en línea para que los usuarios puedan interactuar con la aplicación desplegada en un entorno real.

---



# 12. 🐛 Corrección del Componente `ProjectList.tsx`

Durante la implementación apareció un error en el componente `Grid` utilizado para mostrar los proyectos.

## ❌ Versión anterior

La versión anterior utilizaba la sintaxis antigua de Material UI:

```tsx
<Grid item xs={12} sm={6} md={4} key={project.id}>

```



## ✅ Versión corregida

En la versión utilizada por el proyecto se debe utilizar la prop `size`:

```tsx
<Grid
  size={{ xs: 12, sm: 6, md: 4 }}
  key={project.id}
>
  <ProjectItem
    project={project}
    onChanged={onChanged}
  />
</Grid>

```



## 📐 Distribución responsive


| Breakpoint | Tamaño | Resultado               |
| ---------- | ------ | ----------------------- |
| `xs`       | `12`   | Un proyecto por fila    |
| `sm`       | `6`    | Dos proyectos por fila  |
| `md`       | `4`    | Tres proyectos por fila |


---



# 13. 🐛 Corrección del Componente `TaskList.tsx`

El mismo problema se presentó en el `Grid` utilizado para mostrar las tareas.

## ❌ Versión anterior

```tsx
<Grid item xs={12} sm={6} md={6} key={task.id}>
  <TaskItem
    task={task}
    onChanged={onChanged}
  />
</Grid>

```



## ✅ Versión corregida

```tsx
<Grid
  size={{ xs: 12, sm: 6, md: 6 }}
  key={task.id}
>
  <TaskItem
    task={task}
    onChanged={onChanged}
  />
</Grid>

```



## 📐 Distribución responsive


| Breakpoint | Tamaño | Resultado           |
| ---------- | ------ | ------------------- |
| `xs`       | `12`   | Una tarea por fila  |
| `sm`       | `6`    | Dos tareas por fila |
| `md`       | `6`    | Dos tareas por fila |


---



# 14. 📋 Componentes `ProjectList` y `TaskList` Corregidos



## `ProjectList.tsx`

El componente permite ordenar los proyectos mediante diferentes criterios:

- ID de menor a mayor.
- ID de mayor a menor.
- Nombre de A a Z.
- Nombre de Z a A.

El ordenamiento se realiza mediante `useMemo` para procesar los datos directamente en el cliente.

### Fragmento principal

```tsx
<Grid container spacing={3}>
  {sortedProjects.map((project) => (
    <Grid
      size={{ xs: 12, sm: 6, md: 4 }}
      key={project.id}
    >
      <ProjectItem
        project={project}
        onChanged={onChanged}
      />
    </Grid>
  ))}
</Grid>

```

---



## `TaskList.tsx`

El componente permite:

- Filtrar tareas por estado.
- Mostrar todas las tareas.
- Ordenar por ID.
- Ordenar por nombre o título.
- Mostrar las tareas en tarjetas responsivas.



### Estados disponibles

```text
ALL
TODO
IN_PROGRESS
DONE

```



### Fragmento principal

```tsx
<Grid container spacing={3}>
  {processedTasks.map((task) => (
    <Grid
      size={{ xs: 12, sm: 6, md: 6 }}
      key={task.id}
    >
      <TaskItem
        task={task}
        onChanged={onChanged}
      />
    </Grid>
  ))}
</Grid>

```

---



# 15. ⚠️ Error Común con Comentarios Dentro de `map()`

Durante la implementación también se detectó un error de sintaxis cuando se colocó un comentario JSX directamente dentro del paréntesis del `map()`.

## ❌ Código incorrecto

```tsx
{tasks.map((task) => (
  {/* Comentario */}
  <Grid>
    ...
  </Grid>
))}

```

Esta estructura puede generar errores de sintaxis en JSX.

## ✅ Código correcto

El comentario debe colocarse antes del `map()`:

```tsx
{/* 2 tarjetas por fila en pantallas medianas */}
{tasks.map((task) => (
  <Grid
    size={{ xs: 12, sm: 6, md: 6 }}
    key={task.id}
  >
    <TaskItem
      task={task}
      onChanged={onChanged}
    />
  </Grid>
))}

```

De esta manera, el JSX mantiene una estructura válida y el compilador de TypeScript puede interpretar correctamente el contenido del `map()`.

---



# 16. 📊 Resumen de las Correcciones de Material UI

Los componentes de listas fueron adaptados a la sintaxis moderna de `Grid`.


| Componente    | ❌ Sintaxis anterior          | ✅ Sintaxis actual                 |
| ------------- | ---------------------------- | --------------------------------- |
| `ProjectList` | `item xs={12} sm={6} md={4}` | `size={{ xs: 12, sm: 6, md: 4 }}` |
| `TaskList`    | `item xs={12} sm={6} md={6}` | `size={{ xs: 12, sm: 6, md: 6 }}` |


Estas modificaciones permiten que los componentes sean compatibles con la API moderna de `Grid` de Material UI y mantienen el diseño responsivo de las tarjetas.

---



# 17. 🏗️ Arquitectura del Proyecto

La aplicación utiliza una separación de responsabilidades para mantener el código organizado y facilitar su mantenimiento.

```text
                    ┌──────────────────┐
                    │      Usuario     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      React       │
                    │       UI         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Hooks       │
                    │   Lógica de app  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Axios       │
                    │    API Client    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Backend      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Base de datos │
                    └──────────────────┘

```

---



# 18. 🧩 Responsabilidad de las Carpetas



## `components/`

Contiene los componentes encargados principalmente de la interfaz visual.


| Componente        | Responsabilidad             |
| ----------------- | --------------------------- |
| `ProjectForm.tsx` | Crear proyectos             |
| `ProjectItem.tsx` | Mostrar un proyecto         |
| `ProjectList.tsx` | Mostrar y ordenar proyectos |
| `TaskForm.tsx`    | Crear tareas                |
| `TaskItem.tsx`    | Mostrar una tarea           |
| `TaskList.tsx`    | Filtrar y ordenar tareas    |


---



## `hooks/`

Contiene la lógica reutilizable de la aplicación.

```text
useAuth
    │
    └── Autenticación

useProjects
    │
    └── Consulta de proyectos

useProjectActions
    │
    └── Crear / editar / eliminar proyectos

useProjectForm
    │
    └── Control del formulario de proyectos

useTasks
    │
    └── Consulta de tareas

useTaskActions
    │
    └── Crear / editar / eliminar tareas

useTaskForm
    │
    └── Control del formulario de tareas

```

---



## `contexts/`

`AuthContext.tsx` mantiene el estado global relacionado con:

- Usuario autenticado.
- Sesión.
- Información de autenticación.

---



## `pages/`

Contiene las vistas principales de la aplicación.


| Página              | Función                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `DashboardPage.tsx` | Panel principal de proyectos                                                  |
| `TasksPage.tsx`     | Administración de tareas de un proyecto                                       |
| `LoginPage.tsx`     | Parte del login donde se verifica el token del usuario y poder iniciar sesion |


---



## `services/`

Centraliza la comunicación con el backend.

### `httpClient.ts`

Contiene:

- Instancia global de Axios.
- Configuración de la API.
- Interceptores.
- Manejo del token JWT.



### `taskService.ts`

Contiene los endpoints relacionados con las tareas y sus operaciones CRUD.

---



## `types.ts`

Contiene las interfaces utilizadas para mantener contratos de datos estrictos.

Entre ellas:

```typescript
Project
Task
NewTask
```

---



# 19. 📊 Estados de las Tareas

Las tareas utilizan un flujo de trabajo basado en tres estados principales.


| Estado        | Descripción                     |
| ------------- | ------------------------------- |
| `TODO`        | Tarea pendiente de comenzar     |
| `IN_PROGRESS` | Tarea actualmente en desarrollo |
| `DONE`        | Tarea completada                |




### Flujo

```text
TODO
  │
  ▼
IN_PROGRESS
  │
  ▼
DONE

```

---



# 20. 🚦 Sistema de Prioridades

Cada tarea puede tener diferentes niveles de prioridad.


| Prioridad | Significado     |
| --------- | --------------- |
| `LOW`     | Prioridad baja  |
| `MED`     | Prioridad media |
| `HIGH`    | Prioridad alta  |


Esto permite identificar rápidamente qué actividades requieren mayor atención.

---



# 21. 📅 Fechas Límite

Las tareas pueden tener una fecha límite mediante la propiedad:

```typescript
dueDate
```

Esta funcionalidad permite establecer fechas de entrega y mejorar el seguimiento de las actividades pendientes.

El campo se maneja desde `TaskForm.tsx` y `useTaskForm.ts`.

---



# 22. 🧹 Principios de Organización

El proyecto busca mantener los siguientes principios:

- **Separación de responsabilidades.**
- **Componentes reutilizables.**
- **Tipado estricto.**
- **Código mantenible.**
- **Lógica desacoplada.**
- **Comunicación centralizada con el backend.**
- **Interfaz responsiva.**
- **Arquitectura escalable.**

---



# 23. 🚀 Objetivo del Proyecto

El objetivo de **TaskFlow** es proporcionar una solución moderna para administrar proyectos y tareas, facilitando la organización de equipos y usuarios mediante:

- Una interfaz web intuitiva.
- Componentes reutilizables.
- Tipado estricto con TypeScript.
- Comunicación REST mediante Axios.
- Autenticación mediante JWT.
- Gestión completa de proyectos y tareas.
- Filtros y ordenamientos dinámicos.
- Diseño responsivo con Material UI.
- Integración continua mediante GitHub Actions.

> **TaskFlow convierte la gestión de proyectos y tareas en un proceso organizado, visual y fácil de administrar.**

