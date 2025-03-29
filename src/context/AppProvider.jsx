import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    console.log("🗂 Valor guardado en localStorage al iniciar:", stored);

    // ⚠️ Si no hay valor, usar el valor del sistema como fallback
    if (stored === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      console.log("🎨 Preferencia del sistema:", prefersDark);
      return prefersDark;
    }

    return stored === "dark";
  });

  // ✅ Notificaciones
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
  };

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Estado de carga global
  const [globalLoading, setGlobalLoading] = useState(false);

  // ✅ Filtros activos
  const [filters, setFilters] = useState({ search: "", category: "" });

  useEffect(() => {
    console.log("🌓 darkMode cambió:", darkMode);
    if (darkMode) {
      console.log("🔧 Agregando clase dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("🔧 Quitando clase dark");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,

        notifications,
        addNotification,
        removeNotification,

        globalLoading,
        setGlobalLoading,

        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
