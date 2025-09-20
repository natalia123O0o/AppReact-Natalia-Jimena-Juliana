# 🗂️ Task Manager

## 🌟 Visión General
Aplicación web para gestión colaborativa de tareas donde usuarios autenticados pueden crear, editar, eliminar y buscar tareas, con persistencia de datos y registro de historial de cambios.

## 👥 Contexto de Usuarios
Equipo de trabajo que necesita organizar tareas colaborativas con:
- Control de acceso por autenticación  
- Registro de quién hace cada modificación  
- Búsqueda rápida de tareas  
- Persistencia de datos local y remota  

## 🎯 Objetivos Principales
1. Autenticación segura con usuario/contraseña  
2. CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)  
3. Sistema de búsqueda en tiempo real  
4. Persistencia dual (localStorage + JSON Server)  
5. Registro de cambios (creador y modificador)  
6. Interfaz responsive y amigable  

## 🏗️ Arquitectura Técnica
- **Frontend:** React + Vite + Tailwind CSS  
- **Persistencia:** localStorage (cliente) + JSON (servidor)  
- **Estado Global:** React Context (sin hooks personalizados)  


## 📋 Funcionalidades Clave
- 🔐 Login/Logout con validación  
- ✅ Lista de tareas con filtros  
- ✏️ Crear/editar/eliminar tareas  
- 🔍 Búsqueda en tiempo real  
- 👥 Registro de usuario creador/modificador  
- 💾 Persistencia automática  
- 📱 Diseño responsive  

## 📁 Estructura de Carpetas

src/
│
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # Formulario de autenticación
│   │   └── PrivateRoute.jsx   # Ruta protegida
│   ├── layout/
│   │   ├── Header.jsx         # Encabezado con navegación
│   │   └── Layout.jsx         # Layout principal de la app
│   └── tasks/
│       ├── TaskForm.jsx       # Formulario de tareas
│       ├── TaskItem.jsx       # Item individual de tarea
│       └── TaskList.jsx       # Lista de tareas con filtros
│
├── context/
│   ├── AuthContext.jsx        # Contexto de autenticación
│   └── TaskContext.jsx        # Contexto de gestión de tareas
│
├── services/
│   └── localStorage.js        # Servicio de persistencia local
│
├── assets/
│   └── react.svg              # Assets estáticos
│
├── App.jsx                    # Componente principal
├── App.css                    # Estilos globales
├── index.css                  # Estilos base de Tailwind
└── main.jsx                   # Punto de entrada de la aplicación
