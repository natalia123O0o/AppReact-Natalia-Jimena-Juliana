# Task Manager App

Stack: React + Vite + TailwindCSS + JSON-Server + LocalStorage  
Equipo: Ana, Luis, María (cambia por los nombres reales)

## Scripts
- `npm run dev` – levanta el front en http://localhost:5173  
- `npm run server` – levanta JSON-Server en http://localhost:4000  
- `npm run dev:full` – ambos servidores simultáneamente  
- `npm run seed` – pobla db.json con datos falsos  
- `npm run build` – build de producción  
- `npm run lint` – ESLint  

## Estructura de carpetas
(src/… explicar brevemente)

## GitFlow
- `main` → producción  
- `develop` → integración  
- `feature/&lt;nombre&gt;` → cada funcionalidad (feature/auth-flow, feature/task-crud, …)

## Decisiones de diseño
- Autenticación contra JSON-Server (/users).  
- Estado global con Context + hooks personalizados.  
- LocalStorage como cache; se sincroniza con JSON-Server cuando hay red.  
- Auditoría: campos `createdBy` y `updatedBy` en cada tarea.

## Cómo probar
1. Clonar repo  
2. `npm install`  
3. `npm run seed`  
4. `npm run dev:full`  
5. Login: usuario **ana** contraseña **1234**