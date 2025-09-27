// test/TaskList.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../src/components/tasks/TaskList";

// Mock del contexto/hook que usa TaskList
const mockUpdatePagination = jest.fn();

jest.mock("../src/context/TaskContext", () => ({
  useTasks: () => ({
    tasks: [],
    filters: { search: "", status: "all", author: "all" },
    updateFilters: jest.fn(),
    updatePagination: mockUpdatePagination,
    pagination: { currentPage: 1, itemsPerPage: 5 },
    totalTasks: 10,
    loading: false,
  }),
}));

jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user123", name: "TestUser" },
  }),
}));

jest.mock("../src/components/tasks/TaskForm", () => () => (
  <div data-testid="mock-task-form">MockTaskForm</div>
));

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("abre y cierra modal de creación", () => {
    render(<TaskList />);

    fireEvent.click(screen.getByRole("button", { name: /Crear Tarea/i }));
    expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("✕"));
    expect(screen.queryByTestId("mock-task-form")).not.toBeInTheDocument();
  });

  test("botones de paginación funcionan", () => {
    render(<TaskList />);

    const btnSiguiente = screen.getByText(/Siguiente/i);
    fireEvent.click(btnSiguiente);

    // Dos opciones:
    // 1) Se llama updatePagination
    if (mockUpdatePagination.mock.calls.length > 0) {
      expect(mockUpdatePagination).toHaveBeenCalledWith(
        expect.objectContaining({ currentPage: 2 })
      );
    } else {
      // 2) O la UI muestra el cambio de página
      expect(screen.getByText(/Página 2/i)).toBeInTheDocument();
    }
  });
});
