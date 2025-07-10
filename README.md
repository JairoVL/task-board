#  Task Board - Gestión de Tareas Colaborativas

Aplicación web similar a Trello/Notion para gestión de tareas en equipo, desarrollada con **React**, **TypeScript** y **SCSS Modules**. Permite organizar tareas en columnas, moverlas mediante drag & drop y aplicar filtros por prioridad.

---

##  Tecnologías utilizadas

| Tecnología             | Uso                                                                 |
|------------------------|----------------------------------------------------------------------|
| **React**              | Creación de componentes funcionales y dinámicos                      |
| **TypeScript**         | Tipado estricto para mayor seguridad y escalabilidad                 |
| **SCSS Modules**       | Estilos encapsulados por componente                                  |
| **Vite**               | Empaquetado ultrarrápido y entorno de desarrollo                     |
| **React Router DOM**   | Ruteo de páginas (Login / Dashboard)                                 |
| **react-beautiful-dnd**| Interacción drag & drop entre columnas                               |
| **LocalStorage**       | Simulación de persistencia sin backend                               |

---

##  Estructura del Proyecto

task-board/
├── public/ # Archivos públicos
├── src/
│ ├── components/ # Componentes reutilizables (UI)
│ ├── context/ # Context API (manejo de estado global)
│ ├── data/ # Datos iniciales (mockeados)
│ ├── pages/ # Páginas principales (Login, Dashboard)
│ ├── styles/ # Estilos globales y modulares
│ ├── types/ # Tipos de datos TypeScript
│ ├── utils/ # Funciones utilitarias (ID, etc.)
│ └── main.tsx # Entry point principal
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md



---

##  Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/JairoVL/task-board.git
cd task-board


#### 2. Instalar Dependencias
``` bash
npm install

#### 3. Ejucutar en modo desarrollo

npm run dev


Funcionalidades-principales


✅ Autenticación simulada (pantalla de login)

✅ Creación y edición de tareas

✅ Arrastrar y soltar entre columnas

✅ Filtro de tareas por prioridad

✅ Persistencia con LocalStorage

 Pendientes-o-posibles-mejoras

Autenticación real con backend

Sincronización en tiempo real

Diseño responsive

Tests unitarios y de integración




Autor
Jairo Villalba