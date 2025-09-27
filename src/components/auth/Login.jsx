import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/usuarios";

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = login(form.username, form.password);

    if (res?.ok) {
      // Redirigir a la página que intentaban acceder o a /usuarios
      navigate(from, { replace: true });
    } else {
      setError(res?.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#190019] via-[#2B124C] to-[#522B5B] p-6">
      <form
        onSubmit={onSubmit}
        className="bg-[#FBE4D8] rounded-3xl p-10 w-full max-w-md shadow-2xl border-4 border-[#854F6C]"
      >
        <div className="text-center mb-6">
          <span className="text-5xl">👧🏻👩🏻‍🦱👩🏻</span>
          <h1 className="text-3xl font-bold text-[#2B124C] mt-2">
            Bienvenidos a nuestra lista colaborativa
          </h1>
          <p className="text-[#522B5B] text-sm">
            <br />
            Ingresa con tu usuario y contraseña para entrar a la lista
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <label className="block mb-6">
          <span className="block text-lg text-[#2B124C] font-semibold mb-1">
            👩 Usuario
          </span>
          <input
            className="mt-1 w-full border-2 border-[#DFB6B2] rounded-xl p-3 text-center focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Escribe tu usuario"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-lg text-[#2B124C] font-semibold mb-1">
            🔒 Contraseña
          </span>
          <input
            className="mt-1 w-full border-2 border-[#DFB6B2] rounded-xl p-3 text-center focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={onChange}
            placeholder="Escribe tu contraseña"
          />
        </label>

        <button 
          type="submit"
          className="w-full rounded-xl bg-[#2B124C] hover:bg-[#522B5B] text-[#FBE4D8] py-3 font-bold text-lg shadow-md transition transform hover:scale-105"
        >
          👉🏻 Ingresar 👈🏻
        </button>
      </form>
    </div>
  );
}