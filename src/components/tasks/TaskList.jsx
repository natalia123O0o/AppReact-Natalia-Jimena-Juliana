import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { 
    tasks, 
    loading, 
    filters, 
    pagination, 
    totalTasks, 
    updateFilters, 
    updatePagination 
  } = useTasks();
  
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) {
    return <div className="text-center py-8">Cargando tareas...</div>;
  }

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleStatusChange = (e) => {
    updateFilters({ status: e.target.value });
  };

  const handleAuthorChange = (e) => {
    updateFilters({ author: e.target.value });
  };

  const handlePageChange = (newPage) => {
    updatePagination({ currentPage: newPage });
  };

  return (
    <div className="space-y-4">
      {/* Header con botón de crear */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Tareas</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#2B124C] text-white rounded-lg hover:bg-[#522B5B] flex items-center transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Crear Tarea
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Buscar</label>
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            value={filters.status || 'all'}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
          >
            <option value="all">Todos</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <select
            value={filters.author || 'all'}
            onChange={handleAuthorChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
          >
            <option value="all">Todos</option>
            <option value={user.name}>Mis tareas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Items por página</label>
          <select
            value={pagination.itemsPerPage}
            onChange={(e) => updatePagination({ 
              itemsPerPage: parseInt(e.target.value),
              currentPage: 1 
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filters.search || filters.status !== 'all' || filters.author !== 'all' 
              ? 'No hay tareas que coincidan con los filtros' 
              : 'No hay tareas creadas aún'
            }
          </div>
        ) : (
          <>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </>
        )}
      </div>

      {/* Paginación */}
      {totalTasks > pagination.itemsPerPage && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Anterior
          </button>
          
          <span className="text-sm">
            Página {pagination.currentPage} de {Math.ceil(totalTasks / pagination.itemsPerPage)}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= Math.ceil(totalTasks / pagination.itemsPerPage)}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      )}
      
      {/* Modal para Crear Tarea */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#fbe4d8] bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 border-2 border-[#854F6C] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2B124C]">Crear Nueva Tarea</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#522B5B] hover:text-[#2B124C] text-lg"
              >
                ✕
              </button>
            </div>
            <TaskForm onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
)}
    </div>
  );
};

export default TaskList;