import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

function TaskList() {
  const {
    tasks,
    loading,
    filters,
    pagination,
    totalTasks,
    updateFilters,
    updatePagination,
  } = useTasks();

  const { user } = useAuth();

  const [isCreating, setIsCreating] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-purple-900 text-xl font-semibold">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900">Lista de Tareas</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 bg-purple-900 text-white rounded-xl hover:bg-purple-800 transition-colors font-medium shadow-md hover:shadow-lg flex items-center"
        >
          <span className="text-xl mr-2">+</span> Crear Tarea
        </button>
      </div>

      {/* Filtros y Paginación Integrados */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-purple-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-purple-900">Filtros y Paginación</h3>
          
          {/* Información de paginación */}
          <div className="flex items-center bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-purple-900 font-medium">
              Mostrando {tasks.length} de {totalTasks} tareas
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-purple-800 mb-1">Buscar tareas</label>
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-800 mb-1">Estado</label>
            <select
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value })}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value="all">Todos los estados</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-800 mb-1">Autor</label>
            <select
              value={filters.author}
              onChange={(e) => updateFilters({ author: e.target.value })}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value="all">Todos los autores</option>
              <option value={user.name}>{user.name}</option>
            </select>
          </div>
        </div>
        
        {/* Controles de paginación integrados */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-purple-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-900 font-medium">Elementos por página:</span>
            <select
              value={pagination.itemsPerPage}
              onChange={(e) =>
                updatePagination({
                  itemsPerPage: parseInt(e.target.value),
                  currentPage: 1,
                })
              }
              className="p-2 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-900 font-medium">
              Página {pagination.currentPage} de {Math.ceil(totalTasks / pagination.itemsPerPage)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => updatePagination({ 
                currentPage: Math.max(1, pagination.currentPage - 1) 
              })}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 bg-purple-100 text-purple-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-200 transition-colors flex items-center"
            >
              <span className="mr-1">←</span> Anterior
            </button>
            <button
              onClick={() => updatePagination({ 
                currentPage: pagination.currentPage + 1 
              })}
              disabled={pagination.currentPage >= Math.ceil(totalTasks / pagination.itemsPerPage)}
              className="px-4 py-2 bg-purple-100 text-purple-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-200 transition-colors flex items-center"
            >
              Siguiente <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de creación */}
      {isCreating && (
        <div className="fixed inset-0 bg-purple-100 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 border-2 border-purple-300 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900">Crear Nueva Tarea</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-purple-700 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            <TaskForm onClose={() => setIsCreating(false)} />
          </div>
        </div>
      )}

      {/* Lista de tareas */}
      <div className="mb-8">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md text-center border border-purple-200">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">No hay tareas disponibles</h3>
            <p className="text-purple-700">Crea tu primera tarea haciendo clic en el botón "Crear Tarea"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;