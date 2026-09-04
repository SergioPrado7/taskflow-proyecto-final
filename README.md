# TaskFlow — Sistema de gestión de proyectos y tareas

TaskFlow es una aplicación web para organizar proyectos y dar seguimiento a sus tareas desde una interfaz clara y responsiva. Centraliza la creación de proyectos, la asignación de responsables, las fechas límite, las prioridades y el avance de cada actividad.

El proyecto fue desarrollado como una SPA conectada a una API REST, con autenticación JWT, rutas protegidas y una separación clara entre presentación, estado y acceso a datos.

## Problema que resuelve

En equipos de trabajo y entornos académicos es común perder visibilidad sobre las actividades pendientes, sus responsables o sus fechas de entrega. TaskFlow reúne esa información y permite administrar el ciclo completo de cada proyecto desde el navegador.

Cada tarea puede incluir:

- Estado: `TODO`, `IN_PROGRESS` o `DONE`.
- Prioridad: `LOW`, `MED` o `HIGH`.
- Responsable mediante `assigneeId`.
- Fecha límite mediante `dueDate`.
- Título y descripción.

## Funcionalidades principales

### Autenticación

- Inicio de sesión mediante credenciales.
- Persistencia del token JWT en `localStorage`.
- Inclusión automática del token en las solicitudes protegidas.
- Rutas privadas para impedir el acceso sin sesión.
- Cierre automático de sesión cuando la API responde `401`.

### Gestión de proyectos

- Consulta y visualización de proyectos.
- Creación, edición y eliminación.
- Confirmación de eliminación mediante un diálogo de Material UI.
- Ordenamiento por identificador y nombre.
- Acceso a las tareas asociadas a cada proyecto.

### Gestión de tareas

- Consulta de tareas por proyecto.
- Creación, edición y eliminación.
- Cambio rápido de estado.
- Selección de prioridad, responsable y fecha límite.
- Filtrado por estado.
- Ordenamiento por identificador o título.
- Confirmación de eliminación mediante un diálogo de Material UI.

### Navegación directa

Las rutas principales son:

```text
/login
/dashboard
/projects/:projectId/tasks
```

La página de tareas consulta `GET /projects/:id` para obtener el proyecto. De esta forma, abrir o recargar directamente `/projects/3/tasks` muestra el nombre real sin depender de datos temporales de navegación.

## Tecnologías

| Tecnología | Versión | Uso |
| --- | --- | --- |
| React | 19 | Componentes y estado de la interfaz |
| React Router | 7 | Navegación y rutas protegidas |
| TypeScript | 6 | Tipado de entidades, formularios y servicios |
| Material UI | 7 | Componentes visuales y diseño responsivo |
| Axios | 1 | Comunicación con la API e interceptores |
| Vite | 8 | Servidor de desarrollo y build |
| Vitest | 5 | Pruebas automatizadas |
| Oxlint | 1 | Análisis estático del código |

## Arquitectura

La aplicación separa los componentes visuales de la lógica de negocio y del acceso a la API:

```text
taskflow-proyecto-final/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── components/
│   │   ├── ConfirmDialog.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectItem.tsx
│   │   ├── ProjectList.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskList.tsx
│   ├── config/
│   │   └── apiUrl.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProject.ts
│   │   ├── useProjectActions.ts
│   │   ├── useProjectForm.ts
│   │   ├── useProjects.ts
│   │   ├── useTaskActions.ts
│   │   ├── useTaskForm.ts
│   │   └── useTasks.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── TasksPage.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   ├── httpClient.ts
│   │   ├── projectService.ts
│   │   └── taskService.ts
│   ├── App.tsx
│   ├── ProtectedRoute.tsx
│   ├── main.tsx
│   └── types.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Componentes

`components/` contiene formularios, listas, tarjetas y diálogos reutilizables. Estos elementos reciben datos y acciones mediante props y se concentran en la presentación.

`ProjectList` y `TaskList` usan `useMemo` para filtrar u ordenar los elementos sin recalcular el resultado en renderizados que no modifican sus dependencias.

### Hooks

`hooks/` concentra la carga de datos, los estados de formulario y las operaciones de cada entidad:

- `useProjects` y `useTasks` consultan las colecciones.
- `useProject` obtiene un proyecto individual para admitir enlaces directos.
- `useProjectForm` y `useTaskForm` controlan la creación.
- `useProjectActions` y `useTaskActions` manejan edición, eliminación y estados de carga.
- `useAuth` proporciona acceso seguro al contexto de autenticación.

### Servicios

`services/` encapsula las solicitudes HTTP. Los componentes no necesitan conocer URLs ni detalles de Axios:

- `authService` gestiona el inicio de sesión y el token.
- `projectService` implementa el CRUD de proyectos.
- `taskService` implementa el CRUD de tareas y la actualización de estado.
- `httpClient` configura la URL base, el encabezado de autorización y el interceptor de respuestas `401`.

### Tipos

`types.ts` define los contratos principales: `Project`, `Task`, `NewProject`, `NewTask`, `TaskStatus` y `TaskPriority`. Los selectores utilizan estos tipos en lugar de conversiones genéricas con `any`.

## Flujo de autenticación

1. El usuario envía sus credenciales desde `/login`.
2. `authService` solicita el token a la API.
3. `AuthContext` guarda el token y actualiza el estado de sesión.
4. El interceptor de solicitudes agrega `Authorization: Bearer <token>`.
5. `ProtectedRoute` habilita el dashboard y las páginas de tareas.
6. Si una respuesta devuelve `401`, el interceptor elimina el token y actualiza el contexto para regresar al login.

## Consumo de la API

La aplicación utiliza operaciones REST:

| Método | Uso |
| --- | --- |
| `GET` | Consultar proyectos, un proyecto individual y tareas |
| `POST` | Crear proyectos y tareas |
| `PUT` | Editar proyectos y tareas |
| `PATCH` | Actualizar el estado de una tarea |
| `DELETE` | Eliminar proyectos y tareas |

La URL del API se obtiene desde `VITE_API_URL`. En desarrollo, cuando no se define la variable, se utiliza el proxy `/api` de Vite.

## Formularios y validaciones

Los formularios utilizan campos controlados y validan la información antes de enviarla:

- Los nombres y títulos deben respetar sus longitudes permitidas.
- Los botones se deshabilitan durante las solicitudes para evitar envíos duplicados.
- Los campos opcionales vacíos se convierten a `undefined`.
- Los errores del backend se muestran mediante componentes `Alert`.
- El estado de cada formulario se restablece después de una creación exitosa.

## Interfaz y diseño responsivo

Material UI proporciona AppBar, cards, formularios, chips, botones y diálogos. La propiedad `sx` se utiliza para breakpoints, espaciado, colores, transiciones y estados `hover`.

Las listas se adaptan al tamaño de pantalla: muestran una tarjeta por fila en dispositivos pequeños y varias columnas cuando existe espacio suficiente. Los estados y prioridades se distinguen mediante chips y colores.

## Configuración local

Requiere Node.js 20 o posterior.

1. Instala las dependencias:

```bash
npm ci
```

2. Opcionalmente crea `.env.local`:

```env
VITE_API_URL=https://d3ujwk09smrk9z.cloudfront.net
```

3. Inicia el servidor:

```bash
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run lint` | Ejecuta el análisis estático |
| `npm test` | Ejecuta las pruebas una vez |
| `npm run build` | Comprueba tipos y genera el build de producción |
| `npm run build:pages` | Genera el build preparado para GitHub Pages |
| `npm run preview` | Sirve localmente el build generado |

## Pruebas

Las pruebas están ubicadas junto a la capa de servicios y verifican:

- La consulta de todos los proyectos.
- La consulta individual requerida por los enlaces directos.
- La eliminación de proyectos.
- El mensaje mostrado para respuestas no autorizadas.
- La conservación de mensajes de errores convencionales.

Para ejecutarlas:

```bash
npm test
```

## Integración continua y despliegue

El workflow `.github/workflows/ci.yml` se ejecuta en `push` y `pull_request` hacia `main`. Instala dependencias con `npm ci`, genera el build para GitHub Pages y publica el artefacto cuando corresponde.

La integración continua pertenece a GitHub Actions; no requiere una dependencia npm llamada `ci`.

## Objetivo del proyecto

TaskFlow demuestra la construcción de una aplicación frontend completa y mantenible: autenticación, rutas privadas, operaciones CRUD, tipado estricto, componentes reutilizables, diseño responsivo, manejo centralizado de HTTP, pruebas y despliegue automatizado.
