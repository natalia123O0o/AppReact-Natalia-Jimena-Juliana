// TaskItem.jsx
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
      <div className={`border-2 rounded-2xl p-6 ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-pink-200'} shadow-md hover:shadow-lg transition-all duration-300 mb-4`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="h-6 w-6 text-purple-700 focus:ring-purple-500 border-pink-300 rounded"
              />
              <h3 className={`text-xl font-bold text-purple-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            </div>
            
            {task.description && (
              <p className="text-purple-800 mt-3 text-base leading-relaxed bg-purple-50 p-4 rounded-xl">{task.description}</p>
            )}
            
            <div className="text-sm text-purple-700 mt-5 space-y-2">
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
              <p className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${task.completed ? 'bg-green-200 text-green-900' : 'bg-yellow-200 text-yellow-900'}`}>
                <span className="text-base mr-1">{task.completed ? '✅' : '⏳'}</span>
                {task.completed ? 'COMPLETADA' : 'PENDIENTE'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-6">
            <button
              onClick={handleToggleComplete}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition-colors flex items-center font-medium border border-blue-200"
            >
              <span className="text-base mr-1">{task.completed ? '↩️' : '✅'}</span>
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-xl hover:bg-yellow-200 transition-colors flex items-center font-medium border border-yellow-200"
            >
              <span className="text-base mr-1">✏️</span>
              Editar
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 text-sm bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-colors flex items-center font-medium border border-red-200"
            >
              <span className="text-base mr-1">🗑️</span>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-purple-100 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 border-2 border-purple-300 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900">Editar Tarea</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-purple-700 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
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
        <div className="fixed inset-0 bg-purple-100 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 border-2 border-purple-300 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900">Eliminar Tarea</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-purple-700 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-purple-900 text-lg mb-4">¿Estás segura de que quieres eliminar esta tarea?</p>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <h4 className="font-bold text-red-900 text-lg">{task.title}</h4>
                {task.description && (
                  <p className="text-red-700 text-base mt-2">{task.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 text-purple-900 border-2 border-pink-300 rounded-xl hover:bg-pink-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
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