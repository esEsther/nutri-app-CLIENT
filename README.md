# 🥗 Nutri App – Cliente (Front-End)

Este repositorio contiene la parte cliente de la **Nutri App**, una aplicación web integral diseñada para la búsqueda, consulta y gestión de artículos de nutrición y recetas. La plataforma permite a los usuarios gestionar sus favoritos y ofrece un panel de administración completo para el control de la comunidad y el contenido.

Desarrollada con **React**, esta interfaz consume una API REST propia con seguridad basada en roles y persistencia de datos de recetas externas.

---

## 📌 Requisitos previos

- **Backend de Nutri App** corriendo en el puerto definido (`serverPort=7001`)
- **yarn**

> **Nota:** Este frontend depende del backend para la autenticación, traducción y almacenamiento de datos. Asegúrate de tener el servidor activo:  
> Repositorio Backend Nutri App: https://github.com/esEsther/nutri-app-SERVER

---

## 🛠️ Tecnologías usadas

### Núcleo
- **React.js** (Vite)
- **React Router DOM v6** (Enrutamiento dinámico)
- **Context API** (Estado global de usuario)
- **Hooks Personalizados** (Lógica de negocio y persistencia)

### Herramientas de desarrollo
- **Git y GitHub**
- **JSDoc** (Documentación técnica)
- **CSS3 Modulares** (Diseño y maquetación)
- **Fetch API** (Consumo de servicios)

---

## 📂 Estructura del proyecto

```text
src/
├── components/   # Componentes reutilizables (Card, Input, Botones, Galería...)
├── contexts/     # UserContext para gestión de sesión global
├── helpers/      # Fetch genérico y utilidades de traducción
├── hooks/        # adminActions, userAuth, userAction (Lógica de negocio)
├── routes/       # Configuración de rutas y componentes de Protección
└── pages/        # Vistas principales (Home, Login, AdminDashboard, Detalles)
```

## ✨ Funcionalidades del Frontend

### 🔐 Login y Registro
- Autenticación de usuarios mediante **JWT**.
- Registro y cierre de sesión seguros.

### 🔍 Buscador Dual
- Búsqueda en tiempo real de:
  - **Artículos**
  - **Recetas**

### ⭐ Gestión de Favoritos
- Añadir y eliminar **artículos y recetas** de la lista personal de favoritos del usuario.

### 🔄 Sincronización de Recetas
- Persistencia automática en la **base de datos local** de recetas externas cuando el usuario interactúa con ellas.

### 🌍 Traducción Dinámica
- Traducción automática del contenido de recetas externas para el usuario.

### 🛠️ Panel de Administración
- Gestión completa (**CRUD**) de:
  - Usuarios
  - Contenidos

### 🧩 Control de Roles
- Protección de rutas según nivel de acceso:
  - **Admin**
  - **User**

---

## 🔗 Consumo de Endpoints del Backend

El frontend utiliza la **URL base** definida en el archivo `.env`.

### 🔑 Autenticación

POST /auth/login
POST /auth/register
POST /auth/logout


### 👤 Usuario (Rol 1)


GET /user/buscar?titulo= // Búsqueda de artículos
POST /user/anadirFavoritos
GET /user/favoritos/:tipo
POST /user/anadirReceta // Sincronización con BD local


### 🛡️ Administrador (Rol 2)
GET /admin/getTodosLosUsuarios
GET /admin/buscarUsuario/:usuario
POST /admin/crearUsuario
POST /admin/crearArticulo
DELETE /admin/eliminarUsuario/:id


### Documentación con JsDocs

Abrir en docs/index.html

##  Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-proyecto>
    ```

2.  **Instalar dependencias:**
    ```bash
    yarn add
    ```

3.  **Crear variables de entorno** (Crea un archivo `.env` en la raíz del proyecto):
    ```
    VITE_BACKEND_URL=
    VITE_SPOONCULAR=   
    ```

4.  **Iniciar servidor** (Modo desarrollo con Nodemon):
    ```bash
    yarn dev
    ```


##  Usuarios de prueba
| nombre | email           | contrasenia | id_rol |
|--------|-----------------|-------------|--------|
| user   | lolo@gmail.com  | 123456      | 1      |
| admin  | admin@gmail.com | 123456      | 2      |
