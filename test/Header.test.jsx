import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Header from "../src/components/layout/Header"; // ajusta la ruta real
import { useAuth } from "../src/context/AuthContext";

// Mock del contexto
jest.mock("../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // simular temporizadores
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test("muestra el nombre del usuario cuando está autenticado", () => {
    useAuth.mockReturnValue({
      user: { name: "Douglas" },
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Douglas")).toBeInTheDocument();
  });

  test('muestra "Usuario" cuando no hay user', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Usuario")).toBeInTheDocument();
  });

  test("ejecuta logout después de hacer clic en Cerrar Sesión", () => {
    const mockLogout = jest.fn();
    useAuth.mockReturnValue({
      user: { name: "Douglas" },
      logout: mockLogout,
    });

    render(<Header />);

    // Hacer clic en el botón
    fireEvent.click(screen.getByText("Cerrar Sesión"));

    // Debe cambiar a "Saliendo..."
    expect(screen.getByText("Saliendo...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // Avanzar el tiempo 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // logout debería haber sido llamado
    expect(mockLogout).toHaveBeenCalled();
  });
});
