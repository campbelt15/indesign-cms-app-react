import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user, groups, logout } = useAuth();

  return (
    <div style={{ padding: 30 }}>
      <h1>Bienvenido, {user?.username}</h1>
      <p>Roles: {groups.join(", ") || "Sin roles"}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
