import axios from "axios";
import { Key } from "react";
import { Task } from "../../types/types";
import getToken from "../getToken";
import renderAlert from "../renderAlert";

async function createTask(projectId: Key, openedTask: Task) {
  const response = await axios.post(
    "api/create-task",
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

  const { createdTask } = response.data;

  if (!createdTask) {
    renderAlert("error", "We encountered an error creating your task.");
  }

  return createdTask;
}

export default createTask;
