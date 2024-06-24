import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { auth } from "./utils/index.ts";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.interceptors.request.use((config: any) => {
  config.headers.Authorization = auth.getToken();
  return config;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
