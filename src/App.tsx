import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "./utils";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      setIsAuthenticated(await verifyToken());
    }
    checkAuth();
  }, []);

  return (
    <div className='min-h-screen bg-background-light'>
      <Routes>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
