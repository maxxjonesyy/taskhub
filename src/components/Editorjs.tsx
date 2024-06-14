import { useEffect, Key } from "react";
import { Task } from "../types/types";
import { editTask } from "../utils";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";

function Editorjs({
  projectId,
  tasks,
  setTasks,
  openedTask,
  setOpenedTask,
}: {
  projectId: Key;
  tasks: Task[];
  setTasks: Function;
  openedTask: Task;
  setOpenedTask: Function;
}) {
  const taskSidebar = document.getElementById("task-sidebar");

  async function handleEditTask(data: string) {
    const editedTask = await editTask(projectId, {
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

        if (!data) return;
        handleEditTask(data);
      },
    });

    return () => {
      editor.destroy();
    };
  }, [taskSidebar?.style.right]);
  return <div id='editorjs' className='mt-5'></div>;
}

export default Editorjs;
