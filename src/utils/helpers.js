// Funciones de transformación de datos
export const dataHelpers = {
  // Sincronizar datos locales con servidor
  syncTasks: async (localTasks, remoteTasks) => {
    // Lógica para reconciliar diferencias
    const mergedTasks = [...remoteTasks];
    
    // Agregar tareas locales que no existen en remoto
    localTasks.forEach(localTask => {
      if (!remoteTasks.some(remoteTask => remoteTask.id === localTask.id)) {
        mergedTasks.push(localTask);
      }
    });
    
    return mergedTasks;
  },

  // Transformar datos para API
  prepareForAPI: (task) => {
    return {
      title: task.title,
      description: task.description,
      completed: task.completed || false,
      createdAt: task.createdAt || new Date().toISOString(),
      createdBy: task.createdBy,
      lastModifiedAt: task.lastModifiedAt || new Date().toISOString(),
      lastModifiedBy: task.lastModifiedBy
    };
  },

  // Manejo básico de errores
  handleError: (error, context = 'Operation') => {
    console.error(`${context} error:`, error);
    return {
      success: false,
      message: error.message || `Error during ${context.toLowerCase()}`
    };
  }
};

// Funciones para optimistic updates
export const optimisticHelpers = {
  // Generar ID temporal para optimistic updates
  generateTempId: () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  // Verificar si es ID temporal
  isTempId: (id) => typeof id === 'string' && id.startsWith('temp-'),

  // Reemplazar ID temporal con ID real del servidor
  replaceTempId: (tasks, tempId, realId) => {
    return tasks.map(task => 
      task.id === tempId ? { ...task, id: realId } : task
    );
  }
};