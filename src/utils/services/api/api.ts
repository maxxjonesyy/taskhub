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
      const response = await axios.get(`api/get-projects/${user.id}`);

      if (response.status === 200) {
        setProjects(response.data.projects);
        setActiveProject(response.data.projects[0]);
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Failed to fetch projects", error);
      renderAlert("error", "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }

  static async createProject(projectName: string, user: User) {
    try {
      const response = await axios.post("/api/create-project", {
        projectName,
        id: user.id,
      });

      if (response.status === 200) {
        const { project } = response.data;
        renderAlert("success", `${project?.name} was created`);
        return response;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Failed to create project", error);
      renderAlert("error", "Failed to create project");
    }
  }

  static async deleteProject(project: ActiveProjectType) {
    try {
      const response = await axios.post("api/delete-project", {
        projectId: project?._id,
      });

      if (response.status === 200) {
        const { data } = response.data;
        renderAlert("success", `${project?.name} was deleted`);
        return data;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.log(`Failed deleting project: ${project?.name}`, error);
      renderAlert("error", `Failed deleting project: ${project?.name}`);
    }
  }

  static async renameProject(
    projectName: string,
    activeProject: ActiveProjectType
  ) {
    try {
      const response = await axios.put("api/rename-project/", {
        projectId: activeProject?._id,
        projectName,
      });

      if (response.status === 200) {
        const { data } = response.data;
        return data;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to rename project", error);
      renderAlert("error", "Failed to rename project");
    }
  }

  static async getTasks(projectId: Key) {
    try {
      const response = await axios.get(`api/get-tasks/${projectId}`);

      if (response.status === 200) {
        const { data } = response.data;

        if (data) {
          return data;
        }
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to get tasks", error);
      renderAlert("error", "Failed to get tasks");
    }
  }

  static async searchTasks(projectId: Key, query: string) {
    if (!query) {
      return;
    }

    try {
      const response = await axios.get(
        `/api/search-tasks/${projectId}/${query}`
      );

      if (response.status === 200) {
        const { queriedTasks } = response.data;
        return queriedTasks;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("There was an error while searching for tasks", error);
      renderAlert("error", "There was an error while searching for tasks");
    }
  }

  static async createTask(projectId: Key, openedTask: Task) {
    try {
      const response = await axios.post("api/create-task", {
        projectId,
        openedTask,
      });

      if (response.status === 200) {
        const { createdTask } = response.data;

        if (!createdTask) {
          renderAlert("error", "We encountered an error creating your task.");
        }

        return createdTask;
      }
    } catch (error) {
      console.error("Failed to create task", error);
      renderAlert("error", "Failed to create task");
    }
  }

  static async deleteTask(projectId: Key, task: Task) {
    try {
      const response = await axios.post("/api/delete-task", {
        projectId,
        task,
      });

      if (response.status === 200) {
        const { data } = response.data;
        return data;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("There was an error deleting your task", error);
      renderAlert("error", "There was an error deleting your task");
    }
  }

  static async editTask(projectId: Key, openedTask: Task) {
    try {
      const response = await axios.put("/api/edit-task", {
        projectId,
        openedTask,
      });

      if (response.status === 200) {
        const { data } = response.data;
        return data;
      } else {
        renderAlert("error", "Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to edit task", error);
      renderAlert("error", "Failed to edit task");
    }
  }
}

export default api;
