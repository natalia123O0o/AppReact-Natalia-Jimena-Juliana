import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo y nombre de la app */}
          <div className="flex items-center space-x-2">
            <div className="bg-accent p-2 rounded-lg">
              <i className="fas fa-tasks text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>

          {/* Menú para desktop */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-light transition-colors">Inicio</a>
            <a href="#" className="hover:text-light transition-colors">Tareas</a>
            <a href="#" className="hover:text-light transition-colors">Equipo</a>
            <a href="#" className="hover:text-light transition-colors">Configuración</a>
          </nav>

          {/* Usuario y acciones */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-tertiary p-2 rounded-lg">
              <div className="bg-light text-accent rounded-full h-8 w-8 flex items-center justify-center">
                <i className="fas fa-user"></i>
              </div>
              <span>{user?.name || 'Usuario'}</span>
            </div>
            
            <button 
              onClick={logout}
              className="bg-accent hover:bg-secondary text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>

            {/* Botón de menú móvil */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-secondary rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:text-light transition-colors py-2">Inicio</a>
              <a href="#" className="hover:text-light transition-colors py-2">Tareas</a>
              <a href="#" className="hover:text-light transition-colors py-2">Equipo</a>
              <a href="#" className="hover:text-light transition-colors py-2">Configuración</a>
              
              <div className="flex items-center space-x-2 pt-2 border-t border-accent">
                <div className="bg-light text-accent rounded-full h-8 w-8 flex items-center justify-center">
                  <i className="fas fa-user"></i>
                </div>
                <span>{user?.name || 'Usuario'}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;