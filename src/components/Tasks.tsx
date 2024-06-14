import { Key, useEffect, useRef, useState } from "react";
import { Task } from "../types/types";
import { TaskPanel } from "./index";
import { getTasks, createTask } from "../utils";

function Tasks({ projectId }: { projectId: Key }) {
  const taskPanelRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openedTask, setOpenedTask] = useState({
    name: "Task",
    priority: "low",
    status: "notStarted",
    date: undefined,
    description: undefined,
    _id: undefined,
  } as Task);

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

  async function handleCreateTask(status: string) {
    const newTask = await createTask(projectId, {
      ...openedTask,
      status: status,
    });
    setOpenedTask(newTask);
    setTasks([...tasks, newTask]);
    showTaskPanel();
  }

  useEffect(() => {
    getTasks(projectId, setTasks);
  }, []);

  useEffect(() => {
    document.addEventListener("click", hideTaskPanel);
    return () => document.removeEventListener("click", hideTaskPanel);
  }, []);

  return (
    <section className='w-full flex flex-wrap gap-3'>
      <div className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(39,39,39,0.5)] rounded-md shadow-sm'>
        <div className='flex items-center justify-between py-1.5 px-3 bg-[rgba(45,45,45,0.6)] text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div className='h-3 w-3 bg-[rgba(75,75,75,1)] rounded-full'></div>
            <span>Not Started</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => handleCreateTask("notStarted")}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
        {tasks
          .filter((task: Task) => task.status === "notStarted")
          .map((task: Task, index) => (
            <div
              onClick={() => setOpenedTask(task)}
              key={index}
              className='flex items-center mt-3 p-1.5 bg-[rgba(45,45,45,0.6)] rounded-md'>
              <p className='m-0 text-sm text-primary'>{task.name}</p>
            </div>
          ))}
      </div>

      <div className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(64,89,179,0.2)] rounded-md shadow-sm'>
        <div className='flex items-center justify-between py-1.5 px-3 bg-[rgba(64,89,179,0.3)] text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div className='h-3 w-3 bg-[rgba(64,89,179,0.8)] rounded-full'></div>
            <span>In Progress</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => handleCreateTask("inProgress")}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
        {tasks
          .filter((task: Task) => task.status === "inProgress")
          .map((task: Task, index) => (
            <div
              onClick={() => setOpenedTask(task)}
              key={index}
              className='flex items-center mt-3 p-1.5 bg-[rgba(64,89,179,0.3)] rounded-md'>
              <p className='m-0'>{task.name}</p>
            </div>
          ))}
      </div>

      <div className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(33,79,21,0.2)] rounded-md shadow-sm'>
        <div className='flex items-center justify-between py-1.5 px-3 bg-[rgba(33,79,21,0.3)] text-sm rounded-lg'>
          <div className='inline-flex items-center gap-2'>
            <div className='h-3 w-3 bg-[rgba(33,79,21,0.8)] rounded-full'></div>
            <span>Done</span>
          </div>
          <button
            id='toggle-panel'
            onClick={() => handleCreateTask("done")}
            className='transition-colors duration-300 hover:text-secondary'>
            <img
              className='relative inline-block pr-1 bottom-[1px]'
              src='./src/assets/icons/plus-icon.svg'
            />
            Task
          </button>
        </div>
        {tasks
          .filter((task: Task) => task.status === "done")
          .map((task: Task, index) => (
            <div
              onClick={() => setOpenedTask(task)}
              key={index}
              className='flex items-center mt-3 p-1.5 bg-[rgba(33,79,21,0.3)] rounded-md'>
              <p className='m-0'>{task.name}</p>
            </div>
          ))}
      </div>

      <TaskPanel
        projectId={projectId}
        tasks={tasks}
        setTasks={setTasks}
        openedTask={openedTask}
        setOpenedTask={setOpenedTask}
        taskPanelRef={taskPanelRef}
      />
    </section>
  );
}

export default Tasks;
