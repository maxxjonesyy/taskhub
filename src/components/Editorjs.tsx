import { useEffect } from "react";
import { Task, ActiveProjectType } from "../types/types";

import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";
import { api } from "../utils";

interface Props {
  activeProject: ActiveProjectType;
  tasks: Task[];
  setTasks: Function;
  openedTask: Task;
  setOpenedTask: Function;
}

function Editorjs({
  activeProject,
  tasks,
  setTasks,
  openedTask,
  setOpenedTask,
}: Props) {
  const taskSidebar = document.getElementById("task-sidebar");

  async function handleEditTask(data: string) {
    if (activeProject) {
      const editedTask = await api.editTask(activeProject._id, {
        ...openedTask,
        description: data,
      });

      if (editedTask) {
        setTasks(
          tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
        );
        setOpenedTask(editedTask);
      }
    }
  }

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Task details go here... use / for commands",
      tools: {
        header: Header,

        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },

        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },

      data: {
        blocks: openedTask.description
          ? JSON.parse(openedTask.description)
          : [],
      },

      onChange: async () => {
        const data = await editor.save().then(async (outputData) => {
          return JSON.stringify(outputData.blocks);
        });

        if (!data) {
          return;
        }

        handleEditTask(data);
      },
    });

    return () => {
      if (taskSidebar) {
        editor.destroy();
      }
    };
  }, [taskSidebar?.style.right]);

  return <div id='editorjs' className='mt-5'></div>;
}

export default Editorjs;
