import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/components/auth/Login";

// Mock de useAuth
const mockLogin = jest.fn();
jest.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

// Mock de navigate y location
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { from: { pathname: "/protected" } } }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza inputs y botón", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/escribe tu usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/escribe tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  test("muestra error si login falla", () => {
    mockLogin.mockReturnValue({ ok: false, message: "Credenciales inválidas" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/escribe tu usuario/i), {
      target: { value: "wrongUser", name: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText(/escribe tu contraseña/i), {
      target: { value: "wrongPass", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("redirige si login es exitoso", () => {
    mockLogin.mockReturnValue({ ok: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/escribe tu usuario/i), {
      target: { value: "user", name: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText(/escribe tu contraseña/i), {
      target: { value: "pass", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/protected", { replace: true });
  });
});
