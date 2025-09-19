import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleComplete = () => {
    toggleComplete(task.id, user);
  };

  const handleDeleteConfirm = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={`border rounded-lg p-4 ${task.completed ? 'bg-green-50' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="h-4 w-4 text-[#854F6C] focus:ring-[#854F6C] border-[#DFB6B2]"
              />
              <h3 className={`font-semibold text-[#2B124C] ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            </div>
            
            {task.description && (
              <p className="text-[#522B5B] mt-1 text-sm">{task.description}</p>
            )}
            
            <div className="text-xs text-[#854F6C] mt-3 space-y-1">
              <p>📝 Creada por: {task.createdBy} • {new Date(task.createdAt).toLocaleDateString()}</p>
              {task.lastModifiedBy && (
                <p>✏️ Modificada por: {task.lastModifiedBy} • {new Date(task.lastModifiedAt).toLocaleDateString()}</p>
              )}
              <p className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {task.completed ? '✅ Completada' : '⏳ Pendiente'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleToggleComplete}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
            >
              <span className="mr-1">{task.completed ? '↩️' : '✅'}</span>
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors flex items-center"
            >
              <span className="mr-1">✏️</span>
              Editar
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors flex items-center"
            >
              <span className="mr-1">🗑️</span>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#fbe4d8] bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 border-2 border-[#854F6C] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2B124C]">Editar Tarea</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#522B5B] hover:text-[#2B124C] text-lg"
              >
                ✕
              </button>
            </div>
            <TaskForm 
              editTask={task} 
              onClose={() => setShowEditModal(false)} 
            />
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[#fbe4d8] bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 border-2 border-[#854F6C] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2B124C]">Eliminar Tarea</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-[#522B5B] hover:text-[#2B124C] text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-[#2B124C] mb-3">¿Estás segura de que quieres eliminar esta tarea?</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-medium text-red-800">{task.title}</h4>
                {task.description && (
                  <p className="text-red-600 text-sm mt-1">{task.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-[#2B124C] border border-[#DFB6B2] rounded-lg hover:bg-[#FBE4D8] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;