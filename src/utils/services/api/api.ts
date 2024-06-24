import axios from "axios";
import { Key } from "react";
import auth from "../auth/auth";
import { User, Task, ActiveProjectType } from "../../../types/types";
import { renderAlert } from "../../index";

class api {
  static async getProjects(
    setProjects: Function,
    setActiveProject: Function,
    setLoading: Function
  ) {
    const user = auth.getUser();

    try {
      const response = await axios.get(`api/get-projects/${user.id}`, {
        headers: {
          Authorization: auth.getToken(),
        },
      });

      if (response.status === 200) {
        setProjects(response.data.projects);
        setActiveProject(response.data.projects[0]);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  static async createProject(projectName: string, user: User) {
    try {
      const response = await axios.post(
        "/api/create-project",
        {
          projectName,
          id: user.id,
        },
        {
          headers: {
            Authorization: auth.getToken(),
          },
        }
      );

      if (response.status === 200) {
        const { project } = response.data;
        renderAlert("success", `${project?.name} was created`);
        return response;
      }
    } catch (error: any) {
      renderAlert("error", error.response.data.error);
      return error;
    }
  }

  static async deleteProject(project: ActiveProjectType) {
    try {
      const response = await axios.post(
        "api/delete-project",
        {
          projectId: project?._id,
        },
        {
          headers: {
            Authorization: auth.getToken(),
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

  static async renameProject(
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
          Authorization: auth.getToken(),
        },
      }
    );

    const { data } = response.data;
    return data;
  }

  static async getTasks(projectId: Key) {
    const response = await axios.get(`api/get-tasks/${projectId}`, {
      headers: {
        Authorization: auth.getToken(),
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

  static async searchTasks(projectId: Key, query: string) {
    if (!query) {
      return;
    }

    try {
      const response = await axios.get(
        `/api/search-tasks/${projectId}/${query}`,
        {
          headers: {
            Authorization: auth.getToken(),
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

  static async createTask(projectId: Key, openedTask: Task) {
    const response = await axios.post(
      "api/create-task",
      {
        projectId,
        openedTask,
      },
      {
        headers: {
          Authorization: auth.getToken(),
        },
      }
    );

    const { createdTask } = response.data;

    if (!createdTask) {
      renderAlert("error", "We encountered an error creating your task.");
    }

    return createdTask;
  }

  static async deleteTask(projectId: Key, task: Task) {
    const response = await axios.post(
      "/api/delete-task",
      {
        projectId,
        task,
      },
      {
        headers: {
          Authorization: auth.getToken(),
        },
      }
    );

    if (response.status !== 200) {
      renderAlert("error", "There was an error deleting your task");
    }

    const { data } = response.data;
    return data;
  }

  static async editTask(projectId: Key, openedTask: Task) {
    const response = await axios.put(
      "/api/edit-task",
      {
        projectId,
        openedTask,
      },
      {
        headers: {
          Authorization: auth.getToken(),
        },
      }
    );

    const { data, error } = response.data;

    if (error) {
      renderAlert("error", "There was an error saving your task.");
    }

    return data;
  }
}

export default api;
