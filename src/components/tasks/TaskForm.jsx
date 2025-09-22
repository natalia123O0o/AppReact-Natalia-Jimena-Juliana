// TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const TaskForm = ({ onClose, editTask = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask, editTask: updateTask } = useTasks();
  const { user } = useAuth();

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || '');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Por favor, ingresa un título para la tarea');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim()
    };

    if (editTask) {
      updateTask(editTask.id, taskData, user);
    } else {
      addTask(taskData, user);
    }

    setTitle('');
    setDescription('');
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2 text-purple-900">Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="w-full p-4 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-purple-900">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea (opcional)"
          rows={4}
          className="w-full p-4 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-purple-900 border-2 border-pink-300 rounded-xl hover:bg-pink-50 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-900 text-white rounded-xl hover:bg-purple-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
        >
          {editTask ? 'Actualizar' : 'Crear'} Tarea
        </button>
      </div>
    </form>
  );
};

export default TaskForm;