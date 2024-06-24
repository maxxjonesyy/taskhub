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

      if (response.status === 200) {
        const { message } = response.data;

        if (message) {
          renderAlert("success", message);
        }

        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      renderAlert("error", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  static async deleteAccount(user: User) {
    try {
      const response = await axios.post(
        "auth/delete-account",
        {
          email: user.email,
        },
        {
          headers: {
            Authorization: auth.getToken(),
          },
        }
      );

      if (response.status === 200) {
        renderAlert("success", "Account deleted!");
        localStorage.removeItem("user");
        window.location.reload();
      }
    } catch (error) {
      renderAlert("error", "Failed to delete account");
      console.error(error);
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
    try {
      const user = auth.getUser();

      if (!user.token) {
        return false;
      }

      const response = await axios.get("/auth/verify-token", {
        headers: {
          Authorization: auth.getToken(),
        },
      });

      if (response.status === 200) {
        return true;
      } else return false;
    } catch (error: any) {
      if (error.response) {
        renderAlert(
          "error",
          `Error verifying token: ${error.response.data.message}`
        );
      } else {
        console.error(`Error verifying token: ${error}`);
      }

      return false;
    }
  }
}

export default auth;
