import { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log("✅ Usuario autenticado:", user);
      await loadSession();
      return user;
    } catch (err) {
      console.error("❌ Error en login:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      setGroups([]);
      console.log("👋 Sesión cerrada");
    } catch (err) {
      console.error("❌ Error al cerrar sesión:", err);
    }
  };

  const loadSession = async () => {
    try {
      console.log("🔄 Cargando sesión...");
      const currentUser = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();

      const idToken = session.getIdToken().getJwtToken();
      const payload = session.getIdToken().decodePayload();

      setUser(currentUser);
      setGroups(payload["cognito:groups"] || []);

      console.log("👤 Usuario:", currentUser.getUsername());
      console.log("🎯 Roles:", payload["cognito:groups"] || []);
    } catch (err) {
      console.error("❌ No hay sesión activa:", err);
      setUser(null);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const getIdToken = async () => {
    try {
      const session = await Auth.currentSession();
      return session.getIdToken().getJwtToken();
    } catch (err) {
      console.error("❌ Error obteniendo idToken:", err);
      return null;
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        groups,
        loading,
        login,
        logout,
        isInGroup: (role) => groups.includes(role),
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
