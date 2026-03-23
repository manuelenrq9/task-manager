# 📝 Task Manager - Prueba Técnica Next.js

Sistema de gestión de tareas desarrollado como parte de una evaluación técnica. La aplicación permite crear, listar y visualizar detalles de tareas, cumpliendo con estándares de validación y arquitectura moderna.

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 15+ (App Router)
- **Lenguaje:** TypeScript (Tipado estricto)
- **Base de Datos:** SQLite (vía Prisma ORM)
- **Estilos:** Tailwind CSS
- **Validaciones:** Regex & Server-side validation

## 🛠️ Requisitos de la Prueba Cumplidos

1.  **Layout General:** Implementación de Header, Footer y navegación persistente.
2.  **Vistas:**
    - `Home`: Listado de tareas con Server Components.
    - `New`: Formulario de creación con validaciones en tiempo real.
    - `Detail`: Vista individual de cada tarea (ID dinámico).
3.  **API (Route Handlers):** Endpoint `/api/tasks` para operaciones GET y POST.
4.  **Validaciones Especiales:** \* El título solo permite caracteres alfanuméricos, guiones (-) y guiones bajos (\_).
    - Manejo de estados de carga (Loading) y errores visuales.
5.  **Arquitectura:** Separación de capas utilizando el directorio `src/lib` para la configuración de Prisma.

## 📦 Instalación y Uso Local

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/TU_USUARIO/task-manager.git](https://github.com/TU_USUARIO/task-manager.git)
    cd task-manager
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configurar Base de Datos:**

    ```bash
    pnpm prisma migrate dev --name init
    ```

4.  **Correr en desarrollo:**
    ```bash
    pnpm dev
    ```
    La app estará disponible en `http://localhost:3000`.
