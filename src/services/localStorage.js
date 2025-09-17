// Operaciones con localStorage para tareas
export const tasksStorage = {
  get: () => {
    try {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  set: (tasks) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem('tasks');
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Operaciones con localStorage para usuario
export const authStorage = {
  get: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  },

  set: (user) => {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error writing user to localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem('currentUser');
      return true;
    } catch (error) {
      console.error('Error clearing user from localStorage:', error);
      return false;
    }
  }
};