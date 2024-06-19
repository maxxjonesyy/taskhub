import { Key } from "react";
import { getToken } from "../index";
import { renderAlert } from "../index";
import axios from "axios";

async function handleSearchTasks(projectId: Key, query: string) {
  if (!query) {
    return;
  }

  try {
    const response = await axios.get(
      `/api/search-tasks/${projectId}/${query}`,
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );

    if (response.status === 200) {
      const { queriedTasks } = response.data;
      return queriedTasks;
    } else {
      renderAlert("error", "There was an error while searching for tasks");
    }
  } catch (error) {
    renderAlert("error", "There was an error while searching for tasks");
  }
}

export default handleSearchTasks;
