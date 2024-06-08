import { useEffect } from "react";
import { TaskObject } from "../types/types";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";

function Editorjs({
  taskObject,
  setTaskObject,
}: {
  taskObject: TaskObject;
  setTaskObject: Function;
}) {
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
        blocks: taskObject.description
          ? JSON.parse(taskObject.description)
          : [],
      },

      onChange: () => {
        editor.save().then((outputData) => {
          setTaskObject({
            ...taskObject,
            description: JSON.stringify(outputData.blocks),
          });
        });
      },
    });

    return () => {
      editor.destroy();
    };
  }, []);
  return (
    <div
      id='editorjs'
      style={{ maxHeight: document.getElementById("editorjs")?.clientHeight }}
      className='mt-5 overflow-y-scroll'></div>
  );
}

export default Editorjs;
