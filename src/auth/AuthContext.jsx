// Importaciones necesarias de React y AWS Amplify
import { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

// Creación del contexto de autenticación
const AuthContext = createContext();

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estados para almacenar el usuario actual, los grupos a los que pertenece y el estado de carga
  const [user, setUser] = useState(null); // Usuario autenticado
  const [groups, setGroups] = useState([]); // Grupos del usuario
  const [loading, setLoading] = useState(true); // Indicador de carga

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      // Llama a AWS Amplify para autenticar al usuario
      const user = await Auth.signIn(username, password);
      console.log("✅ Usuario autenticado:", user);

      // Carga la sesión del usuario después de iniciar sesión
      await loadSession();
      return user;
    } catch (err) {
      // Manejo de errores durante el inicio de sesión
      console.error("❌ Error en login:", err);
      throw err;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Llama a AWS Amplify para cerrar la sesión
      await Auth.signOut();

      // Limpia el estado del usuario y los grupos
      setUser(null);
      setGroups([]);
      console.log("👋 Sesión cerrada");
    } catch (err) {
      // Manejo de errores durante el cierre de sesión
      console.error("❌ Error al cerrar sesión:", err);
    }
  };

  // Función para cargar la sesión actual del usuario
  const loadSession = async () => {
    try {
      console.log("🔄 Cargando sesión...");

      // Obtiene el usuario autenticado actual y su sesión
      const currentUser = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();

      // Extrae el token de ID (JWT) y decodifica su payload
      const idToken = session.getIdToken().getJwtToken();
      const payload = session.getIdToken().decodePayload();

      // Actualiza el estado con el usuario y los grupos
      setUser(currentUser);
      setGroups(payload["cognito:groups"] || []);

      console.log("👤 Usuario:", currentUser.getUsername());
      console.log("🎯 Roles:", payload["cognito:groups"] || []);
    } catch (err) {
      // Manejo de errores si no hay sesión activa
      console.error("❌ No hay sesión activa:", err);
      setUser(null);
      setGroups([]);
    } finally {
      // Marca la carga como completada
      setLoading(false);
    }
  };

  // Función para obtener el token de ID (JWT) del usuario actual
  const getIdToken = async () => {
    try {
      // Obtiene la sesión actual y extrae el token de ID
      const session = await Auth.currentSession();
      return session.getIdToken().getJwtToken();
    } catch (err) {
      // Manejo de errores al obtener el token
      console.error("❌ Error obteniendo idToken:", err);
      return null;
    }
  };

  // Efecto que se ejecuta al montar el componente para cargar la sesión automáticamente
  useEffect(() => {
    loadSession();
  }, []);

  // Proveedor del contexto que expone los valores y funciones necesarias
  return (
    <AuthContext.Provider
      value={{
        user, // Usuario autenticado
        groups, // Grupos del usuario
        loading, // Estado de carga
        login, // Función para iniciar sesión
        logout, // Función para cerrar sesión
        isInGroup: (role) => groups.includes(role), // Verifica si el usuario pertenece a un grupo
        getIdToken, // Obtiene el token de ID
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
