// test/TaskItem.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../src/components/tasks/TaskItem";

// ---- Mocks persistentes ----
const mockDeleteTask = jest.fn();
const mockToggleComplete = jest.fn();

// Mock de contextos
jest.mock("../src/context/TaskContext", () => ({
  useTasks: () => ({
    deleteTask: mockDeleteTask,
    toggleComplete: mockToggleComplete,
  }),
}));

jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({ user: { id: "user123", name: "TestUser" } }),
}));

// Mock del TaskForm
jest.mock("../src/components/tasks/TaskForm", () => () => (
  <div data-testid="mock-task-form">Mock Task Form</div>
));

describe("TaskItem", () => {
  const mockTask = {
    id: "1",
    title: "Tarea de prueba",
    description: "Descripción de prueba",
    completed: false,
    createdBy: "User1",
    createdAt: new Date().toISOString(),
    lastModifiedBy: "User2",
    lastModifiedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks(); // limpia llamadas previas antes de cada test
  });

  test("renderiza título y descripción", () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
  });

  test("llama a toggleComplete al hacer clic en checkbox", () => {
    render(<TaskItem task={mockTask} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockToggleComplete).toHaveBeenCalledWith("1", { id: "user123", name: "TestUser" });
  });

  test("abre y cierra modal de edición", () => {
    render(<TaskItem task={mockTask} />);
    fireEvent.click(screen.getByText(/Editar/i));
    expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();
    fireEvent.click(screen.getByText("✕"));
    expect(screen.queryByTestId("mock-task-form")).not.toBeInTheDocument();
  });

  test("abre y confirma modal de eliminación", () => {
    render(<TaskItem task={mockTask} />);
    fireEvent.click(screen.getByText(/Eliminar/i));
    expect(screen.getByText(/¿Estás segura de que quieres eliminar esta tarea/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Sí, Eliminar"));
    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });
});
