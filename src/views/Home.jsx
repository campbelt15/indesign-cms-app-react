import { useAuth } from "../auth/AuthContext";
import { useApp } from "../hooks/useApp";

export default function Home() {
  const { user, groups, logout } = useAuth();
  const { darkMode, setDarkMode } = useApp();

  const toggleDark = () => {
    console.log("🖱 Cambiando darkMode...");
    setDarkMode((prev) => !prev);
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

      <div className="bg-white dark:bg-darkCard shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Bienvenido, <span className="text-blue-600">{user?.username}</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <strong>Roles:</strong>{" "}
          {groups.length > 0 ? groups.join(", ") : "Sin roles"}
        </p>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
