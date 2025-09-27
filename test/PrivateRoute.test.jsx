import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../src/components/auth/PrivateRoute"; // ajusta la ruta
import { useAuth } from "../src/context/AuthContext";

// Mock del contexto
jest.mock("../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("PrivateRoute", () => {
  test("🔓 muestra el contenido si el usuario está autenticado", () => {
    // mock user presente
    useAuth.mockReturnValue({ user: { name: "Douglas" } });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <h1>Área protegida</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Área protegida")).toBeInTheDocument();
  });

  test("🔒 redirige al login si NO hay usuario", () => {
    // mock sin usuario
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <h1>Área protegida</h1>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<h1>Página de Login</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });
});
