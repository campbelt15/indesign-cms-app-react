import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user, groups, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenido, <span className="text-blue-600">{user?.username}</span>
        </h1>

        <p className="text-gray-600 mb-6">
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
