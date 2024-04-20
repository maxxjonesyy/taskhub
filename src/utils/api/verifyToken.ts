import axios from "axios";

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
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}

export default verifyToken;
