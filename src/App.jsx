import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./views/Login";
import Home from "./views/Home";
import { useApp } from "./hooks/useApp";

function App() {
  const { user, loading } = useAuth();
  const { darkMode } = useApp();

  if (loading) return <div>Cargando sesión...</div>;

  return (
    <Router>
      <div key={darkMode ? "dark" : "light"}>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
