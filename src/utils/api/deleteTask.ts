import { Key } from "react";
import { Task } from "../../types/types";
import renderAlert from "../renderAlert";
import getToken from "../getToken";
import axios from "axios";

async function deleteTask(projectId: Key, task: Task) {
  const response = await axios.post(
    "/api/delete-task",
    {
      projectId,
      task,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );

  if (response.status !== 200) {
    renderAlert("error", "There was an error deleting your task");
  }

  const { data } = response.data;
  return data;
}

export default deleteTask;
