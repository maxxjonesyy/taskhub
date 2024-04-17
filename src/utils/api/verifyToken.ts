import axios from "axios";

async function verifyToken(): Promise<boolean> {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const response = await axios.get("/auth/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
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
