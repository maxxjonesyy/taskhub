import { LegacyRef } from "react";
import { Task, ActiveProjectType } from "../types/types";
import { Editorjs } from "./index";
import { api } from "../utils";

import {
  dateIcon,
  headerIcon,
  priorityIcon,
  statusIcon,
} from "../assets/index";

interface Props {
  activeProject: ActiveProjectType;
  tasks: Task[];
  setTasks: Function;
  openedTask: Task;
  setOpenedTask: Function;
  taskPanelRef: LegacyRef<HTMLDivElement>;
}

function TaskPanel({
  activeProject,
  tasks,
  setTasks,
  openedTask,
  setOpenedTask,
  taskPanelRef,
}: Props) {
  async function handleEditTask() {
    if (activeProject) {
      const editedTask = await api.editTask(activeProject?._id, openedTask);

      if (editedTask) {
        setTasks(
          tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
        );
        setOpenedTask(editedTask);
      }
    }
  }

  return (
    <aside
      id='task-sidebar'
      ref={taskPanelRef}
      className='fixed h-full w-3/4 md:max-w-[500px] top-0 right-[-100%] transition-all duration-300 bg-background-secondary shadow-2xl p-5'>
      <form onBlur={handleEditTask}>
        <div className='inline-flex gap-2 w-full'>
          <img src={headerIcon} alt='some image' />
          <input
            className='font-bold text-2xl md:text-3xl w-full text-ellipsis placeholder:text-primary focus:outline-none bg-transparent'
            type='text'
            value={openedTask.name}
            onChange={(e) =>
              setOpenedTask({ ...openedTask, name: e.target.value })
            }
            placeholder={openedTask.name || "Enter a task name"}
          />
        </div>

        <div className='flex flex-col gap-3 text-sm md:text-base'>
          <div className='inline-flex items-center gap-2 mt-5'>
            <img src={priorityIcon} alt='priority' />
            <label htmlFor='priority' className='w-20 text-secondary'>
              Priority
            </label>
            <select
              name='priority'
              id='priority'
              className='task-input'
              value={openedTask.priority}
              onChange={(e) =>
                setOpenedTask({ ...openedTask, priority: e.target.value })
              }>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          <div className='inline-flex items-center gap-2'>
            <img src={statusIcon} alt='status' />
            <label htmlFor='status' className='w-20 text-secondary'>
              Status
            </label>
            <select
              name='status'
              id='status'
              className='task-input'
              value={openedTask.status}
              onChange={(e) =>
                setOpenedTask({ ...openedTask, status: e.target.value })
              }>
              <option value='notStarted'>Not Started</option>
              <option value='inProgress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>

          <div className='inline-flex items-center gap-2'>
            <img src={dateIcon} alt='date' />
            <label htmlFor='date' className='w-20 text-secondary'>
              Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              className='task-input'
              value={
                openedTask.dueDate
                  ? new Date(openedTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                setOpenedTask({
                  ...openedTask,
                  dueDate: e.target.value,
                });
              }}
            />
          </div>

          <Editorjs
            activeProject={activeProject}
            tasks={tasks}
            setTasks={setTasks}
            openedTask={openedTask}
            setOpenedTask={setOpenedTask}
          />
        </div>
      </form>
    </aside>
  );
}

export default TaskPanel;
