import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
