import { LegacyRef } from "react";
import { TaskObject } from "../types/types";
import { Editorjs } from "./index";
function TaskPanel({
  taskObject,
  setTaskObject,
  taskPanelRef,
}: {
  taskObject: TaskObject;
  setTaskObject: Function;
  taskPanelRef: LegacyRef<HTMLDivElement>;
}) {
  return (
    <aside
      ref={taskPanelRef}
      className='fixed h-full w-2/3 md:max-w-[500px] top-0 right-[-100%] transition-all duration-300 bg-background-secondary shadow-2xl p-5'>
      <form action=''>
        <input
          className='font-bold text-3xl w-full placeholder:text-primary focus:outline-none bg-transparent'
          type='text'
          value={taskObject.name}
          onChange={(e) =>
            setTaskObject({ ...taskObject, name: e.target.value })
          }
          placeholder={taskObject.name || "Enter a task name"}
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
              value={taskObject.priority}
              onChange={(e) =>
                setTaskObject({ ...taskObject, priority: e.target.value })
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
              value={taskObject.status}
              onChange={(e) =>
                setTaskObject({ ...taskObject, status: e.target.value })
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
              value={taskObject.date?.toISOString().split("T")[0] || ""}
              onChange={(e) =>
                setTaskObject({ ...taskObject, date: e.target.value })
              }
            />
          </div>

          <Editorjs taskObject={taskObject} setTaskObject={setTaskObject} />
        </div>
      </form>
    </aside>
  );
}

export default TaskPanel;
