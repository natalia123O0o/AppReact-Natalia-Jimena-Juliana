// test/AuthContext.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Componente de prueba que consume el contexto
function TestComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="username">{user?.username || "no-user"}</div>
      <div data-testid="auth">{isAuthenticated ? "yes" : "no"}</div>
      <button onClick={() => login("admin", "1234")}>login-admin</button>
      <button onClick={() => login("wrong", "wrong")}>login-wrong</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("carga usuario desde localStorage al iniciar", () => {
    localStorage.setItem("user", JSON.stringify({ username: "juliana" }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("username")).toHaveTextContent("juliana");
    expect(screen.getByTestId("auth")).toHaveTextContent("yes");
  });

  test("login con credenciales válidas guarda usuario", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("login-admin").click();
    });

    expect(screen.getByTestId("username")).toHaveTextContent("admin");
    expect(localStorage.getItem("user")).toContain("admin");
  });

  test("login con credenciales inválidas no guarda usuario", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("login-wrong").click();
    });

    expect(screen.getByTestId("username")).toHaveTextContent("no-user");
    expect(screen.getByTestId("auth")).toHaveTextContent("no");
  });

  test("logout limpia usuario y localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("login-admin").click();
    });
    expect(screen.getByTestId("auth")).toHaveTextContent("yes");

    act(() => {
      screen.getByText("logout").click();
    });

    expect(screen.getByTestId("username")).toHaveTextContent("no-user");
    expect(localStorage.getItem("user")).toBeNull();
  });

  test("useAuth fuera de AuthProvider lanza error", () => {
    // deshabilitamos el error en consola para no ensuciar test
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useAuth debe usarse dentro de <AuthProvider>"
    );

    spy.mockRestore();
  });
});
