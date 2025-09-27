import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx"; 
import Login from "./components/auth/Login.jsx";
import App from "./App.jsx";

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.MODE === 'development';
const baseName = isDevelopment ? "/" : "/AppReact-Natalia-Jimena-Juliana/";

console.log('Mode:', import.meta.env.MODE);
console.log('Base URL:', baseName);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <AuthProvider>
        <Routes>
          {/* Redirigir la raíz directamente al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />
          
          {/* Redirigir rutas no encontradas al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);