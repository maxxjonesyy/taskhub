import { User, DisplayedProject } from "../../types/types";
import renderAlert from "../renderAlert";
import axios from "axios";

async function deleteProject(user: User, project: DisplayedProject) {
  try {
    const response = await axios.post(
      "api/delete-project",
      {
        projectId: project?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      const { data } = response.data;
      renderAlert("success", `${project?.name} was deleted`);
      return data;
    }
  } catch (error) {
    console.log(error);
    renderAlert("error", `Error deleting project: ${project?.name}`);
  }
}

export default deleteProject;
