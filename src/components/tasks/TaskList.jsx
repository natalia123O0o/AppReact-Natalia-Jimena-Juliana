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
    return <p>Cargando tareas...</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No hay tareas disponibles</p>;
  }

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {/* Filtros */}
      <div>
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />

        <select
          value={filters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>

        <select
          value={filters.author}
          onChange={(e) => updateFilters({ author: e.target.value })}
        >
          <option value="all">Todos los autores</option>
          <option value={user.name}>{user.name}</option>
        </select>
      </div>

      {/* Botón para crear tarea */}
      <button onClick={() => setIsCreating(true)}>Crear Tarea</button>

      {/* Modal de creación */}
      {isCreating && <TaskForm onClose={() => setIsCreating(false)} />}

      {/* Lista de tareas */}
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {/* Paginación */}
      <div>
        <span>
          Página {pagination.currentPage} de{" "}
          {Math.ceil(totalTasks / pagination.itemsPerPage)}
        </span>

        <select
          value={pagination.itemsPerPage}
          onChange={(e) =>
            updatePagination({
              itemsPerPage: parseInt(e.target.value),
              currentPage: 1,
            })
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

export default TaskList;
