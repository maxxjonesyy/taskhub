import { useEffect, useRef, useState } from "react";
import { TaskPanel } from "./index";

function Tasks() {
  const taskPanelRef = useRef<HTMLDivElement>(null);
  const [taskObject, setTaskObject] = useState({
    name: "",
    priority: "",
    status: "",
    date: null,
    description: "",
  });

  function showTaskPanel() {
    const taskPanel = taskPanelRef.current as HTMLDivElement;

    if (!taskPanel.style.right) {
      taskPanel.style.right = "-100%";
    }

    taskPanel.style.right === "-100%"
      ? (taskPanel.style.right = "0")
      : (taskPanel.style.right = "-100%");
  }

  function hideTaskPanel(event: any) {
    const taskPanel = taskPanelRef.current as HTMLDivElement;

    if (
      !taskPanel.contains(event.target) &&
      event.target.id !== "toggle-panel"
    ) {
      taskPanel.style.right = "-100%";
    }
  }

  const styles = {
    notStarted: {
      cardBackground: "rgba(39,39,39,0.5)",
      titleBackground: "rgba(45,45,45,0.6)",
      dot: "rgba(75,75,75,1)",
    },
    inProgress: {
      cardBackground: "rgba(64,89,179,0.2)",
      titleBackground: "rgba(64,89,179,0.2)",
      dot: "rgba(64,89,179,0.8)",
    },
    done: {
      cardBackground: "rgba(33,79,21,0.2)",
      titleBackground: "rgba(33,79,21,0.3)",
      dot: "rgba(33,79,21,0.8)",
    },
  };

  useEffect(() => {
    document.addEventListener("click", hideTaskPanel);
    return () => document.removeEventListener("click", hideTaskPanel);
  }, []);

  return (
    <section className='w-full flex flex-wrap gap-3'>
      <div
        style={{ backgroundColor: styles.notStarted.cardBackground }}
        className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 rounded-md shadow-sm'>
        <div
          style={{ backgroundColor: styles.notStarted.titleBackground }}
          className='flex items-center justify-between py-1.5 px-3 text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div
              style={{ backgroundColor: styles.notStarted.dot }}
              className='h-3 w-3 rounded-full'></div>
            <span>Not Started</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => {
              setTaskObject({ ...taskObject, status: "notStarted" });
              showTaskPanel();
            }}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
      </div>

      <div
        style={{ backgroundColor: styles.inProgress.cardBackground }}
        className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 rounded-md shadow-sm'>
        <div
          style={{ backgroundColor: styles.inProgress.titleBackground }}
          className='flex items-center justify-between py-1.5 px-3 text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div
              style={{ backgroundColor: styles.inProgress.dot }}
              className='h-3 w-3 rounded-full'></div>
            <span>In Progress</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => {
              setTaskObject({ ...taskObject, status: "inProgress" });
              showTaskPanel();
            }}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
      </div>

      <div
        style={{ backgroundColor: styles.done.cardBackground }}
        className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 rounded-md shadow-sm'>
        <div
          style={{ backgroundColor: styles.done.titleBackground }}
          className='flex items-center justify-between py-1.5 px-3 text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div
              style={{ backgroundColor: styles.done.dot }}
              className='h-3 w-3 rounded-full'></div>
            <span>Done</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => {
              setTaskObject({ ...taskObject, status: "done" });
              showTaskPanel();
            }}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
      </div>

      <TaskPanel
        taskObject={taskObject}
        setTaskObject={setTaskObject}
        taskPanelRef={taskPanelRef}
      />
    </section>
  );
}

export default Tasks;
