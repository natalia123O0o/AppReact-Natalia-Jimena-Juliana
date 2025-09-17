// Configuración base de API
const API_BASE_URL = 'http://localhost:3001';

// Funciones para usuarios
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/users?username=${username}&password=${password}`);
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
  }
};

// Funciones para tareas
export const tasksAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return await response.json();
  },

  create: async (task) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return await response.json();
  },

  update: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await response.json();
  },

  delete: async (id) => {
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    return true;
  }
};