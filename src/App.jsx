import { useState } from "react";
import { Auth } from "aws-amplify";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(form.username, form.password);
      setUser(user);
      console.log("✅ Login exitoso:", user);
    } catch (err) {
      setError("❌ Credenciales incorrectas");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <div>
          <h2>Bienvenido, {user.username}</h2>
          <button
            onClick={async () => {
              await Auth.signOut();
              setUser(null);
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            placeholder="usuario"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            placeholder="contraseña"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button onClick={handleLogin}>Entrar</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
