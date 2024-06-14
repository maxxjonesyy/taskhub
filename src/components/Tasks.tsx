import { Key, useEffect, useRef, useState } from "react";
import { Task } from "../types/types";
import { TaskPanel } from "./index";
import { getTasks, createTask, deleteTask } from "../utils";
import { warningAlert } from "../utils/index";

function Tasks({ projectId }: { projectId: Key }) {
  const taskPanelRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const blankTask = {
    name: "Task",
    priority: "low",
    status: "notStarted",
    date: undefined,
    description: undefined,
    _id: undefined,
  };
  const [openedTask, setOpenedTask] = useState(blankTask as Task);

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
      ...blankTask,
      status: status,
    });
    setOpenedTask(newTask);
    setTasks([...tasks, newTask]);
    showTaskPanel();
  }

  function handleClickedTask(task: Task) {
    setOpenedTask(task);
    showTaskPanel();
  }

  async function handleDeleteTask(projectId: Key, task: Task) {
    warningAlert("Are you sure you want to delete this task?", async () => {
      const newTasksArray = await deleteTask(projectId, task);

      if (newTasksArray) {
        setTasks(newTasksArray);
      }
    });
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
              key={index}
              className='flex justify-between mt-3 p-2 bg-[rgba(45,45,45,0.6)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src='./src/assets/icons/edit.svg'
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => handleDeleteTask(projectId, task)}
                className='pl-2 hover:cursor-pointer'
                src='./src/assets/icons/delete.svg'
                alt='delete'
              />
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
              key={index}
              className='flex justify-between mt-3 p-2 bg-[rgba(64,89,179,0.3)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src='./src/assets/icons/edit.svg'
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => handleDeleteTask(projectId, task)}
                className='pl-2 hover:cursor-pointer'
                src='./src/assets/icons/delete.svg'
                alt='delete'
              />
            </div>
          ))}
      </div>

      <div className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(33,79,21,0.2)] rounded-md shadow-sm'>
        <div className='flex items-center justify-between py-2 px-3 bg-[rgba(33,79,21,0.3)] text-sm rounded-lg'>
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
              className='flex justify-between mt-3 p-2 bg-[rgba(33,79,21,0.3)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src='./src/assets/icons/edit.svg'
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => handleDeleteTask(projectId, task)}
                className='pl-2 hover:cursor-pointer'
                src='./src/assets/icons/delete.svg'
                alt='delete'
              />
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
