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
      <div className={`border-2 rounded-lg p-6 ${task.completed ? 'bg-green-50' : 'bg-white'} shadow-md hover:shadow-lg transition-all duration-200`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="h-5 w-5 text-[#854F6C] focus:ring-[#854F6C] border-[#DFB6B2]"
              />
              <h3 className={`text-xl font-bold text-[#2B124C] ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            </div>
            
            {task.description && (
              <p className="text-[#522B5B] mt-2 text-base leading-relaxed">{task.description}</p>
            )}
            
            <div className="text-sm text-[#854F6C] mt-4 space-y-2">
              <p className="flex items-center">
                <span className="text-lg mr-2">📝</span>
                Creada por: {task.createdBy} • {new Date(task.createdAt).toLocaleDateString()}
              </p>
              {task.lastModifiedBy && (
                <p className="flex items-center">
                  <span className="text-lg mr-2">✏️</span>
                  Modificada por: {task.lastModifiedBy} • {new Date(task.lastModifiedAt).toLocaleDateString()}
                </p>
              )}
              <p className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${task.completed ? 'bg-green-200 text-green-900' : 'bg-yellow-200 text-yellow-900'}`}>
                <span className="text-lg mr-2">{task.completed ? '✅' : '⏳'}</span>
                {task.completed ? 'COMPLETADA' : 'PENDIENTE'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3 ml-6">
            <button
              onClick={handleToggleComplete}
              className="px-4 py-2 text-sm bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 transition-colors flex items-center font-medium"
            >
              <span className="text-lg mr-2">{task.completed ? '↩️' : '✅'}</span>
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 text-sm bg-yellow-200 text-yellow-900 rounded-lg hover:bg-yellow-300 transition-colors flex items-center font-medium"
            >
              <span className="text-lg mr-2">✏️</span>
              Editar
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 text-sm bg-red-200 text-red-900 rounded-lg hover:bg-red-300 transition-colors flex items-center font-medium"
            >
              <span className="text-lg mr-2">🗑️</span>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#fbe4d8] bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-8 border-2 border-[#854F6C] shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#2B124C]">Editar Tarea</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#522B5B] hover:text-[#2B124C] text-2xl"
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
          <div className="bg-white rounded-lg w-full max-w-2xl p-8 border-2 border-[#854F6C] shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#2B124C]">Eliminar Tarea</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-[#522B5B] hover:text-[#2B124C] text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-[#2B124C] text-lg mb-4">¿Estás segura de que quieres eliminar esta tarea?</p>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                <h4 className="font-bold text-red-900 text-lg">{task.title}</h4>
                {task.description && (
                  <p className="text-red-700 text-base mt-2">{task.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 text-[#2B124C] border-2 border-[#DFB6B2] rounded-lg hover:bg-[#FBE4D8] transition-colors text-base font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base font-medium"
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