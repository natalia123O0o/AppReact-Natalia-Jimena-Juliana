// test/TaskList.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock de componentes hijos primero
vi.mock('../src/components/tasks/TaskItem', () => ({
  default: ({ task }) => <div data-testid="task-item">{task.title}</div>
}));

vi.mock('../src/components/tasks/TaskForm', () => ({
  default: ({ onClose }) => (
    <div data-testid="task-form">
      <button onClick={onClose}>Cerrar</button>
    </div>
  )
}));

// Mock de contextos
vi.mock('../src/context/TaskContext', () => ({
  useTasks: vi.fn()
}));

vi.mock('../src/context/AuthContext', () => ({
  useAuth: vi.fn()
}));

describe('Componente TaskList', () => {
  let TaskList;
  const mockUpdateFilters = vi.fn();
  const mockUpdatePagination = vi.fn();
  
  let useTasksMock, useAuthMock;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    
    // Re-importar los mocks después de reset
    useTasksMock = (await import('../src/context/TaskContext')).useTasks;
    useAuthMock = (await import('../src/context/AuthContext')).useAuth;
    
    // Configuración por defecto de mocks
    useTasksMock.mockReturnValue({
      tasks: [
        { 
          id: 1, 
          title: 'Tarea 1', 
          description: 'Descripción 1', 
          completed: false, 
          createdBy: 'Usuario1',
          createdAt: new Date().toISOString()
        },
        { 
          id: 2, 
          title: 'Tarea 2', 
          description: 'Descripción 2', 
          completed: true, 
          createdBy: 'Usuario2',
          createdAt: new Date().toISOString()
        }
      ],
      loading: false,
      filters: { search: '', status: 'all', author: 'all' },
      pagination: { currentPage: 1, itemsPerPage: 10 },
      totalTasks: 2,
      updateFilters: mockUpdateFilters,
      updatePagination: mockUpdatePagination
    });

    useAuthMock.mockReturnValue({
      user: { name: 'Test User', username: 'testuser' }
    });

    // Importar componente ya con mocks listos
    TaskList = (await import('../src/components/tasks/TaskList')).default;
  });

  test('renderiza la lista de tareas correctamente', () => {
    render(<TaskList />);
    
    expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar tareas...')).toBeInTheDocument();
    expect(screen.getByText('Crear Tarea')).toBeInTheDocument();
    expect(screen.getAllByTestId('task-item')).toHaveLength(2);
  });

  test('filtra tareas por término de búsqueda', () => {
    render(<TaskList />);
    
    const searchInput = screen.getByPlaceholderText('Buscar tareas...');
    fireEvent.change(searchInput, { target: { value: 'Tarea 1' } });
    
    expect(mockUpdateFilters).toHaveBeenCalledWith({ search: 'Tarea 1' });
  });

  test('muestra el modal de creación cuando se hace clic en el botón', () => {
    render(<TaskList />);
    
    const createButton = screen.getByText('Crear Tarea');
    fireEvent.click(createButton);
    
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });

  test('muestra estado de carga', () => {
    useTasksMock.mockReturnValue({
      loading: true,
      tasks: [],
      filters: { search: '', status: 'all', author: 'all' },
      pagination: { currentPage: 1, itemsPerPage: 10 },
      totalTasks: 0,
      updateFilters: mockUpdateFilters,
      updatePagination: mockUpdatePagination
    });

    render(<TaskList />);
    expect(screen.getByText('Cargando tareas...')).toBeInTheDocument();
  });

  test('muestra estado vacío cuando no hay tareas', () => {
    useTasksMock.mockReturnValue({
      loading: false,
      tasks: [],
      filters: { search: '', status: 'all', author: 'all' },
      pagination: { currentPage: 1, itemsPerPage: 10 },
      totalTasks: 0,
      updateFilters: mockUpdateFilters,
      updatePagination: mockUpdatePagination
    });

    render(<TaskList />);
    expect(screen.getByText('No hay tareas disponibles')).toBeInTheDocument();
  });

  test('filtra tareas por estado', () => {
    render(<TaskList />);
    
    const statusSelect = screen.getByDisplayValue('Todos los estados');
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    
    expect(mockUpdateFilters).toHaveBeenCalledWith({ status: 'completed' });
  });

  test('filtra tareas por autor', () => {
    render(<TaskList />);
    
    const authorSelect = screen.getByDisplayValue('Todos los autores');
    fireEvent.change(authorSelect, { target: { value: 'Test User' } });
    
    expect(mockUpdateFilters).toHaveBeenCalledWith({ author: 'Test User' });
  });

  test('cambia items por página', () => {
    render(<TaskList />);
    
    const itemsPerPageSelect = screen.getByDisplayValue('10');
    fireEvent.change(itemsPerPageSelect, { target: { value: '5' } });
    
    expect(mockUpdatePagination).toHaveBeenCalledWith({
      itemsPerPage: 5,
      currentPage: 1
    });
  });
});
