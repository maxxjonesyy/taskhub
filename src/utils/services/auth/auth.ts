import axios from "axios";
import { User } from "../../../types/types";
import { renderAlert } from "../../index";

class auth {
  static async register(
    event: any,
    email: string,
    password: string,
    setIsLoading: Function,
    setEmail: Function,
    setPassword: Function
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
      });

      renderAlert("success", response.data.message);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      if (error) {
        console.error("Register account failed", error);
        renderAlert(
          "error",
          error.response.data.error || "Error: Failed to register"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  static async deleteAccount(user: User) {
    try {
      const response = await axios.post("auth/delete-account", {
        email: user.email,
      });

      if (response.status === 200) {
        renderAlert("success", "Account deleted!");
        localStorage.removeItem("user");
        window.location.reload();
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to delete account", error);
      renderAlert("error", "Failed to delete account");
    }
  }

  static getUser() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return user;
  }

  static getToken() {
    const user = auth.getUser();

    return `Bearer ${user.token}`;
  }

  static async verifyToken(): Promise<boolean> {
    const user = auth.getUser();

    if (!user.token) {
      return false;
    }

    const response = await axios.get("/auth/verify-token");

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

export default auth;
