import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Auth, Dashboard } from "./views";
import { ProtectedRoute } from "./components";
import { AuthContext } from "./context/AuthContext";
import { auth } from "./utils";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth() {
      setIsAuthenticated(await auth.verifyToken());
    }
    verifyAuth();
  }, []);

  useEffect(() => {
    isAuthenticated ? navigate("/") : navigate("/auth");
  }, [isAuthenticated, navigate]);

  return (
    <div className='min-h-screen bg-background-primary'>
      <Routes>
        <Route path='/auth' element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
