import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useApp } from "../hooks/useApp";

export default function Login() {
  const { login } = useAuth();
  const { darkMode, setDarkMode } = useApp(); // 👈 usamos el contexto
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const toggleDark = () => {
    console.log("🖱 Cambiando darkMode...");
    setDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg transition-all">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDark}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md shadow-md"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Usuario
            </label>
            <input
              name="username"
              placeholder="Usuario"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
