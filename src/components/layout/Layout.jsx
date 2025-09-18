import React, { useState } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Sidebar para desktop */}
        <aside className="hidden md:block bg-primary text-white w-64 min-h-screen py-8 px-4">
          <div className="mb-8 px-4">
            <h2 className="text-xl font-bold mb-6">Menú Principal</h2>
            <nav className="space-y-4">
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-secondary hover:bg-tertiary transition-colors">
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                <i className="fas fa-tasks"></i>
                <span>Mis Tareas</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                <i className="fas fa-users"></i>
                <span>Equipo</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                <i className="fas fa-chart-bar"></i>
                <span>Reportes</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                <i className="fas fa-cog"></i>
                <span>Configuración</span>
              </a>
            </nav>
          </div>
          
          <div className="px-4 mt-8">
            <h3 className="text-lg font-semibold mb-4">Tareas Recientes</h3>
            <div className="space-y-3">
              <div className="bg-tertiary p-3 rounded-lg">
                <p className="text-sm truncate">Diseñar nueva interfaz</p>
                <div className="w-full bg-accent h-1 rounded-full mt-2">
                  <div className="bg-light h-1 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="bg-tertiary p-3 rounded-lg">
                <p className="text-sm truncate">Revisar documentación</p>
                <div className="w-full bg-accent h-1 rounded-full mt-2">
                  <div className="bg-light h-1 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Sidebar móvil con overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white py-8 px-4 transform md:hidden transition-transform duration-300 ease-in-out">
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="mb-8 px-4">
              <h2 className="text-xl font-bold mb-6">Menú Principal</h2>
              <nav className="space-y-4">
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-secondary hover:bg-tertiary transition-colors">
                  <i className="fas fa-home"></i>
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                  <i className="fas fa-tasks"></i>
                  <span>Mis Tareas</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                  <i className="fas fa-users"></i>
                  <span>Equipo</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                  <i className="fas fa-chart-bar"></i>
                  <span>Reportes</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors">
                  <i className="fas fa-cog"></i>
                  <span>Configuración</span>
                </a>
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Botón flotante para abrir sidebar en móvil */}
      <button 
        className="md:hidden fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-lg z-30"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
};

export default Layout;