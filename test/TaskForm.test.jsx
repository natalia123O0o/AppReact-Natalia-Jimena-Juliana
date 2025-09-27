import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../src/components/tasks/TaskForm";

// Mocks de los contextos
const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockUser = { id: 1, name: "Douglas" };

jest.mock("../src/context/TaskContext", () => ({
  useTasks: () => ({
    addTask: mockAddTask,
    editTask: mockUpdateTask,
  }),
}));

jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({ user: mockUser }),
}));

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza el formulario vacío cuando no hay editTask", () => {
    render(<TaskForm />);
    expect(screen.getByPlaceholderText("Título de la tarea")).toHaveValue("");
    expect(screen.getByPlaceholderText("Descripción de la tarea (opcional)")).toHaveValue("");
    expect(screen.getByText("Crear Tarea")).toBeInTheDocument();
  });

  test("renderiza el formulario con datos cuando editTask está presente", () => {
    const editTask = { id: 1, title: "Tarea editada", description: "Descripción existente" };
    render(<TaskForm editTask={editTask} />);
    
    expect(screen.getByPlaceholderText("Título de la tarea")).toHaveValue("Tarea editada");
    expect(screen.getByPlaceholderText("Descripción de la tarea (opcional)")).toHaveValue("Descripción existente");
    expect(screen.getByText("Actualizar Tarea")).toBeInTheDocument();
  });

  test("muestra alerta si se intenta enviar sin título", () => {
    window.alert = jest.fn();
    render(<TaskForm />);
    
    fireEvent.submit(screen.getByRole("button", { name: /crear tarea/i }));
    expect(window.alert).toHaveBeenCalledWith("Por favor, ingresa un título para la tarea");
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  test("llama a addTask cuando se crea una nueva tarea", () => {
    const mockOnClose = jest.fn();
    render(<TaskForm onClose={mockOnClose} />);
    
    fireEvent.change(screen.getByPlaceholderText("Título de la tarea"), { target: { value: "Nueva tarea" } });
    fireEvent.change(screen.getByPlaceholderText("Descripción de la tarea (opcional)"), { target: { value: "Una descripción" } });
    fireEvent.submit(screen.getByRole("button", { name: /crear tarea/i }));

    expect(mockAddTask).toHaveBeenCalledWith(
      { title: "Nueva tarea", description: "Una descripción" },
      mockUser
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("llama a updateTask cuando se edita una tarea", () => {
    const mockOnClose = jest.fn();
    const editTask = { id: 1, title: "Vieja tarea", description: "Vieja descripción" };
    
    render(<TaskForm editTask={editTask} onClose={mockOnClose} />);
    
    fireEvent.change(screen.getByPlaceholderText("Título de la tarea"), { target: { value: "Tarea actualizada" } });
    fireEvent.submit(screen.getByRole("button", { name: /actualizar tarea/i }));

    expect(mockUpdateTask).toHaveBeenCalledWith(
      1,
      { title: "Tarea actualizada", description: "Vieja descripción" },
      mockUser
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("ejecuta onClose al presionar cancelar", () => {
    const mockOnClose = jest.fn();
    render(<TaskForm onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
