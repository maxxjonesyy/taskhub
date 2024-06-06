import { useRef } from "react";
import { TaskPanel, CreateTaskButton } from "./index";

function Tasks() {
  const taskPanelRef = useRef();

  function showTaskPanel(taskPanelRef: any) {
    const taskPanel = taskPanelRef.current;

    if (!taskPanel.style.right) {
      taskPanel.style.right = "-100%";
    }

    taskPanel.style.right === "-100%"
      ? (taskPanel.style.right = "0")
      : (taskPanel.style.right = "-100%");
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
          <CreateTaskButton
            taskPanelRef={taskPanelRef}
            showTaskPanel={showTaskPanel}
          />
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
          <CreateTaskButton
            taskPanelRef={taskPanelRef}
            showTaskPanel={showTaskPanel}
          />
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
          <CreateTaskButton
            taskPanelRef={taskPanelRef}
            showTaskPanel={showTaskPanel}
          />
        </div>
      </div>

      <TaskPanel taskPanelRef={taskPanelRef} />
    </section>
  );
}

export default Tasks;
