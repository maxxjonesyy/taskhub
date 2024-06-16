import { LegacyRef } from "react";
import { Task, ActiveProjectType } from "../types/types";
import { Editorjs } from "./index";
import { editTask } from "../utils";

interface TaskPanelProps {
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
}: TaskPanelProps) {
  async function handleEditTask() {
    if (activeProject) {
      const editedTask = await editTask(activeProject?._id, openedTask);

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
      className='fixed h-full w-2/3 md:max-w-[500px] top-0 right-[-100%] transition-all duration-300 bg-background-secondary shadow-2xl p-5'>
      <form onBlur={handleEditTask}>
        <input
          className='font-bold text-3xl w-full placeholder:text-primary focus:outline-none bg-transparent'
          type='text'
          value={openedTask.name}
          onChange={(e) =>
            setOpenedTask({ ...openedTask, name: e.target.value })
          }
          placeholder={openedTask.name || "Enter a task name"}
        />

        <div className='flex flex-col gap-3'>
          <div className='inline-flex items-center gap-5 mt-5'>
            <label htmlFor='priority' className='w-20'>
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

          <div className='inline-flex items-center gap-5'>
            <label htmlFor='status' className='w-20'>
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

          <div className='inline-flex items-center gap-5'>
            <label htmlFor='date' className='w-20'>
              Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              className='task-input'
              onChange={(e) =>
                setOpenedTask({ ...openedTask, date: e.target.value })
              }
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
