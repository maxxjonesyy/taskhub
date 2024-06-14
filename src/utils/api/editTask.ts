import { Key } from "react";
import { Task } from "../../types/types";
import { renderAlert } from "../../utils";
import axios from "axios";
import getToken from "../getToken";

async function editTask(projectId: Key, openedTask: Task) {
  const response = await axios.put(
    "/api/edit-task",
    {
      projectId,
      openedTask,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );

  const { data, error } = response.data;

  if (error) {
    renderAlert("error", "There was an error saving your task.");
  }

  return data;
}

export default editTask;
