// Servicio para gestionar localStorage
export const storage = {
  // Guardar datos
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Errr  al guardar localStorage:', error);
      return false;
    }
  },

  // Obtener datos
  get: (key, defaultValue = null) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Eliminar datos
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Limpiar todo
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Claves específicas para la aplicación
export const STORAGE_KEYS = {
  USER: 'user',
  TASKS: 'tasks',
  FILTERS: 'task_filters',
  SETTINGS: 'app_settings'
};

// Ejemplo de uso:
// import { storage, STORAGE_KEYS } from './localStorage';
// storage.set(STORAGE_KEYS.USER, userData);
// const user = storage.get(STORAGE_KEYS.USER);