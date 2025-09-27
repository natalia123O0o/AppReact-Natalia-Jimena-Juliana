import React from 'react';
import { useLocation } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/layout/Layout';
import TaskList from './components/tasks/TaskList';
import './App.css';

function App() {
  const location = useLocation();
  
  // Verificar si estamos en la ruta correcta
  if (!location.pathname.includes('/usuarios')) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-purple-900 text-xl">Redirigiendo...</div>
      </div>
    );
  }

  return (
    <TaskProvider>
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-secondary">Panel de Tareas</h1>
            <p className="text-tertiary">Gestiona tus tareas de manera eficiente</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Lista de Tareas</h2>
                </div>
                <div className="card-body">
                  <TaskList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </TaskProvider>
  );
}

export default App;