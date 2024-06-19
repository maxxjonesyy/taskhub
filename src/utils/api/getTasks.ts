import { Key } from "react";
import { getToken, renderAlert } from "../index";
import axios from "axios";

async function getTasks(projectId: Key) {
  const response = await axios.get(`api/get-tasks/${projectId}`, {
    headers: {
      Authorization: getToken(),
    },
  });

  const { data, error } = response.data;

  if (error) {
    renderAlert("error", "There was an error fetching your tasks.");
  }

  if (data) {
    return data;
  }
}
export default getTasks;
