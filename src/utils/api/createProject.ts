import axios from "axios";
import renderAlert from "../renderAlert";
import { User } from "../../types/types";

async function createProject(projectName: string, user: User) {
  try {
    const response = await axios.post(
      "/api/create-project",
      {
        projectName,
        id: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.status === 200) {
      renderAlert("success", "Project created successfully");
      return response;
    }
  } catch (error: any) {
    renderAlert("error", error.response.data.error);
    return error;
  }
}

export default createProject;
