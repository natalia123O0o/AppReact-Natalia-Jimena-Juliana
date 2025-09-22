import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <header className="bg-[#2B124C] shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo y nombre de la app */}
          <div className="flex items-center space-x-2">
            <div className="p-2">
              <i className="fas fa-tasks text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          </div>

          {/* Usuario y cerrar sesión */}
          <div className="flex items-center space-x-4">
            {/* Nombre del usuario con emoji */}
            <div className="flex items-center space-x-2">
              <span className="text-white text-xl">👤</span>
              <span className="text-white font-semibold">{user?.name || 'Usuario'}</span>
            </div>
            
            {/* Botón de cerrar sesión */}
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-[#dfb6b2] text-[#2B124C] py-2 px-4 rounded-lg flex items-center space-x-2 font-semibold"
            >
              {isLoggingOut ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Saliendo...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Cerrar Sesión</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;