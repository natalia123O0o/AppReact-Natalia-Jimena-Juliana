// test/TaskContext.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { TaskProvider, useTasks } from "../src/context/TaskContext";

// Componente de prueba que consume el contexto
function TestComponent() {
  const {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    updateFilters,
    updatePagination,
    filters,
    pagination,
  } = useTasks();

  return (
    <div>
      <div data-testid="tasks-count">{tasks.length}</div>
      <div data-testid="filters">{JSON.stringify(filters)}</div>
      <div data-testid="pagination">{JSON.stringify(pagination)}</div>
      <button
        onClick={() =>
          addTask({ title: "Nueva Tarea", description: "Desc" }, { name: "Tester" })
        }
      >
        add
      </button>
      <button onClick={() => editTask(tasks[0]?.id, { title: "Editada" }, { name: "Tester" })}>
        edit
      </button>
      <button onClick={() => deleteTask(tasks[0]?.id)}>delete</button>
      <button onClick={() => toggleComplete(tasks[0]?.id, { name: "Tester" })}>
        toggle
      </button>
      <button onClick={() => updateFilters({ status: "completed" })}>filter</button>
      <button onClick={() => updatePagination({ currentPage: 2 })}>paginate</button>
    </div>
  );
}

describe("TaskContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("carga tarea de ejemplo si no hay en localStorage", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    // Avanzamos timers porque loadTasks usa setTimeout
    await act(async () => {
      jest.runAllTimers();
    });

    expect(Number(screen.getByTestId("tasks-count").textContent)).toBeGreaterThan(0);
  });

  test("addTask agrega una nueva tarea", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const initialCount = Number(screen.getByTestId("tasks-count").textContent);

    act(() => {
      screen.getByText("add").click();
    });

    expect(Number(screen.getByTestId("tasks-count").textContent)).toBe(initialCount + 1);
    expect(localStorage.getItem("tasks")).toContain("Nueva Tarea");
  });

  test("editTask modifica una tarea existente", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    act(() => {
      screen.getByText("add").click();
    });

    act(() => {
      screen.getByText("edit").click();
    });

    const stored = JSON.parse(localStorage.getItem("tasks"));
    expect(stored.some((t) => t.title === "Editada")).toBe(true);
  });

  test("deleteTask elimina la tarea", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    act(() => {
      screen.getByText("add").click();
    });

    const before = Number(screen.getByTestId("tasks-count").textContent);

    act(() => {
      screen.getByText("delete").click();
    });

    expect(Number(screen.getByTestId("tasks-count").textContent)).toBe(before - 1);
  });

  test("toggleComplete cambia el estado de completado", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    act(() => {
      screen.getByText("add").click();
    });

    act(() => {
      screen.getByText("toggle").click();
    });

    const stored = JSON.parse(localStorage.getItem("tasks"));
    expect(stored[0].completed).toBe(true);
  });

  test("updateFilters y updatePagination actualizan valores", async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    act(() => {
      screen.getByText("filter").click();
      screen.getByText("paginate").click();
    });

    expect(screen.getByTestId("filters").textContent).toContain("completed");
    expect(screen.getByTestId("pagination").textContent).toContain("2");
  });

  test("useTasks fuera de TaskProvider lanza error", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    function BadComponent() {
      useTasks();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow(
      "useTasks must be used within a TaskProvider"
    );

    spy.mockRestore();
  });
});
