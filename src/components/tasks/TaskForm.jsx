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
    e.preventDefault();// Previene el comportamiento por defecto del formulario
    
    if (!title.trim()) {  // Valida que el título no esté vacío
      alert('Por favor, ingresa un título para la tarea');
      return;// Detiene la ejecución si la validación falla
    }

    const taskData = { // Prepara los datos de la tarea
      title: title.trim(),// Elimina espacios en blanco al inicio/final
      description: description.trim() // Igual para la descripción
    };

    if (editTask) {
      updateTask(editTask.id, taskData, user); // Llama a la función de actualización
    } else {
      addTask(taskData, user);
    }

    setTitle(''); // Limpia el campo título
    setDescription('');
    if (onClose) onClose();// Cierra el modal/dialog si existe la función
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-[#2B124C]">Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="w-full p-3 border border-[#DFB6B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#2B124C]">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea (opcional)"
          rows={4}
          className="w-full p-3 border border-[#DFB6B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-[#2B124C] border border-[#DFB6B2] rounded-lg hover:bg-[#FBE4D8]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#2B124C] text-white rounded-lg hover:bg-[#522B5B]"
        >
          {editTask ? 'Actualizar' : 'Crear'} Tarea
        </button>
      </div>
    </form>
  );
};

export default TaskForm;