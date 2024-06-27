import { Key, useEffect, useRef, useState } from "react";
import { TaskPanel } from "./index";
import { Task, ActiveProjectType } from "../types/types";
import { warningAlert, renderAlert } from "../utils";
import { deleteIcon, editIcon, plusIcon } from "../assets/index";
import { api } from "../utils";

interface Props {
  queryTasks: Task[];
  activeProject: ActiveProjectType;
}
function Tasks({ queryTasks, activeProject }: Props) {
  const taskPanelRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const blankTask = {
    name: "Task",
    priority: "low",
    status: "notStarted",
    dueDate: undefined,
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
    if (activeProject) {
      const newTask = await api.createTask(activeProject?._id, {
        ...blankTask,
        status: status,
      });
      setOpenedTask(newTask);
      setTasks([...tasks, newTask]);
      showTaskPanel();
    }
  }

  function handleClickedTask(task: Task) {
    setOpenedTask(task);
    showTaskPanel();
  }

  async function handleDeleteTask(projectId: Key, task: Task) {
    warningAlert("Are you sure you want to delete this task?", async () => {
      const newTasksArray = await api.deleteTask(projectId, task);

      if (newTasksArray) {
        setTasks(newTasksArray);
      }
    });
  }

  async function handleDroppedTask(event: any, newStatus: string) {
    event.preventDefault();

    if (!draggedTask) return;

    const newTasks = tasks.map((task) =>
      task === draggedTask ? { ...task, status: newStatus } : task
    );

    const task = {
      ...draggedTask,
      status: newStatus,
    };

    if (activeProject) {
      setTasks(newTasks);
      draggedTask = undefined;

      const response = await api.editTask(activeProject?._id, task);

      if (!response) {
        renderAlert("error", "Failed to move task");
      }
    }
  }

  useEffect(() => {
    if (activeProject) {
      api.getTasks(activeProject._id).then((tasks) => {
        setTasks(tasks);
      });
    }
  }, [activeProject]);

  useEffect(() => {
    document.addEventListener("click", hideTaskPanel);
    return () => document.removeEventListener("click", hideTaskPanel);
  }, []);

  const displayTasks = queryTasks.length > 0 ? queryTasks : tasks;
  let draggedTask: any = undefined;

  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={(event) => handleDroppedTask(event, "notStarted")}
      className='w-full flex flex-wrap gap-3'>
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
              src={plusIcon}
            />
            Task
          </button>
        </div>
        {displayTasks
          .filter((task: Task) => task.status === "notStarted")
          .map((task: Task, index) => (
            <div
              onDragStart={() => (draggedTask = task)}
              draggable
              key={index}
              className='flex justify-between mt-3 p-2 bg-[rgba(45,45,45,0.6)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src={editIcon}
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => {
                  if (activeProject) {
                    handleDeleteTask(activeProject._id, task);
                  }
                }}
                className='pl-2 hover:cursor-pointer'
                src={deleteIcon}
                alt='delete'
              />
            </div>
          ))}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => handleDroppedTask(event, "inProgress")}
        className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(64,89,179,0.2)] rounded-md shadow-sm'>
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
              src={plusIcon}
            />
            Task
          </button>
        </div>
        {displayTasks
          .filter((task: Task) => task.status === "inProgress")
          .map((task: Task, index) => (
            <div
              onDragStart={() => (draggedTask = task)}
              draggable
              key={index}
              className='flex justify-between mt-3 p-2 bg-[rgba(64,89,179,0.3)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src={editIcon}
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => {
                  if (activeProject) handleDeleteTask(activeProject._id, task);
                }}
                className='pl-2 hover:cursor-pointer'
                src={deleteIcon}
                alt='delete'
              />
            </div>
          ))}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => handleDroppedTask(event, "done")}
        className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 bg-[rgba(33,79,21,0.2)] rounded-md shadow-sm'>
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
              src={plusIcon}
            />
            Task
          </button>
        </div>
        {displayTasks
          .filter((task: Task) => task.status === "done")
          .map((task: Task, index) => (
            <div
              onDragStart={() => (draggedTask = task)}
              draggable
              onClick={() => setOpenedTask(task)}
              key={index}
              className='flex justify-between mt-3 p-2 bg-[rgba(33,79,21,0.3)] rounded-md transition-opacity duration-300 opacity-75 hover:opacity-100'>
              <div className='inline-flex gap-3'>
                <img
                  id='toggle-panel'
                  onClick={() => handleClickedTask(task)}
                  className='hover:cursor-pointer'
                  src={editIcon}
                />
                <p className='m-0 text-sm text-primary'>{task.name}</p>
              </div>
              <img
                onClick={() => {
                  if (activeProject) handleDeleteTask(activeProject._id, task);
                }}
                className='pl-2 hover:cursor-pointer'
                src={deleteIcon}
                alt='delete'
              />
            </div>
          ))}
      </div>

      <TaskPanel
        activeProject={activeProject}
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
