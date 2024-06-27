import { useState } from "react";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (user: Object) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(user: Object) {
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.reload();
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
