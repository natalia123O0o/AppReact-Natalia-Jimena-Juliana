// test/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../src/components/auth/Login';

// Mock de react-router-dom usando importOriginal
const mockNavigate = vi.fn();
const mockLocation = { state: { from: { pathname: '/usuarios' } } };

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation
  };
});

// Mock de useAuth
const mockLogin = vi.fn();
vi.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    user: null,
    isAuthenticated: false,
    logout: vi.fn()
  })
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockClear();
  });

  test('successful login redirects to correct page', async () => {
    mockLogin.mockReturnValue({ ok: true });
    
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Escribe tu usuario');
    const passwordInput = screen.getByPlaceholderText('Escribe tu contraseña');
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin', '1234');
      expect(mockNavigate).toHaveBeenCalledWith('/usuarios', { replace: true });
    });
  });

  test('failed login shows error message', async () => {
    mockLogin.mockReturnValue({ ok: false, message: 'credenciales inválidas' });
    
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Escribe tu usuario');
    const passwordInput = screen.getByPlaceholderText('Escribe tu contraseña');
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  test('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    
    expect(screen.getByText('Bienvenidos a nuestra lista colaborativa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });
});