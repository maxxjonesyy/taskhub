import { useEffect } from "react";

function TaskPanel({ taskPanelRef }: { taskPanelRef: any }) {
  function hideTaskPanel(event: any) {
    if (
      !taskPanelRef.current.contains(event.target) &&
      event.target.id !== "toggle-panel"
    ) {
      taskPanelRef.current.style.right = "-100%";
    }
  }

  useEffect(() => {
    document.addEventListener("click", hideTaskPanel);
    return () => document.removeEventListener("click", hideTaskPanel);
  }, []);

  return (
    <aside
      ref={taskPanelRef}
      className='fixed h-full w-2/3 md:w-[400px] top-0 right-[-100%] transition-all duration-300 bg-background-secondary shadow-2xl p-5'>
      <form action=''>
        <input
          className='font-bold text-3xl placeholder:text-primary focus:outline-none bg-transparent'
          type='text'
          placeholder='Taskhub'
        />

        <div className='flex flex-col gap-3'>
          <div className='inline-flex items-center gap-5 mt-5'>
            <label htmlFor='priority' className='w-20'>
              Priority
            </label>
            <select name='priority' id='priority' className='task-input'>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          <div className='inline-flex items-center gap-5'>
            <label htmlFor='status' className='w-20'>
              Status
            </label>
            <select name='status' id='status' className='task-input'>
              <option value='notStarted'>Not Started</option>
              <option value='inProgress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>

          <div className='inline-flex items-center gap-5'>
            <label htmlFor='date' className='w-20'>
              Date
            </label>
            <input type='date' name='date' id='date' className='task-input' />
          </div>

          <div>
            <label htmlFor='description' className='font-bold'>
              Description
            </label>
            <textarea
              className='mt-2 w-full h-screen bg-transparent focus:outline-none'
              name='description'
              id='description'
            />
          </div>
        </div>
      </form>
    </aside>
  );
}

export default TaskPanel;
