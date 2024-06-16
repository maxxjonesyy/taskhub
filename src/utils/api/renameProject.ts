import axios from "axios";
import getToken from "../getToken";
import { ActiveProjectType } from "../../types/types";

async function renameProject(
  projectName: string,
  activeProject: ActiveProjectType
) {
  const response = await axios.put(
    "api/rename-project/",
    {
      projectId: activeProject?._id,
      projectName,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );

  const { data } = response.data;
  return data;
}

export default renameProject;
