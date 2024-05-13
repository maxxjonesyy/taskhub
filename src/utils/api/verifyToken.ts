import axios from "axios";
import renderAlert from "../renderAlert";

async function verifyToken(): Promise<boolean> {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token) {
      return false;
    }

    const response = await axios.get("/auth/verify-token", {
      headers: {
        Authorization: `Bearer ${user.token}`,
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
    } else renderAlert("error", `Error verifying token: ${error}`);

    return false;
  }
}

export default verifyToken;
