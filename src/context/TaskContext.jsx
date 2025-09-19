import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    author: 'all'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
  });

  // Cargar tareas al iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      // Simular carga de tareas
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cargar tareas desde localStorage o usar ejemplos
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        const sampleTasks = [
          {
            id: 1,
            title: 'Tarea de ejemplo 1',
            description: 'Descripción de ejemplo',
            completed: false,
            createdBy: 'Sistema',
            createdAt: new Date().toISOString()
          }
        ];
        setTasks(sampleTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
    setLoading(false);
  };

  const addTask = async (taskData, currentUser) => {
    const newTask = {
      ...taskData, // Copia todos los datos de la tarea
      id: Date.now(),  // Genera un ID único basado en timestamp
      createdAt: new Date().toISOString(),// Fecha de creación en formato ISO
      createdBy: currentUser.name, // Nombre del usuario que crea la tarea
      completed: false // Inicializa como no completada
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = async (id, updates, currentUser) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? {
        ...task,
        ...updates,
        lastModifiedBy: currentUser.name,
        lastModifiedAt: new Date().toISOString()
      } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleComplete = async (id, currentUser) => {
    const task = tasks.find(t => t.id === id);
    const updates = { completed: !task.completed };
    await editTask(id, updates, currentUser);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updatePagination = (newPagination) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  // Filtrar y paginar tareas
  const filteredTasks = tasks.filter(task => {
    // Filtrar por búsqueda
    const matchesSearch = filters.search === '' || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filtrar por estado
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'completed' && task.completed) ||
      (filters.status === 'pending' && !task.completed);
    
    // Filtrar por autor
    const matchesAuthor = filters.author === 'all' || 
      task.createdBy === filters.author;
    
    return matchesSearch && matchesStatus && matchesAuthor;
  });

  // Aplicar paginación
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + pagination.itemsPerPage);

  const value = {
    tasks: paginatedTasks,
    totalTasks: filteredTasks.length,
    loading,
    filters,
    pagination,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    updateFilters,
    updatePagination,
    refreshTasks: loadTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;