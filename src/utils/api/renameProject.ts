import axios from "axios";
import getToken from "../getToken";
import { DisplayedProject } from "../../types/types";

async function renameProject(
  projectName: string,
  project: DisplayedProject,
  projects: Array<DisplayedProject>,
  setProjects: Function
) {
  try {
    const response = await axios.patch(
      "api/rename-project/",
      {
        projectId: project?._id,
        projectName,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      setProjects(data);
    }
  } catch (error) {
    setProjects(projects);
  }
}

export default renameProject;
