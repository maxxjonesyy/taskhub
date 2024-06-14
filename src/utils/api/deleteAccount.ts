import axios from "axios";
import renderAlert from "../renderAlert";
import { User } from "../../types/types";
import getToken from "../getToken";

async function deleteAccount(user: User) {
  try {
    const response = await axios.post(
      "auth/delete-account",
      {
        email: user.email,
      },
      {
        headers: {
          Authorization: getToken(),
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

export default deleteAccount;
